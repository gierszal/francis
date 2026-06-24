import type { Album } from "@/generated/prisma/client.js";

export type FindAllAlbumsResult = {
  albums: Album[];
  total: number;
};
