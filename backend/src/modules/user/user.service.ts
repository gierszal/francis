import type { UserRepository } from "@/repositories/prisma/user.repository.js";
import type { queryType } from "@/types/common/query.js";
import type { updateUserType, UserServiceType } from "@/types/user/user.js";

export class UserService implements UserServiceType {
  constructor(private userRepository: UserRepository) {}

  async getUser(userId: string) {
    return `Hello, World!`;
  }

  async getPlaylists(userId: string, query: queryType) {
    return {
      message: "getPlaylists",
    };
  }

  async getFavourites(userId: string, query: queryType) {
    return {
      message: "getFavourites",
    };
  }

  async addToFavourites(userId: string, trackId: string) {
    return {
      message: "addToFavourites",
    };
  }

  async removeFromFavourites(userId: string, trackId: string) {
    return {
      message: "removeFromFavourites",
    };
  }

  async getHistory(userId: string, query: queryType) {
    return {
      message: "getHistory",
    };
  }

  async updateUser(userId: string, data: updateUserType) {
    return {
      message: "updateUser",
    };
  }

  async removeUser(userId: string) {
    return {
      message: "removeUser",
    };
  }
}
