"use client";

import { useGetUser } from "@/hooks/modules/user/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { notification, Skeleton } from "antd";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: string;
}

const RoleGuard = ({ children, requiredRole }: RoleGuardProps) => {
  const router = useRouter();
  const t = useTranslations("components.RoleGuard");
  const queryClient = useQueryClient();
  const { data, isLoading, isError, isSuccess } = useGetUser();
  const cachedUser = queryClient.getQueryData(["me"]);

  const user = data?.data?.data || cachedUser;
  const userRole = user?.role;
  const hasAccess = userRole === requiredRole;

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push(`/auth?callbackUrl=/content`);
      return;
    }

    if (isError) {
      notification.error({
        title: t("loadErrorTitle"),
        description: t("loadErrorDescription"),
      });
      router.push("/");
      return;
    }

    if (isSuccess && !hasAccess) {
      notification.error({
        title: t("permissionErrorTitle"),
        description: t("permissionErrorDescription"),
      });
      router.push("/");
      return;
    }
  }, [isLoading, isError, user, hasAccess]);

  if (isLoading || !user) {
    return (
      <div className="mt-10 ml-10 w-[50%]">
        <Skeleton />
      </div>
    );
  }

  if (!hasAccess) return null;

  return <>{children}</>;
};

export default RoleGuard;
