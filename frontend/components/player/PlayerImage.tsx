import { usePlayerStore } from "@/providers/StoreProvider";
import Image from "next/image";
import { memo } from "react";
import clsx from "clsx";

interface PlayerImageProps {
  className?: string;
  fill?: boolean;
}

const PlayerImage = memo(({ className, fill = false }: PlayerImageProps) => {
  const activeTrack = usePlayerStore((s) => s.activeTrack);
  if (fill)
    return (
      <Image
        fill={fill}
        className={clsx("w-full h-full object-cover", className)}
        // src={`/api/${activeTrack?.picture}`}
        src={"/heros/kcd2-re-optimized2.png"}
        alt={activeTrack?.name ?? "pic"}
      />
    );
  return (
    <Image
      width={1920}
      height={1080}
      className={clsx("w-full h-full object-cover", className)}
      // src={`/api/${activeTrack?.picture}`}
      src={"/heros/kcd2-re-optimized2.png"}
      alt={activeTrack?.name ?? "pic"}
    />
  );
});

export default PlayerImage;
