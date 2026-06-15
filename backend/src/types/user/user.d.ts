import { createUserSchema, updateUserSchema } from "@/schemas/user.schema.ts";
import type { User } from "@/generated/prisma/client.js";

import { z } from "zod";

export type createUserType = z.infer<typeof createUserSchema>;
export type updateUserType = z.infer<typeof updateUserSchema>;

export type UserServiceType = {
  getUser: (userId: string) => Promise<any>;

  getPlaylists: (userId: string, query: queryType) => Promise<any>;

  getFavourites: (userId: string, query: queryType) => Promise<any>;

  addToFavourites: (userId: string, trackId: string) => Promise<any>;

  addToHistory: (userId: string, trackId: string) => Promise<any>;

  removeFromFavourites: (userId: string, trackId: string) => Promise<any>;

  getHistory: (userId: string, query: queryType) => Promise<any>;

  updateUser: (userId: string, data: updateUserType) => Promise<any>;

  removeUser: (userId: string) => Promise<any>;
};

export type UserRepositoryType = {
  findById(userId: string): Promise<FormattedUser>;
  findPlaylists(
    userId: string,
    options?: queryType,
  ): Promise<FindAllUserPlaylistsResponse>;
  getFavourites(
    userId: string,
    options?: queryType,
  ): Promise<FindAllFavouritesResponse>;
  addToFavourites(
    userId: string,
    trackId: string,
  ): Promise<{ userId: string; trackId: string }>;
  addToHistory(
    userId: string,
    trackId: string,
  ): Promise<{ userId: string; trackId: string }>;
  removeFromFavourites(
    userId: string,
    trackId: string,
  ): Promise<{ userId: string; trackId: string }>;
  getHistory(
    userId: string,
    options?: queryType,
  ): Promise<FindAllHistoryResponse>;
  updateUser(userId: string, data: updateUserType): Promise<FormattedUser>;
  removeUser(userId: string): Promise<FormattedUser>;
};
