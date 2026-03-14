import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";

import { CategoryTypeEnum } from "../entities/category-type.enum";

export class CreateCategoryDto {
  @IsEnum(CategoryTypeEnum)
  type: CategoryTypeEnum;

  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  title: string;

  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsNotEmpty()
  @Length(1)
  icon: string;

  @IsString()
  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsNotEmpty()
  @Matches(/^#[0-9A-Fa-f]{6}$/)
  color: string;
}
