import type { Track } from "@/generated/prisma/client.js";
import type {
  FormattedDetailedTrack,
  FormattedTrack,
} from "@/types/track/track.model.js";
import { formatGame } from "./game.formatter.js";

export function formatTrack(track: Track | any): FormattedTrack {
  return {
    id: track.id,
    name: track.name,
    artist: track.artist,
    audio: track.audio,
    picture: track.album.picture,
    listens: track.listens,
    is_favourite: track?.favourites?.length > 0,
    tags: track?.tags?.map((tag: any) => tag) ?? [],
    created_at: track.createdAt,
    updated_at: track.updatedAt,
    album_id: track.albumId,
  };
}

export function formatDetailedTrack(
  track: Track | any,
): FormattedDetailedTrack {
  return {
    id: track.id,
    name: track.name,
    artist: track.artist,
    audio: track.audio,
    is_favourite: track?.favourites?.length > 0,
    tags: track.tags.map((tag: any) => tag),
    created_at: track.createdAt,
    updated_at: track.updatedAt,
    listens: track.listens,
    album: {
      id: track.album.id,
      name: track.album.name,
      game: formatGame(track.album.game),
      picture: track.album.picture,
    },
  };
}
