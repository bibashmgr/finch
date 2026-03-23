import { CategoryTypeEnum } from "@/types/category";

export type Budget = {
  id: string;
  categoryId: string;
  userId: string;
  amount: string;
  month: string;
  createdAt: string;
  updatedAt: string;
};

export type BudgetWithCategory = Omit<Budget, "categoryId"> & {
  category: {
    id: string;
    type: CategoryTypeEnum;
    title: string;
    icon: string;
    color: string;
  };
};

export type BudgetWithCategoryAndSpent = Omit<Budget, "categoryId"> & {
  spent: string;
  category: {
    id: string;
    type: CategoryTypeEnum;
    title: string;
    icon: string;
    color: string;
  };
};

export type BudgetCreateInput = {
  categoryId: string;
  amount: string;
  month: string;
};

export type BudgetUpdateInput = {
  id: string;
  body: {
    amount: string;
  };
};
