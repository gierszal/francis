import {
  addToAlbumSchema,
  addToFavouritesSchema,
  addToPlaylistSchema,
  createTrackSchema,
  trackQuerySchema,
  updateTrackSchema,
} from "@/schemas/track.schema.ts";

import { z } from "zod";

export type createTrackType = z.infer<typeof createTrackSchema>;
export type updateTrackType = z.infer<typeof updateTrackSchema>;
export type addToAlbumType = z.infer<typeof addToAlbumSchema>;
export type addToFavouritesType = z.infer<typeof addToFavouritesSchema>;
export type addToPlaylistType = z.infer<typeof addToPlaylistSchema>;
export type trackQueryType = z.infer<typeof trackQuerySchema>;

export type trackServiceType = {
  getTrack: (id: string) => Promise<any>;
  getTracks: (
    searchQuery?: string,
    count?: number,
    offset?: number,
  ) => Promise<any>;
  createTrack: (data: createTrackType) => Promise<any>;
  updateTrack: (id: string, data: updateTrackType) => Promise<any>;
  listenIncrement: (id: string) => Promise<any>;
  deleteTrack: (id: string) => Promise<any>;
  addToAlbum: (trackID: string, albumID: string) => Promise<any>;
  addToFavorite: (trackID: string) => Promise<any>;
  addToPlaylist: (trackID: string, playlistID: string) => Promise<any>;
  getRecommendations: (
    searchQuery?: string,
    count?: number,
    offset?: number,
  ) => Promise<any>;
};
