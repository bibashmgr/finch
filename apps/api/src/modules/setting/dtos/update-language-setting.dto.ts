import { IsIn, IsNotEmpty, IsString } from "class-validator";

import { languageEnum } from "@/modules/db/schema";

export class UpdateLanguageSettingDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(languageEnum.enumValues)
  language: (typeof languageEnum.enumValues)[number];
}
