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

type optionsType = {
  prefix: string;
};

const playlistRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const playlistRepository = new PlaylistRepository();
  const playlistService = new PlaylistService(playlistRepository);
  const playlistController = new PlaylistController(playlistService);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: querySchema })],
    },
    playlistController.getPlaylists,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    playlistController.getPlaylist,
  );

  fastify.post(
    "/",
    { preHandler: [validate({ body: createPlaylistSchema })] },
    playlistController.createPlaylist,
  );

  fastify.put(
    "/:id",
    {
      preHandler: [
        validate({ body: updatePlaylistSchema, params: paramsSchema }),
      ],
    },
    playlistController.updatePlaylist,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    playlistController.deletePlaylist,
  );
};

export default playlistRoutes;
