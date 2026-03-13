import { IsNumber, IsOptional } from "class-validator";

export class GetCategoriesDto {
  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;
}
