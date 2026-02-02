import { ConfigService } from "@nestjs/config";
import { MailerOptions } from "@nestjs-modules/mailer";

import { Env } from "@/config/env.config";

export function createMailConfig(
  configService: ConfigService<Env, true>,
): MailerOptions {
  return {
    transport: {
      host: configService.get("SMTP_HOST"),
      auth: {
        user: configService.get("SMTP_USERNAME"),
        pass: configService.get("SMTP_PASSWORD"),
      },
      port: configService.get("SMTP_PORT"),
    },
    defaults: {
      from: configService.get("EMAIL_FROM"),
    },
  };
}
