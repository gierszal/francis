import { NotFoundError } from "@/errors/ApiError.js";
import { FileType, type FileService } from "@/services/fileService.js";
import type { queryType } from "@/types/common/query.js";
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
import {
  formatDetailedTrack,
  formatTrack,
} from "@/utils/formatters/track.formatter.js";
import type { MultipartFile } from "@fastify/multipart";

export class TrackService implements ITrackService {
  constructor(
    private trackRepository: ITrackRepository,
    private fileService: FileService,
  ) {}

  async getTrack(id: string): Promise<FormattedDetailedTrack | null> {
    const track = await this.trackRepository.findById(id);
    return formatDetailedTrack(track);
  }

  async getTracks(opts: queryType): Promise<TracksResponse> {
    const { count, offset } = opts;
    const { total, tracks } = await this.trackRepository.findAll(opts);
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
    audio?: MultipartFile,
  ): Promise<FormattedTrack> {
    let audPath: string | undefined; // если понадобится откатить файл
    try {
      if (audio) {
        const track = await this.trackRepository.findById(id);
        if (!track)
          throw new NotFoundError(`Album with id ${id} was not found!`);
        await this.fileService.removeFile(track?.audio);
        const audioPath = await this.fileService.createFile(
          FileType.AUDIO,
          audio,
        );
        audPath = audioPath;
      }
      const track = await this.trackRepository.update(id, data, audPath);
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

  async addToPlaylist(data: AddToPlaylistDTO): Promise<void> {
    return this.trackRepository.addToPlaylist(data);
  }

  async removeFromPlaylist(data: RemoveTrackFromPlaylistDTO): Promise<void> {
    return this.trackRepository.removeFromPlaylist(data);
  }
}
