"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAlbumDTO } from "@/types/album";
import { useCreateAlbum } from "@/hooks/modules/album/useAlbum";
import Input from "@/components/ui/Input";
import AITooltip from "@/components/ai/AITooltip";
import RoundedButton from "@/components/ui/RoundedButton";
import { createAlbumSchema } from "@/schemas/album";
import GradientText from "@/components/motion/GradientText";
import { Button, Upload } from "antd";
import FileInput from "@/components/ui/FileInput";
import { useCreateGame, useGetGames } from "@/hooks/modules/game/useGame";
import Select from "@/components/ui/Select";
import SelectItems from "@/components/ui/Select";
import { CreateGameDTO } from "@/types/game";
import { createGameSchema } from "@/schemas/game";

interface CreateGameFormProps {
  callbackUrl?: string;
}

const CreateGameForm = ({ callbackUrl }: CreateGameFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm<CreateGameDTO>({
    resolver: zodResolver(createGameSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: CreateGameDTO) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("picture", data.picture);

    create(formData, {
      onSuccess: () => router.push(callbackUrl ?? "/games"),
    });
  };

  const { mutate: create, isError, error } = useCreateGame();

  return (
    <div className="mt-10 flex flex-col items-center">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Create Game
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
            Name
          </label>
          <div className="flex-1">
            <Input
              id="name"
              inputProps={register("name")}
              placeholder="Enter game name"
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
            Picture
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

        <RoundedButton className="w-full text-xl py-3 mt-5">
          Create Game
        </RoundedButton>
      </form>
    </div>
  );
};

export default CreateGameForm;
