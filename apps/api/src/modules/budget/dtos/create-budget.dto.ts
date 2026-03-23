import { IsUUID, IsNumberString, IsDateString } from "class-validator";

import { IsFirstDayOfMonth } from "@/modules/common/validators/is-first-day-of-month.validator";

export class CreateBudgetDto {
  @IsUUID()
  categoryId: string;

  @IsNumberString()
  amount: string;

  @IsDateString()
  @IsFirstDayOfMonth()
  month: string;
}
