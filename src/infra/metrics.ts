import { Hono } from "hono";
import client from "prom-client";

/**
 * Registry
 */
export const register = new client.Registry();

/**
 * Default Node.js metrics
 * (CPU, memory, event loop, GC, etc.)
 */
client.collectDefaultMetrics({
  register,
  prefix: "wallet_service_",
});

/**
 * Custom metrics
 */
export const httpRequestCounter = new client.Counter({
  name: "wallet_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "path", "status"],
});

export const walletTransactionCounter = new client.Counter({
  name: "wallet_transactions_total",
  help: "Total wallet transactions",
  labelNames: ["type", "status"], // topup | bonus | spend
});

export const walletTransactionDuration = new client.Histogram({
  name: "wallet_transaction_duration_ms",
  help: "Wallet transaction duration in milliseconds",
  buckets: [50, 100, 200, 300, 500, 1000],
});

/**
 * Register custom metrics
 */
register.registerMetric(httpRequestCounter);
register.registerMetric(walletTransactionCounter);
register.registerMetric(walletTransactionDuration);

/**
 * Metrics route
 */
export const metricsRoutes = new Hono();

metricsRoutes.get("/", async (c) => {
  return c.text(await register.metrics(), 200, {
    "Content-Type": register.contentType,
  });
});
