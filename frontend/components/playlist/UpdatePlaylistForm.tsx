import { Form } from "antd";
import RoundedButton from "../ui/RoundedButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Input from "../ui/Input";
import { useRouter } from "next/navigation";
import { FormattedDetailedPlaylist, UpdatePlaylistDTO } from "@/types/playlist";
import { createPlaylistSchema, updatePlaylistSchema } from "@/schemas/playlist";
import { useUpdatePlaylist } from "@/hooks/modules/playlist/usePlaylist";
import AITooltip from "../ai/AITooltip";

interface UpdatePlaylistFormProps {
  playlist: FormattedDetailedPlaylist;
}

const UpdatePlaylistForm = ({ playlist }: UpdatePlaylistFormProps) => {
  const router = useRouter();
  const t = useTranslations("components.UpdatePlaylistForm");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<UpdatePlaylistDTO>({
    resolver: zodResolver(updatePlaylistSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: UpdatePlaylistDTO) => {
    update(
      {
        id: playlist.id,
        data,
      },
      { onSuccess: () => router.replace(`/playlists/${playlist.id}`) },
    );
  };

  const { mutate: update, isError, error } = useUpdatePlaylist();

  const name = watch("name");
  const description = watch("description");

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
            {t("nameLabel")}
          </label>
          <div className="flex-1">
            <Input
              id="name"
              inputProps={register("name")}
              placeholder={t("namePlaceholder")}
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base"
              defaultValue={playlist?.name}
            />
            {errors.name && (
              <span className="text-sm text-red-500 font-medium">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-5 items-start md:items-center w-full">
          <label
            htmlFor="description"
            className="text-base md:text-lg font-semibold text-gray-700 md:w-32 flex-shrink-0 md:mt-2"
          >
            {t("descriptionLabel")}
          </label>
          <div className="flex-1 w-full">
            <textarea
              {...register("description")}
              id="description"
              className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 text-base resize-y min-h-[100px] md:min-h-[120px]"
              placeholder={t("descriptionPlaceholder")}
              defaultValue={playlist?.description ?? ""}
            />
            {errors.description && (
              <span className="text-sm text-red-500 font-medium">
                {errors.description.message}
              </span>
            )}
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
          {t("submit")}
        </RoundedButton>
      </form>
    </div>
  );
};

export default UpdatePlaylistForm;
