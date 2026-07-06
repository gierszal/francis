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
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return <div className="p-5 text-5xl">Error: {error?.message}</div>;

  const album = data?.data?.data; // тут из за того как с бэка приходит

  return (
    <AnimatedDiv className="ml-10 mt-10 flex flex-col items-start font-sans">
      <div className="flex flex-row gap-5">
        <Image
          src={`/api/${album?.picture}`}
          alt={"pic"}
          width={250}
          height={250}
          className="rounded-2xl"
        />
        <div className="w-full flex flex-col gap-3 mt-10 items-start">
          <div className="relative">
            <GradientText className=" text-5xl">{album.name}</GradientText>
          </div>
          <div className="flex flex-col gap-2 text-lg font-medium">
            <div
              onClick={() => router.push(`/games/${album.game.id}`)}
              className="w-fit"
            >
              <Header>{album.game.name}</Header>
            </div>
            <div className="w-[80%] break-normal text-zinc-500">
              {album.description}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[98%] mt-20">
        <ul className="bg-background flex flex-col gap-1">
          <TrackList tracks={album?.tracks} source={{ type: "default" }} />
        </ul>
      </div>
      <div className="mt-7 text-zinc-500">
        <span>Tracks amount: {album.tracks_amount}</span>
      </div>
    </AnimatedDiv>
  );
};

export default AlbumPage;
