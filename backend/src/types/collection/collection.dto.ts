import type {
  createCollectionSchema,
  updateCollectionSchema,
} from "@/schemas/collection/collection.schema.js";
import { z } from "zod";
export type CreateCollectionDTO = z.infer<typeof createCollectionSchema>;
export type UpdateCollectionDTO = z.infer<typeof updateCollectionSchema>;
