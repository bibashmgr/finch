import type { Params } from "nestjs-pino";
import { RequestMethod } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";

import { redactCensor, redactPaths } from "./redaction.config";

import type { Env } from "@/config/env.config";
import type { IncomingMessage, ServerResponse } from "node:http";

export function createLoggerConfig(
  configService: ConfigService<Env, true>,
): Params {
  const nodeEnv: "development" | "production" | "test" =
    configService.get("NODE_ENV");
  const isProduction = nodeEnv === "production";
  const logLevel = getLogLevel(nodeEnv);

  return {
    pinoHttp: {
      level: logLevel,

      autoLogging: true,

      redact: {
        paths: redactPaths,
        censor: redactCensor,
      },

      serializers: {
        req: (
          req: IncomingMessage & {
            id?: string;
            query?: unknown;
            params?: unknown;
          },
        ) => ({
          id: req.id,
          method: req.method,
          url: req.url,
          query: req.query,
          params: req.params,
          remoteAddress: req.socket?.remoteAddress,
          remotePort: req.socket?.remotePort,
        }),
        res: (res: ServerResponse) => ({
          statusCode: res.statusCode,
        }),
        err: (error: Error) => ({
          type: error.constructor.name,
          message: error.message,
          stack: error.stack,
        }),
      },

      customProps: (req: IncomingMessage) => ({
        correlationId: req.headers["x-correlation-id"],
        traceId: extractTraceId(req.headers.traceparent as string | undefined),
      }),

      customSuccessMessage: (req: IncomingMessage, res: ServerResponse) => {
        return `${req.method} ${req.url} ${res.statusCode}`;
      },

      customErrorMessage: (
        req: IncomingMessage,
        res: ServerResponse,
        error: Error,
      ) => {
        return `${req.method} ${req.url} ${res.statusCode} - ${error.message}`;
      },

      ...(isProduction
        ? {}
        : {
            transport: {
              target: "pino-pretty",
              options: {
                colorize: true,
                singleLine: true,
                translateTime: "HH:MM:ss",
                ignore: "pid,hostname",
                messageFormat: "{context} | {msg}",
              },
            },
          }),
    },
  };
}

function getLogLevel(nodeEnv: "development" | "production" | "test"): string {
  switch (nodeEnv) {
    case "production": {
      return "info";
    }
    case "test": {
      return "warn";
    }
    case "development": {
      return "debug";
    }
  }
}

function extractTraceId(traceparent: string | undefined): string | undefined {
  if (!traceparent) {
    return undefined;
  }

  const parts = traceparent.split("-");
  return parts[1];
}
