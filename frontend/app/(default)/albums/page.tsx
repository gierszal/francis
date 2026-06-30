"use client";

import AlbumList from "@/components/album/AlbumList";
import GradientText from "@/components/motion/GradientText";
import { useGetAlbums } from "@/hooks/modules/album/useAlbum";
import { Skeleton } from "antd";

const Albums = () => {
  const { data, isLoading, isError, error } = useGetAlbums({
    count: 10,
  });
  if (isLoading)
    return (
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return <div className="text-5xl text-red-500">Error: {error?.message}</div>;
  return (
    <>
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        Albums
      </GradientText>
      <div
        className={
          "flex flex-row mt-5 ml-10 gap-10 py-3 flex-wrap overflow-x-hidden"
        }
      >
        <AlbumList albums={data?.items.data} />
      </div>
    </>
  );
};

export default Albums;
