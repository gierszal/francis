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
      <div className={"mt-10 ml-4 md:ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return (
      <div className="p-5 text-3xl md:text-5xl">Error: {error?.message}</div>
    );

  const game = data?.data?.data;
  const gameAlbums = game?.albums;

  return (
    <AnimatedDiv className="ml-4 mt-6 md:ml-10 md:mt-10 flex flex-col items-start font-sans px-2 md:px-0">
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <Image
          src={`/api/${game?.picture}`}
          alt={"pic"}
          width={250}
          height={250}
          className="rounded-2xl w-full max-w-[180px] md:max-w-[250px] h-auto"
        />
        <div className="w-full flex flex-col gap-3 mt-2 md:mt-10 items-start">
          <div className="relative">
            <GradientText className="text-3xl md:text-5xl">
              {game.name}
            </GradientText>
          </div>
          <div className="flex flex-col gap-2 text-base md:text-lg font-medium">
            <div className="flex flex-row gap-2 text-base md:text-lg font-medium">
              <span>
                Last updated:{" "}
                {new Date(game.updated_at).toLocaleDateString()}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
      {gameAlbums.length ? (
        <>
          <div className="w-full md:w-[98%] mt-10 md:mt-20">
            <h1 className="text-2xl md:text-3xl mb-5">Albums</h1>
            <ul className="bg-background flex flex-col gap-1">
              {/* {game.albums?.map((album, idx) => (
            <AlbumItem album={album} idx={idx} key={idx} />
          ))} */}
              <AlbumList albums={gameAlbums} />
            </ul>
          </div>
          <div className="mt-7 text-zinc-500 text-sm md:text-base">
            <span>Albums amount: {game.albums_amount}</span>
          </div>
        </>
      ) : (
        <h1 className="mt-10 text-xl md:text-2xl">Albums coming soon!</h1>
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
