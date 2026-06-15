import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";
import type { addToFavouritesType } from "@/types/track/track.js";
import type { updateUserType, UserServiceType } from "@/types/user/user.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  constructor(private userService: UserServiceType) {}

  getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const id = request?.user?.id;
    if (!id)
      return reply
        .code(404)
        .send({ message: "User with this id does not exist!" });

    const user = await this.userService.getUser(id);
    return reply.send({ user });
  };

  getPlaylists = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const query = request.query;
    if (!id)
      return reply.code(404).send({ message: "User id was not provided!" });

    const playlists = await this.userService.getPlaylists(id, query);
    return reply.send({ playlists });
  };

  getFavourites = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const data = request.params;
    if (!id)
      return reply.code(401).send({ message: "User id was not provided!" });
    const result = await this.userService.getFavourites(id, data);
    return reply.send(result);
  };

  addToFavourites = async (
    request: FastifyRequest<{ Params: addToFavouritesType }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const { trackId } = request.params;
    if (!id || !trackId)
      return reply
        .code(400)
        .send("Either track id or user id is not provided!");

    const result = await this.userService.addToFavourites(id, trackId);
    return reply.code(201).send(result);
  };

  addToHistory = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const userId = request?.user?.id;
    const { id } = request.params;
    if (!id || !userId)
      return reply
        .code(400)
        .send("Either track id or user id is not provided!");

    const result = await this.userService.addToHistory(userId, id);
    return reply.code(201).send(result);
  };

  removeFromFavourites = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const userId = request?.user?.id;
    const { id } = request.params;
    if (!userId || !id)
      return reply
        .code(400)
        .send("Either track id or user id is not provided!");

    const result = await this.userService.removeFromFavourites(userId, id);

    return reply.send(result);
  };

  getHistory = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const data = request.params;

    if (!id)
      return reply.code(401).send({ message: "User id was not provided!" });

    const result = await this.userService.getHistory(id, data);

    return reply.send(result);
  };

  updateUser = async (
    request: FastifyRequest<{ Body: updateUserType }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const data = request.body;
    if (!id)
      return reply.code(401).send({ message: "User id was not provided!" });

    const result = await this.userService.updateUser(id, data);

    return reply.send(result);
  };

  removeUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const id = request?.user?.id;
    if (!id)
      return reply.code(401).send({ message: "User id was not provided!" });

    const result = await this.userService.removeUser(id);

    return reply.send(result);
  };
}
