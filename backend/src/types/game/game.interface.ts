import type { Game } from "@/generated/prisma/client.js";
import type { queryType } from "../common/query.js";
import type {
  CreateGameDTO,
  FindAllGamesResult,
  FormattedDetailedGame,
  FormattedGame,
  GamesResponse,
  UpdateGameDTO,
} from "./index.js";

export type IGameService = {
  getGame: (id: string) => Promise<FormattedDetailedGame | null>;
  getGames: (data: queryType) => Promise<GamesResponse>;
  createGame: (data: CreateGameDTO) => Promise<FormattedGame>;
  updateGame: (
    id: string,
    data: UpdateGameDTO,
  ) => Promise<FormattedGame | null>;
  deleteGame: (id: string) => Promise<void>;
};

export interface IGameRepository {
  findAll(options?: queryType): Promise<FindAllGamesResult>;
  findById(id: string): Promise<Game | null>;
  create(data: CreateGameDTO): Promise<Game>;
  update(id: string, data: UpdateGameDTO): Promise<Game>;
  remove(id: string): Promise<void>;
}
