import { z } from "zod";

export const createGameSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
});

export const updateGameSchema = createGameSchema.partial();
