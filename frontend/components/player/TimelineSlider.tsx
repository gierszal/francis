import { usePlayerStore } from "@/providers/StoreProvider";
import { timeFormatter } from "@/utils/formatters/timeFormatter";
import { Slider } from "antd";
import { memo } from "react";

const TimelineSlider = memo(() => {
  const currentTime = usePlayerStore((s) => s.currentTime);
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);
  const duration = usePlayerStore((s) => s.duration);
  return (
    <Slider
      tooltip={{
        formatter: timeFormatter,
      }}
      styles={{
        track: {
          background: "linear-gradient(to right, #c084fc, #f472b6)",
        },
        rail: { background: "#d9d9d9" },
      }}
      value={currentTime}
      onChange={(e) => setCurrentTime(e)}
      className="w-[99%] hover:bg-purple-300/20 transition-colors rounded-lg z-50"
      max={duration}
    />
  );
});

export default TimelineSlider;
