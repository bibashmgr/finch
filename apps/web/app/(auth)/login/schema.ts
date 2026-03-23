import z from "zod";

export const loginWithEmailFormSchema = z.object({
  email: z
    .string({
      error: "Please enter an email address",
    })
    .nonempty({
      error: "Please enter an email address",
    })
    .refine(
      (value) => /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value),
      {
        error: "Please enter a valid email address",
      },
    ),
});

export type LoginWithEmailFormValues = z.infer<typeof loginWithEmailFormSchema>;
