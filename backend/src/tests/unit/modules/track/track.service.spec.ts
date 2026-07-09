import { TrackService } from "@/modules/track/track.service.js";
import type { PlaylistRepository } from "@/repositories/prisma/playlist.repository.js";
import type { TrackRepository } from "@/repositories/prisma/track.repository.js";
import type { FileService } from "@/services/fileService.js";
import { FileType } from "@/services/fileService.js";
import {
  formatDetailedTrack,
  formatTrack,
} from "@/utils/formatters/track.formatter.js";
import { ForbiddenError, NotFoundError } from "@/errors/ApiError.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import { jest } from "@jest/globals";

describe("TrackService", () => {
  let trackService: TrackService;
  let trackRepository: jest.Mocked<TrackRepository>;
  let playlistRepository: jest.Mocked<PlaylistRepository>;
  let fileService: jest.Mocked<FileService>;

  const adminUser = {
    id: "admin-id",
    role: ROLES.ADMIN.name,
  } as any;

  const regularUser = {
    id: "user-id",
    role: "USER",
  } as any;

  beforeEach(() => {
    trackRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      addToPlaylist: jest.fn(),
      removeFromPlaylist: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
      listenIncrement: jest.fn(),
    } as unknown as jest.Mocked<TrackRepository>;

    playlistRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<PlaylistRepository>;

    fileService = {
      createFile: jest.fn(),
      removeFile: jest.fn(),
    } as unknown as jest.Mocked<FileService>;

    trackService = new TrackService(
      trackRepository,
      playlistRepository,
      fileService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseTrack = {
    id: "ba5e51b9-888f-4fb4-84c9-1a32ecd763c2",
    name: "adsda",
    artist: "assa",
    audio: "audio/5fcb7af9-0b25-4746-978a-91579fad84fe.mp3",
    tags: ["Ambient", "Cool"],
    createdAt: new Date("2026-06-24T05:42:21.493Z"),
    updatedAt: new Date("2026-06-24T05:42:21.493Z"),
    listens: 0,
    albumId: "5f09392d-2e85-4eee-a81e-1fe1f932c525",
    _count: { trackListeneds: 0 },
    album: {
      id: "5f09392d-2e85-4eee-a81e-1fe1f932c525",
      name: "Original Soundtrack",
      game: {
        id: "57b5e267-7234-40b5-8f39-573f42660de8",
        name: "Greate Game",
        createdAt: new Date("2026-06-21T17:22:58.791Z"),
        updatedAt: new Date("2026-06-21T17:22:58.791Z"),
      },
      picture: "8630c0da-b31c-457f-a28c-57669bcec74a",
    },
  };

  describe("getTrack", () => {
    it("should return a formatted track when it exists", async () => {
      trackRepository.findById.mockResolvedValue(baseTrack as any);

      const result = await trackService.getTrack(baseTrack.id);

      expect(trackRepository.findById).toHaveBeenCalledWith(baseTrack.id);
      expect(result).toEqual(formatDetailedTrack(baseTrack as any));
    });

    it("should return null when track does not exist", async () => {
      trackRepository.findById.mockResolvedValue(null);

      await expect(trackService.getTrack("nonexistent-id")).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe("getTracks", () => {
    it("should return formatted tracks with pagination meta", async () => {
      const opts = { count: 10, offset: 0 };
      trackRepository.findAll.mockResolvedValue({
        total: 1,
        tracks: [baseTrack],
      } as any);

      const result = await trackService.getTracks(opts as any);

      expect(trackRepository.findAll).toHaveBeenCalledWith(opts);
      expect(result).toEqual({
        data: [formatTrack(baseTrack as any)],
        meta: {
          total: 1,
          count: 10,
          offset: 0,
        },
      });
    });

    it("should return empty data when no tracks are found", async () => {
      trackRepository.findAll.mockResolvedValue({
        total: 0,
        tracks: [],
      } as any);

      const result = await trackService.getTracks({
        count: 10,
        offset: 0,
      } as any);

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("createTrack", () => {
    const createDto = {
      name: "New Track",
      artist: "New Artist",
      albumId: baseTrack.albumId,
      tags: ["Ambient"],
    } as any;

    const audioFile = { filename: "audio.mp3" } as any;

    it("should create a track and return it formatted", async () => {
      fileService.createFile.mockResolvedValue("audio/generated-uuid.mp3");
      trackRepository.create.mockResolvedValue(baseTrack as any);

      const result = await trackService.createTrack(createDto, audioFile);

      expect(fileService.createFile).toHaveBeenCalledWith(
        FileType.AUDIO,
        audioFile,
      );
      expect(trackRepository.create).toHaveBeenCalledWith(
        createDto,
        "audio/generated-uuid.mp3",
      );
      expect(result).toEqual(formatTrack(baseTrack as any));
    });

    it("should roll back the created audio file if repository create fails", async () => {
      fileService.createFile.mockResolvedValue("audio/generated-uuid.mp3");
      const dbError = new Error("DB write failed");
      trackRepository.create.mockRejectedValue(dbError);

      await expect(
        trackService.createTrack(createDto, audioFile),
      ).rejects.toThrow("DB write failed");

      expect(fileService.removeFile).toHaveBeenCalledWith(
        "audio/generated-uuid.mp3",
      );
    });

    it("should not attempt to remove a file if file creation itself fails", async () => {
      const fileError = new Error("Unsupported file format");
      fileService.createFile.mockRejectedValue(fileError);

      await expect(
        trackService.createTrack(createDto, audioFile),
      ).rejects.toThrow("Unsupported file format");

      expect(fileService.removeFile).not.toHaveBeenCalled();
      expect(trackRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("updateTrack", () => {
    const updateDto = { name: "Updated Name" } as any;
    const audioFile = { filename: "new-audio.mp3" } as any;

    it("should update a track without touching audio when no file is provided", async () => {
      trackRepository.update.mockResolvedValue(baseTrack as any);

      const result = await trackService.updateTrack(baseTrack.id, updateDto);

      expect(fileService.removeFile).not.toHaveBeenCalled();
      expect(fileService.createFile).not.toHaveBeenCalled();
      expect(trackRepository.update).toHaveBeenCalledWith(
        baseTrack.id,
        updateDto,
        undefined,
      );
      expect(result).toEqual(formatTrack(baseTrack as any));
    });

    it("should replace the audio file when a new one is provided", async () => {
      trackRepository.findById.mockResolvedValue(baseTrack as any);
      fileService.createFile.mockResolvedValue("audio/new-generated-uuid.mp3");
      trackRepository.update.mockResolvedValue(baseTrack as any);

      const result = await trackService.updateTrack(
        baseTrack.id,
        updateDto,
        audioFile,
      );

      expect(fileService.removeFile).toHaveBeenCalledWith(baseTrack.audio);
      expect(fileService.createFile).toHaveBeenCalledWith(
        FileType.AUDIO,
        audioFile,
      );
      expect(trackRepository.update).toHaveBeenCalledWith(
        baseTrack.id,
        updateDto,
        "audio/new-generated-uuid.mp3",
      );
      expect(result).toEqual(formatTrack(baseTrack as any));
    });

    it("should throw NotFoundError when updating audio of a nonexistent track", async () => {
      trackRepository.findById.mockResolvedValue(null);

      await expect(
        trackService.updateTrack(baseTrack.id, updateDto, audioFile),
      ).rejects.toThrow(NotFoundError);

      expect(fileService.createFile).not.toHaveBeenCalled();
      expect(trackRepository.update).not.toHaveBeenCalled();
    });

    it("should roll back the new audio file if repository update fails", async () => {
      trackRepository.findById.mockResolvedValue(baseTrack as any);
      fileService.createFile.mockResolvedValue("audio/new-generated-uuid.mp3");
      const dbError = new Error("DB write failed");
      trackRepository.update.mockRejectedValue(dbError);

      await expect(
        trackService.updateTrack(baseTrack.id, updateDto, audioFile),
      ).rejects.toThrow("DB write failed");

      expect(fileService.removeFile).toHaveBeenNthCalledWith(
        1,
        "audio/new-generated-uuid.mp3",
      );
      expect(fileService.removeFile).not.toHaveBeenCalledWith(baseTrack?.audio);
      expect(fileService.removeFile).toHaveBeenCalledTimes(1);
    });
  });

  describe("listenIncrement", () => {
    it("should delegate to the repository", async () => {
      trackRepository.listenIncrement.mockResolvedValue(undefined);

      await trackService.listenIncrement(baseTrack.id);

      expect(trackRepository.listenIncrement).toHaveBeenCalledWith(
        baseTrack.id,
      );
    });
  });

  describe("deleteTrack", () => {
    it("should delegate removal to the repository", async () => {
      trackRepository.remove.mockResolvedValue(undefined);

      await trackService.deleteTrack(baseTrack.id);

      expect(trackRepository.remove).toHaveBeenCalledWith(baseTrack.id);
    });
  });

  describe("addToPlaylist", () => {
    const dto = { trackId: baseTrack.id, playlistId: "playlist-id" } as any;

    it("should allow the playlist owner to add a track", async () => {
      playlistRepository.findById.mockResolvedValue({
        authorId: regularUser.id,
      } as any);

      await trackService.addToPlaylist(dto, regularUser);

      expect(trackRepository.addToPlaylist).toHaveBeenCalledWith(dto);
    });

    it("should allow an admin to add a track to someone else's playlist", async () => {
      playlistRepository.findById.mockResolvedValue({
        authorId: "someone-else-id",
      } as any);

      await trackService.addToPlaylist(dto, adminUser);

      expect(trackRepository.addToPlaylist).toHaveBeenCalledWith(dto);
    });

    it("should throw ForbiddenError when a non-owner, non-admin tries to add a track", async () => {
      playlistRepository.findById.mockResolvedValue({
        authorId: "someone-else-id",
      } as any);

      await expect(
        trackService.addToPlaylist(dto, regularUser),
      ).rejects.toThrow(ForbiddenError);

      expect(trackRepository.addToPlaylist).not.toHaveBeenCalled();
    });

    it("should throw ForbiddenError when the playlist does not exist and user is not admin", async () => {
      playlistRepository.findById.mockResolvedValue(null);

      await expect(
        trackService.addToPlaylist(dto, regularUser),
      ).rejects.toThrow(ForbiddenError);

      expect(trackRepository.addToPlaylist).not.toHaveBeenCalled();
    });
  });

  describe("removeFromPlaylist", () => {
    const dto = { trackId: baseTrack.id, playlistId: "playlist-id" } as any;

    it("should allow the playlist owner to remove a track", async () => {
      playlistRepository.findById.mockResolvedValue({
        authorId: regularUser.id,
      } as any);

      await trackService.removeFromPlaylist(dto, regularUser);

      expect(trackRepository.removeFromPlaylist).toHaveBeenCalledWith(dto);
    });

    it("should allow an admin to remove a track from someone else's playlist", async () => {
      playlistRepository.findById.mockResolvedValue({
        authorId: "someone-else-id",
      } as any);

      await trackService.removeFromPlaylist(dto, adminUser);

      expect(trackRepository.removeFromPlaylist).toHaveBeenCalledWith(dto);
    });

    it("should throw ForbiddenError when a non-owner, non-admin tries to remove a track", async () => {
      playlistRepository.findById.mockResolvedValue({
        authorId: "someone-else-id",
      } as any);

      await expect(
        trackService.removeFromPlaylist(dto, regularUser),
      ).rejects.toThrow(ForbiddenError);

      expect(trackRepository.removeFromPlaylist).not.toHaveBeenCalled();
    });
  });
});
