import { TrackService } from "@/modules/track/track.service.js";
import type { TrackRepository } from "@/repositories/prisma/track.repository.js";
import { FileService } from "@/services/fileService.js";
import { formatDetailedTrack } from "@/utils/formatters/track.formatter.js";
import { jest } from "@jest/globals";

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
    const expected = {
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
          name: "Kingdom Come: Deliverance",
          createdAt: new Date("2026-06-21T17:22:58.791Z"),
          updatedAt: new Date("2026-06-21T17:22:58.791Z"),
        },
        picture: "8630c0da-b31c-457f-a28c-57669bcec74a",
      },
    };
    const formatted = formatDetailedTrack(expected);
    repo.findById.mockResolvedValue(expected);
    const result = await trackService.getTrack(expected.id);
    expect(result).toEqual(formatted);
  });
});
