import { ProtectedUserDTO } from "@/DTO/userDTO.js";
import type { queryType } from "@/types/common/query.js";
import type {
  updateUserType,
  UserRepositoryType,
  UserServiceType,
} from "@/types/user/user.js";

export class UserService implements UserServiceType {
  constructor(private userRepository: UserRepositoryType) {}

  async getUser(userId: string) {
    return await this.userRepository.findById(userId);
  }

  async getPlaylists(userId: string, query: queryType) {
    return await this.userRepository.findPlaylists(userId, query);
  }

  async getFavourites(userId: string, query: queryType) {
    return await this.userRepository.getFavourites(userId, query);
  }

  async addToFavourites(userId: string, trackId: string) {
    return await this.userRepository.addToFavourites(userId, trackId);
  }

  async removeFromFavourites(userId: string, trackId: string) {
    await this.userRepository.removeFromFavourites(userId, trackId);

    return {
      success: true,
    };
  }

  async getHistory(userId: string, query: queryType) {
    return this.userRepository.getHistory(userId, query);
  }

  async addToHistory(userId: string, trackId: string) {
    return this.userRepository.addToHistory(userId, trackId);
  }

  async updateUser(userId: string, data: updateUserType) {
    return await this.userRepository.updateUser(userId, data);
  }

  async removeUser(userId: string) {
    await this.userRepository.removeUser(userId);

    return {
      success: true,
    };
  }
}
