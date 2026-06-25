import { z } from "zod";

export const createPlaylistSchema = z.object({
  name: z
    .string()
    .min(1, "The name is not provided!")
    .max(100, "Too long name"),
  description: z.string().min(1, "Description is required"),
});

export const updatePlaylistSchema = createPlaylistSchema.partial();
