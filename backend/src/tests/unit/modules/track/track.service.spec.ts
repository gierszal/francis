import { TrackService } from "@/modules/track/track.service.js";
import type { TrackRepository } from "@/repositories/prisma/track.repository.js";
import { FileService } from "@/services/fileService.js";

describe("TrackService", () => {
  let trackService: TrackService;
  let repo: jest.Mocked<TrackRepository>;
  const fileService = new FileService();

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findById: jest.fn(),
      addToPlaylist: jest.fn(),
      findAll: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
      listenIncrement: jest.fn(),
    } as unknown as jest.Mocked<TrackRepository>;

    trackService = new TrackService(repo, fileService);
  });

  it("should return a track when is exists", async () => {
    const fakeTrack = {
      id: "t-1",
      name: "Song",
      artist: "Band",
      audio: "url",
      tags: ["asd"],
      listens: 0,
      created_at: new Date("2024-11-03"),
      updated_at: new Date("2024-11-03"),
      albumId: "23kr92k9k23",
    };
    // repo.findById.mockResolvedValue(fakeTrack);
    // const result = await service("");
  });
});
