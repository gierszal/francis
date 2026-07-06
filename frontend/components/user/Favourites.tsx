import { FormattedTrack } from "@/types/track";
import TrackList from "../track/TrackList";
import {
  useGetUserFavourites,
  useGetUserPlaylists,
} from "@/hooks/modules/user/useUser";
import { Input, Skeleton } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { QueueSource } from "@/types/player";

const Favourites = () => {
  const router = useRouter();
  const gap = 10;
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isLoading, isError, error, isSuccess } = useGetUserFavourites({
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

  const favourites = data?.items?.data;
  const favouritesAmount = data?.total;

  if (isLoading || !favouritesAmount) {
    return <Skeleton />;
  }

  if (isError) {
    return (
      <div className="text-2xl text-red-500">
        Error occurred: {error.message}
      </div>
    );
  }
  const { Search } = Input;

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col gap-2 items-center justify-center">
        <div className="mt-2">
          <Search
            defaultValue={searchQuery}
            placeholder="Search favourites..."
            onSearch={(query) =>
              router.push(
                pathname + "?" + createQueryString("searchQuery", query),
              )
            }
            style={{ width: 200 }}
          />
        </div>

        {!favourites || favourites.length === 0 ? (
          <div className="text-2xl mt-5 self-center">
            {!searchQuery
              ? "No favourite tracks yet. Add something!"
              : "No favourite tracks found."}
          </div>
        ) : (
          <TrackList tracks={favourites} source={{ type: "me/favourites" }} />
        )}
      </div>
    );
  }

  return null;
};

export default Favourites;
