import type { queryType } from "@/types/common/query.js";
import type { MultipartFile } from "@fastify/multipart";
import type {
  AddToAlbumDTO,
  AddToPlaylistDTO,
  CreateTrackDTO,
  FormattedDetailedTrack,
  FormattedTrack,
  RemoveTrackFromPlaylistDTO,
  TracksResponse,
  UpdateTrackDTO,
} from "./index.js";
import type { FindTracksResult } from "./track.result.js";
import type { Track } from "@/generated/prisma/client.js";
import type { FormattedUserPayload } from "../user/user.model.js";

export type ITrackService = {
  getTrack: (id: string) => Promise<FormattedDetailedTrack | null>;

  getTracks: (opts: queryType) => Promise<TracksResponse>;

  createTrack: (
    data: CreateTrackDTO,
    audio: MultipartFile,
  ) => Promise<FormattedTrack>;

  updateTrack: (
    id: string,
    data: UpdateTrackDTO,
    audio?: MultipartFile,
  ) => Promise<FormattedTrack | null>;

  listenIncrement: (id: string) => Promise<void | null>;

  deleteTrack: (id: string) => Promise<void>;

  addToPlaylist: (
    data: AddToPlaylistDTO,
    user: FormattedUserPayload,
  ) => Promise<void>;

  removeFromPlaylist: (
    data: RemoveTrackFromPlaylistDTO,
    user: FormattedUserPayload,
  ) => Promise<void>;
};

export type ITrackRepository = {
  findAll: (options?: queryType) => Promise<FindTracksResult>;

  findById: (id: string) => Promise<Track | null>;

  create: (data: CreateTrackDTO, audio: string) => Promise<Track>;

  update: (
    id: string,
    data: UpdateTrackDTO,
    audioPath?: string,
  ) => Promise<Track | null>;

  listenIncrement: (id: string) => Promise<void>;

  remove: (id: string) => Promise<void>;

  addToPlaylist: (data: AddToPlaylistDTO) => Promise<void>;

  removeFromPlaylist: (data: RemoveTrackFromPlaylistDTO) => Promise<void>;
};
