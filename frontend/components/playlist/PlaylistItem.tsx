"use client";

import { FormattedPlaylist } from "@/types/playlist/index";
import { useRouter } from "next/navigation";
import TiltedCard from "../motion/TitledCard";
import Header from "../ui/Header";
import generateImage from "@/utils/images/generateImage";

interface PlaylistItemProps {
  playlist: FormattedPlaylist;
}

const PlaylistItem = ({ playlist }: PlaylistItemProps) => {
  const router = useRouter();
  const img = generateImage();
  return (
    <div className={"shrink-0 w-[195.39px]"}>
      <div
        onClick={() => router.push(`/playlists/${playlist.id}?img=${img}`)}
        style={{ cursor: "pointer" }}
      >
        <div className={"w-full h-[195.39px]"}>
          <TiltedCard
            imageSrc={img}
            altText={playlist.description ?? "No description"}
            captionText={playlist.name}
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
          onClick={() => router.push(`/playlists/${playlist.id}`)}
          style={{ cursor: "pointer" }}
        >
          <Header className={"text-sm font-bold"}>{playlist.name}</Header>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
