"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import {
  useGetAlbum,
  useGetAlbums,
  useRemoveAlbum,
} from "@/hooks/modules/album/useAlbum";
import RoundedButton from "@/components/ui/RoundedButton";
import GradientText from "@/components/motion/GradientText";
import SelectItems from "@/components/ui/Select";
import { useState } from "react";

interface RemoveAlbumFormProps {
  callbackUrl?: string;
}

const RemoveAlbumForm = ({ callbackUrl }: RemoveAlbumFormProps) => {
  const router = useRouter();
  const t = useTranslations("pages.RemoveAlbumPage");
  const [albumId, setAlbumId] = useState<string>("");

  const onClick = () => {
    remove(
      { id: albumId },
      {
        onSuccess: () => router.replace(callbackUrl ?? "/albums"),
      },
    );
  };

  const { mutate: remove, isError, error } = useRemoveAlbum();
  const { data: albumsData } = useGetAlbums();
  const { data: albumData } = useGetAlbum(albumId, !!albumId);

  const albums = albumsData?.items?.data;
  const album = albumData?.data?.data;

  return (
    <div className="mt-15 gap-7 px-4 flex flex-col items-center w-full">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        {t("title")}
      </GradientText>

      <div className="w-full flex flex-row justify-center py-5">
        <SelectItems
          onChange={(id: string) => setAlbumId(id)}
          items={albums}
          placeholder={t("selectAlbum")}
          className="w-full"
        />
      </div>

      <RoundedButton
        className="min-w-[30%] text-xl py-3 mt-5"
        disabled={!album}
        onClick={onClick}
      >
        {t("submit")}
      </RoundedButton>
    </div>
  );
};

export default RemoveAlbumForm;
