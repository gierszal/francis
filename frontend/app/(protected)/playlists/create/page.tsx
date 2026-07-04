"use client";

import CreatePlaylistForm from "@/components/playlist/CreatePlaylistForm";

interface CreatePlaylistProps {
  callbackUrl?: string;
}

const CreatePlaylist = ({ callbackUrl }: CreatePlaylistProps) => {
  return (
    <div>
      <CreatePlaylistForm />
    </div>
  );
};

export default CreatePlaylist;
