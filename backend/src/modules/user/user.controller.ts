import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";
import type { addToFavouritesType } from "@/types/track/track.js";
import type { updateUserType, UserServiceType } from "@/types/user/user.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  constructor(private userService: UserServiceType) {}

  getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.getUser("");

    return reply.send(result);
  };

  getPlaylists = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.userService.getPlaylists("", request);

    return reply.send(result);
  };

  getFavourites = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.userService.getFavourites("", request);

    return reply.send(result);
  };

  addToFavourites = async (
    request: FastifyRequest<{ Body: addToFavouritesType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.userService.addToFavourites("", "");

    return reply.code(201).send(result);
  };

  removeFromFavourites = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.userService.removeFromFavourites("", "");

    return reply.send(result);
  };

  getHistory = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.userService.getHistory("", request);

    return reply.send(result);
  };

  updateUser = async (
    request: FastifyRequest<{ Body: updateUserType; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const result = await this.userService.updateUser("", request.body);

    return reply.send(result);
  };

  removeUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const result = await this.userService.removeUser("");

    return reply.send(result);
  };
}
