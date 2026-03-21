import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { refreshTokensTable } from "@/modules/db/schema";

@Injectable()
export class TokenRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async saveRefreshToken(payload: typeof refreshTokensTable.$inferInsert) {
    const [refreshToken] = await this.db
      .insert(refreshTokensTable)
      .values(payload)
      .returning();
    return refreshToken;
  }

  async findRefreshToken(token: string) {
    const [refreshToken] = await this.db
      .select()
      .from(refreshTokensTable)
      .where(eq(refreshTokensTable.token, token))
      .limit(1);
    return refreshToken;
  }

  async updateRefreshToken(
    id: string,
    payload: Partial<typeof refreshTokensTable.$inferInsert>,
  ) {
    const [refreshToken] = await this.db
      .update(refreshTokensTable)
      .set({ ...payload })
      .where(eq(refreshTokensTable.id, id))
      .returning();
    return refreshToken;
  }
}
