import { Skeleton } from "antd";
import TrackList from "../track/TrackList";
import { useGetUserHistory } from "@/hooks/modules/user/useUser";

const History = () => {
  const { data, isSuccess, isError, isLoading, error } = useGetUserHistory();

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
        You haven't listened to anything yet.
      </div>
    );
  }

  if (isSuccess) {
    return <TrackList tracks={data?.data} />;
  }

  return null;
};

export default History;
