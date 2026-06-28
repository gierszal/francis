"use client";

import { FormattedDetailedCollection } from "@/types/collection";
import { useRouter } from "next/navigation";
import { VscChevronRight } from "react-icons/vsc";
import AlbumItem from "../album/AlbumItem";
import Header from "../ui/Header";

interface CollectionItemProps {
  collection: FormattedDetailedCollection;
}

const CollectionItem = ({ collection }: CollectionItemProps) => {
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => router.push(`/collections/${collection.id}`)}
        style={{ cursor: "pointer" }}
      >
        <div className={"flex flex-row mt-10 w-[195.39px]"}>
          <Header className={"text-lg font-bold px-1"}>
            {collection.name}
          </Header>
          <VscChevronRight size={25} />
        </div>
      </div>
      <div
        className={"flex overflow-x-auto whitespace-nowrap mt-2.5 gap-5 py-2"}
      >
        {collection.albums.map((album, idx) => (
          <AlbumItem album={album} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default CollectionItem;
