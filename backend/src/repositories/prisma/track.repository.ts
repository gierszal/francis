import { Prisma, type Track } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import { updateTrackSchema } from "@/schemas/track.schema.js";
import type { queryType } from "@/types/common/query.js";
import type { updatePlaylistType } from "@/types/playlist/playlist.js";
import type {
  addToAlbumType,
  addToPlaylistType,
  createTrackType,
  updateTrackType,
} from "@/types/track/track.js";

export class TrackRepository {
  async findAll(options?: queryType) {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: any = {};

    if (searchQuery)
      where.OR = [
        { name: { contains: searchQuery } },
        { artist: { contains: searchQuery } },
      ];

    const [tracks, total] = await Promise.all([
      prisma.track.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: count,
      }),
      prisma.track.count({ where }),
    ]);

    return {
      data: tracks.map((track) => formatTrack(track)),
      total,
      count,
      offset,
    };
  }

  async findById(id: string) {
    const track = await prisma.track.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            trackListeneds: true,
          },
        },
        album: {
          select: {
            id: true,
            name: true,
            game: true,
            picture: true,
          },
        },
      },
    });
    return track ? formatDetailedTrack(track) : null;
  }

  async create({ artist, audio, name, albumId, tags }: createTrackType) {
    const track = await prisma.track.create({
      data: {
        artist,
        audio,
        name,
        tags,
        albumId,
      },
    });
    return formatTrack(track);
  }

  async update(id: string, data: updateTrackType) {
    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );

    try {
      const track = await prisma.track.update({
        where: { id },
        data: updates,
      });
      return formatTrack(track);
    } catch (err: any) {
      if (err.code === "P2025") return null;
      throw err;
    }
  }

  async listenIncrement(id: string) {
    try {
      await prisma.trackListened.create({
        data: { trackId: id },
      });
      return;
    } catch (err: any) {
      if (err.code === "P2025") return null;
      throw err;
    }
  }

  async remove(id: string) {
    try {
      const track = await prisma.track.delete({
        where: { id },
      });
      return formatTrack(track);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new Error(`Track with id ${id} not found`);
      }
      throw err;
    }
  }

  async addToAlbum(data: addToAlbumType) {
    const { albumId, trackId } = data;
    try {
      const track = await prisma.track.update({
        where: { id: trackId },
        data: {
          albumId,
        },
      });
      return formatTrack(track);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new Error(`Track with id ${trackId} not found`);
      }
      throw err;
    }
  }

  async addToPlaylist(data: addToPlaylistType) {
    const { playlistId, trackId } = data;
    try {
      await prisma.playlistTrack.create({
        data: {
          playlistId,
          trackId,
        },
      });
      return;
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new Error(`Track with id ${trackId} not found`);
      }
      throw err;
    }
  }
}

function formatTrack(track: Track) {
  return {
    id: track.id,
    name: track.name,
    artist: track.artist,
    audio: track.audio,
    tags: track.tags.map((tag: any) => tag),
    created_at: track.createdAt,
    updated_at: track.updatedAt,
    albumId: track.albumId,
  };
}

function formatDetailedTrack(track: Track | any) {
  return {
    id: track.id,
    name: track.name,
    artist: track.artist,
    audio: track.audio,
    tags: track.tags.map((tag: any) => tag),
    created_at: track.createdAt,
    updated_at: track.updatedAt,
    listened: track._count.trackListeneds,
    album: {
      id: track.album.id,
      name: track.album.name,
      game: track.album.game,
      picture: track.album.picture,
    },
  };
}
