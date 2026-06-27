import { NotFoundError } from "@/errors/ApiError.js";
import { DatabaseError } from "@/errors/InfrastructureError.js";
import type { Collection } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type {
  CreateCollectionDTO,
  UpdateCollectionDTO,
} from "@/types/collection/collection.dto.js";
import type { ICollectionRepository } from "@/types/collection/collection.interface.js";
import type { FormattedDetailedCollection } from "@/types/collection/collection.model.js";
import type { CollectionsResponse } from "@/types/collection/collection.response.js";
import type { FindAllCollectionsResult } from "@/types/collection/collection.result.js";
import type { queryType } from "@/types/common/query.js";
import { formatDetailedCollection } from "@/utils/formatters/index.js";

export class CollectionRepository implements ICollectionRepository {
  async findAll(options?: queryType): Promise<FindAllCollectionsResult> {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: any = {};

    if (searchQuery)
      where.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ];

    const [collections, total] = await Promise.all([
      prisma.collection.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          _count: {
            select: {
              albumCollections: true,
            },
          },
          albumCollections: {
            select: {
              album: true,
            },
          },
        },
        skip: offset,
        take: count,
      }),
      prisma.collection.count({ where }),
    ]);

    return {
      collections,
      total,
    };
  }

  async findById(id: string): Promise<Collection | null> {
    const collection = await prisma.collection.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            albumCollections: true,
          },
        },
        albumCollections: {
          include: {
            album: {
              select: {
                id: true,
                name: true,
                picture: true,
              },
            },
          },
        },
      },
    });
    return collection ?? null;
  }

  async create({ name }: CreateCollectionDTO): Promise<Collection> {
    return prisma.collection.create({
      data: {
        name,
      },
    });
  }

  async update(id: string, data: UpdateCollectionDTO): Promise<Collection> {
    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );
    try {
      return prisma.collection.update({
        where: { id },
        data: updates,
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Album with id ${id} was not found!`);
      throw new DatabaseError(err.message ?? "Database error occured");
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await prisma.collection.delete({
        where: { id },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Album with id ${id} was not found!`);

      throw new DatabaseError(err.message ?? "Database error occured");
    }
  }
}
