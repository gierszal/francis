import type { FastifyReply, FastifyRequest } from "fastify";
import type { playlistServiceType } from "./playlist.service.js";
import type {
  playlistParamsType,
  playlistQueryType,
  createPlaylistType,
  searchPlaylistType,
  updatePlaylistType,
} from "../types/playlist/playlist.js";

class playlistController {
  private service: playlistServiceType;
  constructor(service: playlistServiceType) {
    this.service = service;
  }
  public getPlaylist = (
    request: FastifyRequest<{ Params: playlistParamsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Get playlist with id: ${id}` });
  };

  public getPlaylists = (
    request: FastifyRequest<{ Querystring: playlistQueryType }>,
    reply: FastifyReply,
  ) => {
    const { count, offset } = request.query;
    reply.send({
      message: "Get all playlists",
      count,
      offset,
    });
  };

  public createPlaylist = (
    request: FastifyRequest<{ Body: createPlaylistType }>,
    reply: FastifyReply,
  ) => {
    const { name, description, source } = request.body;
    reply.send({
      message: "Playlist created",
      data: { name, description, source },
    });
  };

  public updatePlaylist = (
    request: FastifyRequest<{ Body: updatePlaylistType }>,
    reply: FastifyReply,
  ) => {
    const { name, description, source } = request.body;
    reply.send({
      message: "Playlist created",
      data: { name, description, source },
    });
  };

  public searchPlaylist = (
    request: FastifyRequest<{ Querystring: searchPlaylistType }>,
    reply: FastifyReply,
  ) => {
    const { searchQuery, count } = request.query;
    reply.send({
      message: "Search playlists",
      searchQuery: searchQuery || "",
      count: count || 10,
    });
  };

  public deletePlaylist = (
    request: FastifyRequest<{ Params: playlistParamsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Delete playlist with id: ${id}` });
  };
}

export type playlistControllerType = InstanceType<typeof playlistController>;
export { playlistController };
