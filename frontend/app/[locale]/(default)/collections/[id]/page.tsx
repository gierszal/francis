"use client";

import AlbumItem from "@/components/album/AlbumItem";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import { useGetCollection } from "@/hooks/modules/collection/useCollection";
import { FormattedAlbum } from "@/types/album";
import { FormattedDetailedCollection } from "@/types/collection";
import { getErrorMessage } from "@/utils/errors/getErrorMessage";
import { notification, Skeleton } from "antd";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const CollectionPage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGetCollection(
    params.id?.toString(),
  );

  if (isLoading)
    return (
      <div className={"mt-10 ml-4 md:ml-10 w-[90%]"}>
        <Skeleton active />
      </div>
    );

  if (isError) {
    const errorMessage = getErrorMessage(error);
    return <div className="mt-15 p-5 text-3xl md:text-5xl">{errorMessage}</div>;
  }

  const collection = data?.data?.data;

  return (
    <AnimatedDiv
      className={
        "mt-6 md:mt-10 ml-4 md:ml-10 flex flex-col items-start px-2 md:px-0"
      }
    >
      <div className="relative">
        <GradientText className={"text-5xl "}>{collection?.name}</GradientText>
      </div>
      <div
        className={"flex flex-row mt-6 md:mt-10 gap-3 md:gap-5"}
        style={{ flexWrap: "wrap" }}
      >
        {collection?.albums?.map((album: FormattedAlbum, idx: number) => (
          <AlbumItem key={idx} album={album} />
        ))}
      </div>
    </AnimatedDiv>
  );
};

export default CollectionPage;
