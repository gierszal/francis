"use client";

import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { GetItemsParams } from "@/types/api/common";
import { playlistApi } from "@/api/modules/playlist";
import { notification } from "antd";
import { getTranslations } from "next-intl/server";
import { AxiosError } from "axios";
import { userApi } from "@/api/modules/user";
import { UpdatePlaylistDTO } from "@/types/playlist";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { useTranslations } from "next-intl";

export function useGetPlaylists(params: GetItemsParams = {}) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["playlists", { offset, count, searchQuery }],
    queryFn: () =>
      userApi.getUserPlaylists({
        count,
        offset,
        searchQuery,
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetPlaylist(
  id: string | undefined,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["playlists", { id }],
    queryFn: () => playlistApi.getPlaylist(id),
    enabled: enabled ?? true,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useCreatePlaylist() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.usePlaylist");
  return useMutation({
    mutationFn: playlistApi.createPlaylist,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["playlists", { id }], data.data);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
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

export function useUpdatePlaylist() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.usePlaylist");
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlaylistDTO }) =>
      playlistApi.updatePlaylist(data, id),

    onSuccess: async (response, variables) => {
      const { id } = variables;
      const updatedPlaylist = response.data.data;

      queryClient.setQueryData(["playlists", { id }], updatedPlaylist);

      queryClient.invalidateQueries({ queryKey: ["playlists"] });

      notification.success({
        title: t("updateSuccess"),
      });
    },

    onError: (error: Error | AxiosError) => {
      const title = getErrorMessage(error);

      notification.error({
        title: title,
      });
      logger.error("Update playlist error:", error);
    },
  });
}
