import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  AddToAlbumDTO,
  AddToPlaylistDTO,
  CreateTrackDTO,
  ITrackService,
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
    reply.send(tracks);
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
    if (!id || !audio)
      throw new BadRequestError("Either the audio or id was not found!");
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
    reply.send({ data: track });
  };

  public addToPlaylist = async (
    request: FastifyRequest<{ Params: AddToPlaylistDTO }>,
    reply: FastifyReply,
  ) => {
    const data = request.params;
    await this.trackService.addToPlaylist(data);
    reply.code(204).send();
  };
}
