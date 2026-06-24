import { z } from "zod";

export const aiGenerateQuerySchema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt is required!")
    .describe("User prompt for AI generation"),
});
