import { and, desc, eq, inArray, sql } from "drizzle-orm";
import type { WalletTxnInput } from "./types";
import { db } from "@/config/db";
import {
  assetTypes,
  wallets,
  ledgerEntries,
  transactions,
} from "@/config/db/schema";
import type { DbTransaction } from "@/config/db/types";

/**
 * Resolve asset by code
 */
async function getAssetByCode(assetCode: string) {
  const rows = await db
    .select()
    .from(assetTypes)
    .where(eq(assetTypes.code, assetCode))
    .limit(1);
  if (rows.length === 0) {
    throw new Error(`Asset not found: ${assetCode}`);
  }
  return rows[0];
}

/**
 * Resolve USER + SYSTEM wallets for an asset
 */
async function getUserAndSystemWallets(userId: string, assetTypeId: string) {
  const rows = await db
    .select()
    .from(wallets)
    .where(
      and(
        eq(wallets.assetTypeId, assetTypeId),
        inArray(wallets.ownerType, ["USER", "SYSTEM"]),
      ),
    );

  const userWallet = rows.find(
    (w) => w.ownerType === "USER" && w.ownerId === userId,
  );
  const systemWallet = rows.find((w) => w.ownerType === "SYSTEM");

  if (!userWallet || !systemWallet) {
    throw new Error("Wallets not initialized correctly");
  }

  return { userWallet, systemWallet };
}

/**
 * Get latest balance for a wallet (ledger-based)
 */
async function getLatestBalance(
  tx: DbTransaction,
  walletId: string,
): Promise<number> {
  const rows = await tx
    .select({
      balanceAfter: ledgerEntries.balanceAfter,
    })
    .from(ledgerEntries)
    .where(eq(ledgerEntries.walletId, walletId))
    .orderBy(desc(ledgerEntries.createdAt))
    .limit(1);

  return rows[0]?.balanceAfter ?? 0;
}

/**
 * ---------- SERVICE ----------
 */

export const walletService = {
  /**
   * Get balances for all user wallets
   */
  async getBalances(userId: string) {
    const rows = await db
      .select({
        assetCode: assetTypes.code,
        assetName: assetTypes.name,
        balance: sql<number>`
           COALESCE(
             (
               SELECT le.balance_after
               FROM ledger_entries le
               WHERE le.wallet_id = ${wallets.id}
               ORDER BY le.created_at DESC
               LIMIT 1
             ),
             0
           )
         `,
      })
      .from(wallets)
      .innerJoin(assetTypes, eq(wallets.assetTypeId, assetTypes.id))
      .where(and(eq(wallets.ownerType, "USER"), eq(wallets.ownerId, userId)));

    return rows;
  },

  /**
   * Get full ledger for a user (audit)
   */
  async getLedger(userId: string) {
    return db
      .select()
      .from(ledgerEntries)
      .innerJoin(wallets, eq(ledgerEntries.walletId, wallets.id))
      .where(and(eq(wallets.ownerType, "USER"), eq(wallets.ownerId, userId)))
      .orderBy(desc(ledgerEntries.createdAt));
  },

  /**
   * Wallet top-up (purchase)
   */
  async topUp(input: WalletTxnInput) {
    const { userId, assetCode, amount, idempotencyKey, description } = input;

    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    return db.transaction(async (tx) => {
      const existing = await tx
        .select()
        .from(transactions)
        .where(eq(transactions.idempotencyKey, idempotencyKey))
        .limit(1);

      if (existing.length > 0) {
        return existing[0];
      }

      const [txn] = await tx
        .insert(transactions)
        .values({
          type: "TOP_UP",
          status: "PENDING",
          idempotencyKey,
          description,
        })
        .returning();

      const asset = await getAssetByCode(assetCode);
      const { userWallet, systemWallet } = await getUserAndSystemWallets(
        userId,
        asset.id,
      );

      // 4️⃣ Lock wallets (deadlock-safe)
      await tx.execute(sql`
        SELECT id FROM wallets
        WHERE id IN (${userWallet.id}, ${systemWallet.id})
        ORDER BY id
        FOR UPDATE
      `);

      const userBalance = await getLatestBalance(tx, userWallet.id);
      const systemBalance = await getLatestBalance(tx, systemWallet.id);

      await tx.insert(ledgerEntries).values([
        {
          transactionId: txn.id,
          walletId: userWallet.id,
          amount,
          balanceAfter: userBalance + amount,
        },
        {
          transactionId: txn.id,
          walletId: systemWallet.id,
          amount: -amount,
          balanceAfter: systemBalance - amount,
        },
      ]);

      // 7️⃣ Complete transaction
      await tx
        .update(transactions)
        .set({ status: "COMPLETED" })
        .where(eq(transactions.id, txn.id));

      return txn;
    });
  },

  /**
   * Bonus / incentive credit
   */
  async bonus(input: WalletTxnInput) {
    return this.topUp(input);
  },

  /**
   * Spend credits
   */
  async spend(input: WalletTxnInput) {
    const { userId, assetCode, amount, idempotencyKey, description } = input;

    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    return db.transaction(async (tx) => {
      // 1️⃣ Idempotency check (db.select style)
      const existing = await tx
        .select()
        .from(transactions)
        .where(eq(transactions.idempotencyKey, idempotencyKey))
        .limit(1);

      if (existing.length > 0) {
        return existing[0];
      }

      // 2️⃣ Create transaction
      const [txn] = await tx
        .insert(transactions)
        .values({
          type: "SPEND",
          status: "PENDING",
          idempotencyKey,
          description,
        })
        .returning();

      // 3️⃣ Resolve wallets
      const asset = await getAssetByCode(assetCode);
      const { userWallet, systemWallet } = await getUserAndSystemWallets(
        userId,
        asset.id,
      );

      // 4️⃣ Lock wallets (deadlock-safe)
      await tx.execute(sql`
         SELECT id
         FROM wallets
         WHERE id IN (${userWallet.id}, ${systemWallet.id})
         ORDER BY id
         FOR UPDATE
       `);

      // 5️⃣ Get balances
      const userBalance = await getLatestBalance(tx, userWallet.id);
      const systemBalance = await getLatestBalance(tx, systemWallet.id);

      if (userBalance < amount) {
        throw new Error("Insufficient balance");
      }

      // 6️⃣ Double-entry ledger
      await tx.insert(ledgerEntries).values([
        {
          transactionId: txn.id,
          walletId: userWallet.id,
          amount: -amount,
          balanceAfter: userBalance - amount,
        },
        {
          transactionId: txn.id,
          walletId: systemWallet.id,
          amount,
          balanceAfter: systemBalance + amount,
        },
      ]);

      // 7️⃣ Mark transaction complete
      await tx
        .update(transactions)
        .set({ status: "COMPLETED" })
        .where(eq(transactions.id, txn.id));

      return txn;
    });
  },
};
