import { z } from "zod";
import { emptyResultToUndefined } from "../common";

export const createAlbumSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
  description: z.string().min(1, "Description is required"),
  picture: z
    .custom<File>(
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
        return allowedMimeTypes.includes(file.type);
      },
      {
        message: "File format is not supported!",
      },
    ),
  gameId: z.uuid("Game id is required"),
});

export const updateAlbumSchema = z.object({
  name: emptyResultToUndefined(
    z.string().min(1, "The name is not provided!").max(100, "Too long name"),
  ),
  description: emptyResultToUndefined(
    z.string().min(1, "Description is required"),
  ),
  picture: emptyResultToUndefined(
    z
      .custom<File>(
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
          return allowedMimeTypes.includes(file.type);
        },
        {
          message: "File format is not supported!",
        },
      ),
  ),
  gameId: emptyResultToUndefined(z.uuid("Game id is required")),
});

export const addToCollectionSchema = z.object({
  albumId: z.uuid("Album id is required"),
  collectionId: z.uuid("Collection id is required"),
});
