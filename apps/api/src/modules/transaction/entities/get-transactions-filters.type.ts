import { CategoryTypeEnum } from "@/modules/category/entities/category-type.enum";

export type GetTransactionsFilters = {
  userId?: string;
  startDate?: string;
  endDate?: string;
  type?: CategoryTypeEnum;
};
