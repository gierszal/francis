import type { GameRepository } from "@/repositories/prisma/game.repository.js";
import type { updateGameType, createGameType } from "@/types/game/game.js";

export class GameService {
  constructor(private gameRepository: GameRepository) {}
  public getGame = async (id: string) => {
    return {
      message: `Get game with id: ${id}`,
    };
  };

  public getGames = async (
    searchQuery?: string,
    count?: number,
    offset?: number,
  ) => {
    return {
      message: "Get games list",
      searchQuery: searchQuery || "",
      count: count || 20,
      offset: offset || 0,
    };
  };

  public searchGames = async (
    searchQuery: string,
    count?: number,
    offset?: number,
  ) => {
    return {
      message: "Search games",
      searchQuery: searchQuery,
      count: count || 20,
      offset: offset || 0,
    };
  };

  public createGame = async (gameData: createGameType) => {
    return {
      message: "Create game",
      data: gameData,
    };
  };

  public updateGame = async (id: string, updateData: updateGameType) => {
    return {
      message: `Update game with id: ${id}`,
      data: updateData,
    };
  };

  public deleteGame = async (id: string) => {
    return {
      message: `Delete game with id: ${id}`,
    };
  };
}
