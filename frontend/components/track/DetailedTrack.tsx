import { FormattedDetailedTrack } from "@/types/track";
import Image from "next/image";
import TiltedCard from "../motion/TitledCard";
import Header from "../ui/Header";

interface DetailedTrackProps {
  track: FormattedDetailedTrack;
}

const DetailedTrack = ({ track }: DetailedTrackProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-row gap-2">
        <TiltedCard
          imageSrc={`/api${track?.album?.picture}`}
          altText={track.name}
          captionText={track.name}
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
        <div className="flex flex-col">
          <Header>{track.name}</Header>
          <div className="flex flex-row gap-2">
            <span>{track.album.name} - </span>
            <span>{track.artist} - </span>
            <span>{track.updated_at.toLocaleDateString()}</span>
          </div>
          <div className="flex flex-row gap-2">
            {track.tags && <span>• {track.tags.slice(0, 2).join(", ")}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedTrack;
