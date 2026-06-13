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

  public getGame = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const game = await this.gameService.getGame(id);
    if (!game) {
      return reply.status(404).send({
        error: "Not Found",
        message: `Game with id ${id} not found`,
      });
    }
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
    request: FastifyRequest<{ Body: createGameType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const game = await this.gameService.createGame(data);
    reply.send({ data: game });
  };

  public updateGame = async (
    request: FastifyRequest<{ Body: updateGameType; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const data = request.body;
      const { id } = request.params;
      const game = await this.gameService.updateGame(id, data);
      reply.send({ data: game });
    } catch (err: any) {
      if (err.message?.includes("not found")) {
        return reply.status(404).send({
          error: "Not Found",
          message: err.message,
        });
      }
      throw err;
    }
  };

  public deleteGame = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const { id } = request.params;
      const game = await this.gameService.deleteGame(id);
      reply.send({ game });
    } catch (err: any) {
      if (err.message?.includes("not found")) {
        return reply.status(404).send({
          error: "Not Found",
          message: err.message,
        });
      }
      throw err;
    }
  };
}
