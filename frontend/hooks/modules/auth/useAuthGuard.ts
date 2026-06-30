import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useGetUser } from "../user/useUser";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData(["me"]);
  const { data, isLoading, isSuccess } = useGetUser();

  const user = cachedUser || data?.data;

  useEffect(() => {
    if (isSuccess && !user) router.push("/auth");
  }, [isSuccess, data, cachedUser]);

  return {
    user,
    isLoading: !cachedUser && isLoading,
    isAuthenticated: !!user,
  };
};
