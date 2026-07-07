"use client";
import { FormattedTrack } from "@/types/track";
import GradientText from "@/components/motion/GradientText";
import Image from "next/image";
import formatDetailedTrack from "@/utils/formatters/formatDetailedTrackToFormatted";
import TrackItem from "@/components/track/TrackItem";
import AlbumList from "@/components/album/AlbumList";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import { useGetTrack } from "@/hooks/modules/track/useTrack";
import { Skeleton } from "antd";
import { useParams } from "next/navigation";
import { useGetUserFavourites } from "@/hooks/modules/user/useUser";
import { useMemo } from "react";

const TrackPage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGetTrack(
    params.id?.toString(),
  );

  const { data: favouritesData } = useGetUserFavourites();

  const favourites = favouritesData?.items?.data;

  const favouriteIds = useMemo(() => {
    return new Set(favourites?.map((track: FormattedTrack) => track.id) || []);
  }, [favourites]);

  if (isLoading)
    return (
      <div className={"mt-10 ml-4 md:ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );

  if (isError)
    return (
      <div className="p-5 text-3xl md:text-5xl">Error: {error?.message}</div>
    );

  const track = data?.data?.data;

  const formattedTrack = formatDetailedTrack(track);

  return (
    <AnimatedDiv className="ml-4 mt-6 md:ml-10 md:mt-10 flex flex-col items-start font-sans px-2 md:px-0">
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <Image
          // src={track.album.picture}
          src={`/api/${track?.album?.picture}`}
          alt={"pic"}
          width={250}
          height={250}
          className="rounded-2xl w-full max-w-[180px] md:max-w-[250px] h-auto"
        />
        <div className="w-full flex flex-col gap-2 mt-2 md:mt-10 items-start">
          <div className="relative">
            <GradientText className="text-3xl md:text-5xl">
              {track.name}
            </GradientText>
          </div>
          <div className="flex flex-col md:flex-row gap-1 md:gap-2 text-base md:text-lg font-medium">
            <span>{track.artist} •</span>
            <span>{track.album.name} •</span>
            <span>{new Date(track.updated_at).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-row gap-2">
            {track.tags && (
              <span className="text-zinc-500 text-sm md:text-base">
                • {track.tags.slice(0, 2).join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-full md:w-[98%] mt-10 md:mt-20">
        {formattedTrack && (
          <TrackItem
            tracks={[track]}
            source={{ type: "default" }}
            track={formattedTrack}
            isFavourite={favouriteIds?.has(track?.id)}
            idx={0}
          />
        )}
      </div>
      <div className="mt-7 text-zinc-500 text-sm md:text-base">
        <span>Listens: {track.listens}</span>
      </div>
      <div className="mt-10 w-full">
        <div className="flex flex-col gap-5 items-start">
          <h1 className="text-2xl md:text-4xl">Occurs in...</h1>
          <div className="w-full">
            <AlbumList albums={[track.album]} />
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default TrackPage;
