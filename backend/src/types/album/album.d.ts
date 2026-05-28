import {
  addToCollectionSchema,
  albumParamsSchema,
  albumQuerySchema,
  createAlbumSchema,
  searchAlbumSchema,
  updateAlbumSchema,
} from "@/schemas/albumSchema.ts";

import { z } from "zod";

export type createAlbumType = z.infer<typeof createAlbumSchema>;
export type updateAlbumType = z.infer<typeof updateAlbumSchema>;
export type searchAlbumType = z.infer<typeof searchAlbumSchema>;
export type albumParamsType = z.infer<typeof albumParamsSchema>;
export type addToCollectionType = z.infer<typeof addToCollectionSchema>;
export type albumQueryType = z.infer<typeof albumQuerySchema>;
