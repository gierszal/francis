import type { UserRepository } from "@/repositories/prisma/user.repository.js";
import type { FastifyRequest } from "fastify";

export class UserService {
  constructor(private userRepository: UserRepository) {}
  async getUser(_request: FastifyRequest) {
    return { message: "getUser" };
  }

  async getPlaylists(_request: FastifyRequest) {
    return { message: "getPlaylists" };
  }

  async getPlaylist(_request: FastifyRequest) {
    return { message: "getPlaylist" };
  }

  async createPlaylist(_request: FastifyRequest) {
    return { message: "createPlaylist" };
  }

  async deletePlaylist(_request: FastifyRequest) {
    return { message: "deletePlaylist" };
  }

  async getFavourites(_request: FastifyRequest) {
    return { message: "getFavourites" };
  }

  async addToFavourites(_request: FastifyRequest) {
    return { message: "addToFavourites" };
  }

  async removeFromFavourites(_request: FastifyRequest) {
    return { message: "removeFromFavourites" };
  }

  async getHistory(_request: FastifyRequest) {
    return { message: "getHistory" };
  }

  async updateUser(_request: FastifyRequest) {
    return { message: "updateUser" };
  }

  async removeUser(_request: FastifyRequest) {
    return { message: "removeUser" };
  }
}

export type UserServiceType = InstanceType<typeof UserService>;
