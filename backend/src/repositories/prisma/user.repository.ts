import { DatabaseError } from "@/errors/index.js";
import type {
  Playlist,
  Prisma,
  Track,
  User,
} from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type { queryType } from "@/types/common/query.js";
import type { updateUserType } from "@/types/user/user.js";

export class UserRepository {
  async findById(userId: string) {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: userId,
        },
        include: {
          role: {
            select: {
              role: true,
            },
          },
        },
      });
      return formatUser(user);
    } catch (error) {
      throw new Error("Пользователь не обнаружен");
    }
  }
  async findPlaylists(userId: string, options?: queryType) {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: Prisma.PlaylistWhereInput = {
      authorId: userId,
      ...(searchQuery && {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      }),
    };
    const [playlists, total] = await Promise.all([
      prisma.playlist.findMany({
        where,
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: count,
      }),
      prisma.playlist.count({ where }),
    ]);

    return {
      data: playlists.map((playlist) => formatPlaylsit(playlist)),
      total,
      count,
      offset,
    };
  }

  async getFavourites(userId: string, options?: queryType) {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: Prisma.FavouriteWhereInput = {
      userId,
      ...(searchQuery && {
        track: {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
          artist: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      }),
    };

    const [tracksData, total] = await Promise.all([
      prisma.favourite.findMany({
        where: where,
        include: {
          track: true,
        },
        skip: offset,
        take: count,
      }),

      prisma.favourite.count({ where }),
    ]);

    const tracks = tracksData.map((item) => item.track);

    return {
      data: tracks.map((track) => formatTrack(track)),
      total,
      count,
      offset,
    };
  }

  async addToFavourites(userId: string, trackId: string) {
    try {
      return await prisma.favourite.create({
        data: {
          userId,
          trackId,
        },
      });
    } catch (e: any) {
      throw new DatabaseError(e.message);
    }
  }

  async addToHistory(userId: string, trackId: string) {
    try {
      return await prisma.trackListened.create({
        data: {
          userId,
          trackId,
        },
      });
    } catch (e: any) {
      throw new DatabaseError(e.message);
    }
  }

  async removeFromFavourites(userId: string, trackId: string) {
    return prisma.favourite.delete({
      where: {
        userId_trackId: {
          userId,
          trackId,
        },
      },
    });
  }

  async getHistory(userId: string, options?: queryType) {
    const { count = 10, offset = 0, searchQuery } = options || {};
    const where: Prisma.TrackListenedWhereInput = {
      userId,
      ...(searchQuery && {
        track: {
          name: {
            contains: searchQuery,
            mode: "insensitive",
          },
          artist: {
            contains: searchQuery,
            mode: "insensitive",
          },
        },
      }),
    };
    const [tracksData, total] = await Promise.all([
      prisma.trackListened.findMany({
        where: where,
        include: {
          track: true,
        },
        skip: offset,
        take: count,
      }),
      prisma.trackListened.count({ where }),
    ]);
    const tracks = tracksData.map((item) => item.track);

    return {
      data: tracks.map((track) => formatTrack(track)),
      total,
      count,
      offset,
    };
  }

  async updateUser(userId: string, data: updateUserType) {
    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );
    return prisma.user.update({
      where: { id: userId },
      data: updates,
    });
  }

  async removeUser(userId: string) {
    return prisma.user.delete({
      where: { id: userId },
    });
  }
}

function formatPlaylsit(playlist: Playlist | any) {
  return {
    id: playlist.id,
    name: playlist.name,
    author: {
      first_name: playlist.author.firstName,
      last_name: playlist.author.lastName,
    },
    description: playlist.description,
    crated_at: playlist.createdAt,
    updated_at: playlist.updatedAt,
  };
}

function formatUser(user: User | any) {
  return {
    id: user.id,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    is_activated: user.isActivated,
    role: user.role.role,
    crated_at: user.createdAt,
    updated_at: user.updatedAt,
  };
}

function formatTrack(track: Track | any) {
  return {
    id: track.id,
    name: track.name,
    artist: track.artist,
    audio: track.audio,
    tags: track.tags?.map((tag: any) => tag),
    created_at: track.createdAt,
    updated_at: track.updatedAt,
    albumId: track.albumId,
  };
}
