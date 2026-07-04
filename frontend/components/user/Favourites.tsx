import { FormattedTrack } from "@/types/track";
import React, { useEffect } from "react";
import TrackList from "../track/TrackList";
import {
  useGetUserFavourites,
  useGetUserPlaylists,
} from "@/hooks/modules/user/useUser";
import { Skeleton } from "antd";

const Favourites = () => {
  const { data, isSuccess, isError, isLoading, error } = useGetUserFavourites();

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return (
      <div className="text-2xl text-red-500">
        Error occurred: {error.message}
      </div>
    );
  }

  if (isSuccess && (!data?.data?.data || data?.data?.data.length === 0)) {
    return (
      <div className="text-2xl mt-5 ml-10 self-center">
        No favourite tracks yet. Add something!
      </div>
    );
  }

  if (isSuccess) {
    return <TrackList tracks={data?.data?.data} />;
  }

  return null;
};

export default Favourites;
