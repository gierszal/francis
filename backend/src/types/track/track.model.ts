import type { Track } from "@/generated/prisma/client.js";

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
