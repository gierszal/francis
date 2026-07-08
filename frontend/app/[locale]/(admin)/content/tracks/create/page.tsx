"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CreateTrackDTO } from "@/types/track/index";
import { useGetAlbums } from "@/hooks/modules/album/useAlbum";
import Input from "@/components/ui/Input";
import RoundedButton from "@/components/ui/RoundedButton";
import GradientText from "@/components/motion/GradientText";
import FileInput from "@/components/ui/FileInput";
import SelectItems from "@/components/ui/Select";
import { createTrackSchema } from "@/schemas/track";
import { useCreateTrack } from "@/hooks/modules/track/useTrack";
import TagsBuilder from "@/components/ui/TagsBuilder";

interface CreateTrackFormProps {
  callbackUrl?: string;
}

const CreateAlbumForm = ({ callbackUrl }: CreateTrackFormProps) => {
  const t = useTranslations("pages.CreateTrackPage");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateTrackDTO>({
    resolver: zodResolver(createTrackSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: CreateTrackDTO) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("albumId", data.albumId);
    formData.append("artist", data.artist);
    formData.append("audio", data.audio);
    formData.append("tags", JSON.stringify(data.tags));

    create(formData, {
      onSuccess: () => router.push(callbackUrl ?? "/tracks"),
    });
  };

  const { mutate: create } = useCreateTrack();
  const { data } = useGetAlbums();

  const albums = data?.items?.data;

  return (
    <div className="mt-15 flex flex-col items-center px-4 gap-7">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        {t("title")}
      </GradientText>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="flex items-center gap-4">
          <label
            htmlFor="name"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            {t("name")}
          </label>

          <div className="flex-1">
            <Input
              id="name"
              inputProps={register("name")}
              placeholder={t("namePlaceholder")}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base"
            />

            {errors.name && (
              <span className="text-sm text-red-500 font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="artist"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            {t("artist")}
          </label>

          <div className="flex-1">
            <Input
              id="artist"
              inputProps={register("artist")}
              placeholder={t("artistPlaceholder")}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base"
            />

            {errors.artist && (
              <span className="text-sm text-red-500 font-medium">
                {errors.artist.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="picture"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            {t("audio")}
          </label>

          <div className="flex-1">
            <Controller
              control={control}
              name="audio"
              render={({ field: { onChange, onBlur } }) => (
                <FileInput
                  id="picture"
                  inputProps={register("audio")}
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

            {errors.audio && (
              <span className="text-sm text-red-500 font-medium">
                {errors.audio.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="game"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            {t("album")}
          </label>

          <div className="flex-1">
            <Controller
              name="albumId"
              control={control}
              render={({ field }) => (
                <SelectItems
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  items={albums}
                  id="gameId"
                />
              )}
            />

            {errors.albumId && (
              <span className="text-sm text-red-500 font-medium">
                {errors.albumId.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label
            htmlFor="game"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            {t("tags")}
          </label>

          <div className="flex-1">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagsBuilder
                  value={field.value}
                  onChange={(e: any) => {
                    const tagsArray = e.detail.tagify.value.map(
                      (tag: any) => tag.value,
                    );
                    field.onChange(tagsArray);
                  }}
                  onBlur={field.onBlur}
                />
              )}
            />

            {errors.tags && (
              <span className="text-sm text-red-500 font-medium">
                {errors.tags.message}
              </span>
            )}
          </div>
        </div>

        <RoundedButton className="w-full text-xl py-3 mt-5">
          {t("submit")}
        </RoundedButton>
      </form>
    </div>
  );
};

export default CreateAlbumForm;
