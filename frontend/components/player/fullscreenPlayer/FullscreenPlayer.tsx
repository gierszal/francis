// "use client";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
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
import FullscreenPlayerControls from "./FullscreenPlayerControls";
import { FaChevronDown } from "react-icons/fa";
import { useRequireActivated } from "@/hooks/modules/auth/useRequireActivated";

interface FullscreenPlayer {
  onClose: Dispatch<SetStateAction<boolean>>;
}
const FullscreenPlayer = ({ onClose }: FullscreenPlayer) => {
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
  const { requireActivated } = useRequireActivated();
  const router = useRouter();

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
    requireActivated(() => add({ trackId: activeTrack.id }));
  }, [activeTrack]);

  const removeFromFavourites = useCallback(() => {
    if (!activeTrack) return;
    requireActivated(() => remove({ trackId: activeTrack.id }));
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xl overflow-hidden flex items-center justify-center z-51">
          <div
            onClick={() => onClose(false)}
            className="absolute inset-0 left-1/2 -translate-x-1/2 mt-5 hover:text-purple-300 transition-colors  active:scale-105 cursor-pointer  w-fit h-fit rounded-full p-2 bg-gray-400/60"
          >
            <FaChevronDown size={28} />
          </div>
          <div className="flex justify-center items-center w-[35%] h-[35%]">
            <div className="rounded-lg mb-40">
              <div className="w-84 h-84 relative">
                <div className="w-full h-full">
                  <PlayerImage className="rounded-2xl w-full aspect-square object-cover" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FullscreenPlayerControls
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
              </div>
              <div className="mt-5 flex flex-col justify-center items-center gap-2">
                <span onClick={() => router.push(`/tracks/${activeTrack?.id}`)}>
                  <Header className="text-2xl">{activeTrack?.name}</Header>
                </span>
                <Header className="text-gray-400">{activeTrack?.artist}</Header>
                <div className="w-full">
                  <TimelineSlider />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FullscreenPlayer;
