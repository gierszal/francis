import {
  createPlaylistSchema,
  updatePlaylistSchema,
} from "@/schemas/playlist/playlist.schema.js";
import { z } from "zod";

export type CreatePlaylistDTO = z.infer<typeof createPlaylistSchema>;
export type UpdatePlaylistDTO = z.infer<typeof updatePlaylistSchema>;
