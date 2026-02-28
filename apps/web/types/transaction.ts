export enum TransactionTypeEnum {
  INCOME = "income",
  EXPENSE = "expense",
}

export type Transaction = {
  id: string;
  userId: string;
  type: TransactionTypeEnum;
  categoryId: string;
  currency: string;
  amount: number;
  notes: string;
  paymentMethod: string;
  attachments: string[];
  issuedAt: string;
  createdAt: string;
  updatedAt: string;
};
