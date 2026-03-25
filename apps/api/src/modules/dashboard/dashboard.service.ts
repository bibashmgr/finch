import { Injectable } from "@nestjs/common";
import { endOfMonth, startOfMonth } from "date-fns";

import { TransactionRepository } from "@/modules/transaction/transaction.repository";

@Injectable()
export class DashboardService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async getSummary(filters: {
    userId: string;
    startDate?: string;
    endDate?: string;
  }) {
    const startDate = filters.startDate
      ? new Date(filters.startDate)
      : startOfMonth(new Date());
    const endDate = filters.endDate
      ? new Date(filters.endDate)
      : endOfMonth(new Date());

    // TODO: use promise.all
    const [totalIncomeResult] = await this.transactionRepository.getTotalIncome(
      filters.userId,
      startDate,
      endDate,
    );
    const [totalExpenseResult] =
      await this.transactionRepository.getTotalExpense(
        filters.userId,
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
