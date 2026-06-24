import { BadRequestError } from "@/errors/ApiError.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";
import type {
  AddToFavoritesDTO,
  IUserService,
  UpdateUserDTO,
} from "@/types/user/index.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export class UserController {
  constructor(private userService: IUserService) {}

  getUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const id = request?.user?.id;
    if (!id) throw new BadRequestError("User id was not provided!");
    const user = await this.userService.getUser(id);
    return reply.send({ data: user });
  };

  getPlaylists = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const query = request.query;
    if (!id) throw new BadRequestError("User id was not provided!");

    const playlists = await this.userService.getPlaylists(id, query);
    return reply.send(playlists);
  };

  getFavourites = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const data = request.query;
    if (!id) throw new BadRequestError("User id was not provided!");
    const favourites = await this.userService.getFavourites(id, data);
    return reply.send(favourites);
  };

  addToFavourites = async (
    request: FastifyRequest<{ Params: AddToFavoritesDTO }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const { trackId } = request.params;
    if (!id || !trackId)
      throw new BadRequestError("Either track id or user id is not provided!");
    await this.userService.addToFavourites(id, trackId);
    return reply.code(204).send();
  };

  addToHistory = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const userId = request?.user?.id;
    const { id } = request.params;
    if (!id || !userId)
      throw new BadRequestError("Either track id or user id is not provided!");
    await this.userService.addToHistory(userId, id);
    return reply.code(204).send();
  };

  removeFromFavourites = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const userId = request?.user?.id;
    const { id } = request.params;
    if (!userId || !id)
      throw new BadRequestError("Either track id or user id is not provided!");
    await this.userService.removeFromFavourites(userId, id);
    return reply.code(204).send();
  };

  public getRecommendations = (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const { count, offset } = request.query;
    reply.send({
      data: [],
      meta: {
        total: 0,
        count: 10,
        offset: 0,
      },
    });
  };

  getHistory = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const data = request.query;
    if (!id) throw new BadRequestError("User id was not provided!");
    const history = await this.userService.getHistory(id, data);
    return reply.send(history);
  };

  updateUser = async (
    request: FastifyRequest<{ Body: UpdateUserDTO }>,
    reply: FastifyReply,
  ) => {
    const id = request?.user?.id;
    const data = request.body;
    if (!id) throw new BadRequestError("User id was not provided!");

    const user = await this.userService.updateUser(id, data);

    return reply.send({ data: user });
  };

  removeUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const id = request?.user?.id;
    if (!id) throw new BadRequestError("User id was not provided!");

    await this.userService.removeUser(id);

    return reply.code(204).send();
  };
}
