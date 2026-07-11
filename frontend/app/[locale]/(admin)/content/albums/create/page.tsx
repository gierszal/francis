"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { CreateAlbumDTO } from "@/types/album";
import { useCreateAlbum } from "@/hooks/modules/album/useAlbum";
import Input from "@/components/ui/Input";
import AITooltip from "@/components/ai/AITooltip";
import RoundedButton from "@/components/ui/RoundedButton";
import { createAlbumSchema } from "@/schemas/album";
import GradientText from "@/components/motion/GradientText";
import { Button, Upload } from "antd";
import FileInput from "@/components/ui/FileInput";
import { useGetGames } from "@/hooks/modules/game/useGame";
import Select from "@/components/ui/Select";
import SelectItems from "@/components/ui/Select";

interface CreateAlbumFormProps {
  callbackUrl?: string;
}

const CreateAlbumForm = ({ callbackUrl }: CreateAlbumFormProps) => {
  const t = useTranslations("pages.CreateAlbumPage");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<CreateAlbumDTO>({
    resolver: zodResolver(createAlbumSchema),
    mode: "onTouched",
  });

  const name = watch("name");
  const description = watch("description");

  const onSubmit = (data: CreateAlbumDTO) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("gameId", data.gameId);
    formData.append("picture", data.picture);

    create(formData, {
      onSuccess: () => router.push(callbackUrl ?? "/albums"),
    });
  };

  const { mutate: create, isError, error } = useCreateAlbum();
  const { data } = useGetGames();

  const games = data?.items?.data;

  return (
    <div className="mt-15 gap-7 px-4 flex flex-col items-center">
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

        <div className="flex flex-row gap-5 items-center w-full">
          <div className="flex items-start gap-4 w-full">
            <label
              htmlFor="description"
              className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0 mt-2"
            >
              {t("description")}
            </label>

            <div className="flex-1">
              <textarea
                {...register("description")}
                id="description"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base resize-y min-h-[120px]"
                placeholder={t("descriptionPlaceholder")}
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
            {t("picture")}
          </label>

          <div className="flex-1">
            <Controller
              control={control}
              name="picture"
              render={({ field: { onChange, onBlur } }) => (
                <FileInput
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
            {t("game")}
          </label>

          <div className="flex-1">
            <Controller
              name="gameId"
              control={control}
              render={({ field }) => (
                <SelectItems
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  value={field.value}
                  items={games}
                  id="gameId"
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

        <RoundedButton className="w-full text-xl py-3 mt-5">
          {t("submit")}
        </RoundedButton>
      </form>
    </div>
  );
};

export default CreateAlbumForm;
