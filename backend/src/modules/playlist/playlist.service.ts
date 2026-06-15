import type { queryType } from "@/types/common/query.js";
import type {
  createPlaylistType,
  PlaylistRepositoryType,
  PlaylistServiceType,
  updatePlaylistType,
} from "@/types/playlist/playlist.js";

export class PlaylistService implements PlaylistServiceType {
  constructor(private playlistRepository: PlaylistRepositoryType) {}

  async getPlaylist(id: string) {
    return await this.playlistRepository.findById(id);
  }

  async getPlaylists(data: queryType) {
    return await this.playlistRepository.findAll(data);
  }

  async createPlaylist(id: string, data: createPlaylistType) {
    return await this.playlistRepository.create(id, data);
  }

  async updatePlaylist(id: string, data: updatePlaylistType) {
    return await this.playlistRepository.update(id, data);
  }

  async deletePlaylist(id: string) {
    return await this.playlistRepository.remove(id);
  }
}
