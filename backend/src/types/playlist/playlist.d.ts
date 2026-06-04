import {
  createPlaylistSchema,
  playlistParamsSchema,
  playlistQuerySchema,
  searchPlaylistSchema,
  updatePlaylistSchema,
} from "@/schemas/playlist.schema.ts";

import { z } from "zod";

export type createPlaylistType = z.infer<typeof createPlaylistSchema>;
export type updatePlaylistType = z.infer<typeof updatePlaylistSchema>;
export type searchPlaylistType = z.infer<typeof searchPlaylistSchema>;
export type playlistParamsType = z.infer<typeof playlistParamsSchema>;
export type playlistQueryType = z.infer<typeof playlistQuerySchema>;

export type PlaylistServiceType = {
  getPlaylist: (id: string) => Promise<any>;
  getPlaylists: (count?: number, offset?: number) => Promise<any>;
  createPlaylist: (data: any) => Promise<any>;
  updatePlaylist: (data: any) => Promise<any>;
  searchPlaylist: (searchQuery?: string, count?: number) => Promise<any>;
  deletePlaylist: (id: string) => Promise<any>;
};
