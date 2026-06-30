import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { trackApi } from "../../../api/modules/trackApi";
import $api from "@/api";
import { GetItemsParams } from "@/types/api/common";

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

export function useGetTrack(id: string | undefined) {
  return useQuery({
    queryKey: ["tracks", { id }],
    queryFn: () => trackApi.getTrack(id),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
