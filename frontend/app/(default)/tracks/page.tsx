"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import TrackList from "@/components/track/TrackList";
import { useGetTracks } from "@/hooks/modules/track/useTrack";
import { FormattedTrack } from "@/types/track";
import { Skeleton } from "antd";

const Tracks = () => {
  const { data, isLoading, isError, error } = useGetTracks({
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
        Tracks
      </GradientText>
      <AnimatedDiv className={"ml-10 mt-10"}>
        <TrackList tracks={data?.items.data} />
      </AnimatedDiv>
    </>
  );
};

export default Tracks;
