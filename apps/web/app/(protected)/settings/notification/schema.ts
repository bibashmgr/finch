import z from "zod";

export const notificationSettingFormSchema = z.object({
  budgetAlerts: z.boolean(),
  tipsArticlesAlerts: z.boolean(),
});

export type NotificationSettingFormValues = z.infer<
  typeof notificationSettingFormSchema
>;
