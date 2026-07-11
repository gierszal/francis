import z from "zod";
import { metaSchema } from "../common/meta.schema.js";

const collectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

const detailedCollectionSchema = z.object({
  id: z.string(),
  name: z.string(),
  albums_amount: z.number().min(0),
  albums: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      picture: z.string(),
    }),
  ),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const detailedCollectionResponseSchema = z.object({
  data: detailedCollectionSchema,
});

export const collectionResponseSchema = z.object({
  data: collectionSchema,
});

export const collectionsResponseSchema = z.object({
  data: z.array(detailedCollectionSchema),
  meta: metaSchema,
});
