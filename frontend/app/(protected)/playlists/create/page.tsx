"use client";

import GradientText from "@/components/motion/GradientText";
import CreatePlaylistForm from "@/components/playlist/CreatePlaylistForm";

interface CreatePlaylistProps {
  callbackUrl?: string;
}

const CreatePlaylist = ({ callbackUrl }: CreatePlaylistProps) => {
  return (
    <div className="mt-15 gap-7 px-4 flex flex-col items-center">
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10"
      >
        Create Playlist
      </GradientText>
      <CreatePlaylistForm />
    </div>
  );
};

export default CreatePlaylist;
