import { FormattedTrack } from "@/types/track";
import TrackList from "../track/TrackList";
import {
  useGetUserHistory,
  useGetUserPlaylists,
} from "@/hooks/modules/user/useUser";
import { Input, Skeleton } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const History = () => {
  const router = useRouter();
  const gap = 10;
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isLoading, isError, error, isSuccess } = useGetUserHistory({
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

  const history = data?.items?.data;
  const historyAmount = data?.total;

  if (isLoading || !historyAmount) {
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
            placeholder="Search History..."
            onSearch={(query) =>
              router.push(
                pathname + "?" + createQueryString("searchQuery", query),
              )
            }
            style={{ width: 200 }}
          />
        </div>

        {!history || History.length === 0 ? (
          <div className="text-2xl mt-5 self-center">
            {!searchQuery
              ? "You haven not listened to anything yet!"
              : "No tracks in history found."}
          </div>
        ) : (
          <TrackList tracks={history} source={{ type: "me/history" }} />
        )}
      </div>
    );
  }

  return null;
};

export default History;
