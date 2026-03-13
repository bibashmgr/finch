import z from "zod";

export const categoryFormSchema = z.object({
  categoryType: z.string().nonempty({
    error: "Please select an option.",
  }),
  title: z
    .string()
    .nonempty({
      error: "Please enter title.",
    })
    .min(2, {
      error: "Title must be at least 2 characters long.",
    })
    .max(20, {
      error: "Title must not be longer than 20 characters.",
    }),
  description: z
    .string()
    .nonempty({
      error: "Please enter description.",
    })
    .min(10, {
      error: "Description must be at least 10 characters long.",
    })
    .max(255, {
      error: "Description must not be longer than 255 characters.",
    }),
  icon: z.string().nonempty({
    error: "Please choose an icon.",
  }),
  color: z
    .string()
    .nonempty({ error: "Please choose a color." })
    .regex(/^#[0-9A-Fa-f]{6}$/, "Color is invalid"),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
