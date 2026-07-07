import { memo, useRef } from "react";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsHeart,
  BsHeartFill,
  BsRepeat,
  BsRepeat1,
} from "react-icons/bs";

interface FullscreenPlayerControlsProps {
  isPlaying: boolean;
  isLooped: boolean;
  togglePlay: () => void;
  handlePrevTrack: () => void;
  handleNextTrack: () => void;
  isFavourite: boolean;
  removeFromFavourites: () => void;
  addToFavourites: () => void;
  toggleLoop: () => void;
}
const FullscreenPlayerControls = memo(
  ({
    addToFavourites,
    handleNextTrack,
    handlePrevTrack,
    isFavourite,
    isPlaying,
    removeFromFavourites,
    togglePlay,
    isLooped,
    toggleLoop,
  }: FullscreenPlayerControlsProps) => {
    return (
      <>
        <div className="absolute inset-0 flex flex-col items-center w-full h-full rounded-xl opacity-0 hover:opacity-100 hover:bg-black/50 duration-300 p-3">
          <div className="flex flex-row gap-5 flex-1 mt-5 items-center justify-center">
            <button className="text-gray-400/90 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer">
              <BsFillSkipStartFill size={48} onClick={handlePrevTrack} />
            </button>

            <button
              className="text-gray-600 bg-gray-300/80 rounded-full hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <BsFillPauseFill size={46} />
              ) : (
                <BsFillPlayFill size={46} />
              )}
            </button>

            <button className="text-gray-400/90 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer">
              <BsFillSkipEndFill size={48} onClick={handleNextTrack} />
            </button>
          </div>

          <div className="flex flex-row items-center justify-between w-full mt-auto">
            <button
              className="text-gray-400 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer"
              onClick={toggleLoop}
            >
              {isLooped ? <BsRepeat1 size={28} /> : <BsRepeat size={28} />}
            </button>
            <button className="text-gray-400 hover:text-red-400 transition-colors ml-1 p-1 active:scale-105 cursor-pointer">
              {isFavourite ? (
                <BsHeartFill
                  color="red"
                  size={28}
                  onClick={removeFromFavourites}
                />
              ) : (
                <BsHeart size={28} onClick={addToFavourites} />
              )}
            </button>
          </div>
        </div>
      </>
    );
  },
);

export default FullscreenPlayerControls;
