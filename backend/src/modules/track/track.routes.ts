import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { TrackController } from "./track.controller.js";
import { TrackService } from "./track.service.js";
import { TrackRepository } from "@/repositories/prisma/track.repository.js";

import {
  addToAlbumSchema,
  addToPlaylistSchema,
  createTrackSchema,
  updateTrackSchema,
} from "../../schemas/track.schema.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { querySchema } from "@/schemas/common/query.schema.js";
import { normalizeTrackMultipartBody } from "@/middlewares/normalize.middleware.js";
import type { createTrackType, updateTrackType } from "@/types/track/track.js";
import type { paramsType } from "@/types/common/params.js";
import { FileService } from "@/services/fileService.js";

type optionsType = {
  prefix: string;
};

const trackRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const trackRepository = new TrackRepository();
  const fileService = new FileService();
  const service = new TrackService(trackRepository, fileService);
  const controller = new TrackController(service);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: querySchema })],
    },
    controller.getTracks,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.getTrack,
  );

  fastify.post<{ Body: createTrackType }>(
    "/",
    {
      preHandler: [
        normalizeTrackMultipartBody,
        validate({ body: createTrackSchema }),
      ],
    },
    controller.createTrack,
  );

  fastify.put<{ Body: updateTrackType; Params: paramsType }>(
    "/:id",
    {
      preHandler: [
        normalizeTrackMultipartBody,
        validate({ body: updateTrackSchema, params: paramsSchema }),
      ],
    },
    controller.updateTrack,
  );

  fastify.post(
    "/:id/listens",
    { preHandler: [validate({ params: paramsSchema })] },
    controller.listenIncrement,
  );

  fastify.get("/recommendations", controller.getRecommendations);

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.deleteTrack,
  );

  fastify.post(
    "/:trackId/albums/:albumId",
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
