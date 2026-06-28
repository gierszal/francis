"use client";
import { FormattedTrack } from "@/types/track";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsHeart,
  BsHeartFill,
} from "react-icons/bs";
import Header from "../ui/Header";

//  "flex flex-row justify-between list-row bg-gray-" +
//         (idx % 2 ? "100" : "300")

interface TrackItemProps {
  track: FormattedTrack;
  idx: number;
}

const TrackItem = ({ track, idx }: TrackItemProps) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const togglePlay = () => {
    setIsActive((prev) => !prev);
  };

  const handleFavourite = () => {
    setIsFavourite((prev) => !prev);
  };

  return (
    <li
      className={`group font-sans flex items-center gap-4 p-3 rounded-xl transition-all duration-200 border border-gray-200 hover:border-violet-300 hover:shadow-md  ${
        idx % 2 === 0 ? "bg-zinc-200" : "bg-zinc-300"
      }`}
    >
      <div className="relative flex-shrink-0 cursor-pointer">
        <Image
          width={56}
          height={56}
          className="size-14 rounded-lg object-cover shadow-lg"
          src={track.picture}
          alt={track.name}
        />
        <div className="absolute text-white -top-1 -right-1 size-5 rounded-full bg-black/80  flex items-center justify-center text-[10px] font-bold">
          {idx + 1}
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
          <span>{track.listens?.toLocaleString()} plays</span>
          {track.tags && <span>• {track.tags.slice(0, 2).join(", ")}</span>}
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <button
          className="text-gray-400 hover:text-red-400 transition-colors ml-1 p-1 active:scale-105 cursor-pointer"
          onClick={handleFavourite}
        >
          {isFavourite ? (
            <BsHeartFill color="red" size={18} />
          ) : (
            <BsHeart size={18} />
          )}
        </button>
        <button
          onClick={togglePlay}
          className="size-10 rounded-full cursor-pointer flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          {isActive ? (
            <BsFillPauseFill size={20} className="text-primary" />
          ) : (
            <BsFillPlayFill size={20} className="text-primary" />
          )}
        </button>
      </div>
    </li>
  );
};

export default TrackItem;
