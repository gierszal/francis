import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  CreatePlaylistDTO,
  UpdatePlaylistDTO,
  IPlaylistService,
} from "@/types/playlist/index.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";
import { BadRequestError } from "@/errors/ApiError.js";

export class PlaylistController {
  constructor(private playlistService: IPlaylistService) {}

  public getPlaylist = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const user = request.user;
    if (!user) throw new BadRequestError("User is not defined!");
    const playlist = await this.playlistService.getPlaylist(id, user);
    reply.send({ data: playlist });
  };

  public getPlaylists = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const opts = request.query;
    const playlists = await this.playlistService.getPlaylists(opts);
    reply.send(playlists);
  };

  public createPlaylist = async (
    request: FastifyRequest<{ Body: CreatePlaylistDTO }>,
    reply: FastifyReply,
  ) => {
    const id = request.user?.id;
    if (!id) throw new BadRequestError("User id was not provided!");
    const data = request.body;
    const playlist = await this.playlistService.createPlaylist(id, data);
    reply.code(201).send({ data: playlist });
  };

  public updatePlaylist = async (
    request: FastifyRequest<{ Body: UpdatePlaylistDTO; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const user = request.user;
    if (!user) throw new BadRequestError("User is not defined!");
    const { id } = request.params;
    const playlist = await this.playlistService.updatePlaylist(id, user, data);
    reply.send({ data: playlist });
  };

  public deletePlaylist = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const user = request.user;
    if (!user) throw new BadRequestError("User is not defined!");
    await this.playlistService.deletePlaylist(id, user);
    reply.code(204).send();
  };
}
