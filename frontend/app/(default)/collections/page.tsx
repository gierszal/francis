"use client";

import CollectionList from "@/components/collection/CollectionList";
import GradientText from "@/components/motion/GradientText";
import { useGetCollections } from "@/hooks/modules/collection/useCollection";
import { FormattedDetailedCollection } from "@/types/collection";
import { Skeleton } from "antd";

const Collections = () => {
  const { data, isLoading, isError, error } = useGetCollections({
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
        Collections
      </GradientText>
      <CollectionList collections={data?.items.data} />
    </>
  );
};

export default Collections;
