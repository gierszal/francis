"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import PlaylistList from "@/components/playlist/PlaylistList";
import { useGetPlaylists } from "@/hooks/modules/playlist/usePlaylist";
import { Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { BsPlusCircle } from "react-icons/bs";

const Playlists = () => {
  const { data, isLoading, isError, error } = useGetPlaylists({
    count: 10,
  });

  const router = useRouter();

  if (isLoading)
    return (
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return <div className="text-5xl text-red-500">Error: {error?.message}</div>;

  const playlists = data?.items.data;

  return (
    <AnimatedDiv>
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        Playlists
      </GradientText>
      <div className="flex flex-row ml-10 mt-10">
        <div
          className="bg-gray-400/20 border-1 border-gray-300/60 flex flex-row gap-2 p-2 rounded-xl items-center gap-3 cursor-pointer active:scale-98"
          onClick={() => router.push("/playlists/create")}
        >
          <BsPlusCircle size={32} />
          {playlists?.length ? (
            <h1 className="text-xl">Create playlist</h1>
          ) : (
            <h1 className="text-xl">Create your first playlist!</h1>
          )}
        </div>
      </div>
      <div
        className={"flex flex-row mt-5 gap-10 py-3 flex-wrap overflow-x-hidden"}
      >
        {playlists?.length ? (
          <PlaylistList playlists={playlists} />
        ) : (
          <h1 className="ml-10 text-3xl">No playlists yet!</h1>
        )}
      </div>
    </AnimatedDiv>
  );
};

export default Playlists;
