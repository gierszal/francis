import type { FastifyInstance } from "fastify";
import validate from "../plugins/zod-validator.js";
import { albumController } from "./album.controller.js";
import { albumService } from "./album.service.js";

import {
  addToCollectionSchema,
  albumParamsSchema,
  albumQuerySchema,
  createAlbumSchema,
  searchAlbumSchema,
  updateAlbumSchema,
} from "../schemas/albumSchema.js";

type optionsType = {
  prefix: string;
};

const albumRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const controller = new albumController(albumService);
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
      preHandler: [validate({ params: albumParamsSchema })],
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
    { preHandler: [validate({ query: searchAlbumSchema })] },
    controller.searchAlbum,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: albumParamsSchema })],
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
