import { TrackRepository } from "@/repositories/prisma/track.repository.js";
import type { queryType } from "@/types/common/query.js";
import type {
  addToAlbumType,
  addToPlaylistType,
  createTrackType,
  TrackServiceType,
  updateTrackType,
} from "@/types/track/track.js";

export class TrackService implements TrackServiceType {
  constructor(private trackRepository: TrackRepository) {}

  async getTrack(id: string) {
    return this.trackRepository.findById(id);
  }

  async getTracks(opts: queryType) {
    return this.trackRepository.findAll(opts);
  }

  async createTrack(data: createTrackType) {
    return this.trackRepository.create(data);
  }

  async updateTrack(id: string, data: updateTrackType) {
    return this.trackRepository.update(id, data);
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
