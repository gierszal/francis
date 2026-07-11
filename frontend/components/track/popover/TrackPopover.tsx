import { memo } from "react";
import { Popover } from "antd";
import { BsThreeDots } from "react-icons/bs";
import { BsMusicNote } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import PopoverPlaylists from "./PopoverPlaylists";

interface TrackPopoverProps {
  size?: number;
  trackId: string;
}

const TrackPopover = memo(({ size, trackId }: TrackPopoverProps) => {
  const content = () => (
    <div className="flex flex-col gap-2 bg-white/60 backdrop-blur-xl rounded-lg">
      <div className="w-full px-5 text-base flex flex-row gap-2 items-center py-1 cursor-pointer">
        <Popover
          placement="left"
          content={<PopoverPlaylists trackId={trackId} />}
          trigger="click"
          styles={{
            container: {
              backgroundColor: "transparent",
              padding: 0,
              boxShadow: "none",
            },
          }}
        >
          <div className="flex flex-row gap-2 items-center">
            <BsMusicNote size={12} />
            <p>Add to playlist</p>
            <BsChevronRight size={14} className="mr-auto" />
          </div>
        </Popover>
      </div>
    </div>
  );
  return (
    <Popover
      content={content}
      trigger="click"
      styles={{
        container: {
          backgroundColor: "transparent",
          padding: 0,
          boxShadow: "none",
        },
      }}
    >
      <BsThreeDots size={size ?? 18} className="cursor-pointer" />
    </Popover>
  );
});

export default TrackPopover;
