import {
  addToAlbumSchema,
  addToPlaylistSchema,
  createTrackSchema,
  updateTrackSchema,
} from "@/schemas/track/track.schema.js";
import { z } from "zod";

export type CreateTrackDTO = z.infer<typeof createTrackSchema>;
export type UpdateTrackDTO = z.infer<typeof updateTrackSchema>;
export type AddToAlbumDTO = z.infer<typeof addToAlbumSchema>;
export type AddToPlaylistDTO = z.infer<typeof addToPlaylistSchema>;
