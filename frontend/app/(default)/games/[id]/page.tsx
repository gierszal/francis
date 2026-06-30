"use client";

import AlbumItem from "@/components/album/AlbumItem";
import AlbumList from "@/components/album/AlbumList";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import { useGetGame } from "@/hooks/modules/game/useGame";
import { FormattedDetailedGame } from "@/types/game";
import { Skeleton } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";

const GamePage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGetGame(params.id?.toString());

  if (isLoading)
    return (
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return <div className="p-5 text-5xl">Error: {error?.message}</div>;

  const game = data?.data.data;
  return (
    <AnimatedDiv className="ml-10 mt-10 flex flex-col items-start font-sans">
      <div className="flex flex-row gap-5">
        <Image
          //   src={game.picture}
          src={`/api/image/aff9e97a-fdc8-44e2-b026-cea911c36638.jpg`}
          alt={"pic"}
          width={250}
          height={250}
          className="rounded-2xl"
        />
        <div className="w-full flex flex-col gap-3 mt-10 items-start">
          <div className="relative">
            <GradientText className=" text-5xl">{game.name}</GradientText>
          </div>
          <div className="flex flex-col gap-2 text-lg font-medium">
            <div className="flex flex-row gap-2 text-lg font-medium">
              <span>
                Last updated:{" "}
                {new Date(game.updated_at).toLocaleDateString()}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      {game.albums.lenght ? (
        <>
          <div className="w-[98%] mt-20">
            <h1 className="text-3xl mb-5">Albums</h1>
            <ul className="bg-background flex flex-col gap-1">
              {/* {game.albums?.map((album, idx) => (
            <AlbumItem album={album} idx={idx} key={idx} />
          ))} */}
              <AlbumList albums={game.albums} />
            </ul>
          </div>
          <div className="mt-7 text-zinc-500">
            <span>Albums amount: {game.albums_amount}</span>
          </div>
        </>
      ) : (
        <h1 className="mt-10 text-2xl">Albums coming soon!</h1>
      )}

      {/* <div className="mt-10">
        <div className="flex flex-col gap-5 items-start">
          <h1 className="text-4xl">Occurs in...</h1>
          <div className="w-full">
            <AlbumList albums={[track.album]} />
          </div>
        </div>
      </div> */}
    </AnimatedDiv>
  );
};

export default GamePage;
