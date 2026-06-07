import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { CollectionController } from "./collection.controller.js";
import { CollectionService } from "./collection.service.js";

import {
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
  const collectionController = new CollectionController(collectionService);
  fastify.get(
    "/",
    {
      preHandler: [validate({ query: querySchema })],
    },
    collectionController.getCollections,
  );

  fastify.get(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    collectionController.getCollection,
  );

  fastify.post(
    "/",
    { preHandler: [validate({ body: createCollectionSchema })] },
    collectionController.createCollection,
  );

  fastify.put(
    "/:id",
    {
      preHandler: [
        validate({ body: updateCollectionSchema, params: paramsSchema }),
      ],
    },
    collectionController.updateCollection,
  );

  fastify.get(
    "/search",
    { preHandler: [validate({ query: querySchema })] },
    collectionController.searchCollection,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [validate({ params: paramsSchema })],
    },
    collectionController.deleteCollection,
  );
};

export default collectionRoutes;
