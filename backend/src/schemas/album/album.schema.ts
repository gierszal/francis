import type { MultipartFile } from "@fastify/multipart";
import { z } from "zod";

export const createAlbumSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
  description: z.string().min(1, "Description is required"),
  picture: z
    .custom<MultipartFile>(
      (file) => {
        return file !== undefined && file !== null;
      },
      {
        message: "Album picture is missing!",
      },
    )
    .refine(
      (file) => {
        const allowedMimeTypes = ["image/jpeg", "image/png"];
        return allowedMimeTypes.includes(file.mimetype);
      },
      {
        message: "File format is not supported!",
      },
    ),
  gameId: z.uuid("Game id is required"),
});

export const createAlbumDocSchema = createAlbumSchema
  .omit({ picture: true })
  .extend({
    picture: z.string(),
  });

export const updateAlbumSchema = createAlbumSchema.partial();

export const updateAlbumDocSchema = updateAlbumSchema
  .omit({ picture: true })
  .extend({
    picture: z.string(),
  });

export const addToCollectionSchema = z.object({
  albumId: z.uuid("Album id is required"),
  collectionId: z.uuid("Collection id is required"),
});
