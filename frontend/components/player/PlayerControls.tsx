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

interface PlayerControlsProps {
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
const PlayerControls = memo(
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
  }: PlayerControlsProps) => {
    return (
      <>
        <button
          className="text-gray-400 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer"
          onClick={toggleLoop}
        >
          {isLooped ? <BsRepeat1 size={28} /> : <BsRepeat size={28} />}
        </button>
        <button className="text-gray-400 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer">
          <BsFillSkipStartFill size={32} onClick={handlePrevTrack} />
        </button>

        <button
          className="text-gray-500 bg-gray-300/80 rounded-full hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer"
          onClick={togglePlay}
        >
          {isPlaying ? (
            <BsFillPauseFill size={32} />
          ) : (
            <BsFillPlayFill size={32} />
          )}
        </button>
        <button className="text-gray-400 hover:text-purple-300 transition-colors p-1 active:scale-105 cursor-pointer">
          <BsFillSkipEndFill size={32} onClick={handleNextTrack} />
        </button>
        <button className="text-gray-400 hover:text-red-400 transition-colors ml-1 p-1 active:scale-105 cursor-pointer">
          {isFavourite ? (
            <BsHeartFill color="red" size={24} onClick={removeFromFavourites} />
          ) : (
            <BsHeart size={24} onClick={addToFavourites} />
          )}
        </button>
      </>
    );
  },
);

export default PlayerControls;
