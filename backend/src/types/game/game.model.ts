import type { Game } from "@/generated/prisma/client.js";

export type FormattedGame = Omit<Game, "createdAt" | "updatedAt"> & {
  created_at: Date;
  updated_at: Date;
};

export type FormattedDetailedGame = Omit<
  Game,
  "createdAt" | "updatedAt" | "authorId"
> & {
  albums_amount: number;
  albums: {
    id: string;
    name: string;
    picture: string;
  }[];
  created_at: Date;
  updated_at: Date;
};
