import z from "zod";
import { metaSchema } from "../common/meta.schema.js";

const playlistSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

const detailedPlaylistSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  tracks: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      audio: z.string(),
      artist: z.string(),
      album: z.object({
        id: z.uuid(),
        name: z.string(),
        game: z.object({
          id: z.uuid(),
          name: z.string(),
          createdAt: z.coerce.date(),
          updatedAt: z.coerce.date(),
        }),
        picture: z.string(),
      }),
    }),
  ),
  description: z.string().nullable(),
  author: z.object({
    id: z.uuid(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const playlistsResponseSchema = z.object({
  data: z.array(playlistSchema),
  meta: metaSchema,
});

export const playlistResponseSchema = z.object({
  data: playlistSchema,
});

export const detailedPlaylistResponseSchema = z.object({
  data: detailedPlaylistSchema,
});
