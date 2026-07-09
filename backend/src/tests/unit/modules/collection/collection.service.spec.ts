import { CollectionService } from "@/modules/collection/collection.service.js";
import type { CollectionRepository } from "@/repositories/prisma/collection.repository.js";
import {
  formatCollection,
  formatDetailedCollection,
} from "@/utils/formatters/collection.formatter.js";
import { NotFoundError } from "@/errors/ApiError.js";
import { jest } from "@jest/globals";

describe("CollectionService", () => {
  let collectionService: CollectionService;
  let collectionRepository: jest.Mocked<CollectionRepository>;

  beforeEach(() => {
    collectionRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<CollectionRepository>;

    collectionService = new CollectionService(collectionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseCollection = {
    id: "f7aaf053-8bcc-4ef3-801a-bce61b36391c",
    name: "Fantasy Adventures",
    createdAt: "2026-07-04T13:07:44.305Z",
    updatedAt: "2026-07-04T13:07:44.305Z",
    _count: { albumCollections: 2 },
    albumCollections: [
      {
        id: "5bb3f1b3-09fe-476b-a019-a09e0dc78d3b",
        albumId: "6651de53-c133-4351-97b5-2acfe1596aea",
        collectionId: "f7aaf053-8bcc-4ef3-801a-bce61b36391c",
        album: {
          id: "f7aaf053-8bcc-adsd-801a-bce61b36391c",
          name: "Greate Album",
          picture: "image/f7aaf053-asdw-asds-801a-bce61b36391c",
        },
      },
    ],
  };

  describe("getCollection", () => {
    it("should return a formatted collection when it exists", async () => {
      collectionRepository.findById.mockResolvedValue(baseCollection as any);

      const result = await collectionService.getCollection(baseCollection.id);

      expect(collectionRepository.findById).toHaveBeenCalledWith(
        baseCollection.id,
      );
      expect(result).toEqual(formatDetailedCollection(baseCollection as any));
    });

    it("should throw NotFoundError when collection does not exist", async () => {
      collectionRepository.findById.mockResolvedValue(null);

      await expect(
        collectionService.getCollection("nonexistent-id"),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("getCollections", () => {
    it("should return formatted collections with pagination meta", async () => {
      const options = { count: 10, offset: 0 };
      collectionRepository.findAll.mockResolvedValue({
        total: 1,
        collections: [baseCollection],
      } as any);

      const result = await collectionService.getCollections(options as any);

      expect(collectionRepository.findAll).toHaveBeenCalledWith(options);
      expect(result).toEqual({
        data: [formatDetailedCollection(baseCollection as any)],
        meta: {
          total: 1,
          count: 10,
          offset: 0,
        },
      });
    });

    it("should return empty data when no collections are found", async () => {
      collectionRepository.findAll.mockResolvedValue({
        total: 0,
        collections: [],
      } as any);

      const result = await collectionService.getCollections({
        count: 10,
        offset: 0,
      } as any);

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("createCollection", () => {
    it("should create a collection and return it formatted", async () => {
      const createDto = { name: "New Collection" } as any;
      collectionRepository.create.mockResolvedValue(baseCollection as any);

      const result = await collectionService.createCollection(createDto);

      expect(collectionRepository.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(formatCollection(baseCollection as any));
    });
  });

  describe("updateCollection", () => {
    it("should update a collection and return it formatted", async () => {
      const updateDto = { name: "Updated Name" } as any;
      const updatedCollection = { ...baseCollection, name: "Updated Name" };
      collectionRepository.update.mockResolvedValue(updatedCollection as any);

      const result = await collectionService.updateCollection(
        baseCollection.id,
        updateDto,
      );

      expect(collectionRepository.update).toHaveBeenCalledWith(
        baseCollection.id,
        updateDto,
      );
      expect(result).toEqual(formatCollection(updatedCollection as any));
    });

    it("should propagate NotFoundError thrown by the repository", async () => {
      collectionRepository.update.mockRejectedValue(
        new NotFoundError("Collection with id nonexistent-id was not found!"),
      );

      await expect(
        collectionService.updateCollection("nonexistent-id", {
          name: "X",
        } as any),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe("deleteCollection", () => {
    it("should delegate removal to the repository", async () => {
      collectionRepository.remove.mockResolvedValue(undefined);

      await collectionService.deleteCollection(baseCollection.id);

      expect(collectionRepository.remove).toHaveBeenCalledWith(
        baseCollection.id,
      );
    });

    it("should propagate NotFoundError thrown by the repository", async () => {
      collectionRepository.remove.mockRejectedValue(
        new NotFoundError("Collection with id nonexistent-id was not found!"),
      );

      await expect(
        collectionService.deleteCollection("nonexistent-id"),
      ).rejects.toThrow(NotFoundError);
    });
  });
});
