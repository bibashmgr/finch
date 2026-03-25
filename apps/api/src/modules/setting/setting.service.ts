import { Injectable } from "@nestjs/common";

import { SettingRepository } from "@/modules/setting/setting.repository";
import { UpdateThemeSettingDto } from "@/modules/setting/dtos/update-theme-setting.dto";
import { UpdateCurrencySettingDto } from "@/modules/setting/dtos/update-currency-setting.dto";
import { UpdateLanguageSettingDto } from "@/modules/setting/dtos/update-language-setting.dto";
import { UpdateNotificationSettingDto } from "@/modules/setting/dtos/update-notification-setting.dto";

@Injectable()
export class SettingService {
  constructor(private readonly settingRepository: SettingRepository) {}

  async getMySettings(userId: string) {
    const userSetting = await this.settingRepository.findOneByUserId(userId);

    if (!userSetting) {
      return this.settingRepository.create({
        userId,
      });
    }

    return userSetting;
  }

  async updateCurrencySetting(
    userId: string,
    payload: UpdateCurrencySettingDto,
  ) {
    const userSetting = await this.settingRepository.findOneByUserId(userId);

    if (!userSetting) {
      return this.settingRepository.create({
        userId,
        currency: payload.currency,
      });
    }

    return this.settingRepository.update(userSetting.id, {
      currency: payload.currency,
    });
  }

  async updateLanguageSetting(
    userId: string,
    payload: UpdateLanguageSettingDto,
  ) {
    const userSetting = await this.settingRepository.findOneByUserId(userId);

    if (!userSetting) {
      return this.settingRepository.create({
        userId,
        language: payload.language,
      });
    }

    return this.settingRepository.update(userSetting.id, {
      language: payload.language,
    });
  }

  async updateThemeSetting(userId: string, payload: UpdateThemeSettingDto) {
    const userSetting = await this.settingRepository.findOneByUserId(userId);

    if (!userSetting) {
      return this.settingRepository.create({
        userId,
        theme: payload.theme,
      });
    }

    return this.settingRepository.update(userSetting.id, {
      theme: payload.theme,
    });
  }

  async updateNotificationSetting(
    userId: string,
    payload: UpdateNotificationSettingDto,
  ) {
    const userSetting = await this.settingRepository.findOneByUserId(userId);

    if (!userSetting) {
      return this.settingRepository.create({
        userId,
        budgetAlerts: payload.budgetAlerts,
        tipsArticlesAlerts: payload.tipsArticlesAlerts,
      });
    }

    return this.settingRepository.update(userSetting.id, {
      budgetAlerts: payload.budgetAlerts,
      tipsArticlesAlerts: payload.tipsArticlesAlerts,
    });
  }
}
