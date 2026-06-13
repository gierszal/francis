import type { FastifyReply, FastifyRequest } from "fastify";
import type { AlbumServiceType } from "../../types/album/album.js";
import type {
  addToCollectionType,
  createAlbumType,
  updateAlbumType,
} from "../../types/album/album.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";

export class AlbumController {
  constructor(private albumService: AlbumServiceType) {}
  public getAlbum = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      return reply.status(404).send({
        error: "Not Found",
        message: `Album with id ${id} not found`,
      });
    }
    reply.send({ data: album });
  };

  public getAlbums = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const opts = request.query;
    const albums = await this.albumService.getAlbums(opts);
    reply.send(albums);
  };

  public createAlbum = async (
    request: FastifyRequest<{ Body: createAlbumType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const album = await this.albumService.createAlbum(data);
    reply.send({ data: album });
  };

  public updateAlbum = async (
    request: FastifyRequest<{ Body: updateAlbumType; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const data = request.body;
      const { id } = request.params;
      const album = await this.albumService.updateAlbum(id, data);
      reply.send({ data: album });
    } catch (err: any) {
      if (err.message?.includes("not found")) {
        return reply.status(404).send({
          error: "Not Found",
          message: err.message,
        });
      }
      throw err;
    }
  };

  public deleteAlbum = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const { id } = request.params;
      const album = await this.albumService.deleteAlbum(id);
      reply.send({ album });
    } catch (err: any) {
      if (err.message?.includes("not found")) {
        return reply.status(404).send({
          error: "Not Found",
          message: err.message,
        });
      }
      throw err;
    }
  };

  public addToCollection = async (
    request: FastifyRequest<{ Params: addToCollectionType }>,
    reply: FastifyReply,
  ) => {
    try {
      const data = request.params;
      await this.albumService.addToCollection(data);
      reply.send({ message: "success" });
    } catch (err: any) {
      if (err.message?.includes("not found")) {
        return reply.status(404).send({
          error: "Not Found",
          message: err.message,
        });
      }
      throw err;
    }
  };
}
