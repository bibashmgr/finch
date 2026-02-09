import z from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  avatarUrl: z.string().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

type User = z.infer<typeof userSchema>;

export { userSchema, type User };
