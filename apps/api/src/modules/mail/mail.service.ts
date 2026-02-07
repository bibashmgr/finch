import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";

import { Env } from "@/config/env.config";
import ms from "ms";

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<Env, true>,
  ) {}

  generateHtmlContent(
    title: string,
    code: string,
    expirationMins: number,
  ): string {
    const currentDate = new Date();
    return `<body style="margin:0; font-family:'Poppins',sans-serif; background:#F9F9F7; font-size:14px;">
    <div style="max-width:680px; margin:0 auto; padding:45px 30px 60px; background:#09090B; font-size:14px; color:#434343;"
    >
      <header>
        <table style="width:100%;">
          <tbody>
            <tr style="height:0;">
              <td>
                <h1 style="font-size:24px; font-weight:600; color: #ffffff;">${this.configService.get("APP_NAME")}</h1>
              </td>
              <td style="text-align:right;">
                <span style="font-size:16px; line-height:30px; color:#ffffff;">${currentDate.toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  },
                )}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </header>
      <main>
        <div style="margin:0; margin-top:70px; padding:92px 30px 115px; background:#ffffff;border-radius:30px; text-align:center;">
          <div style="width:100%; max-width:489px; margin:0 auto;">
            <h1 style="margin:0; font-size:24px; font-weight:500; color:#1f1f1f; text-transform:capitalize;">
              ${title}
            </h1>
            <p style="margin:0; margin-top:17px; font-weight:500; letter-spacing:0.56px;">
              Use the following OTP to complete the procedure to ${title} for your account. OTP is valid for ${expirationMins} minutes. Do not share this code with others.
            </p>
            <p style="margin:0; margin-top:60px; font-size:32px; font-weight:600; letter-spacing:25px; color:#1B2D44;">
              ${code}
            </p>
          </div>
        </div>
        <p style="max-width: 400px; margin: 0 auto; margin-top: 90px; text-align: center; font-weight: 500; color: #ffffff;">
          Need help? Ask at
          <a href="mailto:${this.configService.get("EMAIL_FROM")}" style="color: #ffffff; text-decoration: underline;">
            ${this.configService.get<string>("EMAIL_FROM")}
          </a>
          or visit our
          <a href="${this.configService.get("CLIENT_BASE_URL")}/help-center" target="_blank" style="color: #ffffff; text-decoration: underline;">Help Center</a>
        </p>
      </main>
      <footer style=" width: 100%; max-width: 490px; margin: 20px auto 0; text-align: center; border-top: 1px solid #e6ebf1;">        
        <p style="margin: 0; margin-top: 16px; color: #ffffff;">
          Copyright © ${currentDate.getFullYear()} ${this.configService.get("APP_NAME")}. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
  `;
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
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

  async sendEmailVerificationMail(to: string, code: string): Promise<void> {
    const subject = "Email Verification";

    const expirationMins =
      parseInt(ms(this.configService.get("OTP_EXPIRES_IN"))) / 60000;
    const html = this.generateHtmlContent("Verfiy Email", code, expirationMins);

    await this.sendMail(to, subject, html);
  }
}
