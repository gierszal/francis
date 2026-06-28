import AnimatedDiv from "@/components/motion/AnimatedDiv";
import GradientText from "@/components/motion/GradientText";
import TrackList from "@/components/track/TrackList";
import { FormattedTrack } from "@/types/track";

const Tracks = () => {
  return (
    <>
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        Tracks
      </GradientText>
      <AnimatedDiv className={"ml-10 mt-10"}>
        <TrackList tracks={formattedTracks} />
      </AnimatedDiv>
    </>
  );
};

export default Tracks;

const formattedTracks: FormattedTrack[] = [
  {
    id: "trk_001",
    name: "Pirkstein Atmosphere 7",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/pirkstein-atmosphere-7.mp3",
    tags: ["ambient", "soundtrack", "medieval"],
    listens: 1247,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_001",
  },
  {
    id: "trk_002",
    name: "Pirkstein Nibble 11",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/pirkstein-nibble-11.mp3",
    tags: ["ambient", "soundtrack", "medieval"],
    listens: 856,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_001",
  },
  {
    id: "trk_003",
    name: "Pirkstein Nibble 12",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/pirkstein-nibble-12.mp3",
    tags: ["ambient", "soundtrack", "medieval"],
    listens: 732,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_001",
  },
  {
    id: "trk_004",
    name: "Rattay Atmosphere 9",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/rattay-atmosphere-9.mp3",
    tags: ["ambient", "soundtrack", "medieval"],
    listens: 2103,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_002",
  },
  {
    id: "trk_005",
    name: "Rattay Nibbles 16 and 15",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/rattay-nibbles-16-15.mp3",
    tags: ["ambient", "soundtrack", "medieval"],
    listens: 1567,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_002",
  },
  {
    id: "trk_006",
    name: "River Sasau Atmosphere 12",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/river-sasau-atmosphere-12.mp3",
    tags: ["ambient", "soundtrack", "medieval"],
    listens: 943,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_003",
  },
  {
    id: "trk_007",
    name: "River Sasau Atmosphere 13",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/river-sasau-atmosphere-13.mp3",
    tags: ["ambient", "soundtrack", "medieval"],
    listens: 687,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_003",
  },
  {
    id: "trk_008",
    name: "River Sasau Atmosphere 14",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/river-sasau-atmosphere-14.mp3",
    tags: ["ambient", "soundtrack", "medieval"],
    listens: 1124,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_003",
  },
  {
    id: "trk_009",
    name: "Kingdom Come Ambient 1",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/kingdom-come-ambient-1.mp3",
    tags: ["ambient", "soundtrack", "medieval", "orchestral"],
    listens: 1892,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_004",
  },
  {
    id: "trk_010",
    name: "Kingdom Come Ambient 2",
    artist: "Kingdom Come: Deliverance",
    audio: "/audio/kingdom-come-ambient-2.mp3",
    tags: ["ambient", "soundtrack", "medieval", "orchestral"],
    listens: 1456,
    picture: "/misc/towns.webp",
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
    album_id: "alb_004",
  },
];
