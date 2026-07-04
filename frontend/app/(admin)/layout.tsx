"use client";

import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";
import { usePathname } from "next/navigation";
import RoleGuard from "@/components/role/RoleGuard";
import { ROLES } from "@/types/role";

const menuItems = [
  { label: "Home", ariaLabel: "To home page", link: "/" },
  { label: "Profile", ariaLabel: "To profile", link: "/profile" },
  { label: "Tracks", ariaLabel: "To tracks", link: "/tracks" },
  { label: "Albums", ariaLabel: "To albums", link: "/albums" },
  { label: "Games", ariaLabel: "To games", link: "/games" },
  { label: "Collections", ariaLabel: "To collections", link: "/collections" },
  { label: "Playlists", ariaLabel: "To playlists", link: "/playlists" },
  {
    label: "Content",
    ariaLabel: "To content (admin role required)",
    link: "/content",
    requiredRole: ROLES.ADMIN,
  },
];

const socialItems = [
  { label: "Telegram", link: "https://web.telegram.org" },
  { label: "GitHub", link: "https://github.com" },
];

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <RoleGuard requiredRole={ROLES.ADMIN}>
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
      </RoleGuard>
    </div>
  );
}
