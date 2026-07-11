import type { Metadata } from "next";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";
import { ROLES } from "@/types/role";
import { getTranslations } from "next-intl/server";

const socialItems = [
  { label: "Telegram", link: "https://web.telegram.org" },
  { label: "GitHub", link: "https://github.com" },
];

export const metadata: Metadata = {
  title: "Francis | Web Player",
  description: "The music web player.",
};

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = await getTranslations("Navigation");
  const menuItems = [
    { label: t("homeLabel"), ariaLabel: t("homeAria"), link: "/" },
    { label: t("profileLabel"), ariaLabel: t("profileAria"), link: "/profile" },
    { label: t("tracksLabel"), ariaLabel: t("tracksAria"), link: "/tracks" },
    { label: t("albumsLabel"), ariaLabel: t("albumsAria"), link: "/albums" },
    { label: t("gamesLabel"), ariaLabel: t("gamesAria"), link: "/games" },
    {
      label: t("collectionsLabel"),
      ariaLabel: t("collectionsAria"),
      link: "/collections",
    },
    {
      label: t("playlistsLabel"),
      ariaLabel: t("playlistsAria"),
      link: "/playlists",
    },
    {
      label: t("contentLabel"),
      ariaLabel: t("contentAria"),
      link: "/content",
      requiredRole: ROLES.ADMIN,
    },
  ];
  return (
    <div>
      <Sidebar
        isFixed={true}
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#000"
        openMenuButtonColor="#000"
        colors={["#B497CF", "#5227FF"]}
        accentColor="#5227FF"
      />
      {children}
      <Footer />
    </div>
  );
}
