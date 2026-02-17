import { IsIn, IsNotEmpty, IsString } from "class-validator";

import { currencyEnum } from "@/modules/db/schema";

export class UpdateCurrencySettingDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(currencyEnum.enumValues)
  currency: (typeof currencyEnum.enumValues)[number];
}
