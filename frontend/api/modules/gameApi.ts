import $api from "..";
import { GetItemsParams } from "@/types/api/common";

export const gameApi = {
  get: async (params: GetItemsParams = {}) => {
    const requestParams: Record<string, any> = { ...params };

    const res = await $api.get("/games", { params: requestParams });
    const items = res.data;
    const total: number = res.headers["x-total-count"] ?? 0;

    return { items, total };
  },

  getGame: async (id: string | undefined) => {
    return await $api.get(`/games/${id}`);
  },
};
