import { Hono } from "hono";
import { metricsRoutes } from "./infra/metrics";
import { errorMiddleware } from "./middleware/error.middleware";
import { loggingMiddleware } from "./middleware/logging.middleware";
import { walletRoutes } from "./modules/wallet/wallet.router";

export const app = new Hono();

app.use("*", loggingMiddleware);
app.use("*", errorMiddleware);

app.get("/health", (c) => c.json({ status: "ok", service: "wallet-service" }));

app.route("/api/wallets", walletRoutes);
app.route("/metrics", metricsRoutes);
app.notFound((c) => c.json({ error: "Route not found" }, 404));
