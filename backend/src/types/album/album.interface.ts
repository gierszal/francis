import type { queryType } from "@/types/common/query.js";
import type {
  AddToCollectionDTO,
  CreateAlbumDTO,
  UpdateAlbumDTO,
} from "./album.dto.js";
import type { AlbumsResponse } from "./album.response.js";
import type { FormattedAlbum, FormattedDetailedAlbum } from "./album.model.js";
import type { MultipartFile } from "@fastify/multipart";
import type { FindAllAlbumsResult } from "./album.result.js";
import type { Album } from "@/generated/prisma/client.js";

export type IAlbumService = {
  getAlbum: (id: string) => Promise<FormattedDetailedAlbum | null>;

  getAlbums: (options: queryType) => Promise<AlbumsResponse>;

  createAlbum: (
    data: CreateAlbumDTO,
    pic: MultipartFile,
  ) => Promise<FormattedAlbum>;

  updateAlbum: (
    id: string,
    data: UpdateAlbumDTO,
    pic?: MultipartFile,
  ) => Promise<FormattedAlbum | null>;

  deleteAlbum: (id: string) => Promise<void>;

  addToCollection: (data: AddToCollectionDTO) => Promise<void>;
};

export interface IAlbumRepository {
  findAll(options?: queryType): Promise<FindAllAlbumsResult>;

  findById(id: string): Promise<Album | null>;

  create(data: CreateAlbumDTO, picturePath: string): Promise<Album>;

  update(
    id: string,
    data: UpdateAlbumDTO,
    picturePath?: string,
  ): Promise<Album>;

  remove(id: string): Promise<void>;

  addToCollection(data: AddToCollectionDTO): Promise<void>;
}
