import z from "zod";

const loginWithEmailFormSchema = z.object({
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

type LoginWithEmailFormValues = z.infer<typeof loginWithEmailFormSchema>;

type LoginWithEmailInput = LoginWithEmailFormValues;

const verifyEmailFormSchema = z.object({
  code: z
    .string({
      error: "Please enter verification code",
    })
    .nonempty({
      error: "Please enter verification code",
    })
    .length(6, {
      error: "Verification code must be 6 characters long",
    }),
});

type VerifyEmailFormValues = z.infer<typeof verifyEmailFormSchema>;

const verifyEmailInputSchema = z.object({
  email: z.string(),
  code: z.string(),
});

type VerifyEmailInput = z.infer<typeof verifyEmailInputSchema>;

export {
  loginWithEmailFormSchema,
  type LoginWithEmailFormValues,
  type LoginWithEmailInput,
  verifyEmailFormSchema,
  type VerifyEmailFormValues,
  verifyEmailInputSchema,
  type VerifyEmailInput,
};
