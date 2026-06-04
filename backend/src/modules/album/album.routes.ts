import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { albumController } from "./album.controller.js";
import { AlbumService } from "./album.service.js";

import {
  addToCollectionSchema,
  albumQuerySchema,
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
  const service = new AlbumService(albumRepository);
  const controller = new albumController(service);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: albumQuerySchema })],
    },
    controller.getAlbums,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.getAlbum,
  );

  fastify.post(
    "/",
    { preHandler: [validate({ body: createAlbumSchema })] },
    controller.createAlbum,
  );

  fastify.put(
    "/",
    { preHandler: [validate({ body: updateAlbumSchema })] },
    controller.updateAlbum,
  );

  fastify.get(
    "/search",
    { preHandler: [validate({ query: querySchema })] },
    controller.searchAlbum,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.deleteAlbum,
  );

  fastify.post(
    "/:albumID/collections/:collectionID",
    { preHandler: [validate({ params: addToCollectionSchema })] },
    controller.addToCollection,
  );
};

export default albumRoutes;
