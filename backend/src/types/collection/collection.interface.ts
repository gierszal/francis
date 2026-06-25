import type { Collection } from "@/generated/prisma/client.js";
import type { queryType } from "../common/query.js";
import type {
  CollectionsResponse,
  FormattedCollection,
  FormattedDetailedCollection,
  CreateCollectionDTO,
  UpdateCollectionDTO,
  FindAllCollectionsResult,
} from "./index.js";

export type ICollectionService = {
  getCollection: (id: string) => Promise<FormattedDetailedCollection | null>;

  getCollections: (options: queryType) => Promise<CollectionsResponse>;

  createCollection: (data: CreateCollectionDTO) => Promise<FormattedCollection>;

  updateCollection: (
    id: string,
    data: UpdateCollectionDTO,
  ) => Promise<FormattedCollection>;

  deleteCollection: (id: string) => Promise<void>;
};

export type ICollectionRepository = {
  findAll(options?: queryType): Promise<FindAllCollectionsResult>;

  findById(id: string): Promise<Collection | null>;

  create(data: CreateCollectionDTO): Promise<Collection>;

  update(id: string, data: UpdateCollectionDTO): Promise<Collection>;

  remove(id: string): Promise<void>;
};
