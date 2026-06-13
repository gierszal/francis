import type { Game } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type { createGameType, updateGameType } from "@/types/game/game.js";
import type { queryType } from "@/types/common/query.js";

export class GameRepository {
  async findAll(options?: queryType) {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: any = {};

    if (searchQuery)
      where.OR = [
        { name: { contains: searchQuery } },
        { description: { contains: searchQuery } },
      ];

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        skip: offset,
        take: count,
      }),
      prisma.game.count({ where }),
    ]);

    return {
      data: games.map((game) => formatGame(game)),
      total,
      count,
      offset,
    };
  }

  async findById(id: string) {
    const game = await prisma.game.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            albums: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            picture: true,
          },
        },
      },
    });
    return game ? formatDetailedGame(game) : null;
  }

  async create({ name }: createGameType) {
    const game = await prisma.game.create({
      data: {
        name,
      },
    });
    return formatGame(game);
  }

  async update(id: string, data: updateGameType) {
    const updates = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined),
    );

    try {
      const game = await prisma.game.update({
        where: { id },
        data: updates,
      });
      return formatGame(game);
    } catch (err: any) {
      if (err.code === "P2025") return null;
      throw err;
    }
  }

  async remove(id: string) {
    try {
      const game = await prisma.game.delete({
        where: { id },
      });
      return formatGame(game);
    } catch (err: any) {
      if (err.code === "P2025") {
        throw new Error(`Game with id ${id} not found`);
      }
      throw err;
    }
  }
}

function formatGame(game: Game) {
  return {
    id: game.id,
    name: game.name,
  };
}

function formatDetailedGame(game: Game | any) {
  return {
    id: game.id,
    name: game.name,
    albums: game.albums.map((album: any) => album),
    albums_amount: game._count.albums,
  };
}
