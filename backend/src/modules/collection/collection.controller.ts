import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  ICollectionService,
  CreateCollectionDTO,
  UpdateCollectionDTO,
} from "../../types/collection/index.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";
import { BadRequestError } from "@/errors/ApiError.js";

export class CollectionController {
  constructor(private collectionService: ICollectionService) {}

  public getCollection = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    if (!id) throw new BadRequestError("Collection id was not provided!");
    const collection = await this.collectionService.getCollection(id);
    reply.send({ data: collection });
  };

  public getCollections = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const opts = request.query;
    const collections = await this.collectionService.getCollections(opts);
    reply
      .header("x-total-count", collections.meta.total.toString())
      .send(collections);
  };

  public createCollection = async (
    request: FastifyRequest<{ Body: CreateCollectionDTO }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const collection = await this.collectionService.createCollection(data);
    reply.code(201).send({ data: collection });
  };

  public updateCollection = async (
    request: FastifyRequest<{ Body: UpdateCollectionDTO; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const { id } = request.params;
    if (!id) throw new BadRequestError("Collection id was not provided!");
    const collection = await this.collectionService.updateCollection(id, data);
    reply.send({ data: collection });
  };

  public deleteCollection = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    if (!id) throw new BadRequestError("Collection id was not provided!");
    await this.collectionService.deleteCollection(id);
    reply.code(204).send();
  };
}
