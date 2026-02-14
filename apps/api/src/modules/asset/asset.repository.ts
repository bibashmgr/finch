import { Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";

import { assetsTable } from "@/modules/db/schema";
import { DbTransactionAdapter } from "@/modules/db/client";
import { eq } from "drizzle-orm";

@Injectable()
export class AssetRepository {
  constructor(private txHost: TransactionHost<DbTransactionAdapter>) {}

  async create(payload: typeof assetsTable.$inferInsert) {
    const [asset] = await this.txHost.tx
      .insert(assetsTable)
      .values(payload)
      .returning();
    return asset;
  }

  async findById(id: string) {
    const [asset] = await this.txHost.tx
      .select()
      .from(assetsTable)
      .where(eq(assetsTable.id, id))
      .limit(1);
    return asset;
  }

  async findByUrl(url: string) {
    const [asset] = await this.txHost.tx
      .select()
      .from(assetsTable)
      .where(eq(assetsTable.url, url))
      .limit(1);
    return asset;
  }

  async findByPublicId(publicId: string) {
    const [asset] = await this.txHost.tx
      .select()
      .from(assetsTable)
      .where(eq(assetsTable.publicId, publicId))
      .limit(1);
    return asset;
  }

  async update(id: string, payload: Partial<typeof assetsTable.$inferInsert>) {
    const [user] = await this.txHost.tx
      .update(assetsTable)
      .set({ ...payload, updatedAt: new Date() })
      .where(eq(assetsTable.id, id))
      .returning();
    return user;
  }
}
