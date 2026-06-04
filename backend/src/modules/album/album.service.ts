import type { AlbumRepository } from "@/repositories/prisma/album.repository.js";
import type { createAlbumType, updateAlbumType } from "@/types/album/album.js";

export class AlbumService implements albumServiceType {
  constructor(private albumRepository: AlbumRepository) {}
  async getAlbum(id: string) {
    console.log(`Getting album: ${id}`);
    return { id, name: "Mock Album" };
  }

  async getAlbums(count = 10, offset = 0) {
    return { albums: [], total: 0, count, offset };
  }

  async createAlbum(data: createAlbumType) {
    return { id: "123", ...data };
  }

  async updateAlbum(id: string, data: updateAlbumType) {
    return { id, ...data };
  }

  async searchAlbum(searchQuery = "", count = 10) {
    return { results: [], searchQuery, count };
  }

  async deleteAlbum(id: string) {
    return { success: true, id };
  }

  async addToCollection(albumID: string, collectionID: string) {
    return { success: true, albumID, collectionID };
  }
}

export type albumServiceType = InstanceType<typeof AlbumService>;
