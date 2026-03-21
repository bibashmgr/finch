import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { settingsTable } from "@/modules/db/schema";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class SettingRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(payload: typeof settingsTable.$inferInsert) {
    const [setting] = await this.db
      .insert(settingsTable)
      .values(payload)
      .returning();
    return setting;
  }

  async findById(id: string) {
    const [setting] = await this.db
      .select()
      .from(settingsTable)
      .where(eq(settingsTable.id, id))
      .limit(1);
    return setting;
  }

  async findByUserId(userId: string) {
    const [setting] = await this.db
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
    const [setting] = await this.db
      .update(settingsTable)
      .set({ ...payload })
      .where(eq(settingsTable.id, id))
      .returning();
    return setting;
  }
}
