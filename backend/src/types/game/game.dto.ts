import {
  createGameSchema,
  updateGameSchema,
} from "@/schemas/game/game.schema.js";

import { z } from "zod";

export type CreateGameDTO = z.infer<typeof createGameSchema>;
export type UpdateGameDTO = z.infer<typeof updateGameSchema>;
