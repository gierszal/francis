import z from "zod";

export const aiGenerateResponseSchema = z.object({
  fulfilled: z.boolean().describe("The status of ai asking"),
  response: z.string().describe("The result of ai asking"),
});
