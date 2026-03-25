import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { settingsTable } from "@/modules/db/schema";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class SettingRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(payload: typeof settingsTable.$inferInsert) {
    return this.db.insert(settingsTable).values(payload).returning();
  }

  findOneById(id: string) {
    return this.db.query.settingsTable.findFirst({
      where: eq(settingsTable.id, id),
    });
  }

  findOneByUserId(userId: string) {
    return this.db.query.settingsTable.findFirst({
      where: eq(settingsTable.userId, userId),
    });
  }

  update(id: string, payload: Partial<typeof settingsTable.$inferInsert>) {
    return this.db
      .update(settingsTable)
      .set({ ...payload })
      .where(eq(settingsTable.id, id))
      .returning();
  }
}
