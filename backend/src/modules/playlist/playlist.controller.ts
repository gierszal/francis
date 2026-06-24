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
    const userId = request.user?.id;
    if (!userId) throw new BadRequestError("User id was not provided!");
    const playlist = await this.playlistService.getPlaylist(id, userId);
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
    reply.code(201).send(playlist);
  };

  public updatePlaylist = async (
    request: FastifyRequest<{ Body: UpdatePlaylistDTO; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const userId = request.user?.id;
    if (!userId) throw new BadRequestError("User id was not provided!");
    const { id } = request.params;
    const playlist = await this.playlistService.updatePlaylist(
      id,
      userId,
      data,
    );
    reply.send({ data: playlist });
  };

  public deletePlaylist = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const userId = request.user?.id;
    if (!userId) throw new BadRequestError("User id was not provided!");
    await this.playlistService.deletePlaylist(id, userId);
    reply.code(204).send();
  };
}
