import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";

import { settingsTable } from "@/modules/db/schema";
import { DbTransactionAdapter } from "@/modules/db/client";

@Injectable()
export class SettingRepository {
  constructor(private readonly txHost: TransactionHost<DbTransactionAdapter>) {}

  async create(payload: typeof settingsTable.$inferInsert) {
    const [setting] = await this.txHost.tx
      .insert(settingsTable)
      .values(payload)
      .returning();
    return setting;
  }

  async findById(id: string) {
    const [setting] = await this.txHost.tx
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.id, id))
      .limit(1);
    return setting;
  }

  async findByUserId(userId: string) {
    const [setting] = await this.txHost.tx
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.userId, userId))
      .limit(1);
    return setting;
  }

  async update(
    id: string,
    payload: Partial<typeof settingsTable.$inferInsert>,
  ) {
    const [setting] = await this.txHost.tx
      .update(settingsTable)
      .set({ ...payload })
      .where(eq(settingsTable.id, id))
      .returning();
    return setting;
  }
}
