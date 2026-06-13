import type { AlbumRepository } from "@/repositories/prisma/album.repository.js";
import type {
  addToCollectionType,
  createAlbumType,
  updateAlbumType,
} from "@/types/album/album.js";
import type { AlbumServiceType } from "@/types/album/album.js";
import type { queryType } from "@/types/common/query.js";

export class AlbumService implements AlbumServiceType {
  constructor(private albumRepository: AlbumRepository) {}

  async getAlbum(id: string) {
    return await this.albumRepository.findById(id);
  }

  async getAlbums(data: queryType) {
    return await this.albumRepository.findAll(data);
  }

  async createAlbum(data: createAlbumType) {
    return await this.albumRepository.create(data);
  }

  async updateAlbum(id: string, data: updateAlbumType) {
    return await this.albumRepository.update(id, data);
  }

  async deleteAlbum(id: string) {
    return await this.albumRepository.remove(id);
  }

  async addToCollection(data: addToCollectionType) {
    return await this.albumRepository.addToCollection(data);
  }
}
