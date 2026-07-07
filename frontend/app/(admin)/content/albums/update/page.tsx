"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAlbumDTO } from "@/types/album";
import {
  useGetAlbum,
  useGetAlbums,
  useUpdateAlbum,
} from "@/hooks/modules/album/useAlbum";
import Input from "@/components/ui/Input";
import AITooltip from "@/components/ai/AITooltip";
import RoundedButton from "@/components/ui/RoundedButton";
import { createAlbumSchema, updateAlbumSchema } from "@/schemas/album";
import GradientText from "@/components/motion/GradientText";
import FileInput from "@/components/ui/FileInput";
import { useGetGames } from "@/hooks/modules/game/useGame";
import SelectItems from "@/components/ui/Select";
import { useEffect, useState } from "react";

interface UpdateAlbumFormProps {
  callbackUrl?: string;
}

const UpdateAlbumForm = ({ callbackUrl }: UpdateAlbumFormProps) => {
  const router = useRouter();
  const [albumId, setAlbumId] = useState<string>("");
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(updateAlbumSchema),
    mode: "onTouched",
  });

  const name = watch("name");
  const description = watch("description");

  const onSubmit = (data: UpdateAlbumDTO) => {
    const formData = new FormData();

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data.description !== undefined) {
      formData.append("description", data.description);
    }

    if (data.gameId !== undefined) {
      formData.append("gameId", data.gameId);
    }

    if (data.picture !== undefined) {
      formData.append("picture", data.picture);
    }

    update(
      { id: albumId, data: formData },
      {
        onSuccess: () => router.replace(callbackUrl ?? "/albums"),
      },
    );
  };

  const { mutate: update, isError, error } = useUpdateAlbum();
  const { data } = useGetGames();
  const { data: albumsData } = useGetAlbums();
  const { data: albumData } = useGetAlbum(albumId, !!albumId);

  const games = data?.items?.data;
  const albums = albumsData?.items?.data;
  const album = albumData?.data?.data;

  useEffect(() => {
    if (!album) return;
    reset({
      name: album?.name,
      description: album?.description,
      gameId: album?.game?.id,
    });
  }, [album, reset]);

  return (
    <div className="mt-15 gap-7 px-4 flex flex-col items-center w-full">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Update Album
      </GradientText>

      <div className="w-full flex flex-row justify-center py-5">
        <SelectItems
          onChange={(id: string) => setAlbumId(id)}
          items={albums}
          placeholder="Select a album"
          className="w-full"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="name"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Name
          </label>
          <div className="flex-1">
            <Input
              disabled={!album}
              id="name"
              inputProps={register("name")}
              placeholder="Enter album name"
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base"
            />
            {errors.name && (
              <span className="text-sm text-red-500 font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-5 items-center w-full">
          <div className="flex items-start gap-4 w-full">
            <label
              htmlFor="description"
              className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0 mt-2"
            >
              Description
            </label>
            <div className="flex-1">
              <textarea
                disabled={!album}
                {...register("description")}
                id="description"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base resize-y min-h-[120px]"
                placeholder="Enter album description"
              />
              {errors.description && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className="ml-auto">
            <AITooltip
              fieldName="description"
              setValue={setValue}
              topic="playlist"
              item={{
                name,
                description,
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="picture"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Picture
          </label>
          <div className="flex-1">
            <Controller
              control={control}
              name="picture"
              render={({ field: { onChange, onBlur } }) => (
                <FileInput
                  disabled={!album}
                  id="picture"
                  inputProps={register("picture")}
                  onBlur={onBlur}
                  onChange={(e: any) => {
                    const fileList = e.target.files;
                    const file =
                      fileList && fileList.length > 0 ? fileList[0] : null;
                    onChange(file);
                  }}
                />
              )}
            />
            {errors.picture && (
              <span className="text-sm text-red-500 font-medium">
                {errors.picture.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="game"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Game
          </label>
          <div className="flex-1">
            <Controller
              name="gameId"
              control={control}
              render={({ field }) => (
                <SelectItems
                  {...field}
                  disabled={!album}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  items={games}
                  id="gameId"
                  placeholder="Select a game"
                />
              )}
            />
            {errors.gameId && (
              <span className="text-sm text-red-500 font-medium">
                {errors.gameId.message}
              </span>
            )}
          </div>
        </div>

        <RoundedButton className="w-full text-xl py-3 mt-5" disabled={!album}>
          Update Album
        </RoundedButton>
      </form>
    </div>
  );
};

export default UpdateAlbumForm;
