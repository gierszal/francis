import MagicBento from "@/components/motion/Bento";
import GradientText from "@/components/motion/GradientText";

const Games = () => {
  return (
    <>
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        Games
      </GradientText>
      <div className="w-full">
        <MagicBento
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
          cardData={cardData}
        />
      </div>
    </>
  );
};

export default Games;

const cardData = [
  {
    id: "game_001",
    label: "The Witcher 3",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_002",
    label: "Cyberpunk 2077",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_003",
    label: "Red Dead Redemption 2",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_004",
    label: "Elden Ring",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_005",
    label: "Baldur's Gate 3",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_006",
    label: "God of War Ragnarok",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_007",
    label: "The Last of Us Part II",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_008",
    label: "Kingdom Come Deliverance",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_009",
    label: "Hades",
    src: "/playlists/1.jpg",
  },
  {
    id: "game_010",
    label: "Stardew Valley",
    src: "/playlists/1.jpg",
  },
];
