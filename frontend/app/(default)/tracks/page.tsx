"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import TrackList from "@/components/track/TrackList";
import { useGetTracks } from "@/hooks/modules/track/useTrack";
import { usePlayerStore } from "@/providers/StoreProvider";
import { useQueryClient } from "@tanstack/react-query";
import { Input, Pagination, Skeleton } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const Tracks = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setQueryClient = usePlayerStore((s) => s.setQueryClient);
  const gap = 10; // макс кол-во треков на стр
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isError, error, isLoading } = useGetTracks({
    count: gap,
    offset: (page - 1) * gap,
    searchQuery: searchQuery,
  });

  const tracksAmount = data?.total ?? 0;
  const tracks = data?.items?.data ?? [];

  useEffect(() => {
    setQueryClient(queryClient);
  }, [queryClient]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === "" || (name === "page" && value === "1")) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  if (isLoading)
    return (
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return (
      <div className="text-5xl text-red-500 mt-5 ml-10">
        Error: {error?.message}
      </div>
    );

  const { Search } = Input;

  return (
    <>
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        Tracks
      </GradientText>
      <AnimatedDiv className={"ml-10 mt-5"}>
        <div className="mb-7">
          <Search
            placeholder="Search tracks..."
            onSearch={(query) =>
              router.push(
                pathname + "?" + createQueryString("searchQuery", query),
              )
            }
            style={{ width: 200 }}
          />
        </div>
        {!isLoading && tracks.length && tracksAmount != 0 ? (
          <TrackList tracks={tracks} source={{ type: "tracks" }} />
        ) : (
          <div className={"text-2xl"}>No tracks found!</div>
        )}
        <div className="mt-5">
          <Pagination
            simple
            current={tracksAmount > 0 ? page : 1}
            total={tracksAmount > 0 ? Math.ceil(tracksAmount / gap) * 10 : 1}
            onChange={(newPage) =>
              router.push(
                pathname + "?" + createQueryString("page", newPage.toString()),
              )
            }
          />
        </div>
      </AnimatedDiv>
    </>
  );
};

export default Tracks;
