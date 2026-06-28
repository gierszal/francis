import { FormattedTrack } from "@/types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: FormattedTrack[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  return (
    <div className="w-[98%]">
      <ul className="bg-background flex flex-col gap-1">
        {tracks?.map((track, idx) => (
          <TrackItem track={track} idx={idx} key={idx} />
        ))}
      </ul>
    </div>
  );
};

export default TrackList;
