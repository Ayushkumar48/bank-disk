import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { idempotencyMiddleware } from "../../middleware/idempotency.middleware";
import { walletController } from "./wallet.controller";
import { topUpSchema, bonusSchema, spendSchema } from "./wallet.validators";

interface WalletBindings {
  Variables: {
    idempotencyKey: string;
  };
}

export const walletRoutes = new Hono<WalletBindings>();

/**
 * Get wallet balance
 */
walletRoutes.get("/balance", walletController.getBalance);

/**
 * Get wallet ledger
 */
walletRoutes.get("/ledger", walletController.getLedger);

/**
 * Wallet top-up (purchase)
 */
walletRoutes.post(
  "/top-up",
  idempotencyMiddleware,
  zValidator("json", topUpSchema),
  async (c) => {
    const body = c.req.valid("json");
    return walletController.topUp(c, body);
  },
);

/**
 * Bonus / incentive credit
 */
walletRoutes.post(
  "/bonus",
  idempotencyMiddleware,
  zValidator("json", bonusSchema),
  async (c) => {
    const body = c.req.valid("json");
    return walletController.bonus(c, body);
  },
);

/**
 * Spend credits
 */
walletRoutes.post(
  "/spend",
  idempotencyMiddleware,
  zValidator("json", spendSchema),
  async (c) => {
    const body = c.req.valid("json");
    return walletController.spend(c, body);
  },
);
