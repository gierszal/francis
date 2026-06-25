import type { Playlist } from "@/generated/prisma/client.js";

export type FindAllPlaylistsResult = {
  playlists: Playlist[];
  total: number;
};
