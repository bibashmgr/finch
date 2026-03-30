export enum NotificationTypeEnum {
  BUDGET_EXCEEDED = "budget_exceeded",
  BUDGET_THRESHOLD = "budget_threshold",
  MONTHLY_SUMMARY = "monthly_summary",
  TIPS_ARCTICLE = "tips_article",
}

export type Notification = {
  id: string;
  userId: string;
  type: NotificationTypeEnum;
  title: string;
  body: string;
  data: string;
  categoryId: string | null;
  transactionId: string | null;
  budgetId: string | null;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
};
