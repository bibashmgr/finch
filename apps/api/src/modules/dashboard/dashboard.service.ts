import { Injectable } from "@nestjs/common";
import { endOfMonth, startOfMonth } from "date-fns";

import { TransactionRepository } from "@/modules/transaction/transaction.repository";

@Injectable()
export class DashboardService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getDashboardSummary(query: Record<string, any>) {
    const startDate = query.startDate
      ? new Date(query.startDate)
      : startOfMonth(new Date());
    const endDate = query.endDate
      ? new Date(query.endDate)
      : endOfMonth(new Date());

    const totalIncomeResult = await this.transactionRepository.getTotalIncome(
      query.userId,
      startDate,
      endDate,
    );
    const totalExpenseResult = await this.transactionRepository.getTotalExpense(
      query.userId,
      startDate,
      endDate,
    );

    const totalIncome = parseFloat(totalIncomeResult.total ?? "0");
    const totalExpense = parseFloat(totalExpenseResult.total ?? "0");

    return {
      totalIncome,
      totalExpense,
    };
  }
}
