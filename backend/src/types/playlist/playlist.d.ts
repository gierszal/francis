import {
  createPlaylistSchema,
  playlistQuerySchema,
  updatePlaylistSchema,
} from "@/schemas/playlist.schema.ts";

import { z } from "zod";

export type createPlaylistType = z.infer<typeof createPlaylistSchema>;
export type updatePlaylistType = z.infer<typeof updatePlaylistSchema>;

export type PlaylistServiceType = {
  getPlaylist: (id: string) => Promise<any>;
  getPlaylists: (
    searchQuery?: string,
    count?: number,
    offset?: number,
  ) => Promise<any>;
  createPlaylist: (data: any) => Promise<any>;
  updatePlaylist: (data: any) => Promise<any>;
  deletePlaylist: (id: string) => Promise<any>;
};
