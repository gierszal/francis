import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/modules/auth";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/api";
import { notification } from "antd";
import { getTranslations } from "next-intl/server";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

export function useSignUp() {
  const queryClient = useQueryClient();
  const t = useTranslations("hooks.useAuth");
  return useMutation({
    mutationFn: authApi.signUp,
    onSuccess: async ({ data }) => {
      setAccessToken(data.data.tokens.accessToken);
      queryClient.setQueryData(["me"], data.data.user);
      notification.success({
        title: t("signUpSuccess", { name: data.data.user.first_name }),
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
  const t = useTranslations("hooks.useAuth");
  return useMutation({
    mutationFn: authApi.signIn,
    onSuccess: async ({ data }) => {
      setAccessToken(data.data.tokens.accessToken);
      queryClient.setQueryData(["me"], data.data.user);
      notification.success({
        title: t("signInSuccess", { name: data.data.user.first_name }),
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
  const t = useTranslations("hooks.useAuth");
  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: async () => {
      setAccessToken("");
      queryClient.clear();
      notification.success({
        title: t("signOutSuccess"),
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
