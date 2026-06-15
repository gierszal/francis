import { createGameSchema, updateGameSchema } from "@/schemas/game.schema.ts";

import { z } from "zod";
import type { queryType } from "../common/query.js";

export type createGameType = z.infer<typeof createGameSchema>;
export type updateGameType = z.infer<typeof updateGameSchema>;

export type GameServiceType = {
  getGame: (id: string) => Promise<any>;
  getGames: (data: queryType) => Promise<any>;
  createGame: (data: createGameType) => Promise<any>;
  updateGame: (id: string, data: updateGameType) => Promise<any>;
  deleteGame: (id: string) => Promise<any>;
};

export type GameRepositoryType = {
  findAll(options?: queryType): Promise<FindAllGamesResponse>;
  findById(id: string): Promise<DetailedGame | null>;
  create(data: createGameType): Promise<FormattedGame>;
  update(id: string, data: updateGameType): Promise<FormattedGame | null>;
  remove(id: string): Promise<FormattedGame>;
};
