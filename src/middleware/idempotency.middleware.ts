import { eq } from "drizzle-orm";
import type { MiddlewareHandler } from "hono";
import { db } from "../config/db";
import { idempotencyKeys } from "../db/schema/idempotencyKeys";

export const idempotencyMiddleware: MiddlewareHandler = async (c, next) => {
  const key = c.req.header("Idempotency-Key");

  if (!key) {
    return c.json({ error: "Idempotency-Key header is required" }, 400);
  }

  const existing = await db
    .select()
    .from(idempotencyKeys)
    .where(eq(idempotencyKeys.key, key))
    .limit(1);

  if (existing.length > 0) {
    // Return cached response
    return c.json(existing[0].responseBody, existing[0].responseStatus);
  }

  // Execute request
  await next();

  // Store response
  await db.insert(idempotencyKeys).values({
    key,
    responseStatus: c.res.status,
    responseBody: await c.res.json(),
  });
};
