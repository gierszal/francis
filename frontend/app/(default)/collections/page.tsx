import CollectionList from "@/components/collection/CollectionList";
import GradientText from "@/components/motion/GradientText";
import { FormattedDetailedCollection } from "@/types/collection";

const Collections = () => {
  return (
    <>
      <GradientText
        colors={["#5227FF", "#FF9FFC", "#B497CF"]}
        animationSpeed={8}
        showBorder={false}
        className="text-5xl ml-10 mt-7"
      >
        Collections
      </GradientText>
      <CollectionList collections={formattedCollections} />
    </>
  );
};

export default Collections;

const formattedCollections: FormattedDetailedCollection[] = [
  {
    name: "Summer Vibes 2024",
    id: "col_001",
    albums_amount: 10,
    albums: [
      { id: "alb_001", name: "Beach Party", picture: "/playlists/1.jpg" },
      { id: "alb_002", name: "Poolside Chill", picture: "/playlists/1.jpg" },
      { id: "alb_003", name: "Sunset Groove", picture: "/playlists/1.jpg" },
      { id: "alb_004", name: "Tropical House", picture: "/playlists/1.jpg" },
      { id: "alb_005", name: "Summer Anthem", picture: "/playlists/1.jpg" },
      { id: "alb_006", name: "Beach Bar", picture: "/playlists/1.jpg" },
      { id: "alb_007", name: "Daydream", picture: "/playlists/1.jpg" },
      { id: "alb_008", name: "Coastal Vibes", picture: "/playlists/1.jpg" },
      { id: "alb_009", name: "Sunny Days", picture: "/playlists/1.jpg" },
      { id: "alb_010", name: "Summer Night", picture: "/playlists/1.jpg" },
    ],
    created_at: new Date("2024-06-01T10:00:00Z"),
    updated_at: new Date("2024-06-15T14:30:00Z"),
  },
  {
    name: "Jazz Classics",
    id: "col_002",
    albums_amount: 10,
    albums: [
      { id: "alb_011", name: "Kind of Blue", picture: "/playlists/1.jpg" },
      { id: "alb_012", name: "Take Five", picture: "/playlists/1.jpg" },
      { id: "alb_013", name: "Round Midnight", picture: "/playlists/1.jpg" },
      { id: "alb_014", name: "Blue Train", picture: "/playlists/1.jpg" },
      { id: "alb_015", name: "Moanin'", picture: "/playlists/1.jpg" },
      { id: "alb_016", name: "Giant Steps", picture: "/playlists/1.jpg" },
      {
        id: "alb_017",
        name: "My Favorite Things",
        picture: "/playlists/1.jpg",
      },
      { id: "alb_018", name: "Bitches Brew", picture: "/playlists/1.jpg" },
      { id: "alb_019", name: "A Love Supreme", picture: "/playlists/1.jpg" },
      { id: "alb_020", name: "Time Out", picture: "/playlists/1.jpg" },
    ],
    created_at: new Date("2024-05-10T08:15:00Z"),
    updated_at: new Date("2024-06-20T11:45:00Z"),
  },
  {
    name: "Workout Motivation",
    id: "col_003",
    albums_amount: 10,
    albums: [
      { id: "alb_021", name: "High Intensity", picture: "/playlists/1.jpg" },
      { id: "alb_022", name: "Cardio Blast", picture: "/playlists/1.jpg" },
      { id: "alb_023", name: "Power Lift", picture: "/playlists/1.jpg" },
      { id: "alb_024", name: "Speed Run", picture: "/playlists/1.jpg" },
      { id: "alb_025", name: "Endurance", picture: "/playlists/1.jpg" },
      { id: "alb_026", name: "Stronger", picture: "/playlists/1.jpg" },
      { id: "alb_027", name: "Beast Mode", picture: "/playlists/1.jpg" },
      { id: "alb_028", name: "Pump Up", picture: "/playlists/1.jpg" },
      { id: "alb_029", name: "Victory Lap", picture: "/playlists/1.jpg" },
      { id: "alb_030", name: "Champion", picture: "/playlists/1.jpg" },
    ],
    created_at: new Date("2024-07-01T06:30:00Z"),
    updated_at: new Date("2024-07-05T19:20:00Z"),
  },
  {
    name: "Chill Lofi Beats",
    id: "col_004",
    albums_amount: 10,
    albums: [
      { id: "alb_031", name: "Study Session", picture: "/playlists/1.jpg" },
      { id: "alb_032", name: "Midnight Coffee", picture: "/playlists/1.jpg" },
      { id: "alb_033", name: "Rainy Day", picture: "/playlists/1.jpg" },
      { id: "alb_034", name: "Dreamscape", picture: "/playlists/1.jpg" },
      { id: "alb_035", name: "Night Owl", picture: "/playlists/1.jpg" },
      { id: "alb_036", name: "Soft Vibes", picture: "/playlists/1.jpg" },
      { id: "alb_037", name: "Peaceful", picture: "/playlists/1.jpg" },
      { id: "alb_038", name: "Mellow Mood", picture: "/playlists/1.jpg" },
      { id: "alb_039", name: "Calm Waves", picture: "/playlists/1.jpg" },
      { id: "alb_040", name: "Serenity", picture: "/playlists/1.jpg" },
    ],
    created_at: new Date("2024-04-15T12:00:00Z"),
    updated_at: new Date("2024-06-28T09:10:00Z"),
  },
];
