import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { UserController } from "./user.controller.js";
import { UserService } from "./user.service.js";

import { updateUserSchema } from "../../schemas/user/user.schema.js";
import { UserRepository } from "@/repositories/prisma/user.repository.js";
import { querySchema } from "@/schemas/common/query.schema.js";
import { addToFavouritesSchema } from "@/schemas/track/track.schema.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import type { queryType } from "@/types/common/query.js";
import type { paramsType } from "@/types/common/params.js";
import type { UpdateUserDTO, AddToFavoritesDTO } from "@/types/user/index.js";
import {
  emptyResponseSchema,
  errorResponseSchema,
} from "@/schemas/common/index.js";
import { tracksResponseSchema } from "@/schemas/track/index.js";
import z from "zod";
import { userItemSchema } from "@/schemas/user/index.js";
import { playlistListSchema } from "@/schemas/playlist/index.js";

type optionsType = {
  prefix: string;
};

const userRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  const controller = new UserController(userService);

  fastify.get(
    "/me",
    {
      schema: {
        description: "Retrieve the profile of the currently authenticated user",
        tags: ["Users"],
        response: {
          200: userItemSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: authMiddleware,
    },
    controller.getUser,
  );

  fastify.get<{ Querystring: queryType }>(
    "/recommendations",
    {
      schema: {
        description: "Get tracks ",
        tags: ["Users"],
        response: {
          201: tracksResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, validate({ params: paramsSchema })],
    },
    controller.getRecommendations,
  );

  fastify.get<{ Querystring: queryType }>(
    "/me/playlists",
    {
      schema: {
        description: "Retrieve paginated list of playlists owned by the user",
        tags: ["Users"],
        querystring: z.toJSONSchema(querySchema),
        response: {
          200: playlistListSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, validate({ query: querySchema })],
    },
    controller.getPlaylists,
  );

  fastify.get<{ Querystring: queryType }>(
    "/me/favourites",
    {
      schema: {
        description:
          "Retrieve a paginated list of tracks the user marked as favourite",
        tags: ["Users"],
        querystring: z.toJSONSchema(querySchema),
        response: {
          200: tracksResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, validate({ query: querySchema })],
    },
    controller.getFavourites,
  );

  fastify.post<{ Params: AddToFavoritesDTO }>(
    "/me/favourites/:trackId",
    {
      schema: {
        description: "Add a track to the authenticated user's favourites list",
        tags: ["Users"],
        params: z.toJSONSchema(addToFavouritesSchema),
        response: {
          201: { description: "Track added to favourites", type: "null" },
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
      preHandler: [authMiddleware, validate({ params: addToFavouritesSchema })],
    },
    controller.addToFavourites,
  );

  fastify.delete<{ Params: paramsType }>(
    "/me/favourites/:id",
    {
      schema: {
        description:
          "Remove a track from the user's favourites list (by Favourite record ID)",
        tags: ["Users"],
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
      preHandler: [authMiddleware, validate({ params: paramsSchema })],
    },
    controller.removeFromFavourites,
  );

  fastify.post<{ Params: paramsType }>(
    "/me/history/:id",
    {
      schema: {
        description:
          "Record that the authenticated user listened to a track (adds it to history)",
        tags: ["Users"],
        params: z.toJSONSchema(paramsSchema),
        querystring: z.toJSONSchema(querySchema),
        response: {
          201: { description: "History entry created", type: "null" },
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, validate({ query: querySchema })],
    },
    controller.addToHistory,
  );

  fastify.get<{ Querystring: queryType }>(
    "/me/history",
    {
      schema: {
        description:
          "Retrieve a paginated list of tracks the user has listened to",
        tags: ["Users"],
        querystring: z.toJSONSchema(querySchema),
        response: {
          200: tracksResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, validate({ query: querySchema })],
    },
    controller.getHistory,
  );

  fastify.patch<{ Body: UpdateUserDTO }>(
    "/me",
    {
      schema: {
        description: "Update fields of the authenticated user's profile",
        tags: ["Users"],
        body: z.toJSONSchema(updateUserSchema),
        response: {
          200: userItemSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, validate({ body: updateUserSchema })],
    },
    controller.updateUser,
  );

  fastify.delete(
    "/me",
    {
      schema: {
        description: "Remove user's profile",
        tags: ["Users"],
        response: {
          204: emptyResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    controller.removeUser,
  );
};

export default userRoutes;
