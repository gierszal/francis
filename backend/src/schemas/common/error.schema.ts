// export const errorDetailsSchema = {
//   type: "object",
//   additionalProperties: true,
// };

import z from "zod";

export const errorDetailsSchema = z.record(z.string(), z.unknown());

export const errorPayloadSchema = z.object({
  message: z.string(),
  details: errorDetailsSchema.optional(),
});

export const errorResponseSchema = z.object({
  error: errorPayloadSchema,
});
