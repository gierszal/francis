import {
  collectionParamsSchema,
  collectionQuerySchema,
  createCollectionSchema,
  searchCollectionSchema,
  updateCollectionSchema,
} from "@/schemas/collectionSchema.ts";

import { z } from "zod";

export type createCollectionType = z.infer<typeof createCollectionSchema>;
export type updateCollectionType = z.infer<typeof updateCollectionSchema>;
export type searchCollectionType = z.infer<typeof searchCollectionSchema>;
export type collectionParamsType = z.infer<typeof collectionParamsSchema>;
export type collectionQueryType = z.infer<typeof collectionQuerySchema>;
