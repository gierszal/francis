import type { FastifyReply, FastifyRequest } from "fastify";
import type { albumServiceType } from "./album.service.js";
import type {
  addToCollectionType,
  albumQueryType,
  createAlbumType,
  updateAlbumType,
} from "../../types/album/album.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";

class albumController {
  constructor(private service: albumServiceType) {}
  public getAlbum = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    return this.service.getAlbum(id);
  };

  public getAlbums = (
    request: FastifyRequest<{ Querystring: albumQueryType }>,
    reply: FastifyReply,
  ) => {
    const { count, offset } = request.query;
    reply.send({
      message: "OK",
    });
  };

  public createAlbum = (
    request: FastifyRequest<{ Body: createAlbumType }>,
    reply: FastifyReply,
  ) => {
    const { name, description, source } = request.body;
    reply.send({
      message: "Album created",
      data: { name, description, source },
    });
  };

  public updateAlbum = (
    request: FastifyRequest<{ Body: updateAlbumType }>,
    reply: FastifyReply,
  ) => {
    const { name, description, source } = request.body;
    reply.send({
      message: "Album created",
      data: { name, description, source },
    });
  };

  public searchAlbum = (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const { searchQuery, count } = request.query;
    reply.send({
      message: "Search albums",
      searchQuery: searchQuery || "",
      count: count || 10,
    });
  };

  public deleteAlbum = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Delete album with id: ${id}` });
  };

  public addToCollection = (
    request: FastifyRequest<{ Params: addToCollectionType }>,
    reply: FastifyReply,
  ) => {
    const { albumID, collectionID } = request.params;
    reply.send({
      message: `Add album ${albumID} to collection ${collectionID}`,
    });
  };
}

export type albumControllerType = InstanceType<typeof albumController>;
export { albumController };
