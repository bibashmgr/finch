import { Body, Controller, Get, Patch } from "@nestjs/common";

import { usersTable } from "@/modules/db/schema";
import { SettingService } from "@/modules/setting/setting.service";
import { CurrentUser } from "@/modules/auth/decorators/current-user.decorator";
import { UpdateThemeSettingDto } from "@/modules/setting/dtos/update-theme-setting.dto";
import { UpdateCurrencySettingDto } from "@/modules/setting/dtos/update-currency-setting.dto";
import { UpdateLanguageSettingDto } from "@/modules/setting/dtos/update-language-setting.dto";
import { UpdateNotificationSettingDto } from "@/modules/setting/dtos/update-notification-setting.dto";

@Controller("settings")
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  getMySettings(@CurrentUser() currentUser: typeof usersTable.$inferSelect) {
    return this.settingService.getMySettings(currentUser.id);
  }

  @Patch("currency")
  updateCurrencySetting(
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
    @Body() dto: UpdateCurrencySettingDto,
  ) {
    return this.settingService.updateCurrencySetting(currentUser.id, dto);
  }

  @Patch("language")
  updateLanguageSetting(
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
    @Body() dto: UpdateLanguageSettingDto,
  ) {
    return this.settingService.updateLanguageSetting(currentUser.id, dto);
  }

  @Patch("theme")
  updateThemeSetting(
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
    @Body() dto: UpdateThemeSettingDto,
  ) {
    return this.settingService.updateThemeSetting(currentUser.id, dto);
  }

  @Patch("notification")
  updateNotificationSetting(
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
    @Body() dto: UpdateNotificationSettingDto,
  ) {
    return this.settingService.updateNotificationSetting(currentUser.id, dto);
  }
}
