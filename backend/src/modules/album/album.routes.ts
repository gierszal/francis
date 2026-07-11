import type { FastifyInstance } from "fastify";
import { AlbumController } from "./album.controller.js";
import { AlbumService } from "./album.service.js";

import {
  addToCollectionSchema,
  createAlbumSchema,
  removeFromCollectionSchema,
  updateAlbumSchema,
} from "../../schemas/album/album.schema.js";
import { AlbumRepository } from "@/repositories/prisma/album.repository.js";
import { normalizeAlbumMultipartBody } from "@/middlewares/normalize.middleware.js";
import type {
  AddToCollectionDTO,
  CreateAlbumDTO,
  RemoveFromCollectionDTO,
  UpdateAlbumDTO,
} from "@/types/album/index.js";
import { FileService } from "@/services/fileService.js";
import type { paramsType, queryType } from "@/types/common/index.js";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import {
  albumResponseSchema,
  albumsReponseSchema,
  detailedAlbumResponseSchema,
} from "@/schemas/album/index.js";
import { errorResponseSchema } from "@/schemas/common/error.schema.js";
type optionsType = {
  prefix: string;
};
import {
  emptyResponseSchema,
  paramsSchema,
  querySchema,
} from "@/schemas/common/index.js";
import { validatePart } from "@/middlewares/validate.middleware.js";

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
        querystring: querySchema,
        response: {
          200: albumsReponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
    },
    albumController.getAlbums,
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Get album by id",
        tags: ["Albums"],
        params: paramsSchema,
        response: {
          200: detailedAlbumResponseSchema,
          404: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
    },
    albumController.getAlbum,
  );

  fastify.post<{ Body: CreateAlbumDTO }>(
    "/",
    {
      schema: {
        description: "Создать альбом (только ADMIN)",
        tags: ["Albums"],
        // consumes: ["multipart/form-data"],
        response: {
          201: albumResponseSchema,
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
        validatePart({ body: createAlbumSchema }),
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
        params: paramsSchema,
        response: {
          200: albumResponseSchema,
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
        validatePart({ body: updateAlbumSchema }),
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
        params: paramsSchema,
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
      preHandler: [authMiddleware, requireRole(ROLES.ADMIN.name)],
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
        params: addToCollectionSchema,
        response: {
          200: emptyResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, requireRole(ROLES.ADMIN.name)],
    },
    albumController.addToCollection,
  );

  fastify.delete<{ Params: RemoveFromCollectionDTO }>(
    "/:albumId/collections/:collectionId",
    {
      schema: {
        description:
          "Add album to collection. Only admin may access this route",
        tags: ["Albums"],
        params: removeFromCollectionSchema,
        response: {
          200: emptyResponseSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          404: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [authMiddleware, requireRole(ROLES.ADMIN.name)],
    },
    albumController.removeFromCollection,
  );
};

export default albumRoutes;
