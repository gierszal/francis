import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  AddToAlbumDTO,
  AddToPlaylistDTO,
  CreateTrackDTO,
  ITrackService,
  RemoveTrackFromPlaylistDTO,
  UpdateTrackDTO,
} from "../../types/track/index.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";
import { BadRequestError, NotFoundError } from "@/errors/ApiError.js";

export class TrackController {
  constructor(private trackService: ITrackService) {}

  public getTrack = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const track = await this.trackService.getTrack(id);
    if (!track) throw new NotFoundError(`Track with id ${id} not found`);
    reply.send({ data: track });
  };

  public getTracks = async (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const opts = request.query;
    const tracks = await this.trackService.getTracks(opts);
    reply.header("x-total-count", tracks.meta.total.toString()).send(tracks);
  };

  public createTrack = async (
    request: FastifyRequest<{ Body: CreateTrackDTO }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const audio = request.body.audio;
    if (!audio) throw new BadRequestError("The audio is not provided!");
    const track = await this.trackService.createTrack(data, audio);
    reply.code(201).send({ data: track });
  };

  public updateTrack = async (
    request: FastifyRequest<{ Body: UpdateTrackDTO; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const { id } = request.params;
    const audio = request.body.audio;
    if (!id) throw new BadRequestError("Track id was not found!");
    const track = await this.trackService.updateTrack(id, data, audio);
    reply.send({ data: track });
  };

  public listenIncrement = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    if (!id) throw new BadRequestError("Track id was not provided!");
    await this.trackService.listenIncrement(id);
    reply.code(204).send();
  };

  public deleteTrack = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    if (!id) throw new BadRequestError("Track id was not provided!");
    const track = await this.trackService.deleteTrack(id);
    reply.code(204).send();
  };

  public removeFromPlaylist = async (
    request: FastifyRequest<{ Params: RemoveTrackFromPlaylistDTO }>,
    reply: FastifyReply,
  ) => {
    const data = request.params;
    if (!data.playlistId || !data.trackId)
      throw new BadRequestError(
        "Either track id or playlist id was not provided!",
      );
    await this.trackService.removeFromPlaylist(data);
    reply.code(204).send();
  };

  public addToPlaylist = async (
    request: FastifyRequest<{ Params: AddToPlaylistDTO }>,
    reply: FastifyReply,
  ) => {
    const data = request.params;
    if (!data.playlistId || !data.trackId)
      throw new BadRequestError(
        "Either track id or playlist id was not provided!",
      );
    await this.trackService.addToPlaylist(data);
    reply.code(204).send();
  };
}
