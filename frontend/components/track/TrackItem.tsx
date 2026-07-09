"use client";
import { FormattedTrack } from "@/types/track";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react";

import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import Header from "../ui/Header";
import TrackPopover from "./popover/TrackPopover";
import {
  useAddToFavourites,
  useRemoveFromFavourites,
} from "@/hooks/modules/user/useUser";
import { usePlayerStore } from "@/providers/StoreProvider";
import { useQueryClient } from "@tanstack/react-query";
import { QueueSource } from "@/types/player";
import { useRequireActivated } from "@/hooks/modules/auth/useRequireActivated";

interface TrackItemProps {
  track: FormattedTrack;
  idx: number;
  isFavourite: boolean;
  source: QueueSource;
  tracks: FormattedTrack[];
}

const TrackItem = memo(
  ({ track, idx, isFavourite, source, tracks }: TrackItemProps) => {
    const [items, setItems] = useState<any>(null);
    const router = useRouter();
    const queryClient = useQueryClient();

    const activeTrack = usePlayerStore((s) => s.activeTrack);
    const isPlaying = usePlayerStore((s) => s.isPlaying);

    const setActiveTrack = usePlayerStore((s) => s.setActiveTrack);
    const setPause = usePlayerStore((s) => s.setPause);
    const setPlay = usePlayerStore((s) => s.setPlay);
    const initAudio = usePlayerStore((s) => s.initAudio);
    const setQueueMeta = usePlayerStore((s) => s.setQueueMeta);
    const setQueryClient = usePlayerStore((s) => s.setQueryClient);

    const isCurrentTrackActive = activeTrack?.id === track?.id;

    const { requireActivated, isActivated } = useRequireActivated();

    const gap = 10;

    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const searchQuery = searchParams.get("searchQuery") || "";

    const itemsData = queryClient.getQueryData([
      source.type,
      {
        count: gap,
        offset: (page - 1) * gap,
        searchQuery,
      },
    ]);

    useEffect(() => {
      setQueryClient(queryClient);
    }, [queryClient]);

    useEffect(() => {
      if (itemsData) setItems(itemsData);
    }, [itemsData]);

    const togglePlay = () => {
      if (isCurrentTrackActive) {
        if (isPlaying) setPause();
        else setPlay();
      } else {
        setActiveTrack(track, tracks);
        setQueueMeta({
          count: gap,
          offset: (page - 1) * gap,
          searchQuery,
          total: items?.total ?? tracks?.length,
          source,
        });
      }
    };

    const addToFavourites = () => {
      requireActivated(() => add({ trackId: track.id }));
    };

    const removeFromFavourites = () => {
      requireActivated(() => remove({ trackId: track.id }));
    };

    const { mutate: add } = useAddToFavourites();
    const { mutate: remove } = useRemoveFromFavourites();

    useEffect(() => {
      initAudio();
    });

    return (
      <li
        className={`group font-sans flex items-center gap-4 p-3 rounded-xl transition-all duration-200 border border-gray-200 hover:border-violet-300 hover:shadow-md  ${
          idx % 2 === 0 ? "bg-zinc-200" : "bg-zinc-300"
        }`}
      >
        <div className="relative flex-shrink-0 cursor-pointer">
          <Image
            onClick={() => router.push(`/tracks/${track.id}`)}
            width={200}
            height={200}
            className="rounded-2xl w-full size-14 aspect-square object-cover"
            src={`/api/${track?.picture}`}
            alt={track.name}
          />
          <div className="absolute text-white -top-1 -right-1 size-5 rounded-full bg-black/80  flex items-center justify-center text-[10px] font-bold">
            {idx + (page - 1) * gap + 1}
          </div>
        </div>

        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => router.push(`/tracks/${track.id}`)}
        >
          <div
            className="flex items-center gap-2 "
            onClick={() => router.push(`/tracks/${track.id}`)}
          >
            <Header className="text-sm font-medium ">{track.name}</Header>
          </div>
          <div
            className="text-xs w-fit text-black/40"
            onClick={() => router.push(`/tracks/${track.id}`)}
          >
            {track.artist}
          </div>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-black/20">
            <span>{track.listens?.toLocaleString() ?? 0} plays</span>
            {track.tags?.length !== 0 && (
              <span>• {track.tags.slice(0, 2).join(", ")}</span>
            )}
          </div>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <button className="text-gray-400 hover:text-red-400 transition-colors ml-1 p-1 active:scale-105 cursor-pointer">
            {isFavourite ? (
              <BsHeartFill
                color="red"
                size={18}
                onClick={removeFromFavourites}
              />
            ) : (
              <BsHeart size={18} onClick={addToFavourites} />
            )}
          </button>
          <TrackPopover trackId={track.id} size={22} />
          <button
            onClick={togglePlay}
            className="size-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            {isPlaying && isCurrentTrackActive ? (
              <BsFillPauseFill size={20} className="text-primary" />
            ) : (
              <BsFillPlayFill size={20} className="text-primary" />
            )}
          </button>
        </div>
      </li>
    );
  },
);

export default TrackItem;
