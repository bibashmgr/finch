import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { assetsTable } from "@/modules/db/schema";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class AssetRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(payload: typeof assetsTable.$inferInsert) {
    const [asset] = await this.db
      .insert(assetsTable)
      .values(payload)
      .returning();
    return asset;
  }

  async findById(id: string) {
    const [asset] = await this.db
      .select()
      .from(assetsTable)
      .where(eq(assetsTable.id, id))
      .limit(1);
    return asset;
  }

  async findByUrl(url: string) {
    const [asset] = await this.db
      .select()
      .from(assetsTable)
      .where(eq(assetsTable.url, url))
      .limit(1);
    return asset;
  }

  async findByPublicId(publicId: string) {
    const [asset] = await this.db
      .select()
      .from(assetsTable)
      .where(eq(assetsTable.publicId, publicId))
      .limit(1);
    return asset;
  }

  async update(id: string, payload: Partial<typeof assetsTable.$inferInsert>) {
    const [asset] = await this.db
      .update(assetsTable)
      .set({ ...payload })
      .where(eq(assetsTable.id, id))
      .returning();
    return asset;
  }
}
