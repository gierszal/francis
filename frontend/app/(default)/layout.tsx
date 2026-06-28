import type { Metadata } from "next";
import Sidebar from "@/components/shared/Sidebar";
import Footer from "@/components/shared/Footer";

const menuItems = [
  { label: "Home", ariaLabel: "To home page", link: "/" },
  { label: "Profile", ariaLabel: "To profile", link: "/profile" },
  { label: "Tracks", ariaLabel: "To tracks", link: "/tracks" },
  { label: "Albums", ariaLabel: "To albums", link: "/albums" },
  { label: "Games", ariaLabel: "To games", link: "/games" },
  { label: "Collections", ariaLabel: "To collections", link: "/collections" },
  { label: "Playlists", ariaLabel: "To playlists", link: "/playlists" },
];

const socialItems = [
  { label: "Telegram", link: "https://web.telegram.org" },
  { label: "GitHub", link: "https://github.com" },
];

export const metadata: Metadata = {
  title: "Francis | Web Player",
  description: "The music web player.",
};

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-full flex flex-col">
      <div
        style={{ background: "#1a1a1a" }}
        className="border border-1 border-red-50"
      >
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
      </div>
      {children}
      <Footer />
    </body>
  );
}
