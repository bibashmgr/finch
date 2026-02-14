import z from "zod";

const profileUpdateFormSchema = z.object({
  name: z
    .string()
    .nonempty({
      error: "Please enter your name.",
    })
    .min(2, {
      error: "Name must be at least 2 characters long.",
    })
    .max(25, {
      error: "Name must not have more than 25 characters.",
    }),
  avatarUrl: z.string().optional(),
});

type ProfileUpdateFormValues = z.infer<typeof profileUpdateFormSchema>;

export { profileUpdateFormSchema, type ProfileUpdateFormValues };
