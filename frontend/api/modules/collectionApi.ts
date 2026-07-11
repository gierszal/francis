import { CreateCollectionDTO, UpdateCollectionDTO } from "@/types/collection";
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

  createCollection: async (data: CreateCollectionDTO) => {
    return $api.post("/collections", data);
  },

  updateCollection: async (data: UpdateCollectionDTO, id: string) => {
    return $api.put(`/collections/${id}`, data);
  },

  deleteCollection: async (id: string | undefined) => {
    return $api.delete(`/collections/${id}`);
  },
};
