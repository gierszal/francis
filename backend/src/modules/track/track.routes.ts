import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { TrackController } from "./track.controller.js";
import { TrackService } from "./track.service.js";
import { TrackRepository } from "@/repositories/prisma/track.repository.js";

import {
  addToAlbumSchema,
  addToPlaylistSchema,
  createTrackSchema,
  searchTrackSchema,
  trackParamsSchema,
  trackQuerySchema,
  updateTrackSchema,
} from "../../schemas/track.schema.js";

type optionsType = {
  prefix: string;
};

const trackRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const trackRepository = new TrackRepository();
  const service = new TrackService(trackRepository);
  const controller = new TrackController(service);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: trackQuerySchema })],
    },
    controller.getTracks,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: trackParamsSchema })],
    },
    controller.getTrack,
  );

  fastify.post(
    "/",
    { preHandler: [validate({ body: createTrackSchema })] },
    controller.createTrack,
  );

  fastify.put(
    "/",
    { preHandler: [validate({ body: updateTrackSchema })] },
    controller.updateTrack,
  );

  fastify.post(
    "/:id/listens",
    { preHandler: [validate({ params: trackParamsSchema })] },
    controller.listenIncrement,
  );

  fastify.get(
    "/search",
    { preHandler: [validate({ query: searchTrackSchema })] },
    controller.searchTrack,
  );

  fastify.get(
    "/recommendations",
    { preHandler: [validate({ params: trackParamsSchema })] },
    controller.getRecommendations,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: trackParamsSchema })],
    },
    controller.deleteTrack,
  );

  fastify.post(
    "/:trackID/albums/:albumID",
    { preHandler: [validate({ params: addToAlbumSchema })] },
    controller.addToAlbum,
  );

  fastify.post(
    "/:trackID/playlist/:playlistID",
    { preHandler: [validate({ params: addToPlaylistSchema })] },
    controller.addToPlaylist,
  );
};

export default trackRoutes;
