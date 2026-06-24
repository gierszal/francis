import type { User } from "@/generated/prisma/client.js";
import type { queryType } from "../common/query.js";
import type { PlaylistsResponse } from "../playlist/playlist.response.js";
import type { TracksResponse } from "../track/track.response.js";
import type { UpdateUserDTO } from "./user.dto.js";
import type { FormattedUser } from "./user.model.js";
import type { FindAllPlaylistsResult } from "../playlist/playlist.result.js";
import type { FindTracksResult } from "../track/track.result.js";
import type {
  AddToFavouriteResult,
  AddToHistoryResult,
} from "./user.result.js";

export type IUserService = {
  getUser: (userId: string) => Promise<FormattedUser | null>;

  getPlaylists: (
    userId: string,
    query: queryType,
  ) => Promise<PlaylistsResponse>;

  getFavourites: (userId: string, query: queryType) => Promise<TracksResponse>;

  addToFavourites: (userId: string, trackId: string) => Promise<void>;

  addToHistory: (userId: string, trackId: string) => Promise<void>;

  removeFromFavourites: (userId: string, trackId: string) => Promise<void>;

  getRecommendations: (data: queryType) => Promise<TracksResponse>;

  getHistory: (userId: string, query: queryType) => Promise<TracksResponse>;

  updateUser: (userId: string, data: UpdateUserDTO) => Promise<FormattedUser>;

  removeUser: (userId: string) => Promise<void>;
};

export interface IUserRepository {
  findById(userId: string): Promise<User>;

  findPlaylists(
    userId: string,
    options?: queryType,
  ): Promise<FindAllPlaylistsResult>;

  getFavourites(userId: string, options?: queryType): Promise<FindTracksResult>;

  addToFavourites(userId: string, trackId: string): Promise<void>;

  addToHistory(userId: string, trackId: string): Promise<void>;

  removeFromFavourites(userId: string, trackId: string): Promise<void>;

  getHistory(userId: string, options?: queryType): Promise<FindTracksResult>;

  updateUser(userId: string, data: UpdateUserDTO): Promise<User>;

  removeUser(userId: string): Promise<void>;
}
