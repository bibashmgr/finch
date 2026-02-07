import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";

import { refreshTokensTable } from "@/modules/db/schema";
import { DbTransactionAdapter } from "@/modules/db/client";

@Injectable()
export class TokenRepository {
  constructor(private txHost: TransactionHost<DbTransactionAdapter>) {}

  async saveRefreshToken(payload: typeof refreshTokensTable.$inferInsert) {
    const [refreshToken] = await this.txHost.tx
      .insert(refreshTokensTable)
      .values(payload)
      .returning();
    return refreshToken;
  }

  async findRefreshToken(token: string) {
    const [refreshToken] = await this.txHost.tx
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
    const [refreshToken] = await this.txHost.tx
      .update(refreshTokensTable)
      .set({ ...payload, updatedAt: new Date() })
      .where(eq(refreshTokensTable.id, id))
      .returning();
    return refreshToken;
  }
}
