import { z } from "zod";

export const generateQuerySchema = z.object({
  prompt: z.string().min(1, "Prompt is required!"),
});
