import type { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface";

export const corsConfig: CorsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? (process.env.ALLOWED_ORIGINS?.split(",") ?? [])
      : true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Correlation-Id",
    "Traceparent",
    "Tracestate",
    "API-Version",
  ],
  exposedHeaders: [
    "X-Request-Id",
    "X-Correlation-Id",
    "Trace-Id",
    "Link",
    "Location",
    "ETag",
    "Retry-After",
    "X-RateLimit-Limit",
    "X-RateLimit-Remaining",
    "X-RateLimit-Reset",
    "Deprecation",
    "Sunset",
    "Warning",
  ],
  credentials: true,
  maxAge: 3600,
};
