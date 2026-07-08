import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";
import { trackApi } from "../../../api/modules/trackApi";
import $api from "@/api";
import { GetItemsParams } from "@/types/api/common";
import { notification } from "antd";
import { getTranslations } from "next-intl/server";
import { AxiosError } from "axios";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { useTranslations } from "next-intl";

export function useGetTracks(params: GetItemsParams = {}) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["tracks", { offset, count, searchQuery }],
    queryFn: () =>
      trackApi.get({
        count,
        offset,
        searchQuery,
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetTrack(id: string | undefined, enabled: boolean = true) {
  return useQuery({
    queryKey: ["tracks", { id }],
    queryFn: () => trackApi.getTrack(id),
    enabled: enabled,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useAddTrackToPlaylist() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useTrack");
  return useMutation({
    mutationFn: ({
      trackId,
      playlistId,
    }: {
      trackId: string;
      playlistId: string;
    }) => trackApi.addTrackToPlaylist(trackId, playlistId),
    onSuccess: async (data, { trackId, playlistId }) => {
      queryClient.setQueryData(["playlists", { id: playlistId }], data.data);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      notification.success({
        title: t("addPlaylistSuccess"),
      });
    },
    onError: async (error: Error | AxiosError) => {
      const message = getErrorMessage(error);

      notification.error({
        title: t("errorTitle"),
        description: message,
      });

      logger.error("Add track error:", error);
    },
  });
}

export function useRemoveTrackFromPlaylist() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useTrack");
  return useMutation({
    mutationFn: ({
      trackId,
      playlistId,
    }: {
      trackId: string;
      playlistId: string;
    }) => trackApi.removeTrackFromPlaylist(trackId, playlistId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      notification.success({
        title: t("removePlaylistSuccess"),
      });
    },
    onError: async (error: Error | AxiosError) => {
      const message = getErrorMessage(error);

      notification.error({
        title: t("errorTitle"),
        description: message,
      });

      logger.error("Remove from playlist error:", error);
    },
  });
}

export function useCreateTrack() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useTrack");
  return useMutation({
    mutationFn: trackApi.createTrack,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["tracks", { id }], data.data);
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
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

export function useUpdateTrack() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useTrack");
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      trackApi.updateTrack(data, id),

    onSuccess: async (response, variables) => {
      const { id } = variables;
      const updatedTrack = response.data.data;

      queryClient.setQueryData(["tracks", { id }], updatedTrack);

      queryClient.invalidateQueries({ queryKey: ["tracks"] });

      notification.success({
        title: t("updateSuccess"),
      });
    },

    onError: (error: Error | AxiosError) => {
      const title = getErrorMessage(error);

      notification.error({
        title: title,
      });
      logger.error("Update track error:", error);
    },
  });
}

export function useRemoveTrack() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useTrack");
  return useMutation({
    mutationFn: ({ id }: { id: string | undefined }) =>
      trackApi.deleteTrack(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      notification.success({
        title: t("deleteSuccess"),
      });
    },
    onError: (error) => {
      const title = getErrorMessage(error);
      notification.error({
        title: title,
      });
      logger.error(error);
    },
  });
}
