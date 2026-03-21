import { Module } from "@nestjs/common";

import { DashboardService } from "@/modules/dashboard/dashboard.service";
import { TransactionModule } from "@/modules/transaction/transaction.module";
import { DashboardController } from "@/modules/dashboard/dashboard.controller";

@Module({
  imports: [TransactionModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
