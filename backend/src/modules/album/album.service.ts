import type { AlbumRepository } from "@/repositories/prisma/album.repository.js";
import { FileService, FileType } from "@/services/fileService.js";
import type {
  addToCollectionType,
  AlbumRepositoryType,
  createAlbumType,
  updateAlbumType,
} from "@/types/album/album.js";
import type { AlbumServiceType } from "@/types/album/album.js";
import type { queryType } from "@/types/common/query.js";
import type { MultipartFile } from "@fastify/multipart";

export class AlbumService implements AlbumServiceType {
  constructor(
    private albumRepository: AlbumRepositoryType,
    private fileService: FileService,
  ) {}

  async getAlbum(id: string) {
    return await this.albumRepository.findById(id);
  }

  async getAlbums(data: queryType) {
    return await this.albumRepository.findAll(data);
  }

  async createAlbum(data: createAlbumType, pic: MultipartFile) {
    let picPath; // если удалить придется
    try {
      const picturePath = await this.fileService.createFile(
        FileType.IMAGE,
        pic,
      );
      picPath = picturePath;
      return await this.albumRepository.create(data, picturePath);
    } catch (err) {
      if (picPath) await this.fileService.removeFile(picPath);
      throw err;
    }
  }

  async updateAlbum(id: string, data: updateAlbumType, pic?: MultipartFile) {
    let picPath; // если удалить придется
    try {
      if (pic) {
        const album = await this.albumRepository.findById(id);
        await this.fileService.removeFile(album?.picture);
        const picturePath = await this.fileService.createFile(
          FileType.IMAGE,
          pic,
        );
        picPath = picturePath;
      }
      return await this.albumRepository.update(id, data, picPath);
    } catch (err) {
      if (picPath) await this.fileService.removeFile(picPath);
      throw err;
    }
  }

  async deleteAlbum(id: string) {
    return await this.albumRepository.remove(id);
  }

  async addToCollection(data: addToCollectionType) {
    return await this.albumRepository.addToCollection(data);
  }
}
