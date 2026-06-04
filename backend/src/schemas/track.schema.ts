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
  picture: z.string().min(1, "Picture is required"),
  audio: z.string().min(1, "Audio is required"),
});

export const updateTrackSchema = createTrackSchema.partial();

export const addToAlbumSchema = z.object({
  trackID: z.uuid("D is not valid!"),
  albumID: z.uuid("ID is not valid!"),
});

export const addToPlaylistSchema = z.object({
  trackID: z.uuid("ID is not valid!"),
  playlistID: z.uuid("ID is not valid!"),
});

export const addToFavouritesSchema = z.object({
  trackID: z.uuid(),
});
