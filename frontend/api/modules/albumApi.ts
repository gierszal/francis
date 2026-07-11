import { GetItemsParams } from "@/types/api/common";
import $api from "..";

export const albumApi = {
  get: async (params: GetItemsParams = {}) => {
    const requestParams: Record<string, any> = { ...params };

    const res = await $api.get("/albums", { params: requestParams });
    const items = res.data;
    const total: number = res.headers["x-total-count"] ?? 0;

    return { items, total };
  },

  getAlbum: async (id: string | undefined) => {
    return $api.get(`/albums/${id}`);
  },

  createAlbum: async (data: FormData) => {
    return $api.post("/albums", data);
  },

  updateAlbum: async (data: FormData, id: string) => {
    return $api.put(`/albums/${id}`, data);
  },

  deleteAlbum: async (id: string | undefined) => {
    return $api.delete(`/albums/${id}`);
  },

  addToCollection: async (
    albumId: string | undefined,
    collectionId: string | undefined,
  ) => {
    return $api.post(`/albums/${albumId}/collections/${collectionId}`);
  },

  removeFromCollection: async (
    albumId: string | undefined,
    collectionId: string | undefined,
  ) => {
    return $api.delete(`/albums/${albumId}/collections/${collectionId}`);
  },
};
