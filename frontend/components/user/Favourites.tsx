import { FormattedTrack } from "@/types/track";
import React from "react";
import TrackList from "../track/TrackList";

interface FavouritesProps {
  userId: string;
}

const Favourites = ({ userId }: FavouritesProps) => {
  return <TrackList tracks={formattedTracks} />;
};

export default Favourites;

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
];
