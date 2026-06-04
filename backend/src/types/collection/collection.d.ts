import {
  collectionParamsSchema,
  collectionQuerySchema,
  createCollectionSchema,
  searchCollectionSchema,
  updateCollectionSchema,
} from "@/schemas/collection.schema.ts";

import { z } from "zod";

export type createCollectionType = z.infer<typeof createCollectionSchema>;
export type updateCollectionType = z.infer<typeof updateCollectionSchema>;
export type searchCollectionType = z.infer<typeof searchCollectionSchema>;
export type collectionParamsType = z.infer<typeof collectionParamsSchema>;
export type collectionQueryType = z.infer<typeof collectionQuerySchema>;

export type CollectionServiceType = {
  getCollection: (id: string) => Promise<any>;
  getCollections: (count?: number, offset?: number) => Promise<any>;
  createCollection: (data: createCollectionType) => Promise<any>;
  updateCollection: (id: string, data: updateCollectionType) => Promise<any>;
  searchCollection: (searchQuery?: string, count?: number) => Promise<any>;
  deleteCollection: (id: string) => Promise<any>;
};
