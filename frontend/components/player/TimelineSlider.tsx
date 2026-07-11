import { useListenIncrement } from "@/hooks/modules/track/useTrack";
import { useAddToHistory, useGetUser } from "@/hooks/modules/user/useUser";
import { usePlayerStore } from "@/providers/StoreProvider";
import { timeFormatter } from "@/utils/formatters/timeFormatter";
import { Slider } from "antd";
import { memo, useEffect, useRef } from "react";

const TimelineSlider = memo(() => {
  const currentTrack = usePlayerStore((s) => s.activeTrack);
  const currentTime = usePlayerStore((s) => s.currentTime);
  const setCurrentTime = usePlayerStore((s) => s.setCurrentTime);
  const duration = usePlayerStore((s) => s.duration);
  const { data: userData } = useGetUser();
  const { mutate: increment } = useListenIncrement();
  const { mutate: addToHistory } = useAddToHistory();
  const isListensIncremented = useRef<boolean>(false);
  const ref = useRef(0);

  const user = userData?.data?.data;

  useEffect(() => {
    isListensIncremented.current = false;
  }, [currentTrack?.id]);

  useEffect(() => {
    if (!user) return;
    if (!currentTrack) return;
    if (isListensIncremented.current) return;
    if (!duration) return;
    if (currentTime < duration * 0.1) return;

    isListensIncremented.current = true;
    increment({ id: currentTrack.id });
    addToHistory({ trackId: currentTrack.id });
  }, [user, currentTrack?.id, currentTime, duration]);

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
