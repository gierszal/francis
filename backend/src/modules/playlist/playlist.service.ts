import { PlaylistRepository } from "@/repositories/prisma/playlist.repository.js";
import type { queryType } from "@/types/common/query.js";
import type {
  createPlaylistType,
  PlaylistServiceType,
  updatePlaylistType,
} from "@/types/playlist/playlist.js";

export class PlaylistService implements PlaylistServiceType {
  constructor(private playlistRepository: PlaylistRepository) {}

  async getPlaylist(id: string) {
    return await this.playlistRepository.findById(id);
  }

  async getPlaylists(data: queryType) {
    return await this.playlistRepository.findAll(data);
  }

  async createPlaylist(data: createPlaylistType) {
    return await this.playlistRepository.create(data);
  }

  async updatePlaylist(id: string, data: updatePlaylistType) {
    return await this.playlistRepository.update(id, data);
  }

  async deletePlaylist(id: string) {
    return await this.playlistRepository.remove(id);
  }
}
