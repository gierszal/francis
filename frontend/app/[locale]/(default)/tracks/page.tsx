"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import TrackList from "@/components/track/TrackList";
import { useGetTracks } from "@/hooks/modules/track/useTrack";
import { usePlayerStore } from "@/providers/StoreProvider";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { useQueryClient } from "@tanstack/react-query";
import { Input, notification, Pagination, Skeleton } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const Tracks = () => {
  const t = useTranslations("TracksPage");

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
        <Skeleton active />
      </div>
    );

  if (isError) {
    const errorMessage = getErrorMessage(error);
    return <div className="mt-15 p-5 text-3xl md:text-5xl">{errorMessage}</div>;
  }

  const { Search } = Input;

  return (
    <>
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        {t("title")}
      </GradientText>
      <AnimatedDiv className={"ml-10 mt-5"}>
        <div className="mb-7">
          <Search
            placeholder={t("searchPlaceholder")}
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
          <div className={"text-2xl"}>{t("noTracksFound")}</div>
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
