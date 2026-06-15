import type { FastifyRequest, FastifyReply } from "fastify";

export const normalizeAlbumMultipartBody = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const body = request.body as any;
  request.body = {
    name: body.name?.value,
    description: body.description?.value,
    gameId: body.gameId?.value,
    picture: body.picture,
  };
};

export const normalizeTrackMultipartBody = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const body = request.body as any;

  if (body.tags.value)
    request.body = {
      name: body.name?.value,
      artist: body.artist?.value,
      audio: body.audio,
      albumId: body.albumId?.value,
      tags: JSON.parse(body.tags.value),
    };
};
