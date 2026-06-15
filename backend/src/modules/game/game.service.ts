import type { GameRepository } from "@/repositories/prisma/game.repository.js";
import type { queryType } from "@/types/common/query.js";
import type {
  updateGameType,
  createGameType,
  GameRepositoryType,
} from "@/types/game/game.js";

export class GameService {
  constructor(private gameRepository: GameRepositoryType) {}
  public getGame = async (id: string) => {
    return await this.gameRepository.findById(id);
  };

  public getGames = async (data: queryType) => {
    return await this.gameRepository.findAll(data);
  };

  public createGame = async (gameData: createGameType) => {
    return await this.gameRepository.create(gameData);
  };

  public updateGame = async (id: string, data: updateGameType) => {
    return await this.gameRepository.update(id, data);
  };

  public deleteGame = async (id: string) => {
    return await this.gameRepository.remove(id);
  };
}
