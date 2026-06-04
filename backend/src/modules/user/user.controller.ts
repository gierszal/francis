import type { UserServiceType } from "./user.service.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  constructor(private userService: UserServiceType) {}
  getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.getUser(request);

    return reply.send(result);
  };

  getPlaylists = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.getPlaylists(request);

    return reply.send(result);
  };

  getPlaylist = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.getPlaylist(request);

    return reply.send(result);
  };

  createPlaylist = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.createPlaylist(request);

    return reply.code(201).send(result);
  };

  deletePlaylist = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.deletePlaylist(request);

    return reply.send(result);
  };

  getFavourites = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.getFavourites(request);

    return reply.send(result);
  };

  addToFavourites = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.addToFavourites(request);

    return reply.code(201).send(result);
  };

  removeFromFavourites = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const result = await this.userService.removeFromFavourites(request);

    return reply.send(result);
  };

  getHistory = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.getHistory(request);

    return reply.send(result);
  };

  updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.updateUser(request);

    return reply.send(result);
  };

  removeUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.removeUser(request);

    return reply.send(result);
  };
}
export type UserControllerType = InstanceType<typeof UserController>;
