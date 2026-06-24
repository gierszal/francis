import { z } from "zod";

export const querySchema = z.object({
  searchQuery: z.string().max(1000, "Too long description").optional(),
  count: z.coerce.number().nonnegative().optional().default(10),
  offset: z.coerce.number().nonnegative().optional().default(0),
});
