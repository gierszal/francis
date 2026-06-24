import type { queryType } from "@/types/common/query.js";
import type {
  UpdateGameDTO,
  CreateGameDTO,
  IGameRepository,
  IGameService,
} from "@/types/game/index.js";
import type {
  FormattedDetailedGame,
  FormattedGame,
} from "@/types/game/game.model.js";
import type { GamesResponse } from "@/types/game/index.js";
import {
  formatDetailedGame,
  formatGame,
} from "@/utils/formatters/game.formatter.js";

export class GameService implements IGameService {
  constructor(private gameRepository: IGameRepository) {}
  public getGame = async (
    id: string,
  ): Promise<FormattedDetailedGame | null> => {
    const game = await this.gameRepository.findById(id);
    return formatDetailedGame(game);
  };

  public getGames = async (data: queryType): Promise<GamesResponse> => {
    const { games, total } = await this.gameRepository.findAll(data);
    const { count, offset } = data;
    return {
      data: games.map((game) => formatGame(game)),
      meta: {
        total,
        count,
        offset,
      },
    };
  };

  public createGame = async (
    gameData: CreateGameDTO,
  ): Promise<FormattedGame> => {
    const game = await this.gameRepository.create(gameData);
    return formatGame(game);
  };

  public updateGame = async (
    id: string,
    data: UpdateGameDTO,
  ): Promise<FormattedGame> => {
    const game = await this.gameRepository.update(id, data);
    return formatGame(game);
  };

  public deleteGame = async (id: string): Promise<void> => {
    return await this.gameRepository.remove(id);
  };
}
