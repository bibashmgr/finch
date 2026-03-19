import { Module } from "@nestjs/common";

import { TransactionAttachmentRepository } from "@/modules/transaction-attachment/transaction-attachment.repository";

@Module({
  imports: [],
  providers: [TransactionAttachmentRepository],
  exports: [TransactionAttachmentRepository],
})
export class TransactionAttachmentModule {}
