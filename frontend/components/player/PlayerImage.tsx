import { usePlayerStore } from "@/providers/StoreProvider";
import Image from "next/image";
import { memo } from "react";

const PlayerImage = memo(() => {
  const activeTrack = usePlayerStore((s) => s.activeTrack);
  return (
    <Image
      width={1920}
      height={1080}
      className="w-full h-full object-cover"
      src={`/api/${activeTrack?.picture}`}
      alt={activeTrack?.name ?? "pic"}
    />
  );
});

export default PlayerImage;
