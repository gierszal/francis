"use client";

import AnimatedDiv from "@/components/motion/AnimatedDiv";
import MagicBento from "@/components/motion/Bento";
import GradientText from "@/components/motion/GradientText";
import { useGetGames } from "@/hooks/modules/game/useGame";
import { Skeleton, Input, Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Games = () => {
  const router = useRouter();
  const gap = 10;
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isLoading, isError, error, isSuccess } = useGetGames({
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

  const gamesAmount = data?.total;

  const { Search } = Input;

  if (isLoading || !gamesAmount)
    return (
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return <div className="text-5xl text-red-500">Error: {error?.message}</div>;

  return (
    <AnimatedDiv className="ml-4 md:ml-10 pr-4 md:pr-0">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-3xl md:text-5xl ml-0 mt-5"
      >
        Games
      </GradientText>
      <div className="mb-5 mt-5">
        <Search
          placeholder="Search games..."
          onSearch={(query) =>
            router.push(
              pathname + "?" + createQueryString("searchQuery", query),
            )
          }
          style={{ width: 200 }}
        />
      </div>
      {gamesAmount != 0 ? (
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
      ) : (
        <div className="text-xl md:text-2xl">No games found!</div>
      )}
      <div className="mt-5">
        <Pagination
          simple
          defaultCurrent={gamesAmount > 0 ? page : 1}
          total={gamesAmount > 0 ? Math.ceil(gamesAmount / gap) * 10 : 1}
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

export default Games;
