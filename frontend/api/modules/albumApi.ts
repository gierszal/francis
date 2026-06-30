import { GetItemsParams } from "@/types/api/common";
import $api from "..";

export const albumApi = {
  get: async (params: GetItemsParams = {}) => {
    const requestParams: Record<string, any> = { ...params };

    const res = await $api.get("/albums", { params: requestParams });
    const items = res.data;
    console.log(res.headers["x-total-count"]);
    const total: number = res.headers["x-total-count"] ?? 0;

    return { items, total };
  },

  getalbum: async (id: string | undefined) => {
    return await $api.get(`/albums/${id}`);
  },
};
