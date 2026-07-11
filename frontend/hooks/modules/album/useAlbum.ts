"use client";

import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { GetItemsParams } from "@/types/api/common";
import { albumApi } from "@/api/modules/albumApi";
import { notification } from "antd";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { logger } from "@/lib/logger";

export function useGetAlbums(params: GetItemsParams = {}) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["albums", { offset, count, searchQuery }],
    queryFn: () => albumApi.get({ count, offset, searchQuery }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetAlbum(id: string | undefined, enabled: boolean = true) {
  return useQuery({
    queryKey: ["albums", { id }],
    queryFn: () => albumApi.getAlbum(id),
    enabled,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useCreateAlbum() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useAlbum");

  return useMutation({
    mutationFn: albumApi.createAlbum,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["albums", { id }], data.data);
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      notification.success({ title: t("createSuccess") });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError) title = err?.response?.data.error.message;
      notification.error({ title });
      logger.error(err);
    },
  });
}

export function useUpdateAlbum() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useAlbum");

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      albumApi.updateAlbum(data, id),

    onSuccess: async (response, variables) => {
      const { id } = variables;
      const updatedAlbum = response.data.data;

      queryClient.setQueryData(["albums", { id }], updatedAlbum);
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      notification.success({ title: t("updateSuccess") });
    },

    onError: (error: Error | AxiosError) => {
      let title = t("updateFallbackError");

      if (error instanceof AxiosError) {
        title = error?.response?.data?.error?.message || error.message;
      } else {
        title = error.message;
      }

      notification.error({ title });
      console.error("Update album error:", error);
    },
  });
}

export function useRemoveAlbum() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useAlbum");

  return useMutation({
    mutationFn: ({ id }: { id: string | undefined }) =>
      albumApi.deleteAlbum(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      notification.success({ title: t("deleteSuccess") });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError)
        title = err?.response?.data?.error?.message;
      notification.error({ title });
      logger.error(err);
    },
  });
}

export function useAddToCollection() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useAlbum");

  return useMutation({
    mutationFn: ({
      albumId,
      collectionId,
    }: {
      albumId: string | undefined;
      collectionId: string | undefined;
    }) => albumApi.addToCollection(albumId, collectionId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["albums"] }),
        queryClient.invalidateQueries({ queryKey: ["collections"] }),
      ]);
      notification.success({ title: t("addCollectionSuccess") });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError)
        title = err?.response?.data?.error?.message;
      notification.error({ title });
      logger.error(err);
    },
  });
}

export function useRemoveFromCollection() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useAlbum");

  return useMutation({
    mutationFn: ({
      albumId,
      collectionId,
    }: {
      albumId: string | undefined;
      collectionId: string | undefined;
    }) => albumApi.removeFromCollection(albumId, collectionId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["albums"] }),
        queryClient.invalidateQueries({ queryKey: ["collections"] }),
      ]);
      notification.success({ title: t("removeCollectionSuccess") });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError)
        title = err?.response?.data?.error?.message;
      notification.error({ title });
      logger.error(err);
    },
  });
}
