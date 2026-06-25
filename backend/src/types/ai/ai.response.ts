import { aiGenerateResponseSchema } from "@/schemas/ai/ai.response.schema.js";
import type z from "zod";

export type AIGenerateResponse = z.infer<typeof aiGenerateResponseSchema>;
