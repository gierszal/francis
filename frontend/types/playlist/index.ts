import { createPlaylistSchema, updatePlaylistSchema } from "@/schemas/playlist";
import { Track } from "../track";
import z from "zod";

export type Playlist = {
  name: string;
  id: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type FormattedPlaylist = Omit<
  Playlist,
  "createdAt" | "updatedAt" | "authorId"
> & {
  created_at: Date;
  updated_at: Date;
};

export type FormattedDetailedPlaylist = Omit<
  Playlist,
  "createdAt" | "updatedAt" | "authorId"
> & {
  tracks: Track[];
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  created_at: Date;
  updated_at: Date;
};

export type CreatePlaylistDTO = z.infer<typeof createPlaylistSchema>;
export type UpdatePlaylistDTO = z.infer<typeof updatePlaylistSchema>;
