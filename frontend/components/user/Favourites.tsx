import TrackList from "../track/TrackList";
import { useGetUserFavourites } from "@/hooks/modules/user/useUser";
import { Input, Skeleton } from "antd";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { constants } from "@/lib/constants";
import { createQueryString } from "@/lib/queryStringBuilder";
import ItemsPagination from "../ui/ItemsPagination";

const Favourites = () => {
  const router = useRouter();
  const t = useTranslations("components.Favourites");
  const gap = constants.gap;
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isLoading, isError, error, isSuccess } = useGetUserFavourites({
    count: gap,
    offset: (page - 1) * gap,
    searchQuery: searchQuery,
  });

  const favourites = data?.items?.data;
  const favouritesAmount = data?.total;

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return (
      <div className="text-2xl text-red-500">
        {t("errorOccurred")} {error.message}
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
            placeholder={t("searchPlaceholder")}
            onSearch={(query) =>
              router.push(
                pathname +
                  "?" +
                  createQueryString(searchParams, "searchQuery", query),
              )
            }
            style={{ width: 200 }}
          />
        </div>

        {!favourites || favourites?.length === 0 ? (
          <div className="text-2xl mt-5 self-center">
            {!searchQuery ? t("noTracks") : t("noTracksFound")}
          </div>
        ) : (
          <>
            <TrackList tracks={favourites} source={{ type: "me/favourites" }} />
            <div className="mt-5 self-start">
              <ItemsPagination itemsAmount={favouritesAmount ?? 0} />
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default Favourites;
