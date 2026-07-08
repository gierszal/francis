"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import { BsArrowRepeat } from "react-icons/bs";
import { useGetPlaylist } from "@/hooks/modules/playlist/usePlaylist";
import { notification, Skeleton } from "antd";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import TrackList from "@/components/track/TrackList";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

const PlaylistPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const t = useTranslations("PlaylistPage");

  const img = searchParams.get("img");

  const { data, isLoading, isError, error } = useGetPlaylist(
    params.id?.toString(),
  );

  useEffect(() => {
    if (error) {
      notification.error({
        title: "An error occurred!",
      });
    }
  }, [isError, error]);

  if (isError) {
    const errorMessage = getErrorMessage(error);
    return <div className="mt-15 p-5 text-3xl md:text-5xl">{errorMessage}</div>;
  }

  if (isLoading)
    return (
      <div className={"mt-10 ml-4 md:ml-10 w-[90%]"}>
        <Skeleton active />
      </div>
    );

  const playlist = data?.data?.data; // тут из за того как с бэка приходит

  return (
    <AnimatedDiv className="ml-4 mt-6 md:ml-10 md:mt-10 flex flex-col items-start font-sans px-2 md:px-0">
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <Image
          src={img ?? "/playlists/1.jpg"}
          alt={"pic"}
          width={250}
          height={250}
          className="rounded-2xl w-full max-w-[180px] md:max-w-[250px] aspect-square object-cover"
        />
        <div className="w-full flex flex-col gap-3 mt-2 md:mt-10 items-start">
          <div className="relative">
            <GradientText className="text-3xl md:text-5xl">
              {playlist?.name}
            </GradientText>
          </div>
          <div className="flex flex-col gap-2 text-base md:text-lg font-medium">
            <div className="w-full md:w-[80%] break-normal text-zinc-500 text-sm md:text-base">
              {playlist?.description ?? "Blank description"}
            </div>
            <div
              className="bg-gray-400/20 border-1 border-gray-300/60 flex flex-row gap-2 p-2 rounded-xl items-center gap-3 cursor-pointer active:scale-98 max-w-full"
              onClick={() => router.push(`/playlists/update/${params.id}`)}
            >
              <BsArrowRepeat size={24} className="md:hidden shrink-0" />
              <BsArrowRepeat size={32} className="hidden md:block shrink-0" />
              <h1 className="text-base md:text-xl">{t("edit")}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[98%] mt-10 md:mt-20">
        <ul className="bg-background flex flex-col gap-1">
          {playlist?.tracks?.length ? (
            <TrackList tracks={playlist?.tracks} source={{ type: "default" }} />
          ) : (
            <h1 className="text-xl md:text-3xl">{t("emptyPlaylist")}</h1>
          )}
        </ul>
      </div>
      {playlist?.tracks_amount && (
        <div className="mt-7 text-zinc-500 text-sm md:text-base">
          <span>{t("tracksCount", { count: playlist?.tracks_amount })}</span>
        </div>
      )}
    </AnimatedDiv>
  );
};

export default PlaylistPage;
