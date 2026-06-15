import type {
  CollectionRepositoryType,
  createCollectionType,
  updateCollectionType,
} from "@/types/collection/collection.js";
import type { CollectionServiceType } from "@/types/collection/collection.js";

export class CollectionService implements CollectionServiceType {
  constructor(collectionRepository: CollectionRepositoryType) {}
  async getCollection(id: string) {
    console.log(`[COLLECTION SERVICE] Getting collection: ${id}`);
    return {
      id,
      name: "Mock Collection",
      albums: [],
      createdAt: new Date(),
    };
  }

  async getCollections(
    searchQuery?: string,
    count: number = 10,
    offset: number = 0,
  ) {
    console.log(
      `[COLLECTION SERVICE] Getting collections: count=${count}, offset=${offset}`,
    );
    return {
      collections: [
        { id: "1", name: "Collection 1" },
        { id: "2", name: "Collection 2" },
      ],
      total: 2,
      count,
      offset,
    };
  }

  async createCollection(data: createCollectionType) {
    console.log(`[COLLECTION SERVICE] Creating collection: ${data.name}`);
    return {
      id: `collection-${Date.now()}`,
      ...data,
      albums: [],
      createdAt: new Date(),
    };
  }

  async updateCollection(id: string, data: updateCollectionType) {
    console.log(`[COLLECTION SERVICE] Updating collection ${id}:`, data);
    return {
      id,
      ...data,
      updatedAt: new Date(),
    };
  }

  async searchCollection(searchQuery: string = "", count: number = 10) {
    console.log(
      `[COLLECTION SERVICE] Searching collections: "${searchQuery}", limit=${count}`,
    );
    return {
      results: [{ id: "1", name: `Found: ${searchQuery}` }],
      searchQuery,
      count,
    };
  }

  async deleteCollection(id: string) {
    console.log(`[COLLECTION SERVICE] Deleting collection: ${id}`);
    return { success: true, id };
  }
}
