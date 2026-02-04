import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { wallets } from ".";

export const assetTypes = pgTable("asset_types", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assetTypesRelations = relations(assetTypes, ({ many }) => ({
  wallets: many(wallets),
}));
