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
import { AxiosError } from "axios";
import { userApi } from "@/api/modules/user";
import { UpdatePlaylistDTO } from "@/types/playlist";

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
  return useMutation({
    mutationFn: playlistApi.createPlaylist,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["playlists", { id }], data.data);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      notification.success({
        title: "Playlist was successfully created!",
      });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError) title = err?.response?.data.error.message;
      notification.error({
        title: title,
      });
      logger.error(err);
    },
  });
}

export function useUpdatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlaylistDTO }) =>
      playlistApi.updatePlaylist(data, id),

    onSuccess: (response, variables) => {
      const { id } = variables;
      const updatedPlaylist = response.data.data;

      queryClient.setQueryData(["playlists", { id }], updatedPlaylist);

      queryClient.invalidateQueries({ queryKey: ["playlists"] });

      notification.success({
        title: "Playlist was successfully updated!",
      });
    },

    onError: (error: Error | AxiosError) => {
      let title = "Failed to update playlist";

      if (error instanceof AxiosError) {
        title = error?.response?.data?.error?.message || error.message;
      } else {
        title = error.message;
      }

      notification.error({
        title: title,
      });
      console.error("Update playlist error:", error);
    },
  });
}
