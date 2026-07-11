import { NotFoundError } from "@/errors/ApiError.js";
import { DatabaseError } from "@/errors/InfrastructureError.js";
import type { Album } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type {
  AddToCollectionDTO,
  CreateAlbumDTO,
  RemoveFromCollectionDTO,
  UpdateAlbumDTO,
} from "@/types/album/album.dto.js";
import type { IAlbumRepository } from "@/types/album/album.interface.js";
import type { FindAllAlbumsResult } from "@/types/album/index.js";
import type { queryType } from "@/types/common/query.js";

export class AlbumRepository implements IAlbumRepository {
  async findAll(options?: queryType): Promise<FindAllAlbumsResult> {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: any = {};

    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ];
    }

    const [albums, total] = await Promise.all([
      prisma.album.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: count,
      }),
      prisma.album.count({ where }),
    ]);
    return {
      albums,
      total,
    };
  }

  async findById(id: string): Promise<Album | null> {
    const album = await prisma.album.findUnique({
      where: { id },
      include: {
        _count: { select: { tracks: true } },
        tracks: {
          select: {
            id: true,
            name: true,
            audio: true,
            artist: true,
            album: {
              select: {
                id: true,
                name: true,
                game: true,
                picture: true,
              },
            },
          },
        },
        game: {
          select: { id: true, name: true },
        },
        albumCollections: {
          include: {
            collection: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
    return album ?? null;
  }

  async create(
    { description, name, gameId }: CreateAlbumDTO,
    picturePath: string,
  ): Promise<Album> {
    return prisma.album.create({
      data: { description, name, picture: picturePath, gameId },
    });
  }

  async update(
    id: string,
    data: UpdateAlbumDTO,
    picturePath?: string,
  ): Promise<Album> {
    const updates = picturePath ? { ...data, picture: picturePath } : data;

    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined),
    );

    try {
      return prisma.album.update({
        where: { id },
        data: cleanUpdates,
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Album with id ${id} was not found!`);
      throw new DatabaseError(err.message ?? "Database error occured");
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const data = await prisma.album.delete({ where: { id } });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Album with id ${id} was not found!`);
      throw new DatabaseError(err.message ?? "Database error occured");
    }
  }

  async addToCollection(data: AddToCollectionDTO): Promise<void> {
    const { albumId, collectionId } = data;
    try {
      await prisma.albumCollection.create({
        data: { albumId, collectionId },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(
          "Either the album or the collection with the provided ID was not found",
        );
      throw new DatabaseError(err.message ?? "Database error occured");
    }
  }

  async removeFromCollection(data: RemoveFromCollectionDTO): Promise<void> {
    const { albumId, collectionId } = data;
    try {
      await prisma.albumCollection.delete({
        where: {
          albumId_collectionId: {
            albumId,
            collectionId,
          },
        },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(
          "Either the album or the collection with the provided ID was not found",
        );
      throw new DatabaseError(err.message ?? "Database error occured");
    }
  }
}
