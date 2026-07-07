"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateTrackDTO } from "@/types/track";
import Input from "@/components/ui/Input";
import RoundedButton from "@/components/ui/RoundedButton";
import GradientText from "@/components/motion/GradientText";
import FileInput from "@/components/ui/FileInput";
import SelectItems from "@/components/ui/Select";
import { useEffect, useState } from "react";
import { updateTrackSchema } from "@/schemas/track";
import {
  useGetTrack,
  useGetTracks,
  useUpdateTrack,
} from "@/hooks/modules/track/useTrack";
import { useGetAlbums } from "@/hooks/modules/album/useAlbum";
import TagsBuilder from "@/components/ui/TagsBuilder";

interface UpdateTrackFormProps {
  callbackUrl?: string;
}

const UpdateTrackForm = ({ callbackUrl }: UpdateTrackFormProps) => {
  const router = useRouter();
  const [trackId, setTrackId] = useState<string>("");
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    resolver: zodResolver(updateTrackSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: UpdateTrackDTO) => {
    const formData = new FormData();

    if (data?.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data?.albumId !== undefined) {
      formData.append("albumId", data.albumId);
    }

    if (data?.artist !== undefined) {
      formData.append("artist", data.artist);
    }

    if (data?.audio !== undefined) {
      formData.append("audio", data.audio);
    }

    if (data?.tags !== undefined) {
      formData.append("tags", JSON.stringify(data.tags));
    }

    update(
      { id: trackId, data: formData },
      {
        onSuccess: () => router.replace(callbackUrl ?? "/tracks"),
      },
    );
  };

  const { mutate: update, isError, error } = useUpdateTrack();

  const { data: albumsData } = useGetAlbums();
  const { data: tracksData } = useGetTracks();
  const { data: trackData } = useGetTrack(trackId, !!trackId);

  const tracks = tracksData?.items?.data;
  const track = trackData?.data?.data;

  const albums = albumsData?.items?.data;

  useEffect(() => {
    if (!track) return;
    reset({
      name: track?.name,
      albumId: track?.album?.id,
      artist: track?.artist,
      tags: track?.tags,
    });
  }, [track, reset]);

  return (
    <div className="mt-15 flex flex-col items-center gap-7 px-4">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Update Track
      </GradientText>

      <div className="w-full flex flex-row justify-center py-5">
        <SelectItems
          onChange={(id: string) => setTrackId(id)}
          items={tracks}
          placeholder="Select a track"
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
              id="name"
              disabled={!track}
              inputProps={register("name")}
              placeholder="Enter track name"
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
            Artist
          </label>
          <div className="flex-1">
            <Input
              disabled={!track}
              id="artist"
              inputProps={register("artist")}
              placeholder="Enter artist name"
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
            htmlFor="audio"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Audio
          </label>
          <div className="flex-1">
            <Controller
              control={control}
              name="audio"
              render={({ field: { onChange, onBlur } }) => (
                <FileInput
                  disabled={!track}
                  id="audio"
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
            htmlFor="albumId"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Album
          </label>
          <div className="flex-1">
            <Controller
              name="albumId"
              control={control}
              render={({ field }) => (
                <SelectItems
                  {...field}
                  disabled={!track}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  items={albums}
                  id="albumId"
                  placeholder="Select an album"
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
            htmlFor="tags"
            className="text-lg font-semibold text-gray-700 w-32 flex-shrink-0"
          >
            Tags
          </label>
          <div className="flex-1">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <TagsBuilder
                  disabled={!track}
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

        <RoundedButton className="w-full text-xl py-3 mt-5" disabled={!track}>
          Update Track
        </RoundedButton>
      </form>
    </div>
  );
};

export default UpdateTrackForm;
