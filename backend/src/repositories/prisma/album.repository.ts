import type { Album } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type {
  addToCollectionType,
  createAlbumType,
  updateAlbumType,
} from "@/types/album/album.js";
import type { queryType } from "@/types/common/query.js";

export class AlbumRepository {
  async findAll(options?: queryType) {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: any = {};

    if (searchQuery)
      where.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ];

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
      data: albums.map((album) => formatAlbum(album)),
      total,
      count,
      offset,
    };
  }

  async findById(id: string) {
    const album = await prisma.album.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            tracks: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            artist: true,
          },
        },
        game: {
          select: {
            id: true,
            name: true,
          },
        },
        albumCollections: {
          include: {
            collection: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    return album ? formatDetailedAlbum(album) : null;
  }

  async create({ description, name, picture, gameId }: createAlbumType) {
    const album = await prisma.album.create({
      data: {
        description,
        name,
        picture,
        gameId,
      },
    });
    return formatAlbum(album);
  }

  async update(id: string, data: updateAlbumType) {
    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );

    try {
      const album = await prisma.album.update({
        where: { id },
        data: updates,
      });
      return formatAlbum(album);
    } catch (err: any) {
      if (err.code === "P2025") return null;
      throw err;
    }
  }

  async remove(id: string) {
    try {
      const album = await prisma.album.delete({
        where: { id },
      });
      return formatAlbum(album);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new Error(`Album with id ${id} not found`);
      }
      throw err;
    }
  }

  async addToCollection(data: addToCollectionType) {
    const { albumId, collectionId } = data;
    try {
      await prisma.albumCollection.create({
        data: { albumId, collectionId },
      });
      return;
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new Error(
          `Either album with id ${albumId} doesn't exist or collection ${collectionId}`,
        );
      }
      throw err;
    }
  }
}

function formatAlbum(album: Album) {
  return {
    id: album.id,
    name: album.name,
    picture: album.picture,
    description: album.description,
    game_id: album.gameId,
    created_at: album.createdAt,
    updated_at: album.updatedAt,
  };
}

function formatDetailedAlbum(album: Album | any) {
  return {
    id: album.id,
    name: album.name,
    picture: album.picture,
    description: album.description,
    tracks: album.tracks.map((track: any) => track),
    tracks_amount: album._count.tracks,
    game: {
      id: album.game.id,
      name: album.game.name,
    },
    collections: album.albumCollections.map(
      (collectionArray: any) => collectionArray.collection,
    ),
    created_at: album.createdAt,
    updated_at: album.updatedAt,
  };
}
