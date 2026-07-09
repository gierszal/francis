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
import type { FileServiceType } from "@/types/services/fileService.js";
import { FileType } from "@/services/fileService.js";
import type { MultipartFile } from "@fastify/multipart";
import { NotFoundError } from "@/errors/ApiError.js";

export class GameService implements IGameService {
  constructor(
    private gameRepository: IGameRepository,
    private fileService: FileServiceType,
  ) {}
  public getGame = async (
    id: string,
  ): Promise<FormattedDetailedGame | null> => {
    const game = await this.gameRepository.findById(id);
    if (!game) throw new NotFoundError(`Game with id ${id} was not found!`);
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
    data: CreateGameDTO,
    pic: MultipartFile,
  ): Promise<FormattedGame> => {
    let picPath: string | undefined; // если потребуется откат
    try {
      const picturePath = await this.fileService.createFile(
        FileType.IMAGE,
        pic,
      );
      picPath = picturePath;
      const game = await this.gameRepository.create(data, picturePath);
      return formatGame(game);
    } catch (err) {
      if (picPath) await this.fileService.removeFile(picPath);
      throw err;
    }
  };

  public updateGame = async (
    id: string,
    data: UpdateGameDTO,
    pic?: MultipartFile,
  ): Promise<FormattedGame> => {
    let picPath: string | undefined; // если потребуется откат
    let oldPicturePath: string | undefined;
    try {
      if (pic) {
        const album = await this.gameRepository.findById(id);
        if (!album)
          throw new NotFoundError(`Game with id ${id} was not found!`);
        oldPicturePath = album?.picture;
        const picturePath = await this.fileService.createFile(
          FileType.IMAGE,
          pic,
        );
        picPath = picturePath;
      }
      const game = await this.gameRepository.update(id, data, picPath);
      if (pic && oldPicturePath) this.fileService.removeFile(oldPicturePath);
      return formatGame(game);
    } catch (err) {
      if (picPath) await this.fileService.removeFile(picPath);
      throw err;
    }
  };

  public deleteGame = async (id: string): Promise<void> => {
    return this.gameRepository.remove(id);
  };
}
