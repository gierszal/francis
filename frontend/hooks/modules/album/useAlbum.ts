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
import { UpdateAlbumDTO } from "@/types/album";

export function useGetAlbums(params: GetItemsParams = {}) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["albums", { offset, count, searchQuery }],
    queryFn: () =>
      albumApi.get({
        count,
        offset,
        searchQuery,
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetAlbum(id: string | undefined, enabled: boolean = true) {
  return useQuery({
    queryKey: ["albums", { id }],
    queryFn: () => albumApi.getAlbum(id),
    enabled: enabled,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useCreateAlbum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: albumApi.createAlbum,
    onSuccess: async ({ data }) => {
      const id = data.data.id;
      queryClient.setQueryData(["albums", { id }], data.data);
      notification.success({
        title: "Album was successfully created!",
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

export function useUpdateAlbum() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      albumApi.updateAlbum(data, id),

    onSuccess: (response, variables) => {
      const { id } = variables;
      const updatedAlbum = response.data.data;

      queryClient.setQueryData(["albums", { id }], updatedAlbum);

      queryClient.invalidateQueries({ queryKey: ["albums"] });

      notification.success({
        title: "Album was successfully updated!",
      });
    },

    onError: (error: Error | AxiosError) => {
      let title = "Failed to update album";

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

export function useRemoveAlbum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string | undefined }) =>
      albumApi.deleteAlbum(id),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      notification.success({
        title: "Album was successfully deleted!",
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

export function useAddToCollection() {
  const queryClient = useQueryClient();
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
      notification.success({
        title: "Album was successfully added to collection!",
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

export function useRemoveFromCollection() {
  const queryClient = useQueryClient();
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
      notification.success({
        title: "Album was successfully removed from collection!",
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
