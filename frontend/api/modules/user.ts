import { UpdateUserDTO } from "@/types/user";
import $api from "..";
import { GetItemsParams } from "@/types/api/common";

export const userApi = {
  getUser: async () => {
    return $api.get("/users/me");
  },
  getUserPlaylists: async (params: GetItemsParams = {}) => {
    const requestParams: Record<string, any> = { ...params };

    const res = await $api.get("users/me/playlists", { params: requestParams });
    const items = res.data;
    const total: number = res.headers["x-total-count"] ?? 0;

    return { items, total };
  },
  getUserFavourites: async () => {
    return $api.get("/users/me/favourites");
  },
  addToFavourites: async (trackId: string) => {
    return $api.post(`/users/me/favourites/${trackId}`);
  },
  removeFromFavourites: async (trackId: string) => {
    return $api.delete(`/users/me/favourites/${trackId}`);
  },
  getUserHistory: async () => {
    return $api.get("/users/me/history");
  },
  updateProfile: async (data: UpdateUserDTO) => {
    return $api.patch("/users/me", data);
  },
};
