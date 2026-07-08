"use client";

import AlbumList from "@/components/album/AlbumList";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import { useGetAlbums } from "@/hooks/modules/album/useAlbum";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { Input, notification, Pagination, Skeleton } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";

const Albums = () => {
  const t = useTranslations("AlbumsPage");
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
      <div className={"mt-10 ml-4 md:ml-10 w-[90%]"}>
        <Skeleton active />
      </div>
    );

  if (isError) {
    const errorMessage = getErrorMessage(error);
    return <div className="mt-15 p-5 text-3xl md:text-5xl">{errorMessage}</div>;
  }

  return (
    <AnimatedDiv className="ml-4 md:ml-10 pr-4 md:pr-0">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-3xl md:text-5xl ml-0 mt-7"
      >
        {t("title")}
      </GradientText>
      <div className="mb-5 mt-7">
        <Search
          placeholder={t("searchPlaceholder")}
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
            "flex flex-row mt-5 gap-4 md:gap-10 py-3 flex-wrap overflow-x-hidden justify-center md:justify-start"
          }
        >
          <AlbumList albums={data?.items.data} />
        </div>
      ) : (
        <div className="text-xl md:text-2xl">{t("noAlbumsFound")}</div>
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
    </AnimatedDiv>
  );
};

export default Albums;
