import {
  addToCollectionSchema,
  createAlbumSchema,
  updateAlbumSchema,
} from "@/schemas/album.schema.ts";

import { z } from "zod";
import type { queryType } from "../common/query.js";
import type { Multipart, MultipartFile } from "@fastify/multipart";

export type createAlbumType = z.infer<typeof createAlbumSchema>;
export type updateAlbumType = z.infer<typeof updateAlbumSchema>;
export type addToCollectionType = z.infer<typeof addToCollectionSchema>;

export type AlbumServiceType = {
  getAlbum: (id: string) => Promise<any>;
  getAlbums: (data: queryType) => Promise<any>;
  createAlbum: (
    data: createAlbumType,
    pic: fastifyMultipart.MultipartFile,
  ) => Promise<any>;
  updateAlbum: (
    id: string,
    data: updateAlbumType,
    pic?: MultipartFile,
  ) => Promise<any>;
  deleteAlbum: (id: string) => Promise<any>;
  addToCollection: (data: addToCollectionType) => Promise<any>;
};

export type AlbumRepositoryType = {
  findAll(options?: queryType): Promise<FindAllAlbumsResponse>;
  findById(id: string): Promise<DetailedAlbum | null>;
  create(data: createAlbumType, picturePath: string): Promise<FormattedAlbum>;
  update(
    id: string,
    data: updateAlbumType,
    picPath?: string,
  ): Promise<FormattedAlbum | null>;
  remove(id: string): Promise<FormattedAlbum>;
  addToCollection(data: addToCollectionType): Promise<void>;
};
