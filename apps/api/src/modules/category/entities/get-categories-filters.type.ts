import { CategoryTypeEnum } from "./category-type.enum";

export type GetCategoriesFilters = {
  userId?: string;
  type?: CategoryTypeEnum;
};
