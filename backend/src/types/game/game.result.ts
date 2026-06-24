import type { Game } from "@/generated/prisma/client.js";

export type FindAllGamesResult = {
  games: Game[];
  total: number;
};
