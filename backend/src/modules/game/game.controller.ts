import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  CreateGameDTO,
  UpdateGameDTO,
  IGameService,
} from "../../types/game/index.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";
import { BadRequestError } from "@/errors/ApiError.js";

export class GameController {
  constructor(private gameService: IGameService) {}

  public getGame = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const game = await this.gameService.getGame(id);
    reply.send({ data: game });
  };

  public getGames = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const opts = request.query;
    const games = await this.gameService.getGames(opts);
    reply.send(games);
  };

  public createGame = async (
    request: FastifyRequest<{ Body: CreateGameDTO }>,
    reply: FastifyReply,
  ) => {
    const pic = request.body.picture;
    const data = request.body;
    if (!pic) throw new BadRequestError("The file is not provided!");
    const game = await this.gameService.createGame(data, pic);
    reply.code(201).send({ data: game });
  };

  public updateGame = async (
    request: FastifyRequest<{ Body: UpdateGameDTO; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const { id } = request.params;
    const pic = request.body.picture;
    if (!id) throw new BadRequestError("Game id was not provided!");
    const game = await this.gameService.updateGame(id, data, pic);
    console.log(game);
    reply.send({ data: game });
  };

  public deleteGame = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    if (!id) throw new BadRequestError("Game id was not provided!");
    await this.gameService.deleteGame(id);
    reply.code(204).send();
  };
}
