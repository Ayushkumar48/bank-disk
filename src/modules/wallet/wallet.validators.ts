import { z } from "zod";

export const topUpSchema = z.object({
  assetCode: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

export type TopUpInput = z.infer<typeof topUpSchema>;

export const bonusSchema = z.object({
  assetCode: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

export type BonusInput = z.infer<typeof bonusSchema>;

export const spendSchema = z.object({
  assetCode: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
});

export type SpendInput = z.infer<typeof spendSchema>;
