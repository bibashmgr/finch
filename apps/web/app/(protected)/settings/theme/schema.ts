import z from "zod";

export const themeSettingFormSchema = z.object({
  mode: z.string().nonempty({
    error: "Please select an option.",
  }),
});

export type ThemeSettingFormValues = z.infer<typeof themeSettingFormSchema>;
