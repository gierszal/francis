import { usePlayerStore } from "@/providers/StoreProvider";
import Image from "next/image";
import { memo } from "react";
import clsx from "clsx";

interface PlayerImageProps {
  className?: string;
}

const PlayerImage = memo(({ className }: PlayerImageProps) => {
  const activeTrack = usePlayerStore((s) => s.activeTrack);
  return (
    <Image
      src={`/api/${activeTrack?.picture}`}
      alt={"pic"}
      width={800}
      height={800}
      className="rounded-2xl w-full aspect-square object-cover"
    />
  );
});

export default PlayerImage;
