import { z } from "zod";

export const transactionFormSchema = z.object({
  type: z.string().nonempty({
    error: "Please select an option.",
  }),
  categoryId: z.string(),
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
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
