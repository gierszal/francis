import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/modules/auth";
import { notification } from "antd";
import { AxiosError } from "axios";
import { setAccessToken } from "@/api";

export function useSignIn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: async ({ data }) => {
      setAccessToken(data.data.tokens.accessToken);
      queryClient.setQueryData(["me"], data.data.user);
      notification.success({
        title: `Welcome back, ${data.data.user.first_name}!`,
      });
    },
    onError: (err) => {
      let title = err.message;
      if (err instanceof AxiosError) title = err?.response?.data.error.message;
      notification.error({
        title: title,
      });
    },
  });
}
