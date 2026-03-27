import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

import { CategoryTypeEnum } from "@/modules/category/entities/category-type.enum";

export class GetTransactionsDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;

  @IsString()
  @Matches(/^([a-zA-Z.]+:(asc|desc))(,[a-zA-Z.]+:(asc|desc))*$/)
  @IsOptional()
  sortBy?: string;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsEnum(CategoryTypeEnum)
  @IsOptional()
  type?: CategoryTypeEnum;
}
