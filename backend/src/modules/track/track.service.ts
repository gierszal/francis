import { ForbiddenError, NotFoundError } from "@/errors/ApiError.js";
import { FileType, type FileService } from "@/services/fileService.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import type { queryType } from "@/types/common/query.js";
import type { IPlaylistRepository } from "@/types/playlist/playlist.interface.js";
import type {
  ITrackRepository,
  ITrackService,
  CreateTrackDTO,
  UpdateTrackDTO,
  AddToAlbumDTO,
  AddToPlaylistDTO,
  FormattedTrack,
  FormattedDetailedTrack,
  TracksResponse,
  RemoveTrackFromPlaylistDTO,
} from "@/types/track/index.js";
import type { FormattedUserPayload } from "@/types/user/user.model.js";
import {
  formatDetailedTrack,
  formatTrack,
} from "@/utils/formatters/track.formatter.js";
import type { MultipartFile } from "@fastify/multipart";

export class TrackService implements ITrackService {
  constructor(
    private trackRepository: ITrackRepository,
    private playlistRepository: IPlaylistRepository,
    private fileService: FileService,
  ) {}

  async getTrack(
    id: string,
    userId?: string,
  ): Promise<FormattedDetailedTrack | null> {
    const track = await this.trackRepository.findById(id, userId);
    if (!track) throw new NotFoundError(`Track with id ${id} was not found!`);
    return formatDetailedTrack(track);
  }

  async getTracks(
    opts: queryType,
    userId: string | undefined,
  ): Promise<TracksResponse> {
    const { count, offset } = opts;
    const { total, tracks } = await this.trackRepository.findAll(opts, userId);
    return {
      data: tracks.map((track) => formatTrack(track)),
      meta: {
        total,
        count,
        offset,
      },
    };
  }

  async createTrack(
    data: CreateTrackDTO,
    audio: MultipartFile,
  ): Promise<FormattedTrack> {
    let audPath: string | undefined; // если понадобится откатить файл
    try {
      const audioPath = await this.fileService.createFile(
        FileType.AUDIO,
        audio,
      );
      audPath = audioPath;
      const track = await this.trackRepository.create(data, audioPath);
      return formatTrack(track);
    } catch (err) {
      if (audPath) await this.fileService.removeFile(audPath);
      throw err;
    }
  }

  async updateTrack(
    id: string,
    data: UpdateTrackDTO,
    userId: string,
    audio?: MultipartFile,
  ): Promise<FormattedTrack> {
    let audPath: string | undefined; // если понадобится откатить файл
    let oldAudPath: string | undefined;
    try {
      if (audio) {
        const track = await this.trackRepository.findById(id);
        if (!track)
          throw new NotFoundError(`Album with id ${id} was not found!`);
        oldAudPath = track?.audio;
        const audioPath = await this.fileService.createFile(
          FileType.AUDIO,
          audio,
        );
        audPath = audioPath;
      }
      const track = await this.trackRepository.update(
        id,
        data,
        userId,
        audPath,
      );
      if (audio && oldAudPath) await this.fileService.removeFile(oldAudPath);
      return formatTrack(track);
    } catch (err) {
      if (audPath) await this.fileService.removeFile(audPath);
      throw err;
    }
  }

  async listenIncrement(id: string): Promise<void> {
    return this.trackRepository.listenIncrement(id);
  }

  async deleteTrack(id: string): Promise<void> {
    return this.trackRepository.remove(id);
  }

  async addToPlaylist(
    data: AddToPlaylistDTO,
    user: FormattedUserPayload,
  ): Promise<void> {
    const playlist = await this.playlistRepository.findById(data?.trackId);
    if (playlist?.authorId !== user.id && user.role !== ROLES.ADMIN.name)
      throw new ForbiddenError("Access to playlist denied!");
    return this.trackRepository.addToPlaylist(data);
  }

  async removeFromPlaylist(
    data: RemoveTrackFromPlaylistDTO,
    user: FormattedUserPayload,
  ): Promise<void> {
    const playlist = await this.playlistRepository.findById(data?.trackId);
    if (playlist?.authorId !== user.id && user.role !== ROLES.ADMIN.name)
      throw new ForbiddenError("Access to playlist denied!");
    return this.trackRepository.removeFromPlaylist(data);
  }
}
