import type { Album, Collection } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type {
  createCollectionType,
  updateCollectionType,
} from "@/types/collection/collection.js";
import type { queryType } from "@/types/common/query.js";

export class CollectionRepository {
  async findAll(options?: queryType) {
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
        skip: offset,
        take: count,
      }),
      prisma.collection.count({ where }),
    ]);

    return {
      data: collections.map((collection) => formatCollection(collection)),
      total,
      count,
      offset,
    };
  }

  async findById(id: string) {
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
    return collection ? formatDetailedCollection(collection) : null;
  }

  async create({ name }: createCollectionType) {
    const collection = await prisma.collection.create({
      data: {
        name,
      },
    });
    return formatCollection(collection);
  }

  async update(id: string, data: updateCollectionType) {
    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );

    try {
      const collection = await prisma.collection.update({
        where: { id },
        data: updates,
      });
      return formatCollection(collection);
    } catch (err: any) {
      if (err.code === "P2025") return null;
      throw err;
    }
  }

  async remove(id: string) {
    try {
      const collection = await prisma.collection.delete({
        where: { id },
      });
      return formatCollection(collection);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new Error(`Collection with id ${id} not found`);
      }
      throw err;
    }
  }
}

function formatCollection(collection: Collection) {
  return {
    id: collection.id,
    name: collection.name,
    created_at: collection.createdAt,
    updated_at: collection.updatedAt,
  };
}

function formatDetailedCollection(collection: Collection | any) {
  return {
    id: collection.id,
    name: collection.name,
    albums_count: collection._count.albumCollections,
    albums: collection.albumCollections.map(
      (albumArray: any) => albumArray.album,
    ),
    created_at: collection.createdAt,
    updated_at: collection.updatedAt,
  };
}
