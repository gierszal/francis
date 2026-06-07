import { PlaylistRepository } from "@/repositories/prisma/playlist.repository.js";
import type { PlaylistServiceType } from "@/types/playlist/playlist.js";

export class PlaylistService implements PlaylistServiceType {
  constructor(private playlistRepository: PlaylistRepository) {}
  private playlists: Map<string, any> = new Map();

  async getPlaylist(id: string) {
    console.log(`[PLAYLIST SERVICE] Getting playlist: ${id}`);
    const playlist = this.playlists.get(id);
    if (!playlist) {
      return { id, name: "Mock Playlist", tracks: [], createdAt: new Date() };
    }
    return playlist;
  }

  async getPlaylists(
    searchQuery?: string,
    count: number = 10,
    offset: number = 0,
  ) {
    console.log(
      `[PLAYLIST SERVICE] Getting playlists: count=${count}, offset=${offset}`,
    );
    const allPlaylists = Array.from(this.playlists.values());
    const paginated = allPlaylists.slice(offset, offset + count);
    return {
      playlists: paginated.length
        ? paginated
        : [
            { id: "1", name: "Favorites", tracks: [] },
            { id: "2", name: "Chill Vibes", tracks: [] },
          ],
      total: allPlaylists.length || 2,
      count,
      offset,
    };
  }

  async createPlaylist(data: any) {
    console.log(`[PLAYLIST SERVICE] Creating playlist:`, data);
    const id = `playlist-${Date.now()}`;
    const playlist = {
      id,
      ...data,
      tracks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.playlists.set(id, playlist);
    return playlist;
  }

  async updatePlaylist(data: any) {
    console.log(`[PLAYLIST SERVICE] Updating playlist:`, data);
    const { id, ...updateData } = data;
    const existing = this.playlists.get(id) || { id, tracks: [] };
    const updated = {
      ...existing,
      ...updateData,
      updatedAt: new Date(),
    };
    this.playlists.set(id, updated);
    return updated;
  }

  async searchPlaylist(searchQuery: string = "", count: number = 10) {
    console.log(`[PLAYLIST SERVICE] Searching playlists: "${searchQuery}"`);
    const results = Array.from(this.playlists.values())
      .filter((playlist) =>
        playlist.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .slice(0, count);

    if (results.length === 0 && searchQuery) {
      return {
        results: [
          {
            id: "mock",
            name: `Playlist matching "${searchQuery}"`,
            tracks: [],
          },
        ],
        searchQuery,
        count,
      };
    }

    return { results, searchQuery, count };
  }

  async deletePlaylist(id: string) {
    console.log(`[PLAYLIST SERVICE] Deleting playlist: ${id}`);
    const deleted = this.playlists.delete(id);
    return { success: deleted || true, id };
  }
}
