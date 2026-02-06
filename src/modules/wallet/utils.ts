import type { Context } from "hono";

export function requireUserId(c: Context): string {
  const userId = c.req.header("x-user-id");
  if (!userId) {
    throw new Error("X-User-Id header is required");
  }
  return userId;
}
