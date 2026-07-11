import { aiApi } from "@/api/modules/aiApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export function useAskAI(topic: string, item: any, enabled: boolean = true) {
  return useQuery({
    queryKey: ["ai", { topic, id: item?.id }],
    queryFn: () => aiApi.generate({ topic, item }),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    enabled: enabled,
  });
}
