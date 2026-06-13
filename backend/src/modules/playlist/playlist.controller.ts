import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  createPlaylistType,
  updatePlaylistType,
  PlaylistServiceType,
} from "../../types/playlist/playlist.js";
import type { paramsType } from "@/types/common/params.js";
import type { queryType } from "@/types/common/query.js";

export class PlaylistController {
  constructor(private playlistService: PlaylistServiceType) {}

  public getPlaylist = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    const { id } = request.params;
    const playlist = await this.playlistService.getPlaylist(id);
    if (!playlist) {
      return reply.status(404).send({
        error: "Not Found",
        message: `Playlist with id ${id} not found`,
      });
    }
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
    request: FastifyRequest<{ Body: createPlaylistType }>,
    reply: FastifyReply,
  ) => {
    const data = request.body;
    const playlist = await this.playlistService.createPlaylist(data);
    reply.send({ data: playlist });
  };

  public updatePlaylist = async (
    request: FastifyRequest<{ Body: updatePlaylistType; Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const data = request.body;
      const { id } = request.params;
      const playlist = await this.playlistService.updatePlaylist(id, data);
      reply.send({ data: playlist });
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

  public deletePlaylist = async (
    request: FastifyRequest<{ Params: paramsType }>,
    reply: FastifyReply,
  ) => {
    try {
      const { id } = request.params;
      const playlist = await this.playlistService.deletePlaylist(id);
      reply.send({ playlist });
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
