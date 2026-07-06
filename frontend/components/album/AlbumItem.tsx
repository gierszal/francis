"use client";

import { CollectionAlbum, FormattedAlbum } from "@/types/album";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import TiltedCard from "../motion/TitledCard";
import Header from "../ui/Header";

interface AlbumItemProps {
  album: FormattedAlbum | CollectionAlbum;
}

const AlbumItem = ({ album }: AlbumItemProps) => {
  const router = useRouter();
  return (
    <div className={"shrink-0 w-[195.39px]"}>
      <div
        onClick={() => router.push(`/albums/${album.id}`)}
        style={{ cursor: "pointer" }}
      >
        <div className={"w-full h-[195.39px]"}>
          <TiltedCard
            imageSrc={`/api/${album?.picture}`}
            altText={album.name}
            captionText={album.name}
            containerHeight="200px"
            containerWidth="200x"
            imageHeight="200px"
            imageWidth="200px"
            rotateAmplitude={12}
            scaleOnHover={1.05}
            showMobileWarning={false}
            showTooltip
            displayOverlayContent={false}
          />
        </div>
      </div>
      <div className={"mt-2 px-1 py-1"}>
        <div
          onClick={() => router.push(`/albums/${album.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Header className={"text-sm font-bold"}>{album.name}</Header>
        </div>
      </div>
    </div>
  );
};

export default AlbumItem;
