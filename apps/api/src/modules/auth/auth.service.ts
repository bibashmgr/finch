import ms from "ms";
import * as bcrypt from "bcrypt";
import { customAlphabet } from "nanoid";
import { ConfigService } from "@nestjs/config";
import { and, eq, gt, isNull } from "drizzle-orm";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Transactional, TransactionHost } from "@nestjs-cls/transactional";

import {
  accountsTable,
  usersTable,
  verificationCodesTable,
} from "@/modules/db/schema";
import { Env } from "@/config/env.config";
import { MailService } from "@/modules/mail/mail.service";
import { DbTransactionAdapter } from "@/modules/db/client";
import { TokenService } from "@/modules/token/token.service";

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService<Env, true>,
    private txHost: TransactionHost<DbTransactionAdapter>,
    private mailService: MailService,
    private tokenService: TokenService,
  ) {}

  @Transactional()
  async loginWithEmail(email: string) {
    const nanoid = customAlphabet("1234567890", 6);
    const code = nanoid();
    const codeHash = await bcrypt.hash(code, 10);

    const expiresAt = new Date(
      Date.now() + ms(this.configService.get("OTP_EXPIRES_IN")),
    );

    await this.txHost.tx.insert(verificationCodesTable).values({
      codeHash,
      email,
      expiresAt,
    });

    await this.mailService.sendEmailVerificationMail(email, code);

    return { message: "Verification code sent successfully" };
  }

  @Transactional()
  async verifyEmail(email: string, code: string) {
    const now = new Date();

    const records = await this.txHost.tx
      .select()
      .from(verificationCodesTable)
      .where(
        and(
          eq(verificationCodesTable.email, email),
          isNull(verificationCodesTable.consumedAt),
          gt(verificationCodesTable.expiresAt, now),
        ),
      );

    let record: (typeof records)[number] | undefined;

    for (const r of records) {
      const isMatch = await bcrypt.compare(code, r.codeHash);
      if (isMatch) {
        record = r;
        break;
      }
    }

    if (!record) throw new UnauthorizedException("Invalid verification code");

    await this.txHost.tx
      .update(verificationCodesTable)
      .set({ consumedAt: now, updatedAt: now })
      .where(eq(verificationCodesTable.id, record.id));

    let user = await this.txHost.tx
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .then((r) => r[0]);

    if (!user) {
      [user] = await this.txHost.tx
        .insert(usersTable)
        .values({ email, name: email.split("@")[0] })
        .returning();

      await this.txHost.tx.insert(accountsTable).values({
        userId: user.id,
        provider: "email",
        providerAccountId: email,
      });
    }

    return await this.tokenService.issueAuthTokens(user.id);
  }
}
