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
import { AxiosError } from "axios";

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
  return useMutation({
    mutationFn: ({
      trackId,
      playlistId,
    }: {
      trackId: string;
      playlistId: string;
    }) => trackApi.addTrackToPlaylist(trackId, playlistId),
    onSuccess: (data, { trackId, playlistId }) => {
      queryClient.setQueryData(["playlists", { id: playlistId }], data.data);
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      notification.success({
        title: "Track added to playlist!",
      });
    },
    onError: (error: Error | AxiosError) => {
      let message = "Failed to add track to playlist";

      if (error instanceof AxiosError) {
        message = error?.response?.data?.error?.message || error.message;
      } else {
        message = error.message;
      }

      notification.error({
        title: "Error",
        description: message,
      });

      console.error("Add track error:", error);
    },
  });
}

export function useRemoveTrackFromPlaylist() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      trackId,
      playlistId,
    }: {
      trackId: string;
      playlistId: string;
    }) => trackApi.removeTrackFromPlaylist(trackId, playlistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
      notification.success({
        title: "Track removed from playlist!",
      });
    },
    onError: (error: Error | AxiosError) => {
      let message = "Failed to remove track from playlist";

      if (error instanceof AxiosError) {
        message = error?.response?.data?.error?.message || error.message;
      } else {
        message = error.message;
      }

      notification.error({
        title: "Error",
        description: message,
      });

      console.error("Remove from playlist error:", error);
    },
  });
}

export function useCreateTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: trackApi.createTrack,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["tracks", { id }], data.data);
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      notification.success({
        title: "Track was successfully created!",
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

export function useUpdateTrack() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      trackApi.updateTrack(data, id),

    onSuccess: (response, variables) => {
      const { id } = variables;
      const updatedTrack = response.data.data;

      queryClient.setQueryData(["tracks", { id }], updatedTrack);

      queryClient.invalidateQueries({ queryKey: ["tracks"] });

      notification.success({
        title: "Track was successfully updated!",
      });
    },

    onError: (error: Error | AxiosError) => {
      let title = "Failed to update track";

      if (error instanceof AxiosError) {
        title = error?.response?.data?.error?.message || error.message;
      } else {
        title = error.message;
      }

      notification.error({
        title: title,
      });
      console.error("Update track error:", error);
    },
  });
}

export function useRemoveTrack() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string | undefined }) =>
      trackApi.deleteTrack(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tracks"] });
      notification.success({
        title: "Track was successfully deleted!",
      });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError)
        title = err?.response?.data?.error?.message;
      notification.error({
        title: title,
      });
      logger.error(err);
    },
  });
}
