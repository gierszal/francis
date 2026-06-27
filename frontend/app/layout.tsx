import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";
import Lenis from "../components/motion/Lenis";
import Sidebar from "../components/shared/Sidebar";
import Footer from "../components/shared/Footer";
import Link from "next/link";
import MusicWidget from "@/components/music/MusicWidget";

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

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Francis | Web Player",
  description: "The music web player.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Lenis />
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
    </html>
  );
}
