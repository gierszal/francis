import type { queryType } from "@/types/common/query.js";
import type {
  UpdateUserDTO,
  IUserRepository,
  IUserService,
} from "@/types/user/index.js";
import type { FormattedUser } from "@/types/user/user.model.js";
import type { PlaylistsResponse } from "@/types/playlist/playlist.response.js";
import type { TracksResponse } from "@/types/track/track.response.js";
import { formatUser } from "@/utils/formatters/user.formatter.js";
import { formatPlaylist } from "@/utils/formatters/playlist.formatter.js";
import { formatTrack } from "@/utils/formatters/track.formatter.js";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getUser(userId: string): Promise<FormattedUser | null> {
    const user = await this.userRepository.findById(userId);
    return formatUser(user);
  }

  async getPlaylists(
    userId: string,
    query: queryType,
  ): Promise<PlaylistsResponse> {
    const { count, offset } = query;
    const { playlists, total } = await this.userRepository.findPlaylists(
      userId,
      query,
    );
    return {
      data: playlists.map((playlist) => formatPlaylist(playlist)),
      meta: {
        total,
        count,
        offset,
      },
    };
  }

  async getFavourites(
    userId: string,
    query: queryType,
  ): Promise<TracksResponse> {
    const { count, offset } = query;
    const { total, tracks } = await this.userRepository.getFavourites(
      userId,
      query,
    );
    return {
      data: tracks.map((track) => formatTrack(track)),
      meta: {
        total,
        count,
        offset,
      },
    };
  }

  async getRecommendations(data: queryType): Promise<TracksResponse> {
    return {
      data: [],
      meta: { total: 0, count: 0, offset: 0 },
    } as TracksResponse;
  }

  async addToFavourites(userId: string, trackId: string): Promise<void> {
    return await this.userRepository.addToFavourites(userId, trackId);
  }

  async removeFromFavourites(userId: string, trackId: string): Promise<void> {
    return this.userRepository.removeFromFavourites(userId, trackId);
  }

  async getHistory(userId: string, query: queryType): Promise<TracksResponse> {
    const { count, offset } = query;
    const { total, tracks } = await this.userRepository.getHistory(
      userId,
      query,
    );
    return {
      data: tracks.map((track) => formatTrack(track)),
      meta: {
        total,
        count,
        offset,
      },
    };
  }

  async addToHistory(userId: string, trackId: string): Promise<void> {
    return this.userRepository.addToHistory(userId, trackId);
  }

  async updateUser(
    userId: string,
    data: UpdateUserDTO,
  ): Promise<FormattedUser> {
    const user = await this.userRepository.updateUser(userId, data);
    return formatUser(user);
  }

  async removeUser(userId: string): Promise<void> {
    return this.userRepository.removeUser(userId);
  }
}
