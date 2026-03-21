import { Injectable } from "@nestjs/common";
import { and, eq, gt, isNull } from "drizzle-orm";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { verificationCodesTable } from "@/modules/db/schema";

@Injectable()
export class OtpRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async saveVerificationCode(
    payload: typeof verificationCodesTable.$inferInsert,
  ) {
    const [verificationCode] = await this.db
      .insert(verificationCodesTable)
      .values(payload)
      .returning();
    return verificationCode;
  }

  async findValidVerificationCodes(email: string) {
    const now = new Date();

    const verificationCodes = await this.db
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
    const [verificationCode] = await this.db
      .update(verificationCodesTable)
      .set({ ...payload })
      .where(eq(verificationCodesTable.id, id))
      .returning();
    return verificationCode;
  }
}
