import { randomUUIDv7 } from "bun";
import type { MiddlewareHandler } from "hono";
import { logger } from "../infra/logger";

export const loggingMiddleware: MiddlewareHandler = async (c, next) => {
  const requestId = randomUUIDv7();
  const start = Date.now();

  c.set("requestId", requestId);

  await next();

  const durationMs = Date.now() - start;

  logger.info(
    {
      requestId,
      method: c.req.method,
      path: c.req.path,
      status: c.res.status,
      durationMs,
    },
    "request completed",
  );
};
