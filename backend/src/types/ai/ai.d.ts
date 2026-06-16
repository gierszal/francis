import { generateQuerySchema } from "@/schemas/ai.schema.ts";
import { z } from "zod";

export type generateQueryType = z.infer<typeof generateQuerySchema>;

export type AIServiceType = {
  generate: (prompt: string) => Promise<any>;
  getRecommendations: (id: string) => Promise<any>;
};
