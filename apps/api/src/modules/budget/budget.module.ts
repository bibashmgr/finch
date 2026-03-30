import { Module } from "@nestjs/common";

import { BudgetService } from "@/modules/budget/budget.service";
import { BudgetController } from "@/modules/budget/budget.controller";
import { BudgetRepository } from "@/modules/budget/budget.repository";

@Module({
  imports: [],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetRepository],
  exports: [BudgetRepository],
})
export class BudgetModule {}
