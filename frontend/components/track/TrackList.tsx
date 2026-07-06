"use client";

import { FormattedTrack } from "@/types/track";
import TrackItem from "./TrackItem";
import { notification, Skeleton } from "antd";
import { useGetUser, useGetUserFavourites } from "@/hooks/modules/user/useUser";
import { memo, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { QueueSource } from "@/types/player";
import { usePlayerStore } from "@/providers/StoreProvider";

interface TrackListProps {
  tracks: FormattedTrack[];
  source: QueueSource;
}

const TrackList = memo(({ tracks, source }: TrackListProps) => {
  const { data: userData, isLoading: isUserLoading } = useGetUser();
  const user = userData?.data?.data;

  const gap = 10;

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data } = useGetUserFavourites(
    {
      count: gap,
      offset: (page - 1) * gap,
      searchQuery: searchQuery,
    },
    !!user,
  );
  const favourites = data?.items?.data;

  const favouriteIds = useMemo(() => {
    return new Set(favourites?.map((track: FormattedTrack) => track.id) || []);
  }, [favourites]);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        notification.warning({
          title: "Sign in to get more features!",
          description: "Visit the Profile page to sign in on platform.",
        });
      }
    }
  }, [user, isUserLoading]);

  return (
    <div className="w-[98%]">
      <ul className="bg-background flex flex-col gap-1">
        {tracks?.length ? (
          tracks?.map((track, idx) => (
            <TrackItem
              tracks={tracks}
              track={track}
              idx={idx}
              key={idx}
              source={source}
              isFavourite={favouriteIds?.has(track?.id)}
            />
          ))
        ) : (
          <Skeleton />
        )}
      </ul>
    </div>
  );
});

export default TrackList;
