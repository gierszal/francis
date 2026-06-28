import React from "react";
import { FormattedAlbum } from "@/types/album";
import AlbumList from "@/components/album/AlbumList";
import GradientText from "@/components/motion/GradientText";

const Albums = () => {
  return (
    <>
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        Albums
      </GradientText>
      <div
        className={"flex flex-row mt-5 gap-10 py-3 flex-wrap overflow-x-hidden"}
      >
        <AlbumList albums={mockAlbums} />
      </div>
    </>
  );
};

export default Albums;

export const mockAlbums: FormattedAlbum[] = [
  {
    id: "1",
    name: "Kingdom Come: Deliverance - Original Soundtrack",
    picture: "misc/towns.webp",
    description: "Epic medieval soundtrack from the hit RPG game",
    game_id: "game_001",
    created_at: new Date("2024-01-15T10:30:00Z"),
    updated_at: new Date("2024-01-15T10:30:00Z"),
  },
  {
    id: "2",
    name: "The Witcher 3: Wild Hunt - Soundtrack",
    picture: "misc/towns.webp",
    description: "Award-winning Slavic folk-inspired soundtrack",
    game_id: "game_002",
    created_at: new Date("2024-01-20T14:15:00Z"),
    updated_at: new Date("2024-01-20T14:15:00Z"),
  },
  {
    id: "3",
    name: "Cyberpunk 2077 - Radio Vol. 1",
    picture: "misc/towns.webp",
    description: "Synthwave and electronic tracks from Night City",
    game_id: "game_003",
    created_at: new Date("2024-02-01T09:00:00Z"),
    updated_at: new Date("2024-02-01T09:00:00Z"),
  },
  {
    id: "4",
    name: "Red Dead Redemption 2 - Official Soundtrack",
    picture: "misc/towns.webp",
    description: "Western Americana and orchestral masterpiece",
    game_id: "game_004",
    created_at: new Date("2024-02-10T16:45:00Z"),
    updated_at: new Date("2024-02-10T16:45:00Z"),
  },
  {
    id: "5",
    name: "Elden Ring - Shadow of the Erdtree",
    picture: "misc/towns.webp",
    description: "Dark fantasy orchestral compositions",
    game_id: "game_005",
    created_at: new Date("2024-03-05T11:20:00Z"),
    updated_at: new Date("2024-03-05T11:20:00Z"),
  },
  {
    id: "6",
    name: "Baldur's Gate 3 - Divine Edition",
    picture: "misc/towns.webp",
    description: "Epic D&D inspired orchestral soundtrack",
    game_id: "game_006",
    created_at: new Date("2024-03-15T13:10:00Z"),
    updated_at: new Date("2024-03-15T13:10:00Z"),
  },
  {
    id: "7",
    name: "God of War Ragnarok - Valhalla",
    picture: "misc/towns.webp",
    description: "Nordic-inspired epic orchestral music",
    game_id: "game_007",
    created_at: new Date("2024-04-02T08:30:00Z"),
    updated_at: new Date("2024-04-02T08:30:00Z"),
  },
  {
    id: "8",
    name: "The Last of Us Part II - Covers Collection",
    picture: "misc/towns.webp",
    description: "Haunting acoustic covers from the post-apocalyptic world",
    game_id: "game_008",
    created_at: new Date("2024-04-12T19:00:00Z"),
    updated_at: new Date("2024-04-12T19:00:00Z"),
  },
  {
    id: "9",
    name: "Hades - Songs of the Underworld",
    picture: "misc/towns.webp",
    description: "High-energy Greek mythology rock soundtrack",
    game_id: "game_009",
    created_at: new Date("2024-05-01T12:00:00Z"),
    updated_at: new Date("2024-05-01T12:00:00Z"),
  },
  {
    id: "10",
    name: "Stardew Valley - Piano Collection",
    picture: "misc/towns.webp",
    description: "Relaxing piano arrangements from the beloved farming game",
    game_id: "game_010",
    created_at: new Date("2024-05-10T17:30:00Z"),
    updated_at: new Date("2024-05-10T17:30:00Z"),
  },
];
