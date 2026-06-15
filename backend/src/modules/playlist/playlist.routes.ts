import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { PlaylistController } from "./playlist.controller.js";
import { PlaylistService } from "./playlist.service.js";

import {
  createPlaylistSchema,
  updatePlaylistSchema,
} from "../../schemas/playlist.schema.js";
import { PlaylistRepository } from "@/repositories/prisma/playlist.repository.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { querySchema } from "@/schemas/common/query.schema.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import type { queryType } from "@/types/common/query.js";
import type { paramsType } from "@/types/common/params.js";
import type {
  createPlaylistType,
  updatePlaylistType,
} from "@/types/playlist/playlist.js";

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
      preHandler: [authMiddleware, validate({ query: querySchema })],
    },
    playlistController.getPlaylists,
  );

  fastify.get<{ Params: paramsType }>(
    "/:id",
    {
      preHandler: [authMiddleware, validate({ params: paramsSchema })],
    },
    playlistController.getPlaylist,
  );

  fastify.post<{ Body: createPlaylistType }>(
    "/",
    { preHandler: [authMiddleware, validate({ body: createPlaylistSchema })] },
    playlistController.createPlaylist,
  );

  fastify.put<{ Body: updatePlaylistType; Params: paramsType }>(
    "/:id",
    {
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
      preHandler: [authMiddleware, validate({ params: paramsSchema })],
    },
    playlistController.deletePlaylist,
  );
};

export default playlistRoutes;
