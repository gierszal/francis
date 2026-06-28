import { Track } from "../track";

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
