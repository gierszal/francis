"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import Header from "@/components/ui/Header";
import RoundedButton from "@/components/ui/RoundedButton";
import Favourites from "@/components/user/Favourites";
import History from "@/components/user/History";
import { useSignOut } from "@/hooks/modules/auth/useAuth";
import { useRequireActivated } from "@/hooks/modules/auth/useRequireActivated";
import { useGetUser, useGetUserPlaylists } from "@/hooks/modules/user/useUser";
import { notification, Skeleton, Tabs, TabsProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { VscMail } from "react-icons/vsc";
import { useTranslations } from "next-intl";

const Profile = () => {
  const t = useTranslations("pages.ProfilePage");
  const router = useRouter();
  const { data } = useGetUser();
  const notificationShown = useRef<boolean>(false);
  const { requireActivated } = useRequireActivated();

  const user = data?.data?.data ?? data;

  const handleSignOut = async () => {
    signOut();
    router.push("/");
  };

  useEffect(() => {
    if (user && !user.is_activated && !notificationShown.current) {
      notification.warning({
        title: t("activateWarningTitle"),
        description: t("activateWarningDescription"),
      });
      notificationShown.current = true;
    }
  }, [user]);

  const { mutate: signOut } = useSignOut();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: t("favourites"),
      children: (
        <div className="flex justify-center">
          <Favourites />
        </div>
      ),
    },
    {
      key: "2",
      label: t("history"),
      children: (
        <div className="flex justify-center ">
          <History />
        </div>
      ),
    },
  ];

  return (
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
          <div className="flex flex-row gap-2">
            <RoundedButton
              className="mt-2"
              onClick={() =>
                requireActivated(() => router.push("/profile/edit"))
              }
            >
              {t("editProfile")}
            </RoundedButton>
            <RoundedButton className="mt-2" onClick={handleSignOut}>
              {t("signOut")}
            </RoundedButton>
          </div>
          <div className="mt-2 w-[98%]">
            <Tabs defaultActiveKey="1" items={items} centered />
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default Profile;
