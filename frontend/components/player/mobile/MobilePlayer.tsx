// "use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePlayerStore } from "@/providers/StoreProvider";
import {
  useAddToFavourites,
  useGetUser,
  useGetUserFavourites,
  useRemoveFromFavourites,
} from "@/hooks/modules/user/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "../../ui/Header";
import { FormattedTrack } from "@/types/track";
import PlayerImage from "../PlayerImage";
import TimelineSlider from "../TimelineSlider";
import FullscreenPlayerControls from "../fullscreenPlayer/FullscreenPlayerControls";
import { FaChevronDown } from "react-icons/fa";
import MobilePlayerControls from "./MobilePlayerControls";

interface MobilePlayerProps {
  onClose: Dispatch<SetStateAction<boolean>>;
}
const MobilePlayer = ({ onClose }: MobilePlayerProps) => {
  const { data: userData } = useGetUser();
  const user = userData?.data?.data;

  const activeTrack = usePlayerStore((s) => s.activeTrack);
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

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
    };
  }, []);

  const { mutate: add } = useAddToFavourites();
  const { mutate: remove } = useRemoveFromFavourites();

  return (
    <>
      {activeTrack && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex flex-col justify-between items-center p-6 z-50">
          <div className="w-full flex justify-start">
            <div
              onClick={() => onClose(false)}
              className="active:scale-105 cursor-pointer rounded-full p-2 bg-gray-400/60 transition-transform"
            >
              <FaChevronDown size={28} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 max-w-sm w-full">
            <div className="w-84 h-84 relative">
              <PlayerImage className="rounded-xl w-full h-full object-cover" />

              <MobilePlayerControls
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

            <div className="mt-6 flex flex-col items-start gap-2 w-full text-center">
              <Header className="text-2xl text-white font-semibold">
                {activeTrack?.name}
              </Header>
              <Header className="text-gray-400">{activeTrack?.artist}</Header>
              <div className="w-full mt-2">
                <TimelineSlider />
              </div>
            </div>
          </div>

          {/* Пустой блок снизу для идеальной центровки контента */}
          <div className="h-10 opacity-0 pointer-events-none" />
        </div>
      )}
    </>
  );
};

export default MobilePlayer;
