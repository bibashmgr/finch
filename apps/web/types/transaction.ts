import { Category, CategoryTypeEnum } from "./category";

export type Transaction = {
  id: string;
  userId: string;
  categoryId: string;
  currency: string;
  amount: string;
  notes: string;
  paymentMethod: string;
  issuedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type TransactionWithCategory = Omit<Transaction, "categoryId"> & {
  category: {
    id: string;
    type: CategoryTypeEnum;
    title: string;
    icon: string;
    color: string;
  };
};

export type TransactionWithAttachment = Transaction & {
  attachments: string[];
};

export type TransactionWithDetails = Transaction & {
  category: Category;
  attachments: TransactionAttachment[];
};

export type TransactionCreateInput = {
  categoryId: string;
  amount: string;
  notes: string;
  paymentMethod: string;
  attachments?: string[];
  issuedAt: string;
};

export type TransactionUpdateInput = {
  id: string;
  body: TransactionCreateInput;
};

export type TransactionAttachment = {
  id: string;
  tranactionId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
};
