import { NotFoundError } from "@/errors/ApiError.js";
import { GameService } from "@/modules/game/game.service.js";
import type { GameRepository } from "@/repositories/prisma/game.repository.js";
import { FileType, type FileService } from "@/services/fileService.js";
import {
  formatDetailedGame,
  formatGame,
} from "@/utils/formatters/game.formatter.js";
import { jest } from "@jest/globals";

describe("GameService", () => {
  let gameService: GameService;
  let gameRepository: jest.Mocked<GameRepository>;
  let fileService: jest.Mocked<FileService>;

  beforeEach(() => {
    gameRepository = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<GameRepository>;

    fileService = {
      createFile: jest.fn(),
      removeFile: jest.fn(),
    } as unknown as jest.Mocked<FileService>;

    gameService = new GameService(gameRepository, fileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseGame = {
    id: "059577ca-7347-420f-9cc8-50fd553d6844",
    name: "The Witcher 3: Wild Hunt",
    createdAt: "2026-07-04T13:07:43.528Z",
    updatedAt: "2026-07-04T13:07:43.528Z",
    picture: "image/2f7fcb21-a125-40be-9d93-5605033af68d.jpg",
    _count: { albums: 1 },
    albums: [
      {
        id: "6651de53-c133-4351-97b5-2acfe1596aea",
        name: "Wild Hunt OST",
        picture: "image/2f7fcb21-a125-40be-9d93-5605033af68d.jpg",
      },
    ],
  };

  describe("getGame", () => {
    it("should return a formatted game when it exists", async () => {
      gameRepository.findById.mockResolvedValue(baseGame as any);

      const result = await gameService.getGame(baseGame.id);

      expect(gameRepository.findById).toHaveBeenCalledWith(baseGame.id);
      expect(result).toEqual(formatDetailedGame(baseGame as any));
    });

    it("should throw NotFoundError when game does not exist", async () => {
      gameRepository.findById.mockResolvedValue(null);

      await expect(gameService.getGame("nonexistent-id")).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe("getGames", () => {
    it("should return formatted games with pagination meta", async () => {
      const options = { count: 10, offset: 0 };
      gameRepository.findAll.mockResolvedValue({
        total: 1,
        games: [baseGame],
      } as any);

      const result = await gameService.getGames(options as any);

      expect(gameRepository.findAll).toHaveBeenCalledWith(options);
      expect(result).toEqual({
        data: [formatGame(baseGame as any)],
        meta: {
          total: 1,
          count: 10,
          offset: 0,
        },
      });
    });

    it("should return empty data when no games are found", async () => {
      gameRepository.findAll.mockResolvedValue({
        total: 0,
        games: [],
      } as any);

      const result = await gameService.getGames({
        count: 10,
        offset: 0,
      } as any);

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("createGame", () => {
    const createDto = { name: "New Game" } as any;
    const picFile = { filename: "cover.jpg" } as any;
    it("should create a game and return it formatted", async () => {
      fileService.createFile.mockResolvedValue("image/generated-uuid.jpg");
      gameRepository.create.mockResolvedValue(baseGame as any);

      const result = await gameService.createGame(createDto, picFile);

      expect(fileService.createFile).toHaveBeenCalledWith(
        FileType.IMAGE,
        picFile,
      );
      expect(gameRepository.create).toHaveBeenCalledWith(
        createDto,
        "image/generated-uuid.jpg",
      );
      expect(result).toEqual(formatGame(baseGame as any));
    });
    it("should roll back the created picture file if repository create fails", async () => {
      fileService.createFile.mockResolvedValue("image/generated-uuid.jpg");
      const dbError = new Error("DB write failed");
      gameRepository.create.mockRejectedValue(dbError);

      await expect(gameService.createGame(createDto, picFile)).rejects.toThrow(
        "DB write failed",
      );

      expect(fileService.removeFile).toHaveBeenCalledWith(
        "image/generated-uuid.jpg",
      );
    });

    it("should not attempt to remove a file if file creation itself fails", async () => {
      const fileError = new Error("Unsupported file format");
      fileService.createFile.mockRejectedValue(fileError);

      await expect(gameService.createGame(createDto, picFile)).rejects.toThrow(
        "Unsupported file format",
      );

      expect(fileService.removeFile).not.toHaveBeenCalled();
      expect(gameRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("updateGame", () => {
    const updateDto = { name: "Updated Name" } as any;
    const picFile = { filename: "new-cover.jpg" } as any;

    it("should update a game without touching the picture when no file is provided", async () => {
      gameRepository.update.mockResolvedValue(baseGame as any);

      const result = await gameService.updateGame(baseGame.id, updateDto);

      expect(fileService.removeFile).not.toHaveBeenCalled();
      expect(fileService.createFile).not.toHaveBeenCalled();
      expect(gameRepository.update).toHaveBeenCalledWith(
        baseGame.id,
        updateDto,
        undefined,
      );
      expect(result).toEqual(formatGame(baseGame as any));
    });

    it("should replace the picture file when a new one is provided", async () => {
      gameRepository.findById.mockResolvedValue(baseGame as any);
      fileService.createFile.mockResolvedValue("image/new-generated-uuid.jpg");
      gameRepository.update.mockResolvedValue(baseGame as any);

      const result = await gameService.updateGame(
        baseGame.id,
        updateDto,
        picFile,
      );

      expect(fileService.removeFile).toHaveBeenCalledWith(baseGame.picture);
      expect(fileService.createFile).toHaveBeenCalledWith(
        FileType.IMAGE,
        picFile,
      );
      expect(gameRepository.update).toHaveBeenCalledWith(
        baseGame.id,
        updateDto,
        "image/new-generated-uuid.jpg",
      );
      expect(result).toEqual(formatGame(baseGame as any));
    });

    it("should throw NotFoundError when updating the picture of a nonexistent game", async () => {
      gameRepository.findById.mockResolvedValue(null);

      await expect(
        gameService.updateGame(baseGame.id, updateDto, picFile),
      ).rejects.toThrow(NotFoundError);

      expect(fileService.createFile).not.toHaveBeenCalled();
      expect(gameRepository.update).not.toHaveBeenCalled();
    });

    it("should roll back the new picture file if repository update fails", async () => {
      gameRepository.findById.mockResolvedValue(baseGame as any);
      fileService.createFile.mockResolvedValue("image/new-generated-uuid.jpg");
      const dbError = new Error("DB write failed");
      gameRepository.update.mockRejectedValue(dbError);

      await expect(
        gameService.updateGame(baseGame.id, updateDto, picFile),
      ).rejects.toThrow("DB write failed");

      expect(fileService.removeFile).toHaveBeenNthCalledWith(
        1,
        "image/new-generated-uuid.jpg",
      );
      expect(fileService.removeFile).not.toHaveBeenCalledWith(
        baseGame?.picture,
      );
      expect(fileService.removeFile).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteGame", () => {
    it("should delegate removal to the repository", async () => {
      gameRepository.remove.mockResolvedValue(undefined);

      await gameService.deleteGame(baseGame.id);

      expect(gameRepository.remove).toHaveBeenCalledWith(baseGame.id);
    });

    it("should propagate NotFoundError thrown by the repository", async () => {
      gameRepository.remove.mockRejectedValue(
        new NotFoundError("Game with id nonexistent-id was not found!"),
      );

      await expect(gameService.deleteGame("nonexistent-id")).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});
