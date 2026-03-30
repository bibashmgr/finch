import { format } from "date-fns";
import { Injectable } from "@nestjs/common";

import { notificationsTable } from "@/modules/db/schema";
import { MailService } from "@/modules/mail/mail.service";
import { UsersRepository } from "@/modules/user/user.respository";
import { BudgetRepository } from "@/modules/budget/budget.repository";
import { SettingRepository } from "@/modules/setting/setting.repository";
import { NotificationRepository } from "@/modules/notification/notification.repository";
import { TransactionWithCategory } from "@/modules/transaction/entities/transaction-with-category.type";

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly budgetRepository: BudgetRepository,
    private readonly settingRepository: SettingRepository,
    private readonly userRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}

  async findAll(
    filters: { userId: string },
    options: { limit?: number; page?: number },
  ) {
    return await this.notificationRepository.findAllByUserId(filters, options);
  }

  async markAllAsRead(userId: string) {
    return await this.notificationRepository.markAllAsReadByUserId(userId);
  }

  async markOneAsRead(id: string, userId: string) {
    return await this.notificationRepository.markOneAsReadByUserId(id, userId);
  }

  async checkBudgetAndNotify(transaction: TransactionWithCategory) {
    const month = new Date(transaction.issuedAt);
    month.setDate(1);
    month.setHours(0, 0, 0, 0);
    const monthString = format(month, "yyyy-MM-dd");

    const budget = await this.budgetRepository.findOneByUserCategoryAndMonth(
      transaction.userId,
      transaction.category.id,
      monthString,
    );
    if (!budget) return;

    const [monthlySpentResult] = await this.budgetRepository.getMonthlySpend(
      transaction.userId,
      transaction.category.id,
      monthString,
    );

    const spent = Number(monthlySpentResult?.total) ?? 0;

    const budgetAmount = Number(budget.amount);
    const percentUsed = (spent / budgetAmount) * 100;

    if (percentUsed >= 100) {
      await this.createAndDeliver(transaction.userId, {
        type: "budget_exceeded",
        title: "Oops! You’re Over Budget",
        body: `Your total spending in "${transaction.category.title}" category has gone beyond the limit you originally set for ${format(budget.month, "MMMM yyyy")}.`,
        budgetId: budget.id,
        categoryId: transaction.category.id,
        transactionId: transaction.id,
        data: {
          budgetAmount,
          spentAmount: spent,
          percentUsed,
          categoryTitle: transaction.category.title,
          budgetMonth: budget.month,
        },
      });
    }
  }

  private async createAndDeliver(
    userId: string,
    payload: Omit<typeof notificationsTable.$inferInsert, "userId">,
  ) {
    const [notification] = await this.notificationRepository.create({
      userId,
      ...payload,
    });

    const settings = await this.settingRepository.findOneByUserId(userId);
    if (!settings.budgetAlerts) return;

    const user = await this.userRepository.findOneById(settings.userId);
    if (!user) return;

    await Promise.allSettled([
      this.mailService.sendBudgetAlertMail(user.email, payload),
    ]);

    return notification;
  }
}
