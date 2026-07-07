"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import PlaylistList from "@/components/playlist/PlaylistList";
import { useGetPlaylists } from "@/hooks/modules/playlist/usePlaylist";
import { useGetUserPlaylists } from "@/hooks/modules/user/useUser";
import { Skeleton, Input, Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { BsPlusCircle } from "react-icons/bs";

const Playlists = () => {
  const router = useRouter();
  const gap = 10;
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isLoading, isError, error } = useGetPlaylists({
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

  const playlistsAmount = data?.total;
  const { Search } = Input;

  if (isLoading || !playlistsAmount)
    return (
      <div className={"mt-10 ml-4 md:ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return (
      <div className="text-3xl md:text-5xl text-red-500 px-4">
        Error: {error?.message}
      </div>
    );

  const playlists = data?.items.data;

  return (
    <AnimatedDiv className="ml-4 md:ml-10 pr-4 md:pr-0">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-3xl md:text-5xl ml-0 mt-7"
      >
        Playlists
      </GradientText>
      <div className="mb-5 mt-7">
        <Search
          placeholder="Search playlists..."
          // onSearch={onSearch}
          onSearch={(query) =>
            router.push(
              pathname + "?" + createQueryString("searchQuery", query),
            )
          }
          style={{ width: 200 }}
        />
      </div>
      <div className="flex flex-row mt-8 md:mt-12">
        <div
          className="bg-gray-400/20 border-1 border-gray-300/60 flex flex-row gap-2 p-2 rounded-xl items-center gap-3 cursor-pointer active:scale-98 max-w-full"
          onClick={() => router.push("/playlists/create")}
        >
          <BsPlusCircle size={28} className="md:hidden shrink-0" />
          <BsPlusCircle size={32} className="hidden md:block shrink-0" />
          {!playlists?.length && !searchQuery ? (
            <h1 className="text-base md:text-xl truncate">
              Create your first playlist!
            </h1>
          ) : (
            <h1 className="text-base md:text-xl">Create playlist</h1>
          )}
        </div>
      </div>
      <div
        className={
          "flex flex-row mt-5 gap-4 md:gap-10 py-3 flex-wrap overflow-x-hidden justify-center md:justify-start"
        }
      >
        {playlists?.length ? (
          <PlaylistList playlists={playlists} />
        ) : (
          <h1 className="text-xl md:text-2xl">No playlists yet!</h1>
        )}
      </div>
      <div className="mt-5">
        <Pagination
          simple
          defaultCurrent={1}
          total={
            playlistsAmount > 0 ? Math.ceil(playlistsAmount / gap) * 10 : 1
          }
          onChange={(newPage) =>
            router.push(
              pathname + "?" + createQueryString("page", newPage.toString()),
            )
          }
        />
      </div>
    </AnimatedDiv>
  );
};

export default Playlists;
