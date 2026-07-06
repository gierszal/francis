"use client";

import AlbumList from "@/components/album/AlbumList";
import GradientText from "@/components/motion/GradientText";
import { useGetAlbums } from "@/hooks/modules/album/useAlbum";
import { Input, Pagination, Skeleton } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const Albums = () => {
  const router = useRouter();
  const gap = 10; // макс кол-во треков на стр
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isLoading, isError, error } = useGetAlbums({
    count: gap,
    offset: (page - 1) * gap,
    searchQuery: searchQuery,
  });

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

  const albumsAmount = data?.total;

  const { Search } = Input;

  if (isLoading || !albumsAmount)
    return (
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return <div className="text-5xl text-red-500">Error: {error?.message}</div>;
  return (
    <div className="ml-10">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-0 mt-7"
      >
        Albums
      </GradientText>
      <div className="mb-5 mt-7">
        <Search
          placeholder="Search albums..."
          onSearch={(query) =>
            router.push(
              pathname + "?" + createQueryString("searchQuery", query),
            )
          }
          style={{ width: 200 }}
        />
      </div>
      {albumsAmount != 0 ? (
        <div
          className={
            "flex flex-row mt-5 gap-10 py-3 flex-wrap overflow-x-hidden"
          }
        >
          <AlbumList albums={data?.items.data} />
        </div>
      ) : (
        <div className="text-2xl">No albums found!</div>
      )}
      <div className="mt-5">
        <Pagination
          simple
          defaultCurrent={albumsAmount > 0 ? page : 1}
          total={albumsAmount ? Math.ceil(albumsAmount / gap) * 10 : 1}
          onChange={(newPage) =>
            router.push(
              pathname + "?" + createQueryString("page", newPage.toString()),
            )
          }
        />
      </div>
    </div>
  );
};

export default Albums;
