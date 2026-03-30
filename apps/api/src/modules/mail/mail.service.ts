import ms from "ms";
import path from "path";
import { format } from "date-fns";
import { readFileSync } from "fs";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
import { ISendMailOptions } from "@nestjs-modules/mailer";

import { Env } from "@/config/env.config";
import Handlebars from "@/config/handlebars.config";
import { notificationsTable } from "@/modules/db/schema";
import { MailTypeEnum } from "@/modules/mail/entities/mail-type.enum";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<Env, true>,
  ) {}

  private getEmailTemplate(
    type: MailTypeEnum,
    context: Record<string, string | number> = {},
  ) {
    let source: string = "";

    switch (type) {
      case MailTypeEnum.EMAIL_VERIFICATION:
        source = readFileSync(
          path.join(
            __dirname,
            "../../../templates/email-verification.template.html",
          ),
          "utf-8",
        );
        break;

      case MailTypeEnum.BUDGET_EXCEEDED_ALERT:
        source = readFileSync(
          path.join(
            __dirname,
            "../../../templates/budget-exceeded-alert.template.html",
          ),
          "utf-8",
        );
        break;
    }

    const template = Handlebars.compile(source);
    return template(context, {
      allowProtoPropertiesByDefault: true,
    });
  }

  async sendMail(to: ISendMailOptions["to"], subject: string, html: string) {
    await this.mailerService.sendMail({
      from: {
        name: this.configService.get("APP_NAME"),
        address: this.configService.get("EMAIL_FROM"),
      },
      to,
      subject,
      html,
    });
  }

  async sendEmailVerificationMail(to: string, code: string) {
    const subject = "Email Verification";

    const expirationMins =
      parseInt(ms(this.configService.get("OTP_EXPIRES_IN"))) / 60000;
    const appName = this.configService.get("APP_NAME");
    const supportEmail = this.configService.get("SUPPORT_EMAIL");
    const htmlContent = this.getEmailTemplate(MailTypeEnum.EMAIL_VERIFICATION, {
      code,
      expirationMins,
      appName,
      supportEmail,
    });

    await this.sendMail(to, subject, htmlContent);
  }

  async sendBudgetAlertMail(
    to: string,
    payload: Omit<typeof notificationsTable.$inferInsert, "userId">,
  ) {
    const subject = "Budget Exceeded Alert";

    const appName = this.configService.get("APP_NAME");
    const supportEmail = this.configService.get("SUPPORT_EMAIL");
    const html = this.getEmailTemplate(MailTypeEnum.BUDGET_EXCEEDED_ALERT, {
      appName,
      supportEmail,
      categoryTitle: (payload.data as Record<string, string | number>)
        .categoryTitle,
      budgetMonth: format(
        (payload.data as Record<string, string | number>).budgetMonth,
        "MMMM yyyy",
      ),
    });

    await this.sendMail(to, subject, html);
  }
}
