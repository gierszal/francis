import {
  collectionQuerySchema,
  createCollectionSchema,
  updateCollectionSchema,
} from "@/schemas/collection.schema.ts";

import { z } from "zod";

export type createCollectionType = z.infer<typeof createCollectionSchema>;
export type updateCollectionType = z.infer<typeof updateCollectionSchema>;

export type CollectionServiceType = {
  getCollection: (id: string) => Promise<any>;
  getCollections: (
    searchQuery?: string,
    count?: number,
    offset?: number,
  ) => Promise<any>;
  createCollection: (data: createCollectionType) => Promise<any>;
  updateCollection: (id: string, data: updateCollectionType) => Promise<any>;
  deleteCollection: (id: string) => Promise<any>;
};

export type CollectionRepositoryType = {
  findAll(options?: queryType): Promise<FindAllCollectionsResponse>;
  findById(id: string): Promise<DetailedCollection | null>;
  create(data: createCollectionType): Promise<FormattedCollection>;
  update(
    id: string,
    data: updateCollectionType,
  ): Promise<FormattedCollection | null>;
  remove(id: string): Promise<FormattedCollection>;
};
