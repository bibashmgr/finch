import z from "zod";

export const categoryFormSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
