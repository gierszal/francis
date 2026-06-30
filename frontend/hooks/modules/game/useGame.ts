import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { GetItemsParams } from "@/types/api/common";
import { gameApi } from "@/api/modules/gameApi";

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

export function useGetGame(id: string | undefined) {
  return useQuery({
    queryKey: ["games", { id }],
    queryFn: () => gameApi.getGame(id),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
