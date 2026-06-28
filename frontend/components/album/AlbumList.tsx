import React from "react";
import { FormattedAlbum } from "@/types/album";
import AlbumItem from "./AlbumItem";
import Header from "../ui/Header";
import AnimatedDiv from "../motion/AnimatedDiv";

interface AlbumListProps {
  albums: FormattedAlbum[];
}

const AlbumList = ({ albums }: AlbumListProps) => {
  return (
    <>
      <AnimatedDiv className="flex flex-row flex-wrap gap-8 ml-10">
        {albums?.map((album, id) => (
          <AlbumItem key={id} album={album} />
        ))}
      </AnimatedDiv>
    </>
  );
};

export default AlbumList;
