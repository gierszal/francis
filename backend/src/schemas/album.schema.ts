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

export const updateAlbumSchema = createAlbumSchema.partial();

export const addToCollectionSchema = z.object({
  albumID: z.string().regex(/^\d+$/, "ID must be a number!"),
  collectionID: z.string().regex(/^\d+$/, "ID must be a number!"),
});
