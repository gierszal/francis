import {
  addToAlbumSchema,
  addToPlaylistSchema,
  createTrackSchema,
  searchTrackSchema,
  trackParamsSchema,
  trackQuerySchema,
  updateTrackSchema,
} from "@/schemas/trackSchema.ts";

import { z } from "zod";

export type createTrackType = z.infer<typeof createTrackSchema>;
export type updateTrackType = z.infer<typeof updateTrackSchema>;
export type searchTrackType = z.infer<typeof searchTrackSchema>;
export type trackParamsType = z.infer<typeof trackParamsSchema>;
export type addToAlbumType = z.infer<typeof addToAlbumSchema>;
export type addToPlaylistType = z.infer<typeof addToPlaylistSchema>;
export type trackQueryType = z.infer<typeof trackQuerySchema>;
