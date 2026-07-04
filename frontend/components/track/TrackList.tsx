import { FormattedTrack } from "@/types/track";
import TrackItem from "./TrackItem";
import { Skeleton } from "antd";
import { useGetUserFavourites } from "@/hooks/modules/user/useUser";
import { useMemo } from "react";

interface TrackListProps {
  tracks: FormattedTrack[];
}

const TrackList = ({ tracks }: TrackListProps) => {
  const { data, isSuccess, isLoading, isError, error } = useGetUserFavourites();

  const favourites = data?.data?.data;

  const favouriteIds = useMemo(() => {
    return new Set(favourites?.map((track: FormattedTrack) => track.id) || []);
  }, [favourites]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return (
      <div className="text-2xl text-red-500">
        Error occurred: {error.message}
      </div>
    );
  }

  if (isSuccess && favourites) {
    return (
      <div className="w-[98%]">
        <ul className="bg-background flex flex-col gap-1">
          {tracks?.length ? (
            tracks?.map((track, idx) => (
              <TrackItem
                track={track}
                idx={idx}
                key={idx}
                isFavourite={favouriteIds.has(track.id)}
              />
            ))
          ) : (
            <Skeleton />
          )}
        </ul>
      </div>
    );
  }
  return null;
};

export default TrackList;
