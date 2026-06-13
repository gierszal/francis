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

type optionsType = {
  prefix: string;
};

const albumRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const albumRepository = new AlbumRepository();
  const albumService = new AlbumService(albumRepository);
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

  fastify.post(
    "/",
    { preHandler: [validate({ body: createAlbumSchema })] },
    albumController.createAlbum,
  );

  fastify.put(
    "/:id",
    {
      preHandler: [validate({ body: updateAlbumSchema, params: paramsSchema })],
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
