import { Injectable } from "@nestjs/common";
import { TransactionHost } from "@nestjs-cls/transactional";

import { DbTransactionAdapter } from "@/modules/db/client";
import { transactionAttachmentsTable } from "@/modules/db/schema";

@Injectable()
export class TransactionAttachmentRepository {
  constructor(private readonly txHost: TransactionHost<DbTransactionAdapter>) {}

  async create(payload: typeof transactionAttachmentsTable.$inferInsert) {
    const [transaction] = await this.txHost.tx
      .insert(transactionAttachmentsTable)
      .values(payload)
      .returning();
    return transaction;
  }

  async createMany(
    payload: (typeof transactionAttachmentsTable.$inferInsert)[],
  ) {
    const [transaction] = await this.txHost.tx
      .insert(transactionAttachmentsTable)
      .values(payload)
      .returning();
    return transaction;
  }
}
