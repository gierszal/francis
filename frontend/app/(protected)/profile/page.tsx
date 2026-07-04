"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import Header from "@/components/ui/Header";
import RoundedButton from "@/components/ui/RoundedButton";
import Favourites from "@/components/user/Favourites";
import History from "@/components/user/History";
import { useSignOut } from "@/hooks/modules/auth/useAuth";
import { useGetUser, useGetUserPlaylists } from "@/hooks/modules/user/useUser";
import { Skeleton, Tabs, TabsProps } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { VscMail } from "react-icons/vsc";

const Profile = () => {
  const router = useRouter();
  const { data } = useGetUser();

  const user = data?.data?.data ?? data;

  const handleSignOut = async () => {
    signOut();
    router.push("/");
  };

  const { mutate: signOut } = useSignOut();

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
              onClick={() => router.push("/profile/edit")}
            >
              Edit profile
            </RoundedButton>
            <RoundedButton className="mt-2" onClick={handleSignOut}>
              Sign out
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

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Favourites",
    children: (
      <div className="flex justify-center">
        <Favourites />
      </div>
    ),
  },
  {
    key: "2",
    label: "History",
    children: (
      <div className="flex justify-center ">
        <History />
      </div>
    ),
  },
];
