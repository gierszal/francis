import AlbumItem from "@/components/album/AlbumItem";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import { FormattedDetailedCollection } from "@/types/collection";
import React from "react";

const CollectionPage = () => {
  return (
    <AnimatedDiv className={"mt-10 ml-10 flex flex-col items-start"}>
      <div className="relative">
        <GradientText className={"text-5xl "}>{collection.name}</GradientText>
      </div>
      <div className={"flex flex-row mt-10 gap-5"} style={{ flexWrap: "wrap" }}>
        {collection.albums?.map((album, index) => (
          <AlbumItem key={index} album={album} />
        ))}
      </div>
    </AnimatedDiv>
  );
};

export default CollectionPage;

const collection: FormattedDetailedCollection = {
  name: "Ambient Essentials",
  id: "col_1a2b3c4d",
  albums_amount: 5,
  albums: [
    {
      id: "alb_x9k4m2p8n1",
      name: "Nocturnal Dreams",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_y7h5j3k9l2",
      name: "Celestial Waves",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_z8t6r4w1m7",
      name: "Urban Echoes",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_a3b9c7d5e1",
      name: "Forest Whispers",
      picture: "/misc/towns.webp",
    },
    {
      id: "alb_f6g2h8i4j0",
      name: "Oceanic Drift",
      picture: "/misc/towns.webp",
    },
  ],
  created_at: new Date("2025-10-20T08:45:00.000Z"),
  updated_at: new Date("2026-03-15T12:30:45.000Z"),
};
