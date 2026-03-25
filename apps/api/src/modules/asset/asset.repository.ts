import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { assetsTable } from "@/modules/db/schema";
import { InjectDb } from "@/modules/db/db.provider";

@Injectable()
export class AssetRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  create(payload: typeof assetsTable.$inferInsert) {
    return this.db.insert(assetsTable).values(payload).returning();
  }

  findOneById(id: string) {
    return this.db.query.assetsTable.findFirst({
      where: eq(assetsTable.id, id),
    });
  }

  findOneByUrl(url: string) {
    return this.db.query.assetsTable.findFirst({
      where: eq(assetsTable.url, url),
    });
  }

  findOneByPublicId(publicId: string) {
    return this.db.query.assetsTable.findFirst({
      where: eq(assetsTable.publicId, publicId),
    });
  }

  update(id: string, payload: Partial<typeof assetsTable.$inferInsert>) {
    return this.db
      .update(assetsTable)
      .set({ ...payload })
      .where(eq(assetsTable.id, id))
      .returning();
  }
}
