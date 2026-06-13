import {
  createPlaylistSchema,
  playlistQuerySchema,
  updatePlaylistSchema,
} from "@/schemas/playlist.schema.ts";

import { z } from "zod";
import type { queryType } from "../common/query.js";

export type createPlaylistType = z.infer<typeof createPlaylistSchema>;
export type updatePlaylistType = z.infer<typeof updatePlaylistSchema>;

export type PlaylistServiceType = {
  getPlaylist: (id: string) => Promise<any>;
  getPlaylists: (data: queryType) => Promise<any>;
  createPlaylist: (data: createPlaylistType) => Promise<any>;
  updatePlaylist: (id: string, data: updatePlaylistType) => Promise<any>;
  deletePlaylist: (id: string) => Promise<any>;
};
