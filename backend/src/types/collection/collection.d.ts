import {
  collectionQuerySchema,
  createCollectionSchema,
  updateCollectionSchema,
} from "@/schemas/collection.schema.ts";

import { z } from "zod";

export type createCollectionType = z.infer<typeof createCollectionSchema>;
export type updateCollectionType = z.infer<typeof updateCollectionSchema>;
export type collectionQueryType = z.infer<typeof collectionQuerySchema>;

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
