"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import TrackList from "@/components/track/TrackList";
import Header from "@/components/ui/Header";
import { useGetAlbum } from "@/hooks/modules/album/useAlbum";
import { Skeleton } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

const AlbumPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGetAlbum(
    params.id?.toString(),
  );

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

  const album = data?.data?.data; // тут из за того как с бэка приходит

  return (
    <AnimatedDiv className="ml-4 mt-6 md:ml-10 md:mt-10 flex flex-col items-start font-sans px-2 md:px-0">
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <Image
          src={`/api/${album?.picture}`}
          alt={"pic"}
          width={250}
          height={250}
          className="rounded-2xl w-full max-w-[180px] md:max-w-[250px] aspect-square object-cover"
        />
        <div className="w-full flex flex-col gap-3 mt-2 md:mt-10 items-start">
          <div className="relative">
            <GradientText className="text-3xl md:text-5xl">
              {album.name}
            </GradientText>
          </div>
          <div className="flex flex-col gap-2 text-base md:text-lg font-medium">
            <div
              onClick={() => router.push(`/games/${album.game.id}`)}
              className="w-fit"
            >
              <Header>{album.game.name}</Header>
            </div>
            <div className="w-full md:w-[80%] break-normal text-zinc-500 text-sm md:text-base">
              {album.description}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-[98%] mt-10 md:mt-20">
        <ul className="bg-background flex flex-col gap-1">
          <TrackList tracks={album?.tracks} source={{ type: "default" }} />
        </ul>
      </div>
      <div className="mt-7 text-zinc-500 text-sm md:text-base">
        <span>Tracks amount: {album.tracks_amount}</span>
      </div>
    </AnimatedDiv>
  );
};

export default AlbumPage;
