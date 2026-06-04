import type { FastifyReply, FastifyRequest } from "fastify";
import type { trackServiceType } from "@/types/track/track.js";
import type {
  addToAlbumType,
  addToPlaylistType,
  createTrackType,
  trackQueryType,
  updateTrackType,
} from "../../types/track/track.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";

class TrackController {
  constructor(private service: trackServiceType) {}
  public getTrack = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Get track with id: ${id}` });
  };

  public getTracks = (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const { count, offset } = request.query;
    reply.send({
      message: "Get all tracks",
      count,
      offset,
    });
  };

  public createTrack = (
    request: FastifyRequest<{ Body: createTrackType }>,
    reply: FastifyReply,
  ) => {
    const { name, artist, picture, audio } = request.body;
    reply.send({
      message: "Track created",
      data: { name, artist, picture, audio },
    });
  };

  public updateTrack = (
    request: FastifyRequest<{ Body: updateTrackType }>,
    reply: FastifyReply,
  ) => {
    const { name, artist, picture, audio } = request.body;
    reply.send({
      message: "Track created",
      data: { name, artist, picture, audio },
    });
  };

  public listenIncrement = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Increment listen count for track: ${id}` });
  };

  public searchTrack = (
    request: FastifyRequest<{ Querystring: queryType }>,
    reply: FastifyReply,
  ) => {
    const { searchQuery, count, offset } = request.query;
    reply.send({
      message: "Search tracks",
      searchQuery: searchQuery || "",
      count: count || 10,
    });
  };

  public deleteTrack = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Delete track with id: ${id}` });
  };

  public addToAlbum = (
    request: FastifyRequest<{ Params: addToAlbumType }>,
    reply: FastifyReply,
  ) => {
    const { trackID, albumID } = request.params;
    reply.send({
      message: `Add track ${trackID} to album ${albumID}`,
    });
  };

  public addToPlaylist = (
    request: FastifyRequest<{ Params: addToPlaylistType }>,
    reply: FastifyReply,
  ) => {
    const { trackID, playlistID } = request.params;
    reply.send({
      message: `Add track ${trackID} to playlist ${playlistID}`,
    });
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

export type trackControllerType = InstanceType<typeof TrackController>;
export { TrackController };
