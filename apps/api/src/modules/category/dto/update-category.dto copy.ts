import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @Length(1)
  @IsOptional()
  icon?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^#[0-9A-Fa-f]{6}$/)
  @IsOptional()
  color?: string;
}
