import type { Game } from "@/generated/prisma/client.js";
import type {
  FormattedDetailedGame,
  FormattedGame,
} from "@/types/game/game.model.js";

export function formatGame(game: Game): FormattedGame {
  return {
    id: game.id,
    name: game.name,
    picture: game.picture,
    created_at: game.createdAt,
    updated_at: game.updatedAt,
  };
}

export function formatDetailedGame(game: Game | any): FormattedDetailedGame {
  return {
    id: game.id,
    name: game.name,
    picture: game.picture,
    albums: game.albums.map((album: any) => album),
    albums_amount: game._count.albums,
    created_at: game.createdAt,
    updated_at: game.updatedAt,
  };
}
