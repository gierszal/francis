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

interface MobilePlayerControlsProps {
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
const MobilePlayerControls = memo(
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
  }: MobilePlayerControlsProps) => {
    return (
      <>
        <div className="flex flex-col items-center w-full h-full rounded-xl p-3">
          <div className="flex flex-row gap-5 flex-1 mt-5 items-center justify-center">
            <button
              className="text-gray-400 p-1 active:scale-105 cursor-pointer"
              onClick={toggleLoop}
            >
              {isLooped ? <BsRepeat1 size={28} /> : <BsRepeat size={28} />}
            </button>
            <button className="text-gray-400/90 p-1 active:scale-105 cursor-pointer">
              <BsFillSkipStartFill size={48} onClick={handlePrevTrack} />
            </button>

            <button
              className="text-gray-600 bg-gray-300/80 rounded-full p-1 active:scale-105 cursor-pointer"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <BsFillPauseFill size={46} />
              ) : (
                <BsFillPlayFill size={46} />
              )}
            </button>

            <button className="text-gray-400/90 p-1 active:scale-105 cursor-pointer">
              <BsFillSkipEndFill size={48} onClick={handleNextTrack} />
            </button>

            <button className="text-gray-400 ml-1 p-1 active:scale-105 cursor-pointer">
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

export default MobilePlayerControls;
