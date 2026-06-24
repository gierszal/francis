import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { AlbumController } from "./album.controller.js";
import { AlbumService } from "./album.service.js";

import {
  addToCollectionSchema,
  createAlbumDocSchema,
  createAlbumSchema,
  updateAlbumDocSchema,
  updateAlbumSchema,
} from "../../schemas/album/album.schema.js";
import { AlbumRepository } from "@/repositories/prisma/album.repository.js";
import { normalizeAlbumMultipartBody } from "@/middlewares/normalize.middleware.js";
import type {
  AddToCollectionDTO,
  CreateAlbumDTO,
  UpdateAlbumDTO,
} from "@/types/album/index.js";
import { FileService } from "@/services/fileService.js";
import type { paramsType, queryType } from "@/types/common/index.js";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import { albumItemSchema, albumListSchema } from "@/schemas/album/index.js";
import { errorResponseSchema } from "@/schemas/common/error.schema.js";
type optionsType = {
  prefix: string;
};
import z from "zod";
import {
  emptyResponseSchema,
  paramsSchema,
  querySchema,
} from "@/schemas/common/index.js";

const albumRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const albumRepository = new AlbumRepository();
  const fileService = new FileService();
  const albumService = new AlbumService(albumRepository, fileService);
  const albumController = new AlbumController(albumService);
  fastify.get(
    "/",
    {
      schema: {
        description: "Get all albums",
        tags: ["Albums"],
        querystring: z.toJSONSchema(querySchema),
        response: {
          200: albumListSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
      preHandler: [validate({ query: querySchema })],
    },
    albumController.getAlbums,
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Get album by id",
        tags: ["Albums"],
        params: z.toJSONSchema(paramsSchema),
        response: {
          200: albumItemSchema,
          404: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
      preHandler: [validate({ params: paramsSchema })],
    },
    albumController.getAlbum,
  );

  fastify.post<{ Body: CreateAlbumDTO }>(
    "/",
    {
      schema: {
        description: "Создать альбом (только ADMIN)",
        tags: ["Albums"],
        consumes: ["multipart/form-data"],
        body: z.toJSONSchema(createAlbumDocSchema),
        response: {
          201: albumItemSchema,
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
        normalizeAlbumMultipartBody,
        authMiddleware,
        requireRole(ROLES.ADMIN.name),
        validate({ body: createAlbumSchema }),
      ],
    },
    albumController.createAlbum,
  );

  fastify.put<{ Body: UpdateAlbumDTO; Params: paramsType }>(
    "/:id",
    {
      schema: {
        description: "Обновить данные альбома (только ADMIN)",
        tags: ["Albums"],
        params: z.toJSONSchema(paramsSchema),
        body: z.toJSONSchema(updateAlbumDocSchema),
        response: {
          200: albumItemSchema,
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
        normalizeAlbumMultipartBody,
        authMiddleware,
        requireRole(ROLES.ADMIN.name),
        validate({ body: updateAlbumSchema, params: paramsSchema }),
      ],
    },
    albumController.updateAlbum,
  );

  fastify.delete<{ Params: paramsType }>(
    "/:id",
    {
      schema: {
        description: "Удалить альбом (только ADMIN)",
        tags: ["Albums"],
        params: z.toJSONSchema(paramsSchema),
        response: {
          204: emptyResponseSchema,
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
    albumController.deleteAlbum,
  );

  fastify.post<{ Params: AddToCollectionDTO }>(
    "/:albumId/collections/:collectionId",
    {
      schema: {
        description:
          "Add album to collection. Only admin may access this route",
        tags: ["Albums"],
        params: z.toJSONSchema(addToCollectionSchema),
        response: {
          200: albumItemSchema,
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
        validate({ params: addToCollectionSchema }),
      ],
    },
    albumController.addToCollection,
  );
};

export default albumRoutes;
