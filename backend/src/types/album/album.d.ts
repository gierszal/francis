import {
  addToCollectionSchema,
  createAlbumSchema,
  updateAlbumSchema,
} from "@/schemas/album.schema.ts";

import { z } from "zod";
import type { queryType } from "../common/query.js";

export type createAlbumType = z.infer<typeof createAlbumSchema>;
export type updateAlbumType = z.infer<typeof updateAlbumSchema>;
export type addToCollectionType = z.infer<typeof addToCollectionSchema>;

export type AlbumServiceType = {
  getAlbum: (id: string) => Promise<any>;
  getAlbums: (data: queryType) => Promise<any>;
  createAlbum: (data: createAlbumType) => Promise<any>;
  updateAlbum: (id: string, data: updateAlbumType) => Promise<any>;
  deleteAlbum: (id: string) => Promise<any>;
  addToCollection: (data: addToCollectionType) => Promise<any>;
};
