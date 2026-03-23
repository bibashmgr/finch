import { IsDateString, IsNumber, IsOptional } from "class-validator";

import { IsFirstDayOfMonth } from "@/modules/common/validators/is-first-day-of-month.validator";

export class GetBudgetsDto {
  @IsDateString()
  @IsFirstDayOfMonth()
  month: string;

  @IsNumber()
  @IsOptional()
  limit?: number;

  @IsNumber()
  @IsOptional()
  page?: number;
}
