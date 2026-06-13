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
  audio: z.string().min(1, "Audio is required"),
  albumId: z.string().min(1, "Album id is required"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export const updateTrackSchema = createTrackSchema.partial();

export const addToAlbumSchema = z.object({
  trackId: z.uuid("Id is not valid!"),
  albumId: z.uuid("Id is not valid!"),
});

export const addToPlaylistSchema = z.object({
  trackId: z.uuid("Id is not valid!"),
  playlistId: z.uuid("Id is not valid!"),
});

export const addToFavouritesSchema = z.object({
  trackId: z.uuid(),
});
