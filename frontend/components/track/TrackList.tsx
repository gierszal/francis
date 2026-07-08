"use client";

import { FormattedTrack } from "@/types/track";
import TrackItem from "./TrackItem";
import { notification, Skeleton } from "antd";
import { useGetUser, useGetUserFavourites } from "@/hooks/modules/user/useUser";
import { memo, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { QueueSource } from "@/types/player";
import { usePlayerStore } from "@/providers/StoreProvider";
import { useQueryClient } from "@tanstack/react-query";

interface TrackListProps {
  tracks: FormattedTrack[];
  source: QueueSource;
}

const TrackList = memo(({ tracks, source }: TrackListProps) => {
  const queryClient = useQueryClient();
  const { data: userData, isFetching, isPending } = useGetUser();

  const cachedUser = queryClient.getQueryData(["me"]);
  const user = cachedUser || userData?.data?.data;
  const notified = useRef<boolean>(false);

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

  const isUserLoading = isFetching || isPending;

  const favouriteIds = useMemo(() => {
    return new Set(favourites?.map((track: FormattedTrack) => track.id) || []);
  }, [favourites]);

  useEffect(() => {
    if (isUserLoading) return;
    if (user) {
      notified.current = false;
      return;
    }
    if (!notified.current) {
      notified.current = true;
      notification.warning({
        title: "Sign in to get more features!",
        description: "Visit the Profile page to sign in on platform.",
      });
    }
  }, [user, isUserLoading]);

  return (
    <div className="w-[98%]">
      <ul className="bg-background flex flex-col gap-1">
        {tracks?.length &&
          tracks?.map((track, idx) => (
            <TrackItem
              tracks={tracks}
              track={track}
              idx={idx}
              key={idx}
              source={source}
              isFavourite={favouriteIds?.has(track?.id)}
            />
          ))}
      </ul>
    </div>
  );
});

export default TrackList;
