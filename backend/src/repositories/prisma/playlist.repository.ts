import type { Playlist } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type { queryType } from "@/types/common/query.js";
import type {
  createPlaylistType,
  updatePlaylistType,
} from "@/types/playlist/playlist.js";

export class PlaylistRepository {
  async findAll(options?: queryType) {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: any = {};

    if (searchQuery) where.name = { name: { contains: searchQuery } };

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
      data: playlists.map((playlist) => formatPlaylist(playlist)),
      total,
      count,
      offset,
    };
  }

  async findById(id: string) {
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
    return playlist ? formatDetailedPlaylist(playlist) : null;
  }

  async create(id: string, { description, name }: createPlaylistType) {
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        authorId: id,
      },
    });
    return formatPlaylist(playlist);
  }

  async update(id: string, data: updatePlaylistType) {
    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );

    try {
      const playlist = await prisma.playlist.update({
        where: { id },
        data: updates,
      });
      return formatPlaylist(playlist);
    } catch (err: any) {
      if (err.code === "P2025") return null;
      throw err;
    }
  }

  async remove(id: string) {
    try {
      const playlist = await prisma.playlist.delete({
        where: { id },
      });
      return formatPlaylist(playlist);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new Error(`Playlist with id ${id} not found`);
      }
      throw err;
    }
  }
}

function formatPlaylist(playlist: Playlist) {
  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    created_at: playlist.createdAt,
    updated_at: playlist.updatedAt,
  };
}

function formatDetailedPlaylist(playlist: Playlist | any) {
  return {
    id: playlist.id,
    name: playlist.name,
    tracks: playlist.tracks.map((track: any) => track),
    author: {
      id: playlist.author.id,
      firstName: playlist.author.firstName,
      lastName: playlist.author.lastName,
    },
    created_at: playlist.createdAt,
    updated_at: playlist.updatedAt,
  };
}
