import { z } from "zod";

export const createAlbumSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
  description: z.string().min(1, "Description is required"),
  picture: z.uuid("Picture is required"),
  gameId: z.uuid("Game id is required"),
});

export const updateAlbumSchema = createAlbumSchema.partial();

export const addToCollectionSchema = z.object({
  albumId: z.uuid("Album id is required"),
  collectionId: z.uuid("Collection id is required"),
});
