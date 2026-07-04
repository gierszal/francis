import { GetItemsParams } from "@/types/api/common";
import $api from "..";
import { CreatePlaylistDTO, UpdatePlaylistDTO } from "@/types/playlist";

export const playlistApi = {
  get: async (params: GetItemsParams = {}) => {
    const requestParams: Record<string, any> = { ...params };

    const res = await $api.get("/me/playlists", { params: requestParams });
    const items = res.data;
    const total: number = res.headers["x-total-count"] ?? 0;

    return { items, total };
  },

  getPlaylist: async (id: string | undefined) => {
    return await $api.get(`/playlists/${id}`);
  },

  createPlaylist: async (data: CreatePlaylistDTO) => {
    return $api.post("/playlists", data);
  },

  updatePlaylist: async (data: UpdatePlaylistDTO, id: string) => {
    return $api.put(`/playlists/${id}`, data);
  },
};
