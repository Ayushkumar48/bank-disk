import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { ledgerEntries } from ".";

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    type: text("type", {
      enum: ["TOP_UP", "BONUS", "SPEND"],
    }).notNull(),
    idempotencyKey: text("idempotency_key").notNull(),
    status: text("status", {
      enum: ["PENDING", "COMPLETED", "FAILED"],
    }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [uniqueIndex("txn_idempotency_unique").on(t.idempotencyKey)],
);

export const transactionsRelations = relations(transactions, ({ many }) => ({
  ledgerEntries: many(ledgerEntries),
}));
