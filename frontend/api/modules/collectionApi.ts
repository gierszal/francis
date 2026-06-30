import $api from "..";
import { GetItemsParams } from "@/types/api/common";

export const collectionApi = {
  get: async (params: GetItemsParams = {}) => {
    const requestParams: Record<string, any> = { ...params };

    const res = await $api.get("/collections", { params: requestParams });
    const items = res.data;
    const total: number = res.headers["x-total-count"] ?? 0;

    return { items, total };
  },

  getCollection: async (id: string | undefined) => {
    return await $api.get(`/collections/${id}`);
  },
};
