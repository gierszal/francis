"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import Header from "@/components/ui/Header";
import RoundedButton from "@/components/ui/RoundedButton";
import Favourites from "@/components/user/Favourites";
import History from "@/components/user/History";
import { useAuthGuard } from "@/hooks/modules/auth/useAuthGuard";
import { FormattedUser } from "@/types/user";
import { Skeleton, Tabs, TabsProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { VscMail } from "react-icons/vsc";

const Profile = () => {
  const router = useRouter();

  const { isAuthenticated, isLoading, user } = useAuthGuard();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?callbackUrl=/profile");
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <AnimatedDiv className="w-full flex flex-col mt-20 ">
          <div className="flex flex-col justify-center items-center gap-5">
            <Image
              width={1000}
              height={800}
              className="size-45 rounded-full object-cover shadow-lg"
              src={"/playlists/1.jpg"}
              alt={"pic"}
            />
            <div className="flex flex-col items-center w-full">
              <Header className="text-4xl">
                {user.first_name} {user.last_name}
              </Header>
              <span className="flex flex-row gap-1 items-center">
                <VscMail size={16} className="text-black/60" />
                <p className="text-sm text-black/30">{user.email}</p>
              </span>
              <RoundedButton className="mt-2">Edit profile</RoundedButton>
              <div className="mt-2 w-[98%] ">
                <Tabs defaultActiveKey="1" items={items} centered />
              </div>
            </div>
          </div>
        </AnimatedDiv>
      ) : (
        <div className="mt-10 ml-10 w-[50%]">
          <Skeleton />
        </div>
      )}
    </>
  );
};

export default Profile;

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Favourites",
    children: <Favourites userId="1" />,
  },
  {
    key: "2",
    label: "History",
    children: <History userId="1" />,
  },
];
