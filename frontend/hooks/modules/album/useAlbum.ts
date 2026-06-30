import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetItemsParams } from "@/types/api/common";
import { albumApi } from "@/api/modules/albumApi";

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

export function useGetAlbum(id: string | undefined) {
  return useQuery({
    queryKey: ["albums", { id }],
    queryFn: () => albumApi.getalbum(id),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
