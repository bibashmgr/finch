import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
} from "@nestjs/common";

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
  @HttpCode(HttpStatus.OK)
  getMySettings(@CurrentUser() currentUser: typeof usersTable.$inferSelect) {
    return this.settingService.getMySettings(currentUser.id);
  }

  @Patch("currency")
  @HttpCode(HttpStatus.OK)
  updateCurrencySetting(
    @Body() dto: UpdateCurrencySettingDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.settingService.updateCurrencySetting(currentUser.id, dto);
  }

  @Patch("language")
  @HttpCode(HttpStatus.OK)
  updateLanguageSetting(
    @Body() dto: UpdateLanguageSettingDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.settingService.updateLanguageSetting(currentUser.id, dto);
  }

  @Patch("theme")
  @HttpCode(HttpStatus.OK)
  updateThemeSetting(
    @Body() dto: UpdateThemeSettingDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.settingService.updateThemeSetting(currentUser.id, dto);
  }

  @Patch("notification")
  @HttpCode(HttpStatus.OK)
  updateNotificationSetting(
    @Body() dto: UpdateNotificationSettingDto,
    @CurrentUser() currentUser: typeof usersTable.$inferSelect,
  ) {
    return this.settingService.updateNotificationSetting(currentUser.id, dto);
  }
}
