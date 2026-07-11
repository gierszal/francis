"use client";

import CollectionList from "@/components/collection/CollectionList";
import GradientText from "@/components/motion/GradientText";
import { useGetCollections } from "@/hooks/modules/collection/useCollection";
import { FormattedDetailedCollection } from "@/types/collection";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { Skeleton, Input, Pagination, notification } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { constants } from "@/lib/constants";
import { createQueryString } from "@/lib/queryStringBuilder";
import ItemsPagination from "@/components/ui/ItemsPagination";

const Collections = () => {
  const t = useTranslations("pages.CollectionsPage");
  const router = useRouter();
  const gap = constants.gap;
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isLoading, isError, error, isSuccess } = useGetCollections({
    count: gap,
    offset: (page - 1) * gap,
    searchQuery: searchQuery,
  });

  const collectionsAmount = data?.total;

  const { Search } = Input;

  if (isLoading || !collectionsAmount)
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
    <div className="ml-4 md:ml-10 pr-4 md:pr-0">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-3xl md:text-5xl ml-0 mt-7 mb-7"
      >
        {t("title")}
      </GradientText>
      <div className="mt-5">
        <Search
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
      {collectionsAmount != 0 ? (
        <CollectionList collections={data?.items.data} />
      ) : (
        <div className={"text-xl md:text-2xl mt-5"}>
          {t("noCollectionsFound")}
        </div>
      )}
      <div className="mt-5">
        <ItemsPagination itemsAmount={collectionsAmount} />
      </div>
    </div>
  );
};

export default Collections;
