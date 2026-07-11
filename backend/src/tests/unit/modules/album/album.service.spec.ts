import { AlbumService } from "@/modules/album/album.service.js";
import type { AlbumRepository } from "@/repositories/prisma/album.repository.js";
import type { FileService } from "@/services/fileService.js";
import { FileType } from "@/services/fileService.js";
import {
  formatAlbum,
  formatDetailedAlbum,
} from "@/utils/formatters/album.formatter.js";
import { NotFoundError } from "@/errors/ApiError.js";
import { jest } from "@jest/globals";

describe("AlbumService", () => {
  let albumService: AlbumService;
  let albumRepository: jest.Mocked<AlbumRepository>;
  let fileService: jest.Mocked<FileService>;

  beforeEach(() => {
    albumRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
      addToCollection: jest.fn(),
      removeFromCollection: jest.fn(),
    } as unknown as jest.Mocked<AlbumRepository>;

    fileService = {
      createFile: jest.fn(),
      removeFile: jest.fn(),
    } as unknown as jest.Mocked<FileService>;

    albumService = new AlbumService(albumRepository, fileService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseAlbum = {
    id: "5270356c-d08f-42cb-8263-8219acc59441",
    name: "Great Album",
    picture: "image/968fa7b1-76e3-4f9d-a2e1-9c26bcaf4281.jpg",
    description: "adsasdadadsa",
    tracks: [
      {
        id: "85fcded0-43aa-4b1e-8d6c-2920df950a00",
        name: "traaack",
        audio: "audio/40f906be-7218-4b38-aa63-2028bf727e8a.mp3",
        artist: "test",
        album: {
          id: "5270356c-d08f-42cb-8263-8219acc59441",
          name: "Greate Album",
          game: "asdadsasd",
          picture: "image/968fa7b1-76e3-4f9d-a2e1-9c26bcaf4281.jpg",
        },
      },
    ],
    game: {
      id: "b42e494c-9bcb-4a57-8e24-c6373ba945bf",
      name: "asdadsasd",
    },
    albumCollections: [],
    createdAt: "2026-07-08T18:21:32.397Z",
    updatedAt: "2026-07-08T18:21:32.397Z",
    _count: {
      tracks: 1,
    },
  };

  describe("getAlbum", () => {
    it("should return a formatted album when it exists", async () => {
      albumRepository.findById.mockResolvedValue(baseAlbum as any);

      const result = await albumService.getAlbum(baseAlbum.id);

      expect(albumRepository.findById).toHaveBeenCalledWith(baseAlbum.id);
      expect(result).toEqual(formatDetailedAlbum(baseAlbum as any));
    });

    it("should return null when album does not exist", async () => {
      albumRepository.findById.mockResolvedValue(null);

      await expect(albumService.getAlbum("nonexistent-id")).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe("getAlbums", () => {
    it("should return formatted albums with pagination meta", async () => {
      const options = { count: 10, offset: 0 };
      albumRepository.findAll.mockResolvedValue({
        total: 1,
        albums: [baseAlbum],
      } as any);

      const result = await albumService.getAlbums(options as any);

      expect(albumRepository.findAll).toHaveBeenCalledWith(options);
      expect(result).toEqual({
        data: [formatAlbum(baseAlbum as any)],
        meta: {
          total: 1,
          count: 10,
          offset: 0,
        },
      });
    });

    it("should return empty data when no albums are found", async () => {
      albumRepository.findAll.mockResolvedValue({
        total: 0,
        albums: [],
      } as any);

      const result = await albumService.getAlbums({
        count: 10,
        offset: 0,
      } as any);

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("createAlbum", () => {
    const createDto = {
      name: "New Album",
      gameId: baseAlbum.game.id,
    } as any;

    const picFile = { filename: "cover.jpg" } as any;

    it("should create an album and return it formatted", async () => {
      fileService.createFile.mockResolvedValue("image/generated-uuid.jpg");
      albumRepository.create.mockResolvedValue(baseAlbum as any);

      const result = await albumService.createAlbum(createDto, picFile);

      expect(fileService.createFile).toHaveBeenCalledWith(
        FileType.IMAGE,
        picFile,
      );
      expect(albumRepository.create).toHaveBeenCalledWith(
        createDto,
        "image/generated-uuid.jpg",
      );
      expect(result).toEqual(formatAlbum(baseAlbum as any));
    });

    it("should roll back the created picture file if repository create fails", async () => {
      fileService.createFile.mockResolvedValue("image/generated-uuid.jpg");
      const dbError = new Error("DB write failed");
      albumRepository.create.mockRejectedValue(dbError);

      await expect(
        albumService.createAlbum(createDto, picFile),
      ).rejects.toThrow("DB write failed");

      expect(fileService.removeFile).toHaveBeenCalledWith(
        "image/generated-uuid.jpg",
      );
    });

    it("should not attempt to remove a file if file creation itself fails", async () => {
      const fileError = new Error("Unsupported file format");
      fileService.createFile.mockRejectedValue(fileError);

      await expect(
        albumService.createAlbum(createDto, picFile),
      ).rejects.toThrow("Unsupported file format");

      expect(fileService.removeFile).not.toHaveBeenCalled();
      expect(albumRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("updateAlbum", () => {
    const updateDto = { name: "Updated Name" } as any;
    const picFile = { filename: "new-cover.jpg" } as any;

    it("should update an album without touching the picture when no file is provided", async () => {
      albumRepository.update.mockResolvedValue(baseAlbum as any);

      const result = await albumService.updateAlbum(baseAlbum.id, updateDto);

      expect(fileService.removeFile).not.toHaveBeenCalled();
      expect(fileService.createFile).not.toHaveBeenCalled();
      expect(albumRepository.update).toHaveBeenCalledWith(
        baseAlbum.id,
        updateDto,
        undefined,
      );
      expect(result).toEqual(formatAlbum(baseAlbum as any));
    });

    it("should replace the picture file when a new one is provided", async () => {
      albumRepository.findById.mockResolvedValue(baseAlbum as any);
      fileService.createFile.mockResolvedValue("image/new-generated-uuid.jpg");
      albumRepository.update.mockResolvedValue(baseAlbum as any);

      const result = await albumService.updateAlbum(
        baseAlbum.id,
        updateDto,
        picFile,
      );

      expect(fileService.removeFile).toHaveBeenCalledWith(baseAlbum.picture);
      expect(fileService.createFile).toHaveBeenCalledWith(
        FileType.IMAGE,
        picFile,
      );
      expect(albumRepository.update).toHaveBeenCalledWith(
        baseAlbum.id,
        updateDto,
        "image/new-generated-uuid.jpg",
      );
      expect(result).toEqual(formatAlbum(baseAlbum as any));
    });

    it("should throw NotFoundError when updating the picture of a nonexistent album", async () => {
      albumRepository.findById.mockResolvedValue(null);

      await expect(
        albumService.updateAlbum(baseAlbum.id, updateDto, picFile),
      ).rejects.toThrow(NotFoundError);

      expect(fileService.createFile).not.toHaveBeenCalled();
      expect(albumRepository.update).not.toHaveBeenCalled();
    });

    it("should roll back the new picture file if repository update fails", async () => {
      albumRepository.findById.mockResolvedValue(baseAlbum as any);
      fileService.createFile.mockResolvedValue("image/new-generated-uuid.jpg");
      const dbError = new Error("DB write failed");
      albumRepository.update.mockRejectedValue(dbError);

      await expect(
        albumService.updateAlbum(baseAlbum.id, updateDto, picFile),
      ).rejects.toThrow("DB write failed");

      expect(fileService.removeFile).toHaveBeenNthCalledWith(
        1,
        "image/new-generated-uuid.jpg",
      );
      expect(fileService.removeFile).not.toHaveBeenCalledWith(
        baseAlbum?.picture,
      );
      expect(fileService.removeFile).toHaveBeenCalledTimes(1);
    });
  });

  describe("deleteAlbum", () => {
    it("should delegate removal to the repository", async () => {
      albumRepository.remove.mockResolvedValue(undefined);

      await albumService.deleteAlbum(baseAlbum.id);

      expect(albumRepository.remove).toHaveBeenCalledWith(baseAlbum.id);
    });
  });

  describe("addToCollection", () => {
    it("should delegate to the repository", async () => {
      const dto = {
        albumId: baseAlbum.id,
        collectionId: "collection-id",
      } as any;
      albumRepository.addToCollection.mockResolvedValue(undefined);

      await albumService.addToCollection(dto);

      expect(albumRepository.addToCollection).toHaveBeenCalledWith(dto);
    });
  });

  describe("removeFromCollection", () => {
    it("should delegate to the repository", async () => {
      const dto = {
        albumId: baseAlbum.id,
        collectionId: "collection-id",
      } as any;
      albumRepository.removeFromCollection.mockResolvedValue(undefined);

      await albumService.removeFromCollection(dto);

      expect(albumRepository.removeFromCollection).toHaveBeenCalledWith(dto);
    });
  });
});
