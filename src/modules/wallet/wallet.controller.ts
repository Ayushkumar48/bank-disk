import type { Context } from "hono";
import { requireUserId } from "./utils";
import { walletService } from "./wallet.service";
import type { BonusInput, SpendInput, TopUpInput } from "./wallet.validators";

export const walletController = {
  /**
   * Get wallet balances (all assets)
   */
  getBalance: async (c: Context) => {
    try {
      const userId = requireUserId(c);

      const balances = await walletService.getBalances(userId);

      return c.json({ data: balances });
    } catch (err) {
      return c.json({ error: (err as Error).message }, 400);
    }
  },

  /**
   * Get wallet ledger (audit trail)
   */
  getLedger: async (c: Context) => {
    try {
      const userId = requireUserId(c);

      const ledger = await walletService.getLedger(userId);

      return c.json({ data: ledger });
    } catch (err) {
      return c.json({ error: (err as Error).message }, 400);
    }
  },

  /**
   * Wallet top-up (purchase)
   */
  topUp: async (c: Context, body: TopUpInput) => {
    try {
      const userId = requireUserId(c);

      const idempotencyKey = c.get("idempotencyKey");

      const result = await walletService.topUp({
        userId,
        assetCode: body.assetCode,
        amount: body.amount,
        idempotencyKey,
        description: body.description,
      });

      return c.json({ data: result }, 201);
    } catch (err) {
      return c.json({ error: (err as Error).message }, 400);
    }
  },

  /**
   * Bonus / incentive credit
   */
  bonus: async (c: Context, body: BonusInput) => {
    try {
      const userId = requireUserId(c);
      const idempotencyKey = c.get("idempotencyKey");

      const result = await walletService.bonus({
        userId,
        assetCode: body.assetCode,
        amount: body.amount,
        idempotencyKey,
        description: body.description,
      });

      return c.json({ data: result }, 201);
    } catch (err) {
      return c.json({ error: (err as Error).message }, 400);
    }
  },

  /**
   * Spend credits
   */
  spend: async (c: Context, body: SpendInput) => {
    try {
      const userId = requireUserId(c);
      const idempotencyKey = c.get("idempotencyKey");

      const result = await walletService.spend({
        userId,
        assetCode: body.assetCode,
        amount: body.amount,
        idempotencyKey,
        description: body.description,
      });

      return c.json({ data: result }, 201);
    } catch (err) {
      return c.json({ error: (err as Error).message }, 400);
    }
  },
};
