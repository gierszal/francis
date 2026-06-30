"use client";

import GradientText from "@/components/motion/GradientText";
import PlaylistList from "@/components/playlist/PlaylistList";
import { useAuthGuard } from "@/hooks/modules/auth/useAuthGuard";
import { useGetUser } from "@/hooks/modules/user/useUser";
import { FormattedPlaylist } from "@/types/playlist";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Playlists = () => {
  const router = useRouter();

  const { isAuthenticated, isLoading, user } = useAuthGuard();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?callbackUrl=/playlists");
    }
  }, [isAuthenticated]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <GradientText
            colors={["#5227FF", "#FF9FFC", "#B497CF"]}
            animationSpeed={8}
            showBorder={false}
            className="text-5xl ml-10 mt-7"
          >
            Playlists
          </GradientText>
          <div
            className={
              "flex flex-row mt-5 gap-10 py-3 flex-wrap overflow-x-hidden"
            }
          >
            <PlaylistList playlists={mockPlaylists} />
          </div>
        </>
      ) : (
        <div className="mt-10 ml-10 w-[50%]">
          <Skeleton />
        </div>
      )}
    </>
  );
};

export default Playlists;

export const mockPlaylists: FormattedPlaylist[] = [
  {
    id: "pl_001",
    name: "Epic Gaming Sessions",
    description:
      "The ultimate playlist for intense gaming sessions. Featuring battle themes and orchestral masterpieces.",
    created_at: new Date("2024-01-10T10:00:00Z"),
    updated_at: new Date("2024-01-10T10:00:00Z"),
  },
  {
    id: "pl_002",
    name: "Relax & Explore",
    description:
      "Chill ambient tracks perfect for open-world exploration and relaxing gameplay.",
    created_at: new Date("2024-01-15T14:30:00Z"),
    updated_at: new Date("2024-01-15T14:30:00Z"),
  },
  {
    id: "pl_003",
    name: "Retro Arcade Vibes",
    description:
      "Nostalgic chiptune and 8-bit tracks from classic video games.",
    created_at: new Date("2024-01-20T09:15:00Z"),
    updated_at: new Date("2024-01-20T09:15:00Z"),
  },
  {
    id: "pl_004",
    name: "Boss Battle Chronicles",
    description: "Epic boss fight music to get your adrenaline pumping.",
    created_at: new Date("2024-02-01T16:00:00Z"),
    updated_at: new Date("2024-02-01T16:00:00Z"),
  },
  {
    id: "pl_005",
    name: "Indie Game Gems",
    description:
      "Beautiful soundtracks from indie games that deserve more attention.",
    created_at: new Date("2024-02-10T11:45:00Z"),
    updated_at: new Date("2024-02-10T11:45:00Z"),
  },
  {
    id: "pl_006",
    name: "Night Driving",
    description:
      "Synthwave and cyberpunk tracks for late-night gaming sessions.",
    created_at: new Date("2024-02-15T20:00:00Z"),
    updated_at: new Date("2024-02-15T20:00:00Z"),
  },
  {
    id: "pl_007",
    name: "Fantasy Realm",
    description: "Enchanting orchestral and folk music from fantasy RPGs.",
    created_at: new Date("2024-03-01T08:30:00Z"),
    updated_at: new Date("2024-03-01T08:30:00Z"),
  },
  {
    id: "pl_008",
    name: "Stealth & Suspense",
    description: "Tense and atmospheric tracks perfect for stealth games.",
    created_at: new Date("2024-03-10T13:00:00Z"),
    updated_at: new Date("2024-03-10T13:00:00Z"),
  },
  {
    id: "pl_009",
    name: "Multiplayer Mayhem",
    description:
      "High-energy tracks to keep you focused during competitive multiplayer matches.",
    created_at: new Date("2024-03-15T18:30:00Z"),
    updated_at: new Date("2024-03-15T18:30:00Z"),
  },
  {
    id: "pl_010",
    name: "Puzzle & Chill",
    description: "Calm and minimalistic music for puzzle and strategy games.",
    created_at: new Date("2024-04-01T12:00:00Z"),
    updated_at: new Date("2024-04-01T12:00:00Z"),
  },
];
