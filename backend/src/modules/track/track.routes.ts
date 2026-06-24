import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { TrackController } from "./track.controller.js";
import { TrackService } from "./track.service.js";
import { TrackRepository } from "@/repositories/prisma/track.repository.js";
import {
  addToAlbumSchema,
  addToPlaylistSchema,
  createTrackDocSchema,
  createTrackSchema,
  detailedTrackResponseSchema,
  trackResponseSchema,
  trackSchema,
  tracksResponseSchema,
  updateTrackDocSchema,
  updateTrackSchema,
} from "../../schemas/track/index.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { querySchema } from "@/schemas/common/query.schema.js";
import { normalizeTrackMultipartBody } from "@/middlewares/normalize.middleware.js";
import type {
  AddToPlaylistDTO,
  CreateTrackDTO,
  UpdateTrackDTO,
} from "@/types/track/index.js";
import type { paramsType } from "@/types/common/params.js";
import { FileService } from "@/services/fileService.js";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import {
  emptyResponseSchema,
  errorResponseSchema,
} from "@/schemas/common/index.js";
import { zodToJsonSchema } from "zod-to-json-schema";
type optionsType = {
  prefix: string;
};
import z, { ZodLazy } from "zod";
import { toJSONSchema } from "zod";

const trackRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const trackRepository = new TrackRepository();
  const fileService = new FileService();
  const service = new TrackService(trackRepository, fileService);
  const controller = new TrackController(service);
  fastify.setValidatorCompiler(() => () => true);
  fastify.get(
    "/",
    {
      schema: {
        description: "Retrieve a paginated list of tracks",
        tags: ["Tracks"],
        querystring: querySchema,
        response: {
          200: tracksResponseSchema,
          404: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
      preHandler: [validate({ query: querySchema })],
    },
    controller.getTracks,
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Retrieve a track by its UUID",
        tags: ["Tracks"],
        params: paramsSchema,
        response: {
          200: detailedTrackResponseSchema,
          404: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.getTrack,
  );

  fastify.post<{ Body: CreateTrackDTO }>(
    "/",
    {
      schema: {
        description: "Create a new track (ADMIN role required)",
        tags: ["Tracks"],
        body: createTrackSchema,
        response: {
          201: trackResponseSchema,
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
        normalizeTrackMultipartBody,
        validate({ body: createTrackSchema }),
      ],
    },
    controller.createTrack,
  );

  // fastify.put<{ Body: UpdateTrackDTO; Params: paramsType }>(
  //   "/:id",
  //   {
  //     schema: {
  //       description: "Update an existing track (ADMIN role required)",
  //       tags: ["Tracks"],
  //       params: paramsSchema,
  //       body: updateTrackDocSchema,
  //       response: {
  //         200: trackSchema,
  //         400: errorResponseSchema,
  //         401: errorResponseSchema,
  //         403: errorResponseSchema,
  //         404: errorResponseSchema,
  //         409: errorResponseSchema,
  //         500: errorResponseSchema,
  //         default: errorResponseSchema,
  //       },
  //       security: [{ bearerAuth: [] }],
  //     },
  //     preHandler: [
  //       authMiddleware,
  //       requireRole(ROLES.ADMIN.name),
  //       normalizeTrackMultipartBody,

  //       validate({ body: updateTrackSchema, params: paramsSchema }),
  //     ],
  //   },
  //   controller.updateTrack,
  // );

  // fastify.post<{ Params: paramsType }>(
  //   "/:id/listens",
  //   {
  //     schema: {
  //       description: "Increment listens amount",
  //       tags: ["Tracks"],
  //       params: paramsSchema,
  //       response: {
  //         204: emptyResponseSchema,
  //         400: errorResponseSchema,
  //         401: errorResponseSchema,
  //         403: errorResponseSchema,
  //         404: errorResponseSchema,
  //         500: errorResponseSchema,
  //         default: errorResponseSchema,
  //       },
  //     },
  //     preHandler: [authMiddleware, validate({ params: paramsSchema })],
  //   },
  //   controller.listenIncrement,
  // );

  // fastify.delete<{ Params: paramsType }>(
  //   "/:id",
  //   {
  //     schema: {
  //       description: "Delete a track (ADMIN role required)",
  //       tags: ["Tracks"],
  //       params: paramsSchema,
  //       response: {
  //         204: emptyResponseSchema,
  //         400: errorResponseSchema,
  //         401: errorResponseSchema,
  //         403: errorResponseSchema,
  //         404: errorResponseSchema,
  //         500: errorResponseSchema,
  //         default: errorResponseSchema,
  //       },
  //       security: [{ bearerAuth: [] }],
  //     },
  //     preHandler: [
  //       authMiddleware,
  //       requireRole(ROLES.ADMIN.name),
  //       validate({ params: paramsSchema }),
  //     ],
  //   },
  //   controller.deleteTrack,
  // );

  // fastify.post<{ Params: AddToPlaylistDTO }>(
  //   "/:trackId/playlist/:playlistId",
  //   {
  //     schema: {
  //       description: "Add track to playlist. Users may access this route",
  //       tags: ["Tracks"],
  //       params: addToPlaylistSchema,
  //       response: {
  //         200: emptyResponseSchema,
  //         400: errorResponseSchema,
  //         401: errorResponseSchema,
  //         403: errorResponseSchema,
  //         404: errorResponseSchema,
  //         500: errorResponseSchema,
  //         default: errorResponseSchema,
  //       },
  //       security: [{ bearerAuth: [] }],
  //     },
  //     preHandler: [
  //       authMiddleware,
  //       requireRole(ROLES.ADMIN.name, ROLES.USER.name),
  //       validate({ params: addToPlaylistSchema }),
  //     ],
  //   },
  //   controller.addToPlaylist,
  // );
};

export default trackRoutes;
