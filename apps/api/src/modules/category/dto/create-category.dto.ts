import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

enum CategoryTypeEnum {
  income = "income",
  expense = "expense",
}

export class CreateCategoryDto {
  @IsEnum(CategoryTypeEnum)
  categoryType: CategoryTypeEnum;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  description: string;

  @IsString()
  @IsNotEmpty()
  @Length(1)
  icon: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^#[0-9A-Fa-f]{6}$/)
  color: string;
}
