import { BadRequestError, NotFoundError } from "@/errors/ApiError.js";
import { DatabaseError } from "@/errors/InfrastructureError.js";
import type { Prisma, User } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type { queryType } from "@/types/common/query.js";
import type { IUserRepository } from "@/types/user/user.interface.js";
import type {
  AddToFavouriteResult,
  AddToHistoryResult,
  UpdateUserDTO,
} from "@/types/user/index.js";
import type { FindAllPlaylistsResult } from "@/types/playlist/playlist.result.js";
import type { FindTracksResult } from "@/types/track/track.result.js";

export class UserRepository implements IUserRepository {
  async findById(userId: string): Promise<User> {
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
    return user;
  }
  async findPlaylists(
    userId: string,
    options?: queryType,
  ): Promise<FindAllPlaylistsResult> {
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
      playlists,
      total,
    };
  }

  async getFavourites(
    userId: string,
    options?: queryType,
  ): Promise<FindTracksResult> {
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
          track: {
            include: {
              album: {
                select: {
                  picture: true,
                },
              },
            },
          },
        },
        skip: offset,
        take: count,
      }),

      prisma.favourite.count({ where }),
    ]);

    const tracks = tracksData.map((item) => item.track);

    return {
      tracks,
      total,
    };
  }

  async addToFavourites(userId: string, trackId: string): Promise<void> {
    try {
      await prisma.favourite.create({
        data: {
          userId,
          trackId,
        },
      });
    } catch (e: any) {
      throw new DatabaseError(e.message);
    }
  }

  async addToHistory(userId: string, trackId: string): Promise<void> {
    try {
      await prisma.trackListened.create({
        data: {
          userId,
          trackId,
        },
      });
    } catch (e: any) {
      throw new DatabaseError(e.message);
    }
  }

  async removeFromFavourites(userId: string, trackId: string): Promise<void> {
    await prisma.favourite.delete({
      where: {
        userId_trackId: {
          userId,
          trackId,
        },
      },
    });
  }

  async getHistory(
    userId: string,
    options?: queryType,
  ): Promise<FindTracksResult> {
    try {
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
            track: {
              include: {
                album: {
                  select: {
                    picture: true,
                  },
                },
              },
            },
          },
          skip: offset,
          take: count,
        }),
        prisma.trackListened.count({ where }),
      ]);
      const tracks = tracksData.map((item) => item.track);

      return {
        tracks,
        total,
      };
    } catch (err: any) {
      if (err.code === "P2025")
        throw new BadRequestError(`Failed to fetch user's history!`);
      throw err;
    }
  }

  async updateUser(userId: string, data: UpdateUserDTO): Promise<User> {
    try {
      const updates = Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== undefined),
      );
      const user = await prisma.user.update({
        where: { id: userId },
        data: updates,
        include: {
          role: {
            select: {
              role: true,
            },
          },
        },
      });
      return user;
    } catch (err: any) {
      if (err.code === "P2025")
        throw new BadRequestError(`Failed to update user!`); // типо чтобы избежать userEnum, не notFound
      throw err;
    }
  }

  async removeUser(userId: string): Promise<void> {
    try {
      await prisma.user.delete({
        where: { id: userId },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new BadRequestError(`Failed to delete user!`);
      throw err;
    }
  }
}
