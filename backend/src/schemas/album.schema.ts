import { z } from "zod";

export const createAlbumSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
  source: z
    .string()
    .min(1, "The source name is not provided!")
    .max(100, "Too long source name"),
  description: z.string().min(1, "Description is required"),
});

export const searchAlbumSchema = z.object({
  searchQuery: z.string().max(1000, "Too long description").optional(),
  count: z.coerce.number().positive().default(10),
});

export const updateAlbumSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name")
    .optional(),
  source: z
    .string()
    .min(1, "The source name is not provided!")
    .max(100, "Too long source name")
    .optional(),
  description: z.string().min(1, "Description is required").optional(),
});

export const albumParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number!"),
});

export const addToCollectionSchema = z.object({
  albumID: z.string().regex(/^\d+$/, "ID must be a number!"),
  collectionID: z.string().regex(/^\d+$/, "ID must be a number!"),
});

export const albumQuerySchema = z.object({
  count: z.coerce.number().positive().default(10),
  offset: z.coerce.number().positive().default(0),
});
