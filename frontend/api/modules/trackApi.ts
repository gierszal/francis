import { GetItemsParams } from "@/types/api/common";
import $api from "..";

export const trackApi = {
  get: async (params: GetItemsParams = {}) => {
    const requestParams: Record<string, any> = { ...params };

    const res = await $api.get("/tracks", { params: requestParams });
    const items = res.data;
    const total: number = res.headers["x-total-count"] ?? 0;

    return { items, total };
  },

  getTrack: async (id: string) => {
    return await $api.get(`/tracks/${id}`);
  },

  createTrack: async (data: FormData) => {
    return $api.post("/tracks", data);
  },

  updateTrack: async (data: FormData, id: string) => {
    return $api.put(`/tracks/${id}`, data);
  },

  deleteTrack: async (id: string) => {
    return $api.delete(`/tracks/${id}`);
  },

  listenIncrement: async (id: string) => {
    return $api.post(`/tracks/${id}/listens`);
  },

  addTrackToPlaylist: async (trackId: string, playlistId: string) => {
    return await $api.post(`/tracks/${trackId}/playlists/${playlistId}`);
  },

  removeTrackFromPlaylist: async (trackId: string, playlistId: string) => {
    return await $api.delete(`/tracks/${trackId}/playlists/${playlistId}`);
  },
};
