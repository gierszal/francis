import { usePlayerStore } from "@/providers/StoreProvider";
import { Slider } from "antd";
import { memo } from "react";
import { BsVolumeDown } from "react-icons/bs";

const VolumeAdjuster = memo(() => {
  const volume = usePlayerStore((s) => s.volume);
  const setVolume = usePlayerStore((s) => s.setVolume);
  return (
    <>
      <div className="fixed bottom-16 rounded-2xl mb-[-10] ml-[-4]  bg-zinc-700/80 hidden group-hover:block">
        <div className="flex ml-2 flex-col border-red-500 h-40 w-10 ">
          <Slider
            tooltip={{
              open: false,
            }}
            vertical
            value={volume}
            onChange={(e) => setVolume(e)}
          />
        </div>
      </div>
      <button className="text-gray-400 hover:text-white transition-colors p-1">
        <BsVolumeDown size={36} />
      </button>
    </>
  );
});

export default VolumeAdjuster;
