import {
  addToCollectionSchema,
  createAlbumSchema,
  updateAlbumSchema,
} from "@/schemas/album/album.schema.js";
import { z } from "zod";

export type CreateAlbumDTO = z.infer<typeof createAlbumSchema>;

export type UpdateAlbumDTO = z.infer<typeof updateAlbumSchema>;

export type AddToCollectionDTO = z.infer<typeof addToCollectionSchema>;
