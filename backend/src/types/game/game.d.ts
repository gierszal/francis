import { createGameSchema, updateGameSchema } from "@/schemas/game.schema.ts";

import { z } from "zod";

export type createGameType = z.infer<typeof createGameSchema>;
export type updateGameType = z.infer<typeof updateGameSchema>;

export type GameServiceType = {
  getGame: (id: string) => Promise<any>;
  getGames: (
    searchQuery?: string,
    count?: number,
    offset?: number,
  ) => Promise<any>;
  createGame: (data: createGameType) => Promise<any>;
  updateGame: (id: string, data: updateGameType) => Promise<any>;
  deleteGame: (id: string) => Promise<any>;
};
