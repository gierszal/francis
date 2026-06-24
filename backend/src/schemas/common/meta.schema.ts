import z from "zod";

export const metaSchema = z.object({
  total: z.number(),
  count: z.number(),
  offset: z.number(),
});
