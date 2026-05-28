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

export const searchTrackSchema = z.object({
  searchQuery: z.string().max(1000, "Too long description").optional(),
  count: z.coerce.number().positive().default(10),
});

export const updateTrackSchema = z.object({
  name: z
    .string()
    .min(1, "The track name is not provided!")
    .max(100, "Too long track name")
    .optional(),
  artist: z
    .string()
    .min(1, "The track name is not provided!")
    .max(100, "Too long track name")
    .optional(),
  picture: z.string().min(1, "Picture is required").optional(),
  audio: z.string().min(1, "Audio is required").optional(),
});

export const trackParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be a number!"),
});

export const addToAlbumSchema = z.object({
  trackID: z.string().regex(/^\d+$/, "ID must be a number!"),
  albumID: z.string().regex(/^\d+$/, "ID must be a number!"),
});

export const addToPlaylistSchema = z.object({
  trackID: z.string().regex(/^\d+$/, "ID must be a number!"),
  playlistID: z.string().regex(/^\d+$/, "ID must be a number!"),
});

export const trackQuerySchema = z.object({
  count: z.coerce.number().positive().default(10),
  offset: z.coerce.number().positive().default(0),
});
