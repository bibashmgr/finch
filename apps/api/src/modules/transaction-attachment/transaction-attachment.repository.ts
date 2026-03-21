import { Injectable } from "@nestjs/common";

import { DB } from "@/modules/db/client";
import { InjectDb } from "@/modules/db/db.provider";
import { transactionAttachmentsTable } from "@/modules/db/schema";

@Injectable()
export class TransactionAttachmentRepository {
  constructor(@InjectDb() private readonly db: DB) {}

  async create(payload: typeof transactionAttachmentsTable.$inferInsert) {
    const [transaction] = await this.db
      .insert(transactionAttachmentsTable)
      .values(payload)
      .returning();
    return transaction;
  }

  async createMany(
    payload: (typeof transactionAttachmentsTable.$inferInsert)[],
  ) {
    const [transaction] = await this.db
      .insert(transactionAttachmentsTable)
      .values(payload)
      .returning();
    return transaction;
  }
}
