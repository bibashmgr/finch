import { z } from "zod";

export const transactionCreateFormSchema = z
  .object({
    categoryId: z.string().nonempty({
      error: "Please select an option.",
    }),
    amount: z.string().nonempty({
      error: "Please enter an amount.",
    }),
    notes: z.string().nonempty({
      error: "Please enter notes.",
    }),
    paymentMethod: z.string().nonempty({
      error: "Please select an option.",
    }),
    attachments: z.array(z.string()),
    issuedAt: z.date().nullable(),
  })
  .superRefine((values, ctx) => {
    if (!values.issuedAt) {
      ctx.addIssue({
        code: "custom",
        path: ["issuedAt"],
        message: "Please select a date",
      });
    }
  });

export type TransactionCreateFormValues = z.infer<
  typeof transactionCreateFormSchema
>;
