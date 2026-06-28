export type Collection = {
  name: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FormattedCollection = Omit<
  Collection,
  "createdAt" | "updatedAt"
> & {
  created_at: Date;
  updated_at: Date;
};

export type FormattedDetailedCollection = Omit<
  Collection,
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
