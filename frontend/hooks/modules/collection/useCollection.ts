import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { GetItemsParams } from "@/types/api/common";
import { collectionApi } from "@/api/modules/collectionApi";
import { notification } from "antd";
import { getTranslations } from "next-intl/server";
import { AxiosError } from "axios";
import { UpdateCollectionDTO } from "@/types/collection";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { useTranslations } from "next-intl";

export function useGetCollections(params: GetItemsParams = {}) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["collections", { offset, count, searchQuery }],
    queryFn: () =>
      collectionApi.get({
        count,
        offset,
        searchQuery,
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetCollection(
  id: string | undefined,
  enable: boolean = true,
) {
  return useQuery({
    queryKey: ["collections", { id }],
    queryFn: () => collectionApi.getCollection(id),
    enabled: enable,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useCreateCollection() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useCollection");
  return useMutation({
    mutationFn: collectionApi.createCollection,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["collections", { id }], data.data);
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      notification.success({
        title: t("createSuccess"),
      });
    },
    onError: (err) => {
      const title = getErrorMessage(err);
      notification.error({
        title: title,
      });
      logger.error(err);
    },
  });
}

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useCollection");

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCollectionDTO }) =>
      collectionApi.updateCollection(data, id),

    onSuccess: async (response, variables) => {
      const { id } = variables;
      const updatedAlbum = response.data.data;

      queryClient.setQueryData(["collections", { id }], updatedAlbum);

      queryClient.invalidateQueries({ queryKey: ["collections"] });

      notification.success({
        title: t("updateSuccess"),
      });
    },

    onError: (error: Error | AxiosError) => {
      const title = getErrorMessage(error);

      notification.error({
        title: title,
      });
      logger.error("Update album error:", error);
    },
  });
}

export function useRemoveCollection() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useCollection");
  return useMutation({
    mutationFn: ({ id }: { id: string | undefined }) =>
      collectionApi.deleteCollection(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      notification.success({
        title: t("deleteSuccess"),
      });
    },
    onError: (err) => {
      const title = getErrorMessage(err);
      notification.error({
        title: title,
      });
      logger.error(err);
    },
  });
}
