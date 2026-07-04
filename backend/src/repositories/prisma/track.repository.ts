import { NotFoundError } from "@/errors/ApiError.js";
import type { Track } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type { queryType } from "@/types/common/query.js";
import type {
  AddToPlaylistDTO,
  CreateTrackDTO,
  UpdateTrackDTO,
  ITrackRepository,
  AddToAlbumDTO,
  RemoveTrackFromAlbumDTO,
  RemoveTrackFromPlaylistDTO,
} from "@/types/track/index.js";
import type { FindTracksResult } from "@/types/track/track.result.js";

export class TrackRepository implements ITrackRepository {
  async findAll(options?: queryType): Promise<FindTracksResult> {
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
        include: {
          album: {
            select: {
              picture: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: count,
      }),
      prisma.track.count({ where }),
    ]);

    return {
      tracks,
      total,
    };
  }

  async findById(id: string): Promise<Track | null> {
    const track = await prisma.track.findUnique({
      where: { id },
      include: {
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
    return track ?? null;
  }

  async create(
    { artist, name, albumId, tags }: CreateTrackDTO,
    audio: string,
  ): Promise<Track> {
    const track = await prisma.track.create({
      data: {
        artist,
        audio,
        name,
        tags,
        albumId,
      },
      include: {
        album: {
          select: { picture: true },
        },
      },
    });
    return track;
  }

  async update(
    id: string,
    data: UpdateTrackDTO,
    audioPath?: string,
  ): Promise<Track> {
    let updateData: any = data;

    if (audioPath) updateData = { ...data, audio: audioPath };

    const updates = Object.fromEntries(
      Object.entries(updateData).filter(([, v]) => v !== undefined),
    );

    try {
      const track = await prisma.track.update({
        where: { id },
        data: updates,
        include: {
          album: {
            select: { picture: true },
          },
        },
      });
      return track;
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Track with id ${id} was not found!`);
      throw err;
    }
  }

  async listenIncrement(id: string): Promise<void> {
    try {
      await prisma.track.update({
        where: { id },
        data: {
          listens: {
            increment: 1,
          },
        },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Playlist with id ${id} was not found!`);
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await prisma.track.delete({
        where: { id },
        include: {
          album: {
            select: { picture: true },
          },
        },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Playlist with id ${id} was not found!`);
      throw err;
    }
  }

  async addToPlaylist(data: AddToPlaylistDTO): Promise<void> {
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
      if (err.code === "P2025")
        throw new NotFoundError(`Track with id ${trackId} not found`);
      throw err;
    }
  }

  async removeFromPlaylist(data: RemoveTrackFromPlaylistDTO): Promise<void> {
    const { playlistId, trackId } = data;
    try {
      await prisma.playlistTrack.delete({
        where: {
          trackId_playlistId: {
            playlistId,
            trackId,
          },
        },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(
          `Either track or playlist with id provided does not exist!`,
        );
      throw err;
    }
  }
}
