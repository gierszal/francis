// "use client";
import { useCallback, useMemo, useState } from "react";
import TrackPopover from "../track/popover/TrackPopover";
import { usePlayerStore } from "@/providers/StoreProvider";
import {
  useAddToFavourites,
  useGetUser,
  useGetUserFavourites,
  useRemoveFromFavourites,
} from "@/hooks/modules/user/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../ui/Header";
import { FormattedTrack } from "@/types/track";
import PlayerControls from "./PlayerControls";
import VolumeAdjuster from "./VolumeAdjuster";
import PlayerImage from "./PlayerImage";
import TimelineSlider from "./TimelineSlider";

const MusicWidget = () => {
  const { data: userData } = useGetUser();
  const user = userData?.data?.data;
  const router = useRouter();

  const activeTrack = usePlayerStore((s) => s.activeTrack);
  const currentIndex = usePlayerStore((s) => s.currentIndex);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const isLooped = usePlayerStore((s) => s.isLooped);

  const setPause = usePlayerStore((s) => s.setPause);
  const setPlay = usePlayerStore((s) => s.setPlay);
  const nextTrack = usePlayerStore((s) => s.nextTrack);
  const prevTrack = usePlayerStore((s) => s.prevTrack);
  const toggleLoop = usePlayerStore((s) => s.toggleLoop);

  const gap = 10;

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery = searchParams.get("searchQuery") || "";

  const { data } = useGetUserFavourites(
    {
      count: gap,
      offset: (page - 1) * gap,
      searchQuery: searchQuery,
    },
    !!user,
  );
  const favourites = data?.items?.data;

  const favouriteIds = useMemo(() => {
    return new Set(favourites?.map((track: FormattedTrack) => track.id) || []);
  }, [favourites]);

  const togglePlay = useCallback(() => {
    if (isPlaying) setPause();
    else setPlay();
  }, [isPlaying]);

  const addToFavourites = useCallback(() => {
    if (!activeTrack) return;
    add({ trackId: activeTrack.id });
  }, [activeTrack]);

  const removeFromFavourites = useCallback(() => {
    if (!activeTrack) return;
    remove({ trackId: activeTrack.id });
  }, [activeTrack]);

  const handleNextTrack = useCallback(() => {
    nextTrack();
  }, []);

  const handlePrevTrack = useCallback(() => {
    prevTrack();
  }, []);

  const { mutate: add } = useAddToFavourites();
  const { mutate: remove } = useRemoveFromFavourites();

  return (
    <>
      {activeTrack && (
        <div className="w-full bg-background flex items-center justify-center">
          <div className="fixed bottom-5 h-20 w-[90%] bg-white/10 backdrop-blur-xl rounded-3xl p-4 border border-white/10 shadow-2xl z-50">
            <div className="absolute -top-4 left-4 right-4">
              <TimelineSlider />
            </div>

            <div className="flex flex-row justify-between items-center ">
              <div className="flex flex-row gap-5 items-center ">
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-lg -mt-1 ">
                  <PlayerImage />
                </div>

                <div>
                  <span
                    onClick={() => router.push(`/tracks/${activeTrack?.id}`)}
                  >
                    <Header className="text-black font-semibold text-sm truncate w-fit">
                      {activeTrack.name}
                    </Header>
                  </span>
                  <p className="text-gray-400 text-xs truncate">
                    {activeTrack.artist}
                  </p>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
                <PlayerControls
                  isFavourite={favouriteIds.has(activeTrack?.id)}
                  addToFavourites={addToFavourites}
                  handleNextTrack={handleNextTrack}
                  handlePrevTrack={handlePrevTrack}
                  isPlaying={isPlaying}
                  removeFromFavourites={removeFromFavourites}
                  togglePlay={togglePlay}
                  isLooped={isLooped}
                  toggleLoop={toggleLoop}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <div className="text-gray-400 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer">
                    <TrackPopover trackId={activeTrack?.id} size={32} />
                  </div>
                  <div className="group">
                    <VolumeAdjuster />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicWidget;
