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
    picture: body?.picture,
  };
};

export const normalizeGameMultipartBody = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const body = request.body as any;
  request.body = {
    name: body?.name?.value,
    picture: body?.picture,
  };
};

export const normalizeTrackMultipartBody = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const body = request.body as any;

  // if (body.tags?.value)
  const normalizedBody: any = {};

  if (body.name) normalizedBody.name = body.name.value;
  if (body.artist) normalizedBody.artist = body.artist.value;
  if (body.albumId) normalizedBody.albumId = body.albumId.value;
  if (body.audio) normalizedBody.audio = body.audio;

  if (body.tags) {
    try {
      normalizedBody.tags = JSON.parse(body.tags.value);
    } catch {
      normalizedBody.tags = [];
    }
  }

  request.body = normalizedBody;
};
