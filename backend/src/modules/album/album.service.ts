import { NotFoundError } from "@/errors/ApiError.js";
import { FileService, FileType } from "@/services/fileService.js";
import type {
  AddToCollectionDTO,
  AlbumsResponse,
  CreateAlbumDTO,
  IAlbumRepository,
  IAlbumService,
  UpdateAlbumDTO,
  FormattedAlbum,
  FormattedDetailedAlbum,
  RemoveFromCollectionDTO,
} from "@/types/album/index.js";
import type { queryType } from "@/types/common/query.js";
import {
  formatAlbum,
  formatDetailedAlbum,
} from "@/utils/formatters/album.formatter.js";
import type { MultipartFile } from "@fastify/multipart";

export class AlbumService implements IAlbumService {
  constructor(
    private albumRepository: IAlbumRepository,
    private fileService: FileService,
  ) {}

  async getAlbum(id: string): Promise<FormattedDetailedAlbum | null> {
    const album = await this.albumRepository.findById(id);
    if (!album) throw new NotFoundError(`Album with id ${id} was not found!`);
    return formatDetailedAlbum(album);
  }

  async getAlbums(options: queryType): Promise<AlbumsResponse> {
    const { albums, total } = await this.albumRepository.findAll(options);
    const { count, offset } = options;
    return {
      data: albums.map((album) => formatAlbum(album)),
      meta: {
        total,
        count,
        offset,
      },
    };
  }

  async createAlbum(
    data: CreateAlbumDTO,
    pic: MultipartFile,
  ): Promise<FormattedAlbum> {
    let picPath: string | undefined; // если потребуется откат
    try {
      const picturePath = await this.fileService.createFile(
        FileType.IMAGE,
        pic,
      );
      picPath = picturePath;
      const album = await this.albumRepository.create(data, picturePath);
      return formatAlbum(album);
    } catch (err) {
      if (picPath) await this.fileService.removeFile(picPath);
      throw err;
    }
  }

  async updateAlbum(
    id: string,
    data: UpdateAlbumDTO,
    pic?: MultipartFile,
  ): Promise<FormattedAlbum> {
    let picPath: string | undefined; // если потребуется откат
    let oldPicturePath: string | undefined;
    try {
      if (pic) {
        const album = await this.albumRepository.findById(id);
        if (!album)
          throw new NotFoundError(`Album with id ${id} was not found!`);
        oldPicturePath = album?.picture;
        const picturePath = await this.fileService.createFile(
          FileType.IMAGE,
          pic,
        );
        picPath = picturePath;
      }
      const album = await this.albumRepository.update(id, data, picPath);
      if (pic && oldPicturePath)
        await this.fileService.removeFile(oldPicturePath);
      return formatAlbum(album);
    } catch (err) {
      if (picPath) await this.fileService.removeFile(picPath);
      throw err;
    }
  }

  async deleteAlbum(id: string): Promise<void> {
    return this.albumRepository.remove(id);
  }

  async addToCollection(data: AddToCollectionDTO): Promise<void> {
    return this.albumRepository.addToCollection(data);
  }

  async removeFromCollection(data: RemoveFromCollectionDTO): Promise<void> {
    return this.albumRepository.removeFromCollection(data);
  }
}
