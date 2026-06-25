import type { Collection } from "@/generated/prisma/client.js";

export type FindAllCollectionsResult = {
  collections: Collection[];
  total: number;
};
