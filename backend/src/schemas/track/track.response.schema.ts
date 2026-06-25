import { z } from "zod";
import { metaSchema } from "../common/index.js";

export const trackSchema = z.object({
  id: z.string(),

  name: z.string(),
  artist: z.string(),

  tags: z.array(z.string()),

  audio: z.string(),
  picture: z.string(),

  listens: z.number(),

  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),

  album_id: z.string().nullable(),
});

export const trackResponseSchema = z.object({
  data: trackSchema,
});

export const tracksResponseSchema = z.object({
  data: z.array(trackSchema),
  meta: metaSchema,
});

export const detailedTrackSchema = z.object({
  id: z.string(),
  name: z.string(),
  artist: z.string(),
  audio: z.string(),
  tags: z.array(z.string()),

  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),

  listens: z.number(),

  album: z.object({
    id: z.string(),
    name: z.string(),

    game: z.object({
      id: z.string(),
      name: z.string(),

      created_at: z.coerce.date(),
      updated_at: z.coerce.date(),
    }),
    picture: z.string(),
  }),
});

export const detailedTrackResponseSchema = z.object({
  data: detailedTrackSchema,
});
