import { TrackRepository } from "@/repositories/prisma/track.repository.js";
import { FileType, type FileService } from "@/services/fileService.js";
import type { queryType } from "@/types/common/query.js";
import type {
  addToAlbumType,
  addToPlaylistType,
  createTrackType,
  TrackRepositoryType,
  TrackServiceType,
  updateTrackType,
} from "@/types/track/track.js";
import type { MultipartFile } from "@fastify/multipart";

export class TrackService implements TrackServiceType {
  constructor(
    private trackRepository: TrackRepositoryType,
    private fileService: FileService,
  ) {}

  async getTrack(id: string) {
    return this.trackRepository.findById(id);
  }

  async getTracks(opts: queryType) {
    return this.trackRepository.findAll(opts);
  }

  async createTrack(data: createTrackType, audio: MultipartFile) {
    let audPath; // если удалить придется
    try {
      const audioPath = await this.fileService.createFile(
        FileType.AUDIO,
        audio,
      );
      audPath = audioPath;
      console.log(audPath);
      return await this.trackRepository.create(data, audioPath);
    } catch (err) {
      if (audPath) await this.fileService.removeFile(audPath);
      throw err;
    }
  }

  async updateTrack(id: string, data: updateTrackType, audio?: MultipartFile) {
    let audPath; // если удалить придется
    try {
      if (audio) {
        const track = await this.trackRepository.findById(id);
        await this.fileService.removeFile(track?.audio);
        const audioPath = await this.fileService.createFile(
          FileType.AUDIO,
          audio,
        );
        audPath = audioPath;
      }
      return await this.trackRepository.update(id, data, audPath);
    } catch (err) {
      if (audPath) await this.fileService.removeFile(audPath);
      throw err;
    }
  }

  async listenIncrement(id: string) {
    return this.trackRepository.listenIncrement(id);
  }

  async deleteTrack(id: string) {
    return this.trackRepository.remove(id);
  }

  async addToAlbum(data: addToAlbumType) {
    return this.trackRepository.addToAlbum(data);
  }

  async addToFavorite(trackID: string) {
    // return this.trackRepository.addToFavourite(trackID);
  }

  async addToPlaylist(data: addToPlaylistType) {
    return this.trackRepository.addToPlaylist(data);
  }

  async getRecommendations(
    searchQuery = "",
    count: number = 10,
    offset: number = 0,
  ) {
    console.log(`Getting recommendations: count=${count}, offset=${offset}`);
    return { recommendations: [], count, offset };
  }
}
