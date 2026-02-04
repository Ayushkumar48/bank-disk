import type { MiddlewareHandler } from "hono";

export const idempotencyMiddleware: MiddlewareHandler = async (c, next) => {
  const key = c.req.header("Idempotency-Key");

  if (!key) {
    return c.json({ error: "Idempotency-Key header is required" }, 400);
  }

  c.set("idempotencyKey", key);

  await next();
};
