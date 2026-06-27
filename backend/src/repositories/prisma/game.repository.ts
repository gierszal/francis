import type { Game } from "@/generated/prisma/client.js";
import { prisma } from "@/prisma.js";
import type {
  CreateGameDTO,
  IGameRepository,
  UpdateGameDTO,
} from "@/types/game/index.js";
import type { queryType } from "@/types/common/query.js";
import type { FindAllGamesResult } from "@/types/game/index.js";
import { NotFoundError } from "@/errors/ApiError.js";

export class GameRepository implements IGameRepository {
  async findAll(options?: queryType): Promise<FindAllGamesResult> {
    const { count = 10, offset = 0, searchQuery } = options || {};

    const where: any = {};

    if (searchQuery) where.OR = [{ name: { contains: searchQuery } }];

    const [games, total] = await Promise.all([
      prisma.game.findMany({
        where,
        skip: offset,
        take: count,
      }),
      prisma.game.count({ where }),
    ]);

    return { games, total };
  }

  async findById(id: string): Promise<Game | null> {
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
    return game ?? null;
  }

  async create({ name }: CreateGameDTO, picturePath: string): Promise<Game> {
    return await prisma.game.create({
      data: {
        name,
        picture: picturePath,
      },
    });
  }

  async update(
    id: string,
    data: UpdateGameDTO,
    picturePath?: string,
  ): Promise<Game> {
    const updates = picturePath ? { ...data, picture: picturePath } : data;

    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, v]) => v !== undefined),
    );
    try {
      return prisma.game.update({
        where: { id },
        data: cleanUpdates,
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Game with id ${id} not found`);
      throw err;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      prisma.game.delete({
        where: { id },
      });
    } catch (err: any) {
      if (err.code === "P2025")
        throw new NotFoundError(`Game with id ${id} not found`);
      throw err;
    }
  }
}
