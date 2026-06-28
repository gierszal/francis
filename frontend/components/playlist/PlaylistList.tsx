import React from "react";
import { FormattedPlaylist } from "@/types/playlist";
import PlaylistItem from "./PlaylistItem";
import Header from "../ui/Header";
import AnimatedDiv from "../motion/AnimatedDiv";

interface PlaylistListProps {
  playlists: FormattedPlaylist[];
}

const PlaylistList = ({ playlists }: PlaylistListProps) => {
  return (
    <>
      <AnimatedDiv className="flex flex-row flex-wrap gap-8 ml-10">
        {playlists?.map((playlist, id) => (
          <PlaylistItem key={id} playlist={playlist} />
        ))}
      </AnimatedDiv>
    </>
  );
};

export default PlaylistList;
