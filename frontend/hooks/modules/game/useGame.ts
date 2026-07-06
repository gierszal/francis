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
  return useMutation({
    mutationFn: gameApi.createGame,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["games", { id }], data.data);
      queryClient.invalidateQueries({ queryKey: ["games"] });
      notification.success({
        title: "Game was successfully created!",
      });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError) title = err?.response?.data.error.message;
      notification.error({
        title: title,
      });
      console.log(err);
    },
  });
}

export function useUpdateGame() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      gameApi.updateGame(data, id),

    onSuccess: (response, variables) => {
      const { id } = variables;
      const updatedAlbum = response.data.data;

      queryClient.setQueryData(["games", { id }], updatedAlbum);

      queryClient.invalidateQueries({ queryKey: ["games"] });

      notification.success({
        title: "Game was successfully updated!",
      });
    },

    onError: (error: Error | AxiosError) => {
      let title = "Failed to update game";

      if (error instanceof AxiosError) {
        title = error?.response?.data?.error?.message || error.message;
      } else {
        title = error.message;
      }

      notification.error({
        title: title,
      });
      console.error("Update album error:", error);
    },
  });
}

export function useRemoveGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string | undefined }) => gameApi.deleteGame(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      notification.success({
        title: "Game was successfully deleted!",
      });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError)
        title = err?.response?.data?.error?.message;
      notification.error({
        title: title,
      });
      console.log(err);
    },
  });
}
