import type { Playlist } from "@/generated/prisma/client.js";
import type {
  FormattedDetailedPlaylist,
  FormattedPlaylist,
} from "@/types/playlist/playlist.model.js";

export function formatPlaylist(playlist: Playlist): FormattedPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    created_at: playlist.createdAt,
    updated_at: playlist.updatedAt,
  };
}

export function formatDetailedPlaylist(
  playlist: Playlist | any,
): FormattedDetailedPlaylist {
  return {
    id: playlist.id,
    name: playlist.name,
    tracks: playlist.playlistTracks.map((item: any) => item.track),
    description: playlist.description,
    author: {
      id: playlist.author.id,
      firstName: playlist.author.firstName,
      lastName: playlist.author.lastName,
    },
    created_at: playlist.createdAt,
    updated_at: playlist.updatedAt,
  };
}
