"use client";
import { FormattedDetailedTrack } from "@/types/track";
import GradientText from "@/components/motion/GradientText";
import Image from "next/image";
import formatDetailedTrack from "@/utils/formatters/formatDetailedTrackToFormatted";
import TrackItem from "@/components/track/TrackItem";
import AlbumList from "@/components/album/AlbumList";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import { useGetTrack } from "@/hooks/modules/track/useTrack";
import { Skeleton } from "antd";
import { useParams } from "next/navigation";

const TrackPage = () => {
  const params = useParams<{ id: string }>();

  const { data, isLoading, isError, error } = useGetTrack(
    params.id?.toString(),
  );

  if (isLoading)
    return (
      <div className={"mt-10 ml-10 w-[90%]"}>
        <Skeleton />
      </div>
    );
  if (isError)
    return <div className="p-5 text-5xl">Error: {error?.message}</div>;

  const track = data?.data.data;

  const formattedTrack = formatDetailedTrack(track);

  return (
    <AnimatedDiv className="ml-10 mt-10 flex flex-col items-start font-sans">
      <div className="flex flex-row gap-5">
        <Image
          // src={track.album.picture}
          src={`/api/image/aff9e97a-fdc8-44e2-b026-cea911c36638.jpg`}
          alt={"pic"}
          width={250}
          height={250}
          className="rounded-2xl"
        />
        <div className="w-full flex flex-col gap-2 mt-10 items-start">
          <div className="relative">
            <GradientText className=" text-5xl">{track.name}</GradientText>
          </div>
          <div className="flex flex-row gap-2 text-lg font-medium">
            <span>{track.artist} • </span>
            <span>{track.album.name} • </span>
            <span>{new Date(track.updated_at).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-row gap-2">
            {track.tags && (
              <span className="text-zinc-500">
                • {track.tags.slice(0, 2).join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="w-[98%] mt-20">
        <TrackItem track={formattedTrack} idx={0} />
      </div>
      <div className="mt-7 text-zinc-500">
        <span>Listens: {track.listens}</span>
      </div>
      <div className="mt-10">
        <div className="flex flex-col gap-5 items-start">
          <h1 className="text-4xl">Occurs in...</h1>
          <div className="w-full">
            <AlbumList albums={[track.album]} />
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
};

export default TrackPage;

// const track: FormattedDetailedTrack = {
//   name: "Midnight Echoes",
//   id: "trk_7f8h3jd92k1",
//   artist: "Luna Wavefield",
//   audio: "https://cdn.musicapp.com/audio/midnight-echoes.mp3",
//   tags: ["ambient", "electronic", "chill", "night"],
//   listens: 2847,
//   created_at: new Date("2025-11-15T14:32:00.000Z"),
//   updated_at: new Date("2026-02-28T09:17:23.000Z"),
//   album: {
//     id: "alb_x9k4m2p8n1",
//     name: "Nocturnal Dreams",
//     game: {
//       id: "game_3r7t9v2w5x",
//       name: "Stellar Drift",
//       created_at: new Date("2024-07-01T10:00:00.000Z"),
//       updated_at: new Date("2025-12-10T16:45:30.000Z"),
//     },
//     picture: "/misc/towns.webp",
//   },
// };
