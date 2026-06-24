import type { FastifyInstance } from "fastify";
import validate from "../../plugins/zod-validator.js";
import { CollectionController } from "./collection.controller.js";
import { CollectionService } from "./collection.service.js";

import {
  createCollectionSchema,
  updateCollectionSchema,
} from "../../schemas/collection/index.js";
import { CollectionRepository } from "@/repositories/prisma/collection.repository.js";
import { authMiddleware, requireRole } from "@/middlewares/auth.middleware.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import type {
  CreateCollectionDTO,
  UpdateCollectionDTO,
} from "@/types/collection/collection.dto.js";
import type { paramsType } from "@/types/common/index.js";
import z from "zod";
import {
  collectionItemSchema,
  collectionListSchema,
} from "@/schemas/collection/collection.response.schema.js";
import { errorResponseSchema } from "@/schemas/common/error.schema.js";
import {
  emptyResponseSchema,
  paramsSchema,
  querySchema,
} from "@/schemas/common/index.js";
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
      schema: {
        description: "Retrieve a paginated list of collections",
        tags: ["Collections"],
        querystring: z.toJSONSchema(querySchema),
        response: {
          200: collectionListSchema,
          400: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
      preHandler: [validate({ query: querySchema })],
    },
    collectionController.getCollections,
  );

  fastify.get(
    "/:id",
    {
      schema: {
        description: "Retrieve a collection by its UUID",
        tags: ["Collections"],
        params: z.toJSONSchema(paramsSchema),
        response: {
          200: collectionItemSchema,
          404: errorResponseSchema,
          401: errorResponseSchema,
          403: errorResponseSchema,
          500: errorResponseSchema,
          default: errorResponseSchema,
        },
      },
      preHandler: [validate({ params: paramsSchema })],
    },
    collectionController.getCollection,
  );

  fastify.post<{ Body: CreateCollectionDTO }>(
    "/",
    {
      schema: {
        description: "Create a new collection (restricted to ADMIN role)",
        tags: ["Collections"],
        body: z.toJSONSchema(createCollectionSchema),
        response: {
          201: collectionItemSchema,
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
        validate({ body: createCollectionSchema }),
      ],
    },
    collectionController.createCollection,
  );

  fastify.put<{ Body: UpdateCollectionDTO; Params: paramsType }>(
    "/:id",
    {
      schema: {
        description: "Update an existing collection (restricted to ADMIN role)",
        tags: ["Collections"],
        params: z.toJSONSchema(paramsSchema),
        body: z.toJSONSchema(updateCollectionSchema),
        response: {
          200: collectionItemSchema,
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
        authMiddleware,
        requireRole(ROLES.ADMIN.name),
        validate({ body: updateCollectionSchema, params: paramsSchema }),
      ],
    },
    collectionController.updateCollection,
  );

  fastify.delete<{ Params: paramsType }>(
    "/:id",
    {
      schema: {
        description: "Delete a collection (restricted to ADMIN role)",
        tags: ["Collections"],
        params: z.toJSONSchema(paramsSchema),
        response: {
          204: emptyResponseSchema,
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
        validate({ params: paramsSchema }),
      ],
    },
    collectionController.deleteCollection,
  );
};

export default collectionRoutes;
