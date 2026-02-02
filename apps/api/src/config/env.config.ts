import { ConfigModuleOptions } from "@nestjs/config";
import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),

  PORT: z
    .string()
    .transform((value) => Number.parseInt(value, 10))
    .refine((value) => value > 0 && value < 65_536, {
      message: "PORT must be between 1-65535",
    }),

  DATABASE_URL: z.url({
    message: "DATABASE_URL must be a valid url",
  }),

  RATE_LIMIT_INTERVAL_MINUTES: z.coerce.number(),

  RATE_LIMIT_MAX_REQUESTS: z.coerce.number(),

  JWT_SECRET: z
    .string()
    .min(32, { message: "JWT_SECRET must be at least 32 characters" }),

  JWT_ACCESS_EXPIRES_IN: z
    .string()
    .refine((value) => /^\d+[smhd]$/.test(value), {
      message: "JWT_ACCESS_EXPIRES_IN format invalid (e.g., 60s, 15m, 2h, 7d)",
    }),

  JWT_REFRESH_EXPIRES_IN: z
    .string()
    .refine((value) => /^\d+[smhd]$/.test(value), {
      message: "JWT_REFRESH_EXPIRES_IN format invalid (e.g., 60s, 15m, 2h, 7d)",
    }),

  OTP_EXPIRES_IN: z.string().refine((value) => /^\d+[smhd]$/.test(value), {
    message: "OTP_EXPIRES_IN format invalid (e.g., 60s, 15m, 2h, 7d)",
  }),

  SMTP_HOST: z.string().nonempty({
    message: "SMTP_HOST must not be empty",
  }),

  SMTP_PORT: z.coerce.number(),

  SMTP_USERNAME: z.string().nonempty({
    message: "SMTP_USERNAME must not be empty",
  }),

  SMTP_PASSWORD: z.string().nonempty({
    message: "SMTP_PASSWORD must not be empty",
  }),

  EMAIL_FROM: z.email({
    message: "EMAIL_FROM must be a valid email address",
  }),

  ALLOWED_ORIGINS: z.string(),

  CLIENT_BASE_URL: z.url({
    message: "CLIENT_BASE_URL must be a valid url",
  }),

  APP_NAME: z.string().nonempty({
    message: "APP_NAME must not be empty",
  }),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>): Env {
  try {
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues
        .map(
          (error_: z.core.$ZodIssue) =>
            `${error_.path.join(".")}: ${error_.message}`,
        )
        .join("\n");

      throw new Error(
        `Environment validation failed:\n${errorMessages}\n\nCheck .env file or environment variables`,
      );
    }
    throw error;
  }
}

export function createEnvConfig(): ConfigModuleOptions {
  return {
    isGlobal: true,
    envFilePath: [".env"],
    validate: validateEnv,
    cache: true,
  };
}
