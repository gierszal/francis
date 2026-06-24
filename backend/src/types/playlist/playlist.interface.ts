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
import type { FormattedUserPayload } from "../user/user.model.js";

export interface IPlaylistService {
  getPlaylist(
    id: string,
    user: FormattedUserPayload,
  ): Promise<FormattedDetailedPlaylist | null>;

  getPlaylists(data: queryType): Promise<PlaylistsResponse>;

  createPlaylist(
    id: string,
    data: CreatePlaylistDTO,
  ): Promise<FormattedPlaylist>;

  updatePlaylist(
    id: string,
    user: FormattedUserPayload,
    data: UpdatePlaylistDTO,
  ): Promise<FormattedPlaylist | null>;

  deletePlaylist(id: string, user: FormattedUserPayload): Promise<void>;
}

export interface IPlaylistRepository {
  findAll(options?: queryType): Promise<FindAllPlaylistsResult>;

  findById(id: string): Promise<Playlist | null>;

  create(id: string, data: CreatePlaylistDTO): Promise<Playlist>;

  update(id: string, data: UpdatePlaylistDTO): Promise<Playlist>;

  remove(id: string): Promise<void>;
}
