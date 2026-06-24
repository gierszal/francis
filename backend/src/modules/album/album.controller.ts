import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  AddToCollectionDTO,
  CreateAlbumDTO,
  IAlbumService,
  UpdateAlbumDTO,
} from "@/types/album/index.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";
import { BadRequestError, NotFoundError } from "@/errors/ApiError.js";

export class AlbumController {
  constructor(private albumService: IAlbumService) {}

  public getAlbum = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const album = await this.albumService.getAlbum(id);
    if (!album) throw new NotFoundError(`Album with id ${id} not found`);
    reply.send({ data: album });
  };

  public getAlbums = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const opts = request.query;
    const data = await this.albumService.getAlbums(opts);
    reply.send(data);
  };

  public createAlbum = async (
    request: FastifyRequest<{ Body: CreateAlbumDTO }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const pic = request.body.picture;
    if (!pic) throw new BadRequestError("The file is not provided!");
    const album = await this.albumService.createAlbum(data, pic);
    reply.code(201).send({ data: album });
  };

  public updateAlbum = async (
    request: FastifyRequest<{ Body: UpdateAlbumDTO; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const { id } = request.params;
    const pic = request.body.picture;
    const album = await this.albumService.updateAlbum(id, data, pic);
    reply.send({ data: album });
  };

  public deleteAlbum = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    if (!id) throw new BadRequestError("Album id was not provided!");
    await this.albumService.deleteAlbum(id);
    reply.code(204).send();
  };

  public addToCollection = async (
    request: FastifyRequest<{ Params: AddToCollectionDTO }>,
    reply: FastifyReply,
  ) => {
    const data = request.params;
    await this.albumService.addToCollection(data);
    reply.code(204).send();
  };
}
