import { UserService } from "@/modules/user/user.service.js";
import type { UserRepository } from "@/repositories/prisma/user.repository.js";
import { formatUser } from "@/utils/formatters/user.formatter.js";
import { formatPlaylist } from "@/utils/formatters/playlist.formatter.js";
import { formatTrack } from "@/utils/formatters/track.formatter.js";
import { jest } from "@jest/globals";

describe("UserService", () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      findPlaylists: jest.fn(),
      getFavourites: jest.fn(),
      addToFavourites: jest.fn(),
      removeFromFavourites: jest.fn(),
      getHistory: jest.fn(),
      addToHistory: jest.fn(),
      updateUser: jest.fn(),
      removeUser: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    userService = new UserService(userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseUser = {
    id: "u1a1b1c1-1111-4111-8111-111111111111",
    firstName: "ye",
    lastName: "ye",
    email: "ye@example.com",
    role: { role: "USER" },
  };

  const basePlaylist = {
    id: "p1a1b1c1-1111-4111-8111-111111111111",
    name: "great name",
    authorId: baseUser.id,
  };

  const baseTrack = {
    id: "t1a1b1c1-1111-4111-8111-111111111111",
    name: "Some Track",
    artist: "Some Artist",
    album: { picture: "cover.jpg" },
  };

  describe("getUser", () => {
    it("should return a formatted user", async () => {
      userRepository.findById.mockResolvedValue(baseUser as any);

      const result = await userService.getUser(baseUser.id);

      expect(userRepository.findById).toHaveBeenCalledWith(baseUser.id);
      expect(result).toEqual(formatUser(baseUser as any));
    });
  });

  describe("getPlaylists", () => {
    it("should return formatted playlists scoped to the user, with pagination meta", async () => {
      const query = { count: 10, offset: 0 };
      userRepository.findPlaylists.mockResolvedValue({
        total: 1,
        playlists: [basePlaylist],
      } as any);

      const result = await userService.getPlaylists(baseUser.id, query as any);

      expect(userRepository.findPlaylists).toHaveBeenCalledWith(
        baseUser.id,
        query,
      );
      expect(result).toEqual({
        data: [formatPlaylist(basePlaylist as any)],
        meta: { total: 1, count: 10, offset: 0 },
      });
    });

    it("should return empty data when the user has no playlists", async () => {
      userRepository.findPlaylists.mockResolvedValue({
        total: 0,
        playlists: [],
      } as any);

      const result = await userService.getPlaylists(baseUser.id, {
        count: 10,
        offset: 0,
      } as any);

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("getFavourites", () => {
    it("should return formatted favourite tracks with pagination meta", async () => {
      const query = { count: 10, offset: 0 };
      userRepository.getFavourites.mockResolvedValue({
        total: 1,
        tracks: [baseTrack],
      } as any);

      const result = await userService.getFavourites(baseUser.id, query as any);

      expect(userRepository.getFavourites).toHaveBeenCalledWith(
        baseUser.id,
        query,
      );
      expect(result).toEqual({
        data: [formatTrack(baseTrack as any)],
        meta: { total: 1, count: 10, offset: 0 },
      });
    });

    it("should return empty data when the user has no favourites", async () => {
      userRepository.getFavourites.mockResolvedValue({
        total: 0,
        tracks: [],
      } as any);

      const result = await userService.getFavourites(baseUser.id, {
        count: 10,
        offset: 0,
      } as any);

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("getRecommendations", () => {
    it("should return an empty response as a stub implementation", async () => {
      const result = await userService.getRecommendations({
        count: 10,
        offset: 0,
      } as any);

      expect(result).toEqual({
        data: [],
        meta: { total: 0, count: 0, offset: 0 },
      });
    });
  });

  describe("addToFavourites", () => {
    it("should delegate to the repository", async () => {
      userRepository.addToFavourites.mockResolvedValue(undefined);

      await userService.addToFavourites(baseUser.id, baseTrack.id);

      expect(userRepository.addToFavourites).toHaveBeenCalledWith(
        baseUser.id,
        baseTrack.id,
      );
    });
  });

  describe("removeFromFavourites", () => {
    it("should delegate to the repository", async () => {
      userRepository.removeFromFavourites.mockResolvedValue(undefined);

      await userService.removeFromFavourites(baseUser.id, baseTrack.id);

      expect(userRepository.removeFromFavourites).toHaveBeenCalledWith(
        baseUser.id,
        baseTrack.id,
      );
    });
  });

  describe("getHistory", () => {
    it("should return formatted history tracks with pagination meta", async () => {
      const query = { count: 10, offset: 0 };
      userRepository.getHistory.mockResolvedValue({
        total: 1,
        tracks: [baseTrack],
      } as any);

      const result = await userService.getHistory(baseUser.id, query as any);

      expect(userRepository.getHistory).toHaveBeenCalledWith(
        baseUser.id,
        query,
      );
      expect(result).toEqual({
        data: [formatTrack(baseTrack as any)],
        meta: { total: 1, count: 10, offset: 0 },
      });
    });

    it("should return empty data when the user has no history", async () => {
      userRepository.getHistory.mockResolvedValue({
        total: 0,
        tracks: [],
      } as any);

      const result = await userService.getHistory(baseUser.id, {
        count: 10,
        offset: 0,
      } as any);

      expect(result.data).toEqual([]);
      expect(result.meta.total).toBe(0);
    });
  });

  describe("addToHistory", () => {
    it("should delegate to the repository", async () => {
      userRepository.addToHistory.mockResolvedValue(undefined);

      await userService.addToHistory(baseUser.id, baseTrack.id);

      expect(userRepository.addToHistory).toHaveBeenCalledWith(
        baseUser.id,
        baseTrack.id,
      );
    });
  });

  describe("updateUser", () => {
    it("should update the user and return it formatted", async () => {
      const updateDto = { firstName: "Timmy" } as any;
      const updatedUser = { ...baseUser, firstName: "Timmy" };
      userRepository.updateUser.mockResolvedValue(updatedUser as any);

      const result = await userService.updateUser(baseUser.id, updateDto);

      expect(userRepository.updateUser).toHaveBeenCalledWith(
        baseUser.id,
        updateDto,
      );
      expect(result).toEqual(formatUser(updatedUser as any));
    });
  });

  describe("removeUser", () => {
    it("should delegate removal to the repository", async () => {
      userRepository.removeUser.mockResolvedValue(undefined);

      await userService.removeUser(baseUser.id);

      expect(userRepository.removeUser).toHaveBeenCalledWith(baseUser.id);
    });
  });
});
