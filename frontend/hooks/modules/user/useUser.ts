import { userApi } from "@/api/modules/user";
import { UpdateUserDTO } from "@/types/user";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { notification } from "antd";
import { AxiosError } from "axios";

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

export function useGetUserFavourites() {
  return useQuery({
    queryKey: ["me/favourites"],
    queryFn: () => userApi.getUserFavourites(),
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetUserHistory() {
  return useQuery({
    queryKey: ["me/history"],
    queryFn: () => userApi.getUserHistory(),
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: async ({ data }) => {
      queryClient.setQueryData(["me"], data.data.user);
      notification.success({
        title: "Information about you was successfully updated!",
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

export function useAddToFavourites() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ trackId }: { trackId: string }) =>
      userApi.addToFavourites(trackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me/favourites"] });
      notification.success({
        title: "Track added to favourites!",
      });
    },
    onError: (error: Error | AxiosError) => {
      let message = "Failed to add track to favourites";

      if (error instanceof AxiosError) {
        message = error?.response?.data?.error?.message || error.message;
      } else {
        message = error.message;
      }

      notification.error({
        title: "Error",
        description: message,
      });

      console.error("Add track to favourites error:", error);
    },
  });
}

export function useRemoveFromFavourites() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ trackId }: { trackId: string }) =>
      userApi.removeFromFavourites(trackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me/favourites"] });
      notification.success({
        title: "Track removed from favourites!",
      });
    },
    onError: (error: Error | AxiosError) => {
      let message = "Failed to remove track from favourites";

      if (error instanceof AxiosError) {
        message = error?.response?.data?.error?.message || error.message;
      } else {
        message = error.message;
      }

      notification.error({
        title: "Error",
        description: message,
      });

      console.error("Remove from favourites error:", error);
    },
  });
}
