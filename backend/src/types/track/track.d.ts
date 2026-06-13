import {
  addToAlbumSchema,
  addToFavouritesSchema,
  addToPlaylistSchema,
  createTrackSchema,
  updateTrackSchema,
} from "@/schemas/track.schema.ts";

import { z } from "zod";
import type { queryType } from "../common/query.js";

export type createTrackType = z.infer<typeof createTrackSchema>;
export type updateTrackType = z.infer<typeof updateTrackSchema>;
export type addToAlbumType = z.infer<typeof addToAlbumSchema>;
export type addToFavouritesType = z.infer<typeof addToFavouritesSchema>;
export type addToPlaylistType = z.infer<typeof addToPlaylistSchema>;

export type TrackServiceType = {
  getTrack: (id: string) => Promise<any>;
  getTracks: (opts: queryType) => Promise<any>;
  createTrack: (data: createTrackType) => Promise<any>;
  updateTrack: (id: string, data: updateTrackType) => Promise<any>;
  listenIncrement: (id: string) => Promise<any>;
  deleteTrack: (id: string) => Promise<any>;
  addToAlbum: (data: addToAlbumType) => Promise<any>;
  addToFavorite: (trackID: string) => Promise<any>;
  addToPlaylist: (data: addToPlaylistType) => Promise<any>;
  getRecommendations: (
    searchQuery?: string,
    count?: number,
    offset?: number,
  ) => Promise<any>;
};
