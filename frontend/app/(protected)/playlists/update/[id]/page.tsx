"use client";

import UpdatePlaylistForm from "@/components/playlist/UpdatePlaylistForm";
import RoundedButton from "@/components/ui/RoundedButton";
import { useGetPlaylist } from "@/hooks/modules/playlist/usePlaylist";
// import UpdatePlaylistForm from "@/components/user/UpdatePlaylistForm";
import { useGetUser } from "@/hooks/modules/user/useUser";
import { useParams, useRouter } from "next/navigation";

const UpdatePlaylist = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const router = useRouter();

  const { data } = useGetPlaylist(id);

  const playlist = data?.data?.data ?? data;

  console.log(playlist);

  return (
    <div className="mt-10 ml-10">
      <RoundedButton className="text-lg" onClick={() => router.back()}>
        Go back
      </RoundedButton>
      <div>
        <UpdatePlaylistForm playlist={playlist} />
      </div>
    </div>
  );
};

export default UpdatePlaylist;
