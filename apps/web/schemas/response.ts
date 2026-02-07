import z from "zod";

export const apiErrorResponseSchema = z.object({
  message: z.string(),
  error: z.string(),
  statusCode: z.number(),
});

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

export const emptyResponseSchema = z.object({
  message: z.string(),
});

export type EmptyResponse = z.infer<typeof emptyResponseSchema>;
