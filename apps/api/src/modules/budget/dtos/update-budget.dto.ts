import { IsNumberString } from "class-validator";

export class UpdateBudgetDto {
  @IsNumberString()
  amount: string;
}
