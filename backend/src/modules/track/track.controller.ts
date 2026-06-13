import type { FastifyReply, FastifyRequest } from "fastify";
import type { TrackServiceType } from "@/types/track/track.js";
import type {
  addToAlbumType,
  addToPlaylistType,
  createTrackType,
  updateTrackType,
} from "../../types/track/track.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";

export class TrackController {
  constructor(private trackService: TrackServiceType) {}

  public getTrack = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const track = await this.trackService.getTrack(id);
    if (!track) {
      return reply.status(404).send({
        error: "Not Found",
        message: `Track with id ${id} not found`,
      });
    }
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
    request: FastifyRequest<{ Body: createTrackType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const track = await this.trackService.createTrack(data);
    reply.send({ data: track });
  };

  public updateTrack = async (
    request: FastifyRequest<{ Body: updateTrackType; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const data = request.body;
      const { id } = request.params;
      const track = await this.trackService.updateTrack(id, data);
      reply.send({ data: track });
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

  public listenIncrement = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const { id } = request.params;
      await this.trackService.listenIncrement(id);
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

  public deleteTrack = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const { id } = request.params;
      const track = await this.trackService.deleteTrack(id);
      reply.send({ track });
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

  public addToAlbum = async (
    request: FastifyRequest<{ Params: addToAlbumType }>,
    reply: FastifyReply,
  ) => {
    try {
      const data = request.params;
      const track = await this.trackService.addToAlbum(data);
      reply.send({ track });
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

  public addToPlaylist = async (
    request: FastifyRequest<{ Params: addToPlaylistType }>,
    reply: FastifyReply,
  ) => {
    try {
      const data = request.params;
      const result = await this.trackService.addToPlaylist(data);
      reply.send({
        message: result,
      });
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

  public getRecommendations = (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const { count, offset } = request.query;
    reply.send({
      message: "Get track recommendations",
      count,
      offset,
    });
  };
}
