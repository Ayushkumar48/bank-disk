import type { MiddlewareHandler } from "hono";
import { logger } from "../infra/logger";

export const errorMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    await next();
  } catch (err: any) {
    logger.error(
      {
        err,
        requestId: c.get("requestId"),
        path: c.req.path,
        method: c.req.method,
      },
      "unhandled error",
    );

    return c.json(
      {
        error: "Internal Server Error",
        requestId: c.get("requestId"),
      },
      500,
    );
  }
};
