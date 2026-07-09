import { PlaylistService } from "@/modules/playlist/playlist.service.js";
import type { PlaylistRepository } from "@/repositories/prisma/playlist.repository.js";
import {
  formatDetailedPlaylist,
  formatPlaylist,
} from "@/utils/formatters/playlist.formatter.js";
import { ForbiddenError, NotFoundError } from "@/errors/ApiError.js";
import { ROLES } from "@/types/auth/auth.roles.js";
import { jest } from "@jest/globals";

describe("PlaylistService", () => {
  let playlistService: PlaylistService;
  let playlistRepository: jest.Mocked<PlaylistRepository>;

  const ownerUser = {
    id: "0c147c97-1504-42f6-8f30-c92c1eed0c33",
    role: ROLES.USER.name,
  } as any;

  const otherUser = {
    id: "0c147c97-1504-42f6-8f30-c92c1eed0c34",
    role: ROLES.USER.name,
  } as any;

  const adminUser = {
    id: "0c147c97-1504-42f6-8f30-c92c1eed0c35",
    role: ROLES.ADMIN.name,
  } as any;

  beforeEach(() => {
    playlistRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<PlaylistRepository>;

    playlistService = new PlaylistService(playlistRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const basePlaylist = {
    id: "05001d87-20f6-4e59-8514-8c940fdfd495",
    name: "Great Playlist!11",
    description: "hello!",
    createdAt: "2026-07-04T16:46:11.139Z",
    updatedAt: "2026-07-04T16:46:11.139Z",
    authorId: "0c147c97-1504-42f6-8f30-c92c1eed0c33",
    _count: { playlistTracks: 0 },
    author: {
      id: "0c147c97-1504-42f6-8f30-c92c1eed0c33",
      firstName: "test",
      lastName: null,
      email: "test@gmail.com",
    },
    playlistTracks: [],
  };

  describe("getPlaylist", () => {
    it("should return a formatted playlist for its owner", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);

      const result = await playlistService.getPlaylist(
        basePlaylist.id,
        ownerUser,
      );

      expect(playlistRepository.findById).toHaveBeenCalledWith(basePlaylist.id);
      expect(result).toEqual(formatDetailedPlaylist(basePlaylist as any));
    });

    it("should return a formatted playlist for an admin who is not the owner", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);

      const result = await playlistService.getPlaylist(
        basePlaylist.id,
        adminUser,
      );

      expect(result).toEqual(formatDetailedPlaylist(basePlaylist as any));
    });

    it("should throw ForbiddenError when a non-owner, non-admin requests the playlist", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);

      await expect(
        playlistService.getPlaylist(basePlaylist.id, otherUser),
      ).rejects.toThrow(ForbiddenError);
    });

    it("should throw NotFoundError when the playlist does not exist", async () => {
      playlistRepository.findById.mockResolvedValue(null);

      await expect(
        playlistService.getPlaylist("nonexistent-id", otherUser),
      ).rejects.toThrow(NotFoundError);
    });

    it("should throw ForbiddenError when the requester is not admin", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);

      await expect(
        playlistService.getPlaylist("nonexistent-id", otherUser),
      ).rejects.toThrow(ForbiddenError);
    });
  });

  describe("getPlaylists", () => {
    it("should return formatted playlists with pagination meta", async () => {
      const data = { count: 10, offset: 0 };
      playlistRepository.findAll.mockResolvedValue({
        total: 1,
        playlists: [basePlaylist],
      } as any);

      const result = await playlistService.getPlaylists(data as any);

      expect(playlistRepository.findAll).toHaveBeenCalledWith(data);
      expect(result).toEqual({
        data: [formatPlaylist(basePlaylist as any)],
        meta: {
          total: 1,
          count: 10,
          offset: 0,
        },
      });
    });

    it("should return empty data when no playlists are found", async () => {
      playlistRepository.findAll.mockResolvedValue({
        total: 0,
        playlists: [],
      } as any);

      const result = await playlistService.getPlaylists({
        count: 10,
        offset: 0,
      } as any);

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("createPlaylist", () => {
    it("should create a playlist and return it formatted", async () => {
      const createDto = { name: "New Playlist" } as any;
      playlistRepository.create.mockResolvedValue(basePlaylist as any);

      const result = await playlistService.createPlaylist(
        ownerUser.id,
        createDto,
      );

      expect(playlistRepository.create).toHaveBeenCalledWith(
        ownerUser.id,
        createDto,
      );
      expect(result).toEqual(formatPlaylist(basePlaylist as any));
    });
  });

  describe("updatePlaylist", () => {
    const updateDto = { name: "Updated Name" } as any;

    it("should allow the owner to update their playlist", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);
      const updated = { ...basePlaylist, name: "Updated Name" };
      playlistRepository.update.mockResolvedValue(updated as any);

      const result = await playlistService.updatePlaylist(
        basePlaylist.id,
        ownerUser,
        updateDto,
      );

      expect(playlistRepository.update).toHaveBeenCalledWith(
        basePlaylist.id,
        updateDto,
      );
      expect(result).toEqual(formatPlaylist(updated as any));
    });

    it("should allow an admin to update someone else's playlist", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);
      playlistRepository.update.mockResolvedValue(basePlaylist as any);

      const result = await playlistService.updatePlaylist(
        basePlaylist.id,
        adminUser,
        updateDto,
      );

      expect(playlistRepository.update).toHaveBeenCalledWith(
        basePlaylist.id,
        updateDto,
      );
      expect(result).toEqual(formatPlaylist(basePlaylist as any));
    });

    it("should throw ForbiddenError when a non-owner, non-admin tries to update", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);

      await expect(
        playlistService.updatePlaylist(basePlaylist.id, otherUser, updateDto),
      ).rejects.toThrow(ForbiddenError);

      expect(playlistRepository.update).not.toHaveBeenCalled();
    });

    it("should throw ForbiddenError when the playlist does not exist and the requester is not admin", async () => {
      playlistRepository.findById.mockResolvedValue(null);

      await expect(
        playlistService.updatePlaylist("nonexistent-id", otherUser, updateDto),
      ).rejects.toThrow(ForbiddenError);

      expect(playlistRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("deletePlaylist", () => {
    it("should allow the owner to delete their playlist", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);
      playlistRepository.remove.mockResolvedValue(undefined);

      await playlistService.deletePlaylist(basePlaylist.id, ownerUser);

      expect(playlistRepository.remove).toHaveBeenCalledWith(basePlaylist.id);
    });

    it("should allow an admin to delete someone else's playlist", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);
      playlistRepository.remove.mockResolvedValue(undefined);

      await playlistService.deletePlaylist(basePlaylist.id, adminUser);

      expect(playlistRepository.remove).toHaveBeenCalledWith(basePlaylist.id);
    });

    it("should throw ForbiddenError when a non-owner, non-admin tries to delete", async () => {
      playlistRepository.findById.mockResolvedValue(basePlaylist as any);

      await expect(
        playlistService.deletePlaylist(basePlaylist.id, otherUser),
      ).rejects.toThrow(ForbiddenError);

      expect(playlistRepository.remove).not.toHaveBeenCalled();
    });

    it("should throw ForbiddenError when the playlist does not exist and the requester is not admin", async () => {
      playlistRepository.findById.mockResolvedValue(null);

      await expect(
        playlistService.deletePlaylist("nonexistent-id", otherUser),
      ).rejects.toThrow(ForbiddenError);

      expect(playlistRepository.remove).not.toHaveBeenCalled();
    });
  });
});
