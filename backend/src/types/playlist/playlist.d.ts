import {
  createPlaylistSchema,
  playlistParamsSchema,
  playlistQuerySchema,
  searchPlaylistSchema,
  updatePlaylistSchema,
} from "@/schemas/playlistSchema.ts";

import { z } from "zod";

export type createPlaylistType = z.infer<typeof createPlaylistSchema>;
export type updatePlaylistType = z.infer<typeof updatePlaylistSchema>;
export type searchPlaylistType = z.infer<typeof searchPlaylistSchema>;
export type playlistParamsType = z.infer<typeof playlistParamsSchema>;
export type playlistQueryType = z.infer<typeof playlistQuerySchema>;
