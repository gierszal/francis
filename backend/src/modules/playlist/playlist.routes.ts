import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { playlistController } from "./playlist.controller.js";
import { PlaylistService } from "./playlist.service.js";

import {
  createPlaylistSchema,
  playlistQuerySchema,
  updatePlaylistSchema,
} from "../../schemas/playlist.schema.js";
import { PlaylistRepository } from "@/repositories/prisma/playlist.repository.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { querySchema } from "@/schemas/common/query.schema.js";

type optionsType = {
  prefix: string;
};

const playlistRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const playlistRepository = new PlaylistRepository();
  const playlistService = new PlaylistService(playlistRepository);
  const controller = new playlistController(playlistService);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: playlistQuerySchema })],
    },
    controller.getPlaylists,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.getPlaylist,
  );

  fastify.post(
    "/",
    { preHandler: [validate({ body: createPlaylistSchema })] },
    controller.createPlaylist,
  );

  fastify.put(
    "/",
    { preHandler: [validate({ body: updatePlaylistSchema })] },
    controller.updatePlaylist,
  );

  fastify.get(
    "/search",
    { preHandler: [validate({ query: querySchema })] },
    controller.searchPlaylist,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.deletePlaylist,
  );
};

export default playlistRoutes;
