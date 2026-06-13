import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { GameController } from "./game.controller.js";
import { GameService } from "./game.service.js";
import { GameRepository } from "@/repositories/prisma/game.repository.js";

import {
  createGameSchema,
  updateGameSchema,
} from "../../schemas/game.schema.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { querySchema } from "@/schemas/common/query.schema.js";

type optionsType = {
  prefix: string;
};

const gameRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const gameRepository = new GameRepository();
  const gameService = new GameService(gameRepository);
  const gameController = new GameController(gameService);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: querySchema })],
    },
    gameController.getGames,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    gameController.getGame,
  );

  fastify.post(
    "/",
    { preHandler: [validate({ body: createGameSchema })] },
    gameController.createGame,
  );

  fastify.put(
    "/:id",
    {
      preHandler: [validate({ body: updateGameSchema, params: paramsSchema })],
    },
    gameController.updateGame,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    gameController.deleteGame,
  );
};

export default gameRoutes;
