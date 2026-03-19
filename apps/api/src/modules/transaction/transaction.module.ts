import { Module } from "@nestjs/common";

import { SettingModule } from "@/modules/setting/setting.module";
import { TransactionService } from "@/modules/transaction/transaction.service";
import { TransactionController } from "@/modules/transaction/transaction.controller";
import { TransactionRepository } from "@/modules/transaction/transaction.repository";
import { TransactionAttachmentModule } from "@/modules/transaction-attachment/transaction-attachment.module";

@Module({
  imports: [SettingModule, TransactionAttachmentModule],
  controllers: [TransactionController],
  providers: [TransactionRepository, TransactionService],
})
export class TransactionModule {}
