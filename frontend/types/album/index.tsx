import {
  addToCollectionSchema,
  createAlbumSchema,
  updateAlbumSchema,
} from "@/schemas/album";
import z from "zod";

export type Album = {
  name: string;
  id: string;
  picture: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  gameId: string;
};

export type FormattedAlbum = Omit<
  Album,
  "createdAt" | "updatedAt" | "gameId"
> & {
  game_id: string;
  created_at: Date;
  updated_at: Date;
};

export type CollectionAlbum = {
  id: string;
  name: string;
  picture: string;
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

export type CreateAlbumDTO = z.infer<typeof createAlbumSchema>;

export type UpdateAlbumDTO = z.infer<typeof updateAlbumSchema>;

export type AddToCollectionDTO = z.infer<typeof addToCollectionSchema>;
