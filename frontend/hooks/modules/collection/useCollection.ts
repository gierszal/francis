import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetItemsParams } from "@/types/api/common";
import { collectionApi } from "@/api/modules/collectionApi";

export function useGetCollections(params: GetItemsParams = {}) {
  const { count, offset, searchQuery } = params;
  return useQuery({
    queryKey: ["collections", { offset, count, searchQuery }],
    queryFn: () =>
      collectionApi.get({
        count,
        offset,
        searchQuery,
      }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}

export function useGetCollection(id: string | undefined) {
  return useQuery({
    queryKey: ["collections", { id }],
    queryFn: () => collectionApi.getCollection(id),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
