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

export { loginWithEmailFormSchema, type LoginWithEmailFormValues };
