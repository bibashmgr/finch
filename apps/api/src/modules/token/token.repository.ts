import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { refreshTokensTable } from "@/modules/db/schema";

@Injectable()
export class TokenRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(payload: typeof refreshTokensTable.$inferInsert) {
    return this.db.insert(refreshTokensTable).values(payload).returning();
  }

  findOneByToken(token: string) {
    return this.db.query.refreshTokensTable.findFirst({
      where: eq(refreshTokensTable.token, token),
    });
  }

  update(id: string, payload: Partial<typeof refreshTokensTable.$inferInsert>) {
    return this.db
      .update(refreshTokensTable)
      .set({ ...payload })
      .where(eq(refreshTokensTable.id, id))
      .returning();
  }
}
