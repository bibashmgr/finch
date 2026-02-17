import { IsIn, IsNotEmpty, IsString } from "class-validator";

import { themeEnum } from "@/modules/db/schema";

export class UpdateThemeSettingDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(themeEnum.enumValues)
  theme: (typeof themeEnum.enumValues)[number];
}
