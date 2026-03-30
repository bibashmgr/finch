import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { BudgetRepository } from "@/modules/budget/budget.repository";
import { CreateBudgetDto } from "@/modules/budget/dtos/create-budget.dto";
import { UpdateBudgetDto } from "@/modules/budget/dtos/update-budget.dto";

@Injectable()
export class BudgetService {
  constructor(private readonly budgetRepository: BudgetRepository) {}

  findAll(
    filters: { userId: string; month: string },
    options: { limit?: number; page?: number },
  ) {
    return this.budgetRepository.findAllByUserIdAndMonth(filters, options);
  }

  async findOne(id: string, userId: string) {
    const budget = await this.budgetRepository.findOneByIdAndUserId(id, userId);
    if (!budget) throw new NotFoundException("Budget not found");

    const [monthlySpentResult] = await this.budgetRepository.getMonthlySpend(
      budget.userId,
      budget.categoryId,
      budget.month,
    );
    return {
      ...budget,
      spent: monthlySpentResult.total ?? "0",
    };
  }

  async create(userId: string, dto: CreateBudgetDto) {
    const existing = await this.budgetRepository.findOneByUserCategoryAndMonth(
      userId,
      dto.categoryId,
      dto.month,
    );

    if (existing) {
      throw new ConflictException(
        "A budget for this category and month already exists",
      );
    }

    // TODO: check category is of type expense
    const [budget] = await this.budgetRepository.create(
      userId,
      dto.categoryId,
      dto.amount,
      dto.month,
    );
    return budget;
  }

  async update(id: string, userId: string, dto: UpdateBudgetDto) {
    await this.findOne(id, userId);

    const [budget] = await this.budgetRepository.update(id, dto.amount);
    return budget;
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);
    await this.budgetRepository.delete(id);
  }
}
