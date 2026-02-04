import { relations } from "drizzle-orm";
import { index, integer, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { wallets, transactions } from ".";

export const ledgerEntries = pgTable(
  "ledger_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    transactionId: uuid("transaction_id")
      .notNull()
      .references(() => transactions.id),
    walletId: uuid("wallet_id")
      .notNull()
      .references(() => wallets.id),
    amount: integer("amount").notNull(),
    balanceAfter: integer("balance_after").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("ledger_entries_transaction_id_idx").on(t.transactionId),
    index("ledger_entries_wallet_id_idx").on(t.walletId),
    index("ledger_entries_wallet_created_idx").on(t.walletId, t.createdAt),
  ],
);

export const ledgerEntriesRelations = relations(ledgerEntries, ({ one }) => ({
  transaction: one(transactions, {
    fields: [ledgerEntries.transactionId],
    references: [transactions.id],
  }),
  wallet: one(wallets, {
    fields: [ledgerEntries.walletId],
    references: [wallets.id],
  }),
}));
