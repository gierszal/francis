"use client";

import {
  useGetPlaylist,
  useGetPlaylists,
} from "@/hooks/modules/playlist/usePlaylist";
import {
  useAddTrackToPlaylist,
  useRemoveTrackFromPlaylist,
} from "@/hooks/modules/track/useTrack";
import { FormattedDetailedPlaylist, FormattedPlaylist } from "@/types/playlist";
import { useQueryClient } from "@tanstack/react-query";
import { Button, notification, Space } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { BsCheck2 } from "react-icons/bs";

interface PopoverPlaylistsProps {
  trackId: string;
}
const PopoverPlaylists = ({ trackId }: PopoverPlaylistsProps) => {
  const [api, contextHolder] = notification.useNotification();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [playlistId, setPlaylistId] = useState<string>("");
  const router = useRouter();
  const { data } = useGetPlaylists();
  const { data: playlistData } = useGetPlaylist(playlistId, isEnabled);
  const playlists = data?.items?.data;

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const actions = (
      <Space>
        <Button
          type="link"
          size="small"
          onClick={() => {
            notification.destroy();
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            remove({ trackId, playlistId });
            notification.destroy(key);
          }}
        >
          Remove
        </Button>
      </Space>
    );
    notification.warning({
      key,
      title: "Track already exists",
      description:
        "This track is already in the playlist. Do you want to remove it?",
      actions,
      duration: 0,
    });
  };

  const isTrackInPlaylist = (playlist: FormattedDetailedPlaylist) => {
    return playlist?.tracks?.some((track: any) => track.id === trackId);
  };

  const handleClick = (playlistId: string) => {
    setPlaylistId(playlistId);
    setIsEnabled(true);
  };

  const addToPlaylist = (playlist: FormattedDetailedPlaylist) => {
    if (isTrackInPlaylist(playlist)) {
      openNotification();
    } else add({ trackId, playlistId });
  };

  useEffect(() => {
    if (playlistId && playlistData) {
      addToPlaylist(playlistData.data?.data);
      setPlaylistId("");
      setIsEnabled(false);
    }
  }, [playlistData, playlistId, isEnabled]);

  const { mutate: add } = useAddTrackToPlaylist();
  const { mutate: remove } = useRemoveTrackFromPlaylist();

  return (
    <div className="flex flex-col gap-2 bg-white/60 backdrop-blur-xl rounded-lg mb-10 mt-10 p-2">
      <div className="w-full px-5 text-base flex flex-col gap-2 items-center py-1 cursor-pointer">
        <div className="flex flex-row gap-2 items-center w-full hover:bg-white/20 rounded-lg px-3 py-2 transition-colors">
          <BsPlusCircle size={15} />
          <h1
            className="cursor-pointer"
            onClick={() => router.push("/playlists/create?callbackUrl=/tracks")}
          >
            Create playlist
          </h1>
        </div>

        <div className="border-t w-full border-gray-300" />

        <div className="flex flex-col gap-2 max-h-[200px] w-full overflow-y-auto rounded-lg pr-1">
          {playlists?.length ? (
            playlists.map(
              (playlist: FormattedDetailedPlaylist, idx: number) => (
                <div
                  onClick={() => handleClick(playlist.id)}
                  key={playlist.id || idx}
                  className="px-3 py-2 hover:bg-white/20 rounded-lg transition-colors cursor-pointer flex flex-row justify-between"
                >
                  <h1>{playlist.name || `Playlist ${idx + 1}`}</h1>
                  {/* {isTrackInPlaylist(playlist) && <BsCheck2 size={24} />} */}
                </div>
              ),
            )
          ) : (
            <div className="text-center text-gray-500 py-4">
              No playlists yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopoverPlaylists;
