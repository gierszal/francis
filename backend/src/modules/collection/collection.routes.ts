import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { collectionController } from "./collection.controller.js";
import { CollectionService } from "./collection.service.js";

import {
  collectionParamsSchema,
  collectionQuerySchema,
  createCollectionSchema,
  searchCollectionSchema,
  updateCollectionSchema,
} from "../../schemas/collection.schema.js";
import { CollectionRepository } from "@/repositories/prisma/collection.repository.js";

type optionsType = {
  prefix: string;
};

const collectionRoutes = (fastify: FastifyInstance, _options: optionsType) => {
  const collectionRepository = new CollectionRepository();
  const collectionService = new CollectionService(collectionRepository);
  const controller = new collectionController(collectionService);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: collectionQuerySchema })],
    },
    controller.getCollections,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: collectionParamsSchema })],
    },
    controller.getCollection,
  );

  fastify.post(
    "/",
    { preHandler: [validate({ body: createCollectionSchema })] },
    controller.createCollection,
  );

  fastify.put(
    "/",
    { preHandler: [validate({ body: updateCollectionSchema })] },
    controller.updateCollection,
  );

  fastify.get(
    "/search",
    { preHandler: [validate({ query: searchCollectionSchema })] },
    controller.searchCollection,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: collectionParamsSchema })],
    },
    controller.deleteCollection,
  );
};

export default collectionRoutes;
