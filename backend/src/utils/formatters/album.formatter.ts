import type { Album } from "@/generated/prisma/client.js";
import type {
  FormattedAlbum,
  FormattedDetailedAlbum,
} from "@/types/album/album.model.js";

export function formatAlbum(album: Album): FormattedAlbum {
  return {
    id: album.id,
    name: album.name,
    picture: album.picture,
    description: album.description,
    game_id: album.gameId,
    created_at: album.createdAt,
    updated_at: album.updatedAt,
  };
}

export function formatDetailedAlbum(
  album: Album | any,
): FormattedDetailedAlbum {
  return {
    id: album.id,
    name: album.name,
    picture: album.picture,
    description: album.description,
    tracks: album.tracks.map((track: any) => track),
    tracks_amount: album._count.tracks,
    game: {
      id: album.game.id,
      name: album.game.name,
    },
    collections: album.albumCollections.map(
      (collectionArray: any) => collectionArray.collection,
    ),
    created_at: album.createdAt,
    updated_at: album.updatedAt,
  };
}
