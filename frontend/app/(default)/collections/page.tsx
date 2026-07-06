"use client";

import CollectionList from "@/components/collection/CollectionList";
import GradientText from "@/components/motion/GradientText";
import { useGetCollections } from "@/hooks/modules/collection/useCollection";
import { FormattedDetailedCollection } from "@/types/collection";
import { Skeleton, Input, Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Collections = () => {
  const router = useRouter();
  const gap = 10;
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data, isLoading, isError, error, isSuccess } = useGetCollections({
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

  const collectionsAmount = data?.total;

  const { Search } = Input;

  if (isLoading || !collectionsAmount)
    return (
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return <div className="text-5xl text-red-500">Error: {error?.message}</div>;

  return (
    <div className="ml-10">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-0 mt-7 mb-7"
      >
        Collections
      </GradientText>
      <div className="mt-5">
        <Search
          placeholder="Search collections..."
          onSearch={(query) =>
            router.push(
              pathname + "?" + createQueryString("searchQuery", query),
            )
          }
          style={{ width: 200 }}
        />
      </div>
      {collectionsAmount != 0 ? (
        <CollectionList collections={data?.items.data} />
      ) : (
        <div className={"text-2xl mt-5"}>No collections found!</div>
      )}
      <div className="mt-5">
        <Pagination
          simple
          defaultCurrent={collectionsAmount > 0 ? page : 1}
          total={
            collectionsAmount > 0 ? Math.ceil(collectionsAmount / gap) * 10 : 1
          }
          onChange={(newPage) =>
            router.push(
              pathname + "?" + createQueryString("page", newPage.toString()),
            )
          }
        />
      </div>
    </div>
  );
};

export default Collections;
