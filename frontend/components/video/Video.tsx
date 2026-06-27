interface VideoProps {
  path: string;
}
const Video = ({ path }: VideoProps) => {
  return (
    <video
      src={path}
      className="bg-background w-full rounded-md"
      muted
      autoPlay
      loop
    />
  );
};

export default Video;
