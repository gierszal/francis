import type { Playlist } from "@/generated/prisma/client.js";
import type { queryType } from "../common/query.js";
import type {
  CreatePlaylistDTO,
  FindAllPlaylistsResult,
  FormattedDetailedPlaylist,
  FormattedPlaylist,
  PlaylistsResponse,
  UpdatePlaylistDTO,
} from "./index.js";

export interface IPlaylistService {
  getPlaylist(
    id: string,
    userId: string,
  ): Promise<FormattedDetailedPlaylist | null>;

  getPlaylists(data: queryType): Promise<PlaylistsResponse>;

  createPlaylist(
    id: string,
    data: CreatePlaylistDTO,
  ): Promise<FormattedPlaylist>;

  updatePlaylist(
    id: string,
    userId: string,
    data: UpdatePlaylistDTO,
  ): Promise<FormattedPlaylist | null>;

  deletePlaylist(id: string, userId: string): Promise<void>;
}

export interface IPlaylistRepository {
  findAll(options?: queryType): Promise<FindAllPlaylistsResult>;

  findById(id: string): Promise<Playlist | null>;

  create(id: string, data: CreatePlaylistDTO): Promise<Playlist>;

  update(id: string, data: UpdatePlaylistDTO): Promise<Playlist>;

  remove(id: string): Promise<void>;
}
