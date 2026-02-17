import { IsBoolean } from "class-validator";

export class UpdateNotificationSettingDto {
  @IsBoolean()
  budgetAlerts: boolean;

  @IsBoolean()
  tipsArticlesAlerts: boolean;
}
