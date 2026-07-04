import type { MultipartFile } from "@fastify/multipart";
import { z } from "zod";

export const createTrackSchema = z.object({
  name: z
    .string()
    .min(1, "The track name is not provided!")
    .max(100, "Too long track name"),
  artist: z
    .string()
    .min(1, "The artist name is not provided!")
    .max(100, "Too long artist name"),
  audio: z
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
        const allowedMimeTypes = ["audio/mpeg", "audio/wav", "audio/flac"];
        return allowedMimeTypes.includes(file.mimetype);
      },
      {
        message: "File format is not supported!",
      },
    ),
  albumId: z.uuid("Id is not valid!"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const updateTrackSchema = createTrackSchema.partial();

export const createTrackDocSchema = createTrackSchema
  .omit({ audio: true })
  .extend({
    audio: z.string(),
  });

export const updateTrackDocSchema = updateTrackSchema
  .omit({ audio: true })
  .extend({
    audio: z.string(),
  });

export const addToAlbumSchema = z.object({
  trackId: z.uuid("Id is not valid!"),
  albumId: z.uuid("Id is not valid!"),
});

export const addToPlaylistSchema = z.object({
  trackId: z.uuid("Id is not valid!"),
  playlistId: z.uuid("Id is not valid!"),
});

export const addToFavouritesSchema = z.object({
  trackId: z.uuid("Id is not valid"),
});
