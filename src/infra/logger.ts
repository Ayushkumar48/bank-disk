import pino, { stdTimeFunctions } from "pino";
import type { Logger, LoggerOptions } from "pino";
import { env } from "../config/env";

const isProd = env.NODE_ENV === "production";

const options: LoggerOptions = {
  level: env.LOG_LEVEL,
  base: {
    service: "wallet-service",
  },
  timestamp: stdTimeFunctions.isoTime,
  ...(isProd
    ? {}
    : {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
      }),
};

export const logger: Logger = pino(options);
