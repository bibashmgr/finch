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
      (value) =>
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i.test(
          value,
        ),
      {
        error: "Please enter a valid email address",
      },
    ),
});

export type LoginWithEmailFormValues = z.infer<typeof loginWithEmailFormSchema>;
