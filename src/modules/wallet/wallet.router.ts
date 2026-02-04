import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

import { walletController } from "./wallet.controller";
import { topUpSchema, bonusSchema, spendSchema } from "./wallet.validators";
import { idempotencyMiddleware } from "../../middlewares/idempotency.middleware";

export const walletRoutes = new Hono();

/**
 * Get wallet balance
 */
walletRoutes.get("/:userId/balance", walletController.getBalance);

/**
 * Get wallet ledger
 */
walletRoutes.get("/:userId/ledger", walletController.getLedger);

/**
 * Wallet top-up (purchase)
 * Idempotent
 */
walletRoutes.post(
  "/top-up",
  idempotencyMiddleware,
  zValidator("json", topUpSchema),
  walletController.topUp,
);

/**
 * Bonus / incentive credit
 * Idempotent
 */
walletRoutes.post(
  "/bonus",
  idempotencyMiddleware,
  zValidator("json", bonusSchema),
  walletController.bonus,
);

/**
 * Spend credits
 * Idempotent + concurrency safe
 */
walletRoutes.post(
  "/spend",
  idempotencyMiddleware,
  zValidator("json", spendSchema),
  walletController.spend,
);
