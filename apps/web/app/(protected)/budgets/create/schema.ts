import z from "zod";

export const budgetCreateFormSchema = z
  .object({
    categoryId: z.string().nonempty({
      error: "Please select an option.",
    }),
    amount: z.string().nonempty({
      error: "Please enter an amount.",
    }),
    month: z.date().nullable(),
  })
  .superRefine((values, ctx) => {
    if (!values.month) {
      ctx.addIssue({
        code: "custom",
        path: ["month"],
        message: "Please select a month",
      });
    }
  });

export type BudgetCreateFormValues = z.infer<typeof budgetCreateFormSchema>;
