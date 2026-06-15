import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { AlbumController } from "./album.controller.js";
import { AlbumService } from "./album.service.js";

import {
  addToCollectionSchema,
  createAlbumSchema,
  updateAlbumSchema,
} from "../../schemas/album.schema.js";
import { AlbumRepository } from "@/repositories/prisma/album.repository.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { querySchema } from "@/schemas/common/query.schema.js";
import { normalizeAlbumMultipartBody } from "@/middlewares/normalize.middleware.js";
import type { createAlbumType, updateAlbumType } from "@/types/album/album.js";
import { FileService } from "@/services/fileService.js";
import type { paramsType } from "@/types/common/params.js";

type optionsType = {
  prefix: string;
};

const albumRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const albumRepository = new AlbumRepository();
  const fileService = new FileService();
  const albumService = new AlbumService(albumRepository, fileService);
  const albumController = new AlbumController(albumService);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: querySchema })],
    },
    albumController.getAlbums,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    albumController.getAlbum,
  );

  fastify.post<{ Body: createAlbumType }>(
    "/",
    {
      preHandler: [
        normalizeAlbumMultipartBody,
        validate({ body: createAlbumSchema }),
      ],
    },
    albumController.createAlbum,
  );

  fastify.put<{ Body: updateAlbumType; Params: paramsType }>(
    "/:id",
    {
      preHandler: [
        normalizeAlbumMultipartBody,
        validate({ body: updateAlbumSchema, params: paramsSchema }),
      ],
    },
    albumController.updateAlbum,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    albumController.deleteAlbum,
  );

  fastify.post(
    "/:albumId/collections/:collectionId",
    { preHandler: [validate({ params: addToCollectionSchema })] },
    albumController.addToCollection,
  );
};

export default albumRoutes;
