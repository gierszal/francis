import type { TrackRepository } from "@/repositories/prisma/track.repository.js";
import type {
  createTrackType,
  trackServiceType,
  updateTrackType,
} from "@/types/track/track.js";

export class TrackService implements trackServiceType {
  constructor(trackRepository: TrackRepository) {}

  async getTrack(id: string) {
    console.log(`Getting track: ${id}`);
    return { id, name: "Mock Track", artist: "Mock Artist" };
  }

  async getTracks(count: number = 10, offset: number = 0) {
    console.log(`Getting tracks: count=${count}, offset=${offset}`);
    return { tracks: [], total: 0, count, offset };
  }

  async createTrack(data: createTrackType) {
    console.log(`Creating track: ${data.name}`);
    return { id: "mock-id-123", ...data, createdAt: new Date() };
  }

  async updateTrack(id: string, data: updateTrackType) {
    console.log(`Updating track ${id}:`, data);
    return { id, ...data, updatedAt: new Date() };
  }

  async listenIncrement(id: string) {
    console.log(`Incrementing listen count for track: ${id}`);
    return { id, listens: 42 };
  }

  async searchTrack(searchQuery: string = "", count: number = 10) {
    console.log(`Searching tracks: ${searchQuery}, limit=${count}`);
    return { results: [], searchQuery, count };
  }

  async deleteTrack(id: string) {
    console.log(`Deleting track: ${id}`);
    return { success: true, id };
  }

  async addToAlbum(trackID: string, albumID: string) {
    console.log(`Adding track ${trackID} to album ${albumID}`);
    return { success: true, trackID, albumID };
  }

  async addToPlaylist(trackID: string, playlistID: string) {
    console.log(`Adding track ${trackID} to playlist ${playlistID}`);
    return { success: true, trackID, playlistID };
  }

  async getRecommendations(count: number = 10, offset: number = 0) {
    console.log(`Getting recommendations: count=${count}, offset=${offset}`);
    return { recommendations: [], count, offset };
  }
}
