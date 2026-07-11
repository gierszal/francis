import { NotFoundError } from "@/errors/ApiError.js";
import type {
  CollectionsResponse,
  CreateCollectionDTO,
  FormattedCollection,
  FormattedDetailedCollection,
  ICollectionRepository,
  ICollectionService,
  UpdateCollectionDTO,
} from "@/types/collection/index.js";
import type { queryType } from "@/types/common/query.js";
import {
  formatCollection,
  formatDetailedCollection,
} from "@/utils/formatters/collection.formatter.js";

export class CollectionService implements ICollectionService {
  constructor(private collectionRepository: ICollectionRepository) {}

  async getCollection(id: string): Promise<FormattedDetailedCollection | null> {
    const collection = await this.collectionRepository.findById(id);
    if (!collection)
      throw new NotFoundError(`Collection with ${id} was not found!`);
    return formatDetailedCollection(collection);
  }

  async getCollections(options: queryType): Promise<CollectionsResponse> {
    const { count, offset } = options;
    const { collections, total } =
      await this.collectionRepository.findAll(options);
    return {
      data: collections.map((collection) =>
        formatDetailedCollection(collection),
      ),
      meta: {
        total,
        count,
        offset,
      },
    };
  }

  async createCollection(
    data: CreateCollectionDTO,
  ): Promise<FormattedCollection> {
    const collection = await this.collectionRepository.create(data);
    return formatCollection(collection);
  }

  async updateCollection(
    id: string,
    data: UpdateCollectionDTO,
  ): Promise<FormattedCollection> {
    const collection = await this.collectionRepository.update(id, data);
    return formatCollection(collection);
  }

  async deleteCollection(id: string): Promise<void> {
    return await this.collectionRepository.remove(id);
  }
}
