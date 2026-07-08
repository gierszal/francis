import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/modules/auth";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/api";
import { notification } from "antd";
import { AxiosError } from "axios";

export function useSignUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: async ({ data }) => {
      setAccessToken(data.data.tokens.accessToken);
      queryClient.setQueryData(["me"], data.data.user);
      notification.success({
        title: `Nice to meet you, ${data.data.user.first_name}!`,
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

export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: async () => {
      setAccessToken("");
      queryClient.clear();
      notification.success({
        title: `Hope to see you soon!`,
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
