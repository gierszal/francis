import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { collectionController } from "./collection.controller.js";
import { CollectionService } from "./collection.service.js";

import {
  collectionQuerySchema,
  createCollectionSchema,
  updateCollectionSchema,
} from "../../schemas/collection.schema.js";
import { CollectionRepository } from "@/repositories/prisma/collection.repository.js";
import { paramsSchema } from "@/schemas/common/params.schema.js";
import { querySchema } from "@/schemas/common/query.schema.js";

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
      preHandler: [validate({ params: paramsSchema })],
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
    { preHandler: [validate({ query: querySchema })] },
    controller.searchCollection,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    controller.deleteCollection,
  );
};

export default collectionRoutes;
