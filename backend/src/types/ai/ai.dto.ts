import { aiGenerateQuerySchema } from "@/schemas/ai/ai.schema.js";
import { z } from "zod";

export type GenerateQueryDTO = z.infer<typeof aiGenerateQuerySchema>;
