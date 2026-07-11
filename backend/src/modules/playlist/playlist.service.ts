import { ForbiddenError, NotFoundError } from "@/errors/ApiError.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import type { queryType } from "@/types/common/query.js";
import type {
  CreatePlaylistDTO,
  FormattedDetailedPlaylist,
  FormattedPlaylist,
  IPlaylistRepository,
  IPlaylistService,
  PlaylistsResponse,
  UpdatePlaylistDTO,
} from "@/types/playlist/index.js";
import type { FormattedUserPayload } from "@/types/user/user.model.js";
import {
  formatDetailedPlaylist,
  formatPlaylist,
} from "@/utils/formatters/playlist.formatter.js";

export class PlaylistService implements IPlaylistService {
  constructor(private playlistRepository: IPlaylistRepository) {}

  async getPlaylist(
    id: string,
    user: FormattedUserPayload,
  ): Promise<FormattedDetailedPlaylist | null> {
    const playlist = await this.playlistRepository.findById(id);
    if (!playlist)
      throw new NotFoundError(`Playlist with id ${id} was not found!`);
    if (playlist?.authorId !== user.id && user.role !== ROLES.ADMIN.name)
      throw new ForbiddenError("Access to playlist denied!");
    return formatDetailedPlaylist(playlist);
  }

  async getPlaylists(data: queryType): Promise<PlaylistsResponse> {
    const { count, offset } = data;
    const { playlists, total } = await this.playlistRepository.findAll(data);
    return {
      data: playlists.map((playlist) => formatPlaylist(playlist)),
      meta: {
        total,
        count,
        offset,
      },
    };
  }

  async createPlaylist(
    id: string,
    data: CreatePlaylistDTO,
  ): Promise<FormattedPlaylist> {
    const playlist = await this.playlistRepository.create(id, data);
    return formatPlaylist(playlist);
  }

  async updatePlaylist(
    id: string,
    user: FormattedUserPayload,
    data: UpdatePlaylistDTO,
  ): Promise<FormattedPlaylist> {
    const playlist = await this.playlistRepository.findById(id);
    if (playlist?.authorId !== user.id && user.role !== ROLES.ADMIN.name)
      throw new ForbiddenError("Access to playlist denied!");
    const updatedPlaylist = await this.playlistRepository.update(id, data);
    return formatPlaylist(updatedPlaylist);
  }

  async deletePlaylist(id: string, user: FormattedUserPayload): Promise<void> {
    const playlist = await this.playlistRepository.findById(id);
    if (playlist?.authorId !== user.id && user.role !== ROLES.ADMIN.name)
      throw new ForbiddenError("Access to playlist denied!");
    return await this.playlistRepository.remove(id);
  }
}
