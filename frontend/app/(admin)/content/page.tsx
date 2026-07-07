"use client";

import React, { useState } from "react";

import { BsCollectionFill, BsDiscFill, BsMusicNote } from "react-icons/bs";
import { FaGamepad } from "react-icons/fa";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Image from "next/image";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import { useGetUser } from "@/hooks/modules/user/useUser";
import { useRouter } from "next/navigation";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Tracks", "sub1", <BsMusicNote />, [
    getItem("Add track", "/content/tracks/create"),
    getItem("Update track", "/content/tracks/update"),
    getItem("Remove track", "/content/tracks/remove"),
  ]),
  getItem("Albums", "sub2", <BsDiscFill />, [
    getItem("Add album", "/content/albums/create"),
    getItem("Update album", "/content/albums/update"),
    getItem("Remove album", "/content/albums/remove"),
    getItem("Add album to collection", "/content/albums/addToCollection"),
    getItem(
      "Remove album from collection",
      "/content/albums/removeFromCollection",
    ),
  ]),
  getItem("Games", "sub3", <FaGamepad />, [
    getItem("Add game", "/content/games/create"),
    getItem("Update game", "/content/games/update"),
    getItem("Remove game", "/content/games/remove"),
  ]),
  getItem("Collections", "sub4", <BsCollectionFill />, [
    getItem("Add collection", "/content/collections/create"),
    getItem("Update collection", "/content/collections/update"),
    getItem("Remove collection", "/content/collections/remove"),
  ]),
];

const ContentPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { data } = useGetUser();

  const user = data?.data?.data;

  const handleMenuItemChange = (path: string) => {
    router.push(path);
  };

  return (
    <AnimatedDiv>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
          collapsedWidth={80}
        >
          <Menu
            onClick={(e) => handleMenuItemChange(e.key)}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "0 16px" }}>
            <div
              className="mt-6 md:mt-10"
              style={{
                padding: 16,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div className="relative w-full h-[200px] md:h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/content/1.png"
                  fill
                  alt="pic"
                  className="object-cover brightness-70"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center text-white text-xl md:text-5xl font-sans">
                  {user && (
                    <h1>{`What brings you today, ${user?.first_name}?`}</h1>
                  )}
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </AnimatedDiv>
  );
};

export default ContentPanel;
