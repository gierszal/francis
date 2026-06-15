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
  createPlaylist: (id: string, data: createPlaylistType) => Promise<any>;
  updatePlaylist: (id: string, data: updatePlaylistType) => Promise<any>;
  deletePlaylist: (id: string) => Promise<any>;
};

export type PlaylistRepositoryType = {
  findAll(options?: queryType): Promise<FindAllPlaylistsResponse>;
  findById(id: string): Promise<DetailedPlaylist | null>;
  create(id: string, data: createPlaylistType): Promise<FormattedPlaylist>;
  update(
    id: string,
    data: updatePlaylistType,
  ): Promise<FormattedPlaylist | null>;
  remove(id: string): Promise<FormattedPlaylist>;
};
