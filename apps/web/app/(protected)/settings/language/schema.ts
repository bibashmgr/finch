import z from "zod";

export const languageSettingFormSchema = z.object({
  code: z.string().nonempty({
    error: "Please select an option.",
  }),
});

export type LanguageSettingFormValues = z.infer<
  typeof languageSettingFormSchema
>;
