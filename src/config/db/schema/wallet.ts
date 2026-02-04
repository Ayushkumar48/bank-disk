import { relations, sql } from "drizzle-orm";
import {
  check,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { assetTypes, ledgerEntries } from ".";

export const wallets = pgTable(
  "wallets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerType: text("owner_type", {
      enum: ["USER", "SYSTEM"],
    }).notNull(),
    ownerId: uuid("owner_id"),
    // USER → user.id
    // SYSTEM → NULL
    assetTypeId: uuid("asset_type_id")
      .notNull()
      .references(() => assetTypes.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    uniqueIndex("wallet_owner_asset_unique").on(
      t.ownerType,
      t.ownerId,
      t.assetTypeId,
    ),
    check(
      "wallet_owner_type_check",
      sql`
           (owner_type = 'USER' AND owner_id IS NOT NULL)
           OR
           (owner_type = 'SYSTEM' AND owner_id IS NULL)
         `,
    ),
  ],
);

export const walletsRelations = relations(wallets, ({ one, many }) => ({
  assetType: one(assetTypes, {
    fields: [wallets.assetTypeId],
    references: [assetTypes.id],
  }),
  ledgerEntries: many(ledgerEntries),
}));
