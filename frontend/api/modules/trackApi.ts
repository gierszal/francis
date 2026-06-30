import { GetItemsParams } from "@/types/api/common";
import $api from "..";

export const trackApi = {
  get: async (params: GetItemsParams = {}) => {
    const requestParams: Record<string, any> = { ...params };

    const res = await $api.get("/tracks", { params: requestParams });
    const items = res.data;
    console.log(res.headers["x-total-count"]);
    const total: number = res.headers["x-total-count"] ?? 0;

    return { items, total };
  },

  getTrack: async (id: string | undefined) => {
    return await $api.get(`/tracks/${id}`);
  },
};
