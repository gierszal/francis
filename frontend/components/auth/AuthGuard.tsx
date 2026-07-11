"use client";

import { useGetUser } from "@/hooks/modules/user/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  callbackUrl?: string;
}

const AuthGuard = ({ children, callbackUrl = "/" }: AuthGuardProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData(["me"]);
  const { data, isLoading, isError } = useGetUser();

  const user = cachedUser || data?.data.data;

  useEffect(() => {
    if (isError || (!isLoading && !user))
      router.push(`/auth?callbackUrl=${callbackUrl}`);
  }, [isError, data, user]);

  return (
    <>
      {!!user ? (
        children
      ) : (
        <div className="mt-10 ml-10 w-[50%]">
          <Skeleton />
        </div>
      )}
    </>
  );
};

export default AuthGuard;
