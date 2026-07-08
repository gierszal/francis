"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  useGetAlbum,
  useGetAlbums,
  useAddToCollection,
} from "@/hooks/modules/album/useAlbum";
import RoundedButton from "@/components/ui/RoundedButton";
import GradientText from "@/components/motion/GradientText";
import SelectItems from "@/components/ui/Select";
import { useState } from "react";
import {
  useGetCollection,
  useGetCollections,
} from "@/hooks/modules/collection/useCollection";
import { FormattedAlbum } from "@/types/album";
import { notification } from "antd";

interface AddToCollectionFormProps {
  callbackUrl?: string;
}

const AddToCollectionForm = ({ callbackUrl }: AddToCollectionFormProps) => {
  const t = useTranslations("pages.AddToCollectionPage");
  const router = useRouter();

  const [albumId, setAlbumId] = useState<string>("");
  const [collectionId, setCollectionId] = useState<string>("");

  const isAlbumInCollection = () => {
    return collection?.albums?.some(
      (item: FormattedAlbum) =>
        item?.id === albumId && item?.name === album?.name,
    );
  };

  const onClick = () => {
    if (isAlbumInCollection())
      notification.error({
        title: t("errorTitle"),
        description: t("alreadyExists"),
      });
    else {
      add(
        { albumId, collectionId },
        {
          onSuccess: () => router.replace(callbackUrl ?? "/collections"),
        },
      );
    }
  };

  const { mutate: add } = useAddToCollection();

  const { data: albumsData } = useGetAlbums();
  const { data: albumData } = useGetAlbum(albumId, !!albumId);

  const { data: collectionsData } = useGetCollections();
  const { data: collectionData } = useGetCollection(
    collectionId,
    !!collectionId,
  );

  const albums = albumsData?.items?.data;
  const album = albumData?.data?.data;

  const collections = collectionsData?.items?.data;
  const collection = collectionData?.data?.data;

  return (
    <div className="mt-15 gap-7 px-4 flex flex-col items-center w-full">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl w-full ml-10"
      >
        {t("title")}
      </GradientText>

      <div className="flex flex-row gap-5">
        <div className="w-full flex flex-row justify-center py-5">
          <SelectItems
            onChange={(id: string) => setAlbumId(id)}
            items={albums}
            placeholder={t("selectAlbum")}
            className="w-full"
          />
        </div>

        <div className="w-full flex flex-row justify-center py-5">
          <SelectItems
            onChange={(id: string) => setCollectionId(id)}
            items={collections}
            placeholder={t("selectCollection")}
            className="w-full"
          />
        </div>
      </div>

      <RoundedButton
        className="min-w-[30%] text-xl py-3 mt-5"
        disabled={!album && !collection}
        onClick={onClick}
      >
        {t("submit")}
      </RoundedButton>
    </div>
  );
};

export default AddToCollectionForm;
