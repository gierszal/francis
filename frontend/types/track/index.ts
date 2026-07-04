import { createTrackSchema, updateTrackSchema } from "@/schemas/track";
import z from "zod";

export type Track = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  albumId: string;
  artist: string;
  audio: string;
  tags: string[];
  listens: number;
};

export type FormattedTrack = Omit<
  Track,
  "createdAt" | "updatedAt" | "albumId"
> & {
  picture: string;
  created_at: Date;
  updated_at: Date;
  album_id: string | null;
};

export type FormattedDetailedTrack = Omit<
  Track,
  "createdAt" | "updatedAt" | "albumId"
> & {
  created_at: Date;
  updated_at: Date;
  album: {
    id: string;
    name: string;
    game: {
      id: string;
      name: string;
      created_at: Date;
      updated_at: Date;
    };
    picture: string;
  };
};

export type AlbumTrack = {
  id: string;
  name: string;
  artist: string;
  picture: string;
};

export type PlaylistTrack = AlbumTrack; // если надо будет сменить

export type CreateTrackDTO = z.infer<typeof createTrackSchema>;

export type UpdateTrackDTO = z.infer<typeof updateTrackSchema>;
