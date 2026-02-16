import z from "zod";

export const themeSettingFormSchema = z.object({
  mode: z.string().nonempty({
    error: "Please select an option.",
  }),
});

export type ThemeSettingFormValues = z.infer<typeof themeSettingFormSchema>;

export const currencySettingFormSchema = z.object({
  code: z.string().nonempty({
    error: "Please select an option.",
  }),
});

export type CurrencySettingFormValues = z.infer<
  typeof currencySettingFormSchema
>;

export const languageSettingFormSchema = z.object({
  code: z.string().nonempty({
    error: "Please select an option.",
  }),
});

export type LanguageSettingFormValues = z.infer<
  typeof languageSettingFormSchema
>;

export const notificationSettingFormSchema = z.object({
  budget: z.boolean(),
  tipsAndArticles: z.boolean(),
});

export type NotificationSettingFormValues = z.infer<
  typeof notificationSettingFormSchema
>;
