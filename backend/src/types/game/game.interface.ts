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
import type { MultipartFile } from "@fastify/multipart";

export type IGameService = {
  getGame: (id: string) => Promise<FormattedDetailedGame | null>;
  getGames: (data: queryType) => Promise<GamesResponse>;
  createGame: (
    data: CreateGameDTO,
    pic: MultipartFile,
  ) => Promise<FormattedGame>;
  updateGame: (
    id: string,
    data: UpdateGameDTO,
    pic?: MultipartFile,
  ) => Promise<FormattedGame | null>;
  deleteGame: (id: string) => Promise<void>;
};

export interface IGameRepository {
  findAll(options?: queryType): Promise<FindAllGamesResult>;
  findById(id: string): Promise<Game | null>;
  create(data: CreateGameDTO, picturePath: string): Promise<Game>;
  update(id: string, data: UpdateGameDTO, picturePath?: string): Promise<Game>;
  remove(id: string): Promise<void>;
}
