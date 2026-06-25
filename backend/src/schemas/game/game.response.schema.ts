import z from "zod";
import { metaSchema } from "../common/meta.schema.js";

const gameSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

const detailedGameSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  albums: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      picture: z.string(),
    }),
  ),
  albums_amount: z.number().positive().min(0),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const gamesResponseSchema = z.object({
  data: z.array(gameSchema),
  meta: metaSchema,
});

export const gameResponseSchema = z.object({
  data: gameSchema,
});

export const detailedGameResponseSchema = z.object({
  data: detailedGameSchema,
});
