import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  createGameType,
  updateGameType,
  GameServiceType,
} from "../../types/game/game.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";

export class GameController {
  constructor(private gameService: GameServiceType) {}

  public getGame = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    return this.gameService.getGame(id);
  };

  public getGames = (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const { count, offset, searchQuery } = request.query;
    return this.gameService.getGames(searchQuery, count, offset);
  };

  public searchGame = (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const { searchQuery, count, offset } = request.query;
    reply.send({
      message: "Search game",
      searchQuery: searchQuery || "",
      count: count || 10,
    });
  };

  public createGame = (
    request: FastifyRequest<{ Body: createGameType }>,
    reply: FastifyReply,
  ) => {
    const { name } = request.body;
    return this.gameService.createGame({
      name,
    });
  };

  public updateGame = (
    request: FastifyRequest<{ Body: updateGameType; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { name } = request.body;
    return this.gameService.updateGame("", {
      name,
    });
  };

  public deleteGame = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    return this.gameService.deleteGame(id);
  };
}
