import { userApi } from "@/api/modules/user";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useGetUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userApi.getUser(),
    staleTime: 15 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
