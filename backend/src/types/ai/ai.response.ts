import {
  aiGenerateResponseSchema,
  aiGenerateSchema,
} from "@/schemas/ai/ai.response.schema.js";
import type z from "zod";

export type AIGenerateResponse = z.infer<typeof aiGenerateResponseSchema>;
export type AIGenerateResult = z.infer<typeof aiGenerateSchema>;
