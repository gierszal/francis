import type { Track } from "@/generated/prisma/client.js";

export type FindTracksResult = {
  tracks: Track[];
  total: number;
};
