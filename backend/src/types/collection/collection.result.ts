import type { Album, Collection } from "@/generated/prisma/client.js";

export type CollectionWithAlbums = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  albumCollections: {
    album: Album;
  }[];
};

export type FindAllCollectionsResult = {
  collections: CollectionWithAlbums[];
  total: number;
};
