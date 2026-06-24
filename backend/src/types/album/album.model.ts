import type { Album } from "@/generated/prisma/client.js";

export type FormattedAlbum = Omit<
  Album,
  "createdAt" | "updatedAt" | "gameId"
> & {
  game_id: string;
  created_at: Date;
  updated_at: Date;
};

export type FormattedDetailedAlbum = Omit<
  Album,
  "createdAt" | "updatedAt" | "gameId"
> & {
  tracks_amount: number;
  tracks: {
    id: string;
    name: string;
    artist: string;
  }[];
  game: {
    id: string;
    name: string;
  };
  collections: {
    id: string;
    name: string;
  }[];
  created_at: Date;
  updated_at: Date;
};
