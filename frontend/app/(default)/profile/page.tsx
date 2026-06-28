// "use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import Header from "@/components/ui/Header";
import RoundedButton from "@/components/ui/RoundedButton";
import Favourites from "@/components/user/Favourites";
import History from "@/components/user/History";
import { FormattedUser } from "@/types/user";
import { Tabs, TabsProps } from "antd";
import Image from "next/image";
import { VscMail } from "react-icons/vsc";

const Profile = () => {
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
            {regularUser.first_name} {regularUser.last_name}
          </Header>
          <span className="flex flex-row gap-1 items-center">
            <VscMail size={16} className="text-black/60" />
            <p className="text-sm text-black/30">{regularUser.email}</p>
          </span>
          <RoundedButton className="mt-2">Edit profile</RoundedButton>
          <div className="mt-2 w-[98%] ">
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
    children: <Favourites userId="1" />,
  },
  {
    key: "2",
    label: "History",
    children: <History userId="1" />,
  },
];

const regularUser: FormattedUser = {
  id: "usr_002",
  email: "user@example.com",
  first_name: "Bob",
  last_name: "Smith",
  role: "user",
  is_activated: false,
  created_at: new Date("2024-06-01T08:00:00Z"),
  updated_at: new Date("2024-06-27T15:30:00Z"),
};
