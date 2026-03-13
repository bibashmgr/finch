export enum CategoryTypeEnum {
  INCOME = "income",
  EXPENSE = "expense",
}

export type Category = {
  id: string;
  userId: string;
  categoryType: CategoryTypeEnum;
  title: string;
  description: string;
  icon: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryCreateInput = {
  categoryType: string;
  title: string;
  description: string;
  icon: string;
  color: string;
};

export type CategoryUpdateInput = {
  id: string;
  body: {
    title: string;
    description: string;
    icon: string;
    color: string;
  };
};
