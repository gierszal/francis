import { FormattedDetailedTrack, FormattedTrack } from "@/types/track";

const formatDetailedTrack = (track: FormattedDetailedTrack) => {
  const { album, ...formattedTrack } = track;
  return {
    ...formattedTrack,
    picture: album.picture,
    album_id: album.id,
  };
};

export default formatDetailedTrack;
