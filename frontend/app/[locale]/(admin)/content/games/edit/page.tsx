"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { UpdateGameDTO } from "@/types/game";
import Input from "@/components/ui/Input";
import AITooltip from "@/components/ai/AITooltip";
import RoundedButton from "@/components/ui/RoundedButton";
import { updateGameSchema } from "@/schemas/game";
import GradientText from "@/components/motion/GradientText";
import FileInput from "@/components/ui/FileInput";
import {
  useGetGame,
  useGetGames,
  useUpdateGame,
} from "@/hooks/modules/game/useGame";
import SelectItems from "@/components/ui/Select";
import { useEffect, useState } from "react";

interface UpdateGameFormProps {
  callbackUrl?: string;
}

const UpdateGameForm = ({ callbackUrl }: UpdateGameFormProps) => {
  const t = useTranslations("pages.UpdateGamePage");
  const router = useRouter();
  const [gameId, setgameId] = useState<string>("");

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(updateGameSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: UpdateGameDTO) => {
    const formData = new FormData();

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data.picture !== undefined) {
      formData.append("picture", data.picture);
    }

    update(
      { id: gameId, data: formData },
      {
        onSuccess: () => router.replace(callbackUrl ?? "/games"),
      },
    );
  };

  const { mutate: update, isError, error } = useUpdateGame();
  const { data: gamesData } = useGetGames();
  const { data: gameData } = useGetGame(gameId, !!gameId);

  const games = gamesData?.items?.data;
  const game = gameData?.data?.data;

  useEffect(() => {
    if (!game) return;
    reset({
      name: game?.name,
    });
  }, [game, reset]);

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
          onChange={(id: string) => setgameId(id)}
          items={games}
          placeholder={t("selectGame")}
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
            {t("name")}
          </label>

          <div className="flex-1">
            <Input
              disabled={!game}
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
                  disabled={!game}
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

        <RoundedButton className="w-full text-xl py-3 mt-5" disabled={!game}>
          {t("submit")}
        </RoundedButton>
      </form>
    </div>
  );
};

export default UpdateGameForm;
