import { Injectable } from "@nestjs/common";
import { and, eq, gt, isNull } from "drizzle-orm";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { verificationCodesTable } from "@/modules/db/schema";

@Injectable()
export class OtpRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(payload: typeof verificationCodesTable.$inferInsert) {
    return this.db.insert(verificationCodesTable).values(payload).returning();
  }

  async findAllByEmail(email: string) {
    const now = new Date();

    return this.db
      .select()
      .from(verificationCodesTable)
      .where(
        and(
          eq(verificationCodesTable.email, email),
          isNull(verificationCodesTable.consumedAt),
          gt(verificationCodesTable.expiresAt, now),
        ),
      );
  }

  findOneByEmail(email: string) {
    const now = new Date();

    return this.db.query.verificationCodesTable.findFirst({
      where: and(
        eq(verificationCodesTable.email, email),
        isNull(verificationCodesTable.consumedAt),
        gt(verificationCodesTable.expiresAt, now),
      ),
    });
  }

  update(
    id: string,
    payload: Partial<typeof verificationCodesTable.$inferInsert>,
  ) {
    return this.db
      .update(verificationCodesTable)
      .set({ ...payload })
      .where(eq(verificationCodesTable.id, id))
      .returning();
  }
}
