import { serve } from "bun";
import { app } from "./app";
import { env } from "./config/env";
import { logger } from "./infra/logger";

const port = env.PORT;

logger.info({ port }, "starting wallet service");

serve({
  fetch: app.fetch,
  port,
});
