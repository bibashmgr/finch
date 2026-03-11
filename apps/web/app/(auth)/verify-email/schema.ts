import z from "zod";

export const verifyEmailFormSchema = z.object({
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

export type VerifyEmailFormValues = z.infer<typeof verifyEmailFormSchema>;
