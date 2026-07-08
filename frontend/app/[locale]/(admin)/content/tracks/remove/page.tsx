"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useGetAlbum,
  useGetAlbums,
  useRemoveAlbum,
} from "@/hooks/modules/album/useAlbum";
import RoundedButton from "@/components/ui/RoundedButton";
import GradientText from "@/components/motion/GradientText";
import SelectItems from "@/components/ui/Select";
import { useState } from "react";
import {
  useGetTrack,
  useGetTracks,
  useRemoveTrack,
} from "@/hooks/modules/track/useTrack";

interface RemoveTrackFormProps {
  callbackUrl?: string;
}

const RemoveTrackForm = ({ callbackUrl }: RemoveTrackFormProps) => {
  const router = useRouter();
  const [trackId, setTrackId] = useState<string>("");

  const onClick = () => {
    remove(
      { id: trackId },
      {
        onSuccess: () => router.replace(callbackUrl ?? "/tracks"),
      },
    );
  };

  const { mutate: remove, isError, error } = useRemoveTrack();
  const { data: tracksData } = useGetTracks();
  const { data: trackData } = useGetTrack(trackId, !!trackId);

  const tracks = tracksData?.items?.data;
  const track = trackData?.data?.data;

  return (
    <div className="mt-15 flex flex-col items-center w-full px-4 gap-7">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Delete Album
      </GradientText>

      <div className="w-full flex flex-row justify-center py-5">
        <SelectItems
          onChange={(id: string) => setTrackId(id)}
          items={tracks}
          placeholder="Select a track"
          className="w-full"
        />
      </div>

      <RoundedButton
        className="min-w-[30%] text-xl py-3 mt-5"
        disabled={!track}
        onClick={onClick}
      >
        Remove Track
      </RoundedButton>
    </div>
  );
};

export default RemoveTrackForm;
