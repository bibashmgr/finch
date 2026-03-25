import { IsEnum, IsNumber, IsOptional } from "class-validator";

import { CategoryTypeEnum } from "../entities/category-type.enum";

export class GetCategoriesDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsEnum(CategoryTypeEnum)
  @IsOptional()
  type?: CategoryTypeEnum;
}
