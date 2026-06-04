import type { FastifyReply, FastifyRequest } from "fastify";
import type { CollectionServiceType } from "./collection.service.js";
import type {
  collectionQueryType,
  createCollectionType,
  updateCollectionType,
} from "../../types/collection/collection.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";

class collectionController {
  constructor(private service: CollectionServiceType) {}
  public getCollection = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Get collection with id: ${id}` });
  };

  public getCollections = (
    request: FastifyRequest<{ Querystring: collectionQueryType }>,
    reply: FastifyReply,
  ) => {
    const { count, offset } = request.query;
    reply.send({
      message: "Get all collections",
      count,
      offset,
    });
  };

  public createCollection = (
    request: FastifyRequest<{ Body: createCollectionType }>,
    reply: FastifyReply,
  ) => {
    const { name } = request.body;
    reply.send({
      message: "Collection created",
      data: { name },
    });
  };

  public updateCollection = (
    request: FastifyRequest<{ Body: updateCollectionType }>,
    reply: FastifyReply,
  ) => {
    const { name } = request.body;
    reply.send({
      message: "Collection updated",
      data: { name },
    });
  };

  public searchCollection = (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const { searchQuery, count } = request.query;
    reply.send({
      message: "Search collections",
      searchQuery: searchQuery || "",
      count: count || 10,
    });
  };

  public deleteCollection = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Delete collection with id: ${id}` });
  };
}

export type collectionControllerType = InstanceType<
  typeof collectionController
>;
export { collectionController };
