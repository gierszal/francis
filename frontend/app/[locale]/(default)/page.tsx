import Divider from "../../../components/ui/Divider";
import RevealByLetter from "../../../components/motion/RevealByLetter";
import TextCarousel from "../../../components/motion/TextCarousel";
import Video from "../../../components/video/Video";
import MotionImage from "../../../components/motion/MotionImage";
import AnimatedDiv from "../../../components/motion/AnimatedDiv";
import { getTranslations } from "next-intl/server";

const games = [
  "/games/elden_ring.png",
  "/games/elder_scrolls.png",
  "/games/ghost_of_tsushima.png",
  "/games/kcd.png",
  "/games/kcd2.webp",
  "/games/max_payne.png",
  "/games/no_mans_sky.png",
  "/games/sea_of_thieves.png",
  "/games/witcher3.png",
];

export default async function Home() {
  const t = await getTranslations("pages.HomePage");
  const array = [
    t.raw("carousel.row1"),
    t.raw("carousel.row2"),
    t.raw("carousel.row3"),
  ];
  return (
    <>
      <div className=" bg-zinc-50 font-sans bg-background">
        <div className="p-3 flex flex-row items-center bg-background font-mono justify-between text-md">
          <RevealByLetter delayChildren={0.1}>{t("year")}</RevealByLetter>
        </div>
        <div className="bg-background flex flex-row justify-center">
          <div className="mt-12 md:mt-20 text-3xl md:text-5xl text-light-dark font-mono text-center px-4">
            <RevealByLetter>{t("title")}</RevealByLetter>
          </div>
        </div>
        <div className="bg-background flex flex-row justify-center">
          <div className="mt-6 md:mt-10 text-light-dark text-lg md:text-xl px-4 text-center">
            <TextCarousel textArray={array} />
          </div>
        </div>
        <div className="bg-background flex flex-row justify-center items-center ">
          <div className="w-[95%] rounded-lg py-5 px-2 md:px-5">
            <Video path="/0617.mp4" />
          </div>
        </div>
        <div className="bg-background flex">
          <div className="mt-10 ml-4 md:mt-15 md:ml-15 mr-4 md:mr-0 justify-between gap-5 flex flex-col md:flex-row w-full md:w-auto">
            <div className="text-xl md:text-2xl font-light">
              <RevealByLetter>{t("themeTitle")}</RevealByLetter>
            </div>
            <div className="flex md:mr-30 text-xl md:text-3xl w-full md:w-[50%] font-semibold font-mono text-light-dark break-words">
              <AnimatedDiv>{t("themeDescription")}</AnimatedDiv>
            </div>
          </div>
        </div>
        <Divider />
        <div className="bg-background flex flex-row items-center flex-wrap gap-3 md:gap-5 px-4 md:px-6 justify-center">
          {games.map((game, idx) => (
            <MotionImage
              key={idx}
              src={game}
              delay={idx / 2}
              className={
                "transition-all shadow-none bg-transparent duration-500 ease-in-out object-contain grayscale-100 hover:grayscale-0"
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}
