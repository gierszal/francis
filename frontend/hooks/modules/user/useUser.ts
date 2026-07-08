import { userApi } from "@/api/modules/user";
import { GetItemsParams } from "@/types/api/common";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { notification } from "antd";
import { getTranslations } from "next-intl/server";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

export function useGetUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userApi.getUser(),
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetUserPlaylists() {
  return useQuery({
    queryKey: ["me/playlists"],
    queryFn: () => userApi.getUserPlaylists(),
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetUserFavourites(
  params: GetItemsParams = {},
  enabled: boolean = true,
) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["me/favourites", { offset, count, searchQuery }],
    queryFn: () =>
      userApi.getUserFavourites({
        count,
        offset,
        searchQuery,
      }),
    enabled: enabled,
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetUserHistory(params: GetItemsParams = {}) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["me/history", { offset, count, searchQuery }],
    queryFn: () =>
      userApi.getUserHistory({
        count,
        offset,
        searchQuery,
      }),
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useUser");
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: async ({ data }) => {
      queryClient.setQueryData(["me"], data.data.user);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      notification.success({
        title: t("updateProfileSuccess"),
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

export function useAddToFavourites() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useUser");
  return useMutation({
    mutationFn: ({ trackId }: { trackId: string }) =>
      userApi.addToFavourites(trackId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["me/favourites"] });
      notification.success({
        title: t("addFavouritesSuccess"),
      });
    },
    onError: async (error: Error | AxiosError) => {
      const message = getErrorMessage(error);

      notification.error({
        title: t("errorTitle"),
        description: message,
      });

      logger.error("Add track to favourites error:", error);
    },
  });
}

export function useRemoveFromFavourites() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useUser");
  return useMutation({
    mutationFn: ({ trackId }: { trackId: string }) =>
      userApi.removeFromFavourites(trackId),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["me/favourites"] });
      notification.success({
        title: t("removeFavouritesSuccess"),
      });
    },
    onError: async (error: Error | AxiosError) => {
      const message = getErrorMessage(error);

      notification.error({
        title: t("errorTitle"),
        description: message,
      });

      logger.error("Remove from favourites error:", error);
    },
  });
}
