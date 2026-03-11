import z from "zod";

export const currencySettingFormSchema = z.object({
  code: z.string().nonempty({
    error: "Please select an option.",
  }),
});

export type CurrencySettingFormValues = z.infer<
  typeof currencySettingFormSchema
>;
