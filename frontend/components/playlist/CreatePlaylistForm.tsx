import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RoundedButton from "../ui/RoundedButton";
import Input from "../ui/Input";
import { CreatePlaylistDTO } from "@/types/playlist";
import { createPlaylistSchema } from "@/schemas/playlist";
import { useCreatePlaylist } from "@/hooks/modules/playlist/usePlaylist";
import AITooltip from "../ai/AITooltip";
import { notification } from "antd";
import { useRef } from "react";

interface CreatePlaylistFormProps {
  callbackUrl?: string;
}

const CreatePlaylistForm = ({ callbackUrl }: CreatePlaylistFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    watch,
    setValue,
  } = useForm<CreatePlaylistDTO>({
    resolver: zodResolver(createPlaylistSchema),
    mode: "onTouched",
  });

  const name = watch("name");
  const description = watch("description");

  const onSubmit = (data: CreatePlaylistDTO) => {
    create(data, {
      onSuccess: () => router.push(callbackUrl ?? "/playlists"),
    });
  };

  const { mutate: create, isError, error } = useCreatePlaylist();

  return (
    <div className="mt-10 flex flex-col items-center px-4 md:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label
            htmlFor="name"
            className="text-base md:text-lg font-semibold text-gray-700 md:w-32 flex-shrink-0"
          >
            Name
          </label>
          <div className="flex-1">
            <Input
              id="name"
              inputProps={register("name")}
              placeholder="Enter playlist name"
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base"
            />
            {errors.name && (
              <span className="text-sm text-red-500 font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start md:items-center w-full">
          <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 w-full">
            <label
              htmlFor="description"
              className="text-base md:text-lg font-semibold text-gray-700 md:w-32 flex-shrink-0 md:mt-2"
            >
              Description
            </label>
            <div className="flex-1 w-full">
              <textarea
                {...register("description")}
                id="description"
                className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base resize-y min-h-[100px] md:min-h-[120px]"
                placeholder="Enter playlist description (optional)"
              />
              {errors.description && (
                <span className="text-sm text-red-500 font-medium">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>
          <div className="md:ml-auto self-end md:self-auto">
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

        <RoundedButton className="w-full text-lg md:text-xl py-3 mt-5">
          Create Playlist
        </RoundedButton>
      </form>
    </div>
  );
};

export default CreatePlaylistForm;
