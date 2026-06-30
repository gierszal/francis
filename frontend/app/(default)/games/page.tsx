"use client";

import MagicBento from "@/components/motion/Bento";
import GradientText from "@/components/motion/GradientText";
import { useGetGames } from "@/hooks/modules/game/useGame";
import { Skeleton } from "antd";

const Games = () => {
  const { data, isLoading, isError, error } = useGetGames({
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
        Games
      </GradientText>
      <div className="w-full">
        <MagicBento
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
          cardData={data?.items.data}
        />
      </div>
    </>
  );
};

export default Games;
