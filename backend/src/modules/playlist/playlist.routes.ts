import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { PlaylistController } from "./playlist.controller.js";
import { PlaylistService } from "./playlist.service.js";

import {
  createPlaylistSchema,
  updatePlaylistSchema,
} from "../../schemas/playlist/playlist.schema.js";
import { PlaylistRepository } from "@/repositories/prisma/playlist.repository.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { querySchema } from "@/schemas/common/query.schema.js";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware.js";
import type { queryType } from "@/types/common/query.js";
import type { paramsType } from "@/types/common/params.js";
import type {
  CreatePlaylistDTO,
  UpdatePlaylistDTO,
} from "@/types/playlist/index.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import {
  errorResponseSchema,
  emptyResponseSchema,
} from "@/schemas/common/index.js";
import {
  playlistItemSchema,
  playlistListSchema,
} from "@/schemas/playlist/index.js";
import z from "zod";

type optionsType = {
  prefix: string;
};

const playlistRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const playlistRepository = new PlaylistRepository();
  const playlistService = new PlaylistService(playlistRepository);
  const playlistController = new PlaylistController(playlistService);

  fastify.get<{ Querystring: queryType }>(
    "/",
    {
      schema: {
        description:
          "Retrieve a paginated list of playlists - only admin may access this route",
        tags: ["Playlists"],
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
      preHandler: [
        authMiddleware,
        requireRole(ROLES.ADMIN.name),
        validate({ query: querySchema }),
      ],
    },
    playlistController.getPlaylists,
  );

  fastify.get<{ Params: paramsType }>(
    "/:id",
    {
      schema: {
        description: "Retrieve a playlist by its UUID",
        tags: ["Playlists"],
        params: z.toJSONSchema(paramsSchema),
        response: {
          200: playlistItemSchema,
          404: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, validate({ params: paramsSchema })],
    },
    playlistController.getPlaylist,
  );

  fastify.post<{ Body: CreatePlaylistDTO }>(
    "/",
    {
      schema: {
        description:
          "Create a new playlist - user that created this playlist may access this route (and admin). ",
        tags: ["Playlists"],
        body: z.toJSONSchema(createPlaylistSchema),
        response: {
          201: playlistItemSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, validate({ body: createPlaylistSchema })],
    },
    playlistController.createPlaylist,
  );

  fastify.put<{ Body: UpdatePlaylistDTO; Params: paramsType }>(
    "/:id",
    {
      schema: {
        description:
          "Update an existing playlist - user that created this playlist may access this route (and admin)",
        tags: ["Playlists"],
        params: z.toJSONSchema(paramsSchema),
        body: z.toJSONSchema(updatePlaylistSchema),
        response: {
          200: playlistItemSchema,
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
        validate({ body: updatePlaylistSchema, params: paramsSchema }),
      ],
    },
    playlistController.updatePlaylist,
  );

  fastify.delete<{ Params: paramsType }>(
    "/:id",
    {
      schema: {
        description:
          "Delete a playlist - user that created this playlist may access this route (and admin)",
        tags: ["Playlists"],
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
    playlistController.deletePlaylist,
  );
};

export default playlistRoutes;
