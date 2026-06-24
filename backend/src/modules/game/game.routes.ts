import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { GameController } from "./game.controller.js";
import { GameService } from "./game.service.js";
import { GameRepository } from "@/repositories/prisma/game.repository.js";

import {
  createGameSchema,
  updateGameSchema,
} from "../../schemas/game/game.schema.js";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import type { CreateGameDTO, UpdateGameDTO } from "@/types/game/game.dto.js";
import z from "zod";
import { gameItemSchema, gameListSchema } from "@/schemas/game/index.js";
import {
  emptyResponseSchema,
  errorResponseSchema,
  paramsSchema,
  querySchema,
} from "@/schemas/common/index.js";
import type { paramsType } from "@/types/common/index.js";

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
      schema: {
        description: "Retrieve a paginated list of games",
        tags: ["Games"],
        querystring: z.toJSONSchema(querySchema),
        response: {
          200: gameListSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
      preHandler: [validate({ query: querySchema })],
    },
    gameController.getGames,
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Retrieve a single game by its UUID",
        tags: ["Games"],
        params: z.toJSONSchema(paramsSchema),
        response: {
          200: gameItemSchema,
          404: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
      preHandler: [validate({ params: paramsSchema })],
    },
    gameController.getGame,
  );

  fastify.post<{ Body: CreateGameDTO }>(
    "/",
    {
      schema: {
        description: "Create a new game (ADMIN role required)",
        tags: ["Games"],
        body: z.toJSONSchema(createGameSchema),
        response: {
          201: gameItemSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [
        authMiddleware,
        requireRole(ROLES.ADMIN.name),
        validate({ body: createGameSchema }),
      ],
    },
    gameController.createGame,
  );

  fastify.put<{ Body: UpdateGameDTO; Params: paramsType }>(
    "/:id",
    {
      schema: {
        description: "Update an existing game (ADMIN role required)",
        tags: ["Games"],
        params: z.toJSONSchema(paramsSchema),
        body: z.toJSONSchema(updateGameSchema),
        response: {
          200: gameItemSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [
        authMiddleware,
        requireRole(ROLES.ADMIN.name),
        validate({ body: updateGameSchema, params: paramsSchema }),
      ],
    },
    gameController.updateGame,
  );

  fastify.delete<{ Params: paramsType }>(
    "/:id",
    {
      schema: {
        description: "Delete a game (ADMIN role required)",
        tags: ["Games"],
        params: z.toJSONSchema(paramsSchema),
        response: {
          204: emptyResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [
        authMiddleware,
        requireRole(ROLES.ADMIN.name),
        validate({ params: paramsSchema }),
      ],
    },
    gameController.deleteGame,
  );
};

export default gameRoutes;
