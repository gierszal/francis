import { z } from "zod";

export const createCollectionSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
});

export const searchCollectionSchema = z.object({
  searchQuery: z.string().max(1000, "Too long description").optional(),
  count: z.coerce.number().positive().default(10),
});

export const updateCollectionSchema = createCollectionSchema.partial();

export const collectionParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number!"),
});

export const collectionQuerySchema = z.object({
  count: z.coerce.number().positive().default(10),
  offset: z.coerce.number().positive().default(0),
});
