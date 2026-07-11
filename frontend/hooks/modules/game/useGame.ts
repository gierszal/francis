import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { GetItemsParams } from "@/types/api/common";
import { gameApi } from "@/api/modules/gameApi";
import { notification } from "antd";
import { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { useTranslations } from "next-intl";
import { logger } from "@/lib/logger";

export function useGetGames(params: GetItemsParams = {}) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["games", { offset, count, searchQuery }],
    queryFn: () =>
      gameApi.get({
        count,
        offset,
        searchQuery,
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetGame(id: string | undefined, enabled: boolean = true) {
  return useQuery({
    queryKey: ["games", { id }],
    queryFn: () => gameApi.getGame(id),
    enabled: enabled,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useCreateGame() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useGame");
  return useMutation({
    mutationFn: gameApi.createGame,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["games", { id }], data.data);
      queryClient.invalidateQueries({ queryKey: ["games"] });
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

export function useUpdateGame() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useGame");
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      gameApi.updateGame(data, id),

    onSuccess: async (response, variables) => {
      const { id } = variables;
      const updatedAlbum = response.data.data;

      queryClient.setQueryData(["games", { id }], updatedAlbum);

      queryClient.invalidateQueries({ queryKey: ["games"] });

      notification.success({
        title: t("updateSuccess"),
      });
    },

    onError: (error: Error | AxiosError) => {
      const title = getErrorMessage(error);

      notification.error({
        title: title,
      });
      console.error("Update album error:", error);
    },
  });
}

export function useRemoveGame() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useGame");
  return useMutation({
    mutationFn: ({ id }: { id: string | undefined }) => gameApi.deleteGame(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
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
