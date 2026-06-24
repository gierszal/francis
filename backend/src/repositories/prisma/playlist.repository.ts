import { NotFoundError } from "@/errors/ApiError.js";
import type { Playlist } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type { queryType } from "@/types/common/query.js";
import type {
  CreatePlaylistDTO,
  UpdatePlaylistDTO,
  IPlaylistRepository,
  FindAllPlaylistsResult,
} from "@/types/playlist/index.js";

export class PlaylistRepository implements IPlaylistRepository {
  async findAll(options?: queryType): Promise<FindAllPlaylistsResult> {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: any = {};

    if (searchQuery) where.name = { contains: searchQuery };

    const [playlists, total] = await Promise.all([
      prisma.playlist.findMany({
        where,
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

  async findById(id: string): Promise<Playlist | null> {
    const playlist = await prisma.playlist.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            playlistTracks: true,
          },
        },
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        playlistTracks: {
          select: {
            track: {
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
          },
        },
      },
    });
    return playlist ?? null;
  }

  async create(
    id: string,
    { description, name }: CreatePlaylistDTO,
  ): Promise<Playlist> {
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        authorId: id,
      },
    });
    return playlist;
  }

  async update(id: string, data: UpdatePlaylistDTO): Promise<Playlist> {
    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );

    try {
      const playlist = await prisma.playlist.update({
        where: { id },
        data: updates,
      });
      return playlist;
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Playlist with id ${id} was not found!`);
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await prisma.playlist.delete({
        where: { id },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Playlist with id ${id} was not found!`);
      throw err;
    }
  }
}
