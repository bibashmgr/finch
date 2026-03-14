import { Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";

import { DbTransactionAdapter } from "@/modules/db/client";
import { verificationCodesTable } from "@/modules/db/schema";
import { and, eq, gt, isNull } from "drizzle-orm";

@Injectable()
export class OtpRepository {
  constructor(private readonly txHost: TransactionHost<DbTransactionAdapter>) {}

  async saveVerificationCode(
    payload: typeof verificationCodesTable.$inferInsert,
  ) {
    const [verificationCode] = await this.txHost.tx
      .insert(verificationCodesTable)
      .values(payload)
      .returning();
    return verificationCode;
  }

  async findValidVerificationCodes(email: string) {
    const now = new Date();

    const verificationCodes = await this.txHost.tx
      .select()
      .from(verificationCodesTable)
      .where(
        and(
          eq(verificationCodesTable.email, email),
          isNull(verificationCodesTable.consumedAt),
          gt(verificationCodesTable.expiresAt, now),
        ),
      );
    return verificationCodes;
  }

  async updateVerificationCode(
    id: string,
    payload: Partial<typeof verificationCodesTable.$inferInsert>,
  ) {
    const [verificationCode] = await this.txHost.tx
      .update(verificationCodesTable)
      .set({ ...payload })
      .where(eq(verificationCodesTable.id, id))
      .returning();
    return verificationCode;
  }
}
