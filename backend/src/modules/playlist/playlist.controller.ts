import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  createPlaylistType,
  updatePlaylistType,
  PlaylistServiceType,
} from "../../types/playlist/playlist.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";

export class PlaylistController {
  constructor(private service: PlaylistServiceType) {}
  public getPlaylist = (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Get playlist with id: ${id}` });
  };

  public getPlaylists = (
    request: FastifyRequest<{ Querystring: queryType }>,
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
    request: FastifyRequest<{ Body: updatePlaylistType; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { name, description, source } = request.body;
    reply.send({
      message: "Playlist created",
      data: { name, description, source },
    });
  };

  public searchPlaylist = (
    request: FastifyRequest<{ Querystring: queryType }>,
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
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    reply.send({ message: `Delete playlist with id: ${id}` });
  };
}
