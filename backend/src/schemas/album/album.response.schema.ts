import z from "zod";
import { metaSchema } from "../common/meta.schema.js";

export const albumSchema = z.object({
  id: z.uuid(),

  name: z.string().max(100),

  picture: z.string(),

  description: z.string().max(255).nullable(),

  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),

  game_id: z.uuid(),
});

export const albumResponseSchema = z.object({
  data: albumSchema,
});

export const albumsReponseSchema = z.object({
  data: z.array(albumSchema),
  meta: metaSchema,
});

export const detailedAlbumSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  picture: z.string(),
  description: z.string(),
  tracks: z.array(
    z.object({
      id: z.string(),

      name: z.string(),
      artist: z.string(),

      tags: z.array(z.string()),

      audio: z.string(),
      picture: z.string(),
    }),
  ),
  tracks_amount: z.number().int().min(0),
  game: z.object({
    id: z.uuid(),
    name: z.string(),
  }),
  collections: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
    }),
  ),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const detailedAlbumResponseSchema = z.object({
  data: detailedAlbumSchema,
});
