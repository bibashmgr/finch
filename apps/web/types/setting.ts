export type Setting = {
  id: string;
  userId: string;
  currency: string;
  language: string;
  theme: string;
  budgetAlerts: boolean;
  tipsArticlesAlerts: boolean;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCurrencySettingInput = {
  currency: string;
};

export type UpdateLanguageSettingInput = {
  language: string;
};

export type UpdateThemeSettingInput = {
  theme: string;
};

export type UpdateNotificationSettingInput = {
  budgetAlerts: boolean;
  tipsArticlesAlerts: boolean;
};
