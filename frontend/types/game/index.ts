type Game = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  picture: string;
};

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
