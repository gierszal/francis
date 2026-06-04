import {
  addToCollectionSchema,
  albumParamsSchema,
  albumQuerySchema,
  createAlbumSchema,
  searchAlbumSchema,
  updateAlbumSchema,
} from "@/schemas/album.schema.ts";

import { z } from "zod";

export type createAlbumType = z.infer<typeof createAlbumSchema>;
export type updateAlbumType = z.infer<typeof updateAlbumSchema>;
export type searchAlbumType = z.infer<typeof searchAlbumSchema>;
export type albumParamsType = z.infer<typeof albumParamsSchema>;
export type addToCollectionType = z.infer<typeof addToCollectionSchema>;
export type albumQueryType = z.infer<typeof albumQuerySchema>;

export type albumServiceType = {
  getAlbum: (id: string) => Promise<any>;
  getAlbums: (count?: number, offset?: number) => Promise<any>;
  createAlbum: (data: createAlbumType) => Promise<any>;
  updateAlbum: (id: string, data: updateAlbumType) => Promise<any>;
  searchAlbum: (searchQuery?: string, count?: number) => Promise<any>;
  deleteAlbum: (id: string) => Promise<any>;
  addToCollection: (albumID: string, collectionID: string) => Promise<any>;
};
