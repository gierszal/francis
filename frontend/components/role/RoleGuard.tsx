"use client";

import { useGetUser } from "@/hooks/modules/user/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { notification, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RoleGuardProps {
  children: React.ReactNode;
  requiredRole: string;
}

const RoleGuard = ({ children, requiredRole }: RoleGuardProps) => {
  const router = useRouter();
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
        title: "Failed to load data about role!",
        description:
          "Seems you do not have enough rights to access this route!",
      });
      router.push("/");
      return;
    }

    if (isSuccess && !hasAccess) {
      notification.error({
        title: "Insufficient permissions!",
        description:
          "Seems you do not have enough rights to access this route!",
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
