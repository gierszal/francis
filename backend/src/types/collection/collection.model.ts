import type { Collection } from "@/generated/prisma/client.js";
import type { FormattedAlbum } from "../album/album.model.js";

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
  };
  created_at: Date;
  updated_at: Date;
};
