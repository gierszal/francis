import RotatingText from "@/components/motion/RotatingText";
import MotionImage from "@/components/motion/MotionImage";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import Image from "next/image";

const About = () => {
  return (
    <div className="rounded-lg w-full h-full overflow-hidden">
      <div className="relative min-h-screen">
        <Image
          src="/heros/kcd2-re-optimized2.png"
          alt="pic"
          fill
          className="w-full h-full object-cover brightness-70 "
          loading="eager"
        />
        <AnimatedDiv className="absolute inset-0 flex items-center justify-center px-4">
          <div className="flex flex-col w-full items-center justify-center gap-10">
            <div
              className="
    max-w-[90%] md:max-w-[60%]
    bg-black/1 backdrop-blur-xs
    py-8 sm:px-6 md:px-8 md:py-5
    rounded-2xl border border-white/10 shadow-xl
    flex flex-wrap justify-center items-center gap-3 sm:gap-4
    text-white font-sans text-3xl sm:text-4xl md:text-5xl
  "
            >
              <h1>We make</h1>
              <RotatingText
                texts={["kings", "peasants", "lords"]}
                mainClassName="px-2 sm:px-3 md:px-4 bg-purple-500 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg backdrop-blur-sm"
                staggerFrom="random"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.2}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000}
                splitBy="characters"
                auto
                loop
              />
              <RotatingText
                texts={["admire", "esteem", "revere"]}
                mainClassName="px-2 sm:px-3 md:px-4 bg-purple-500 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg backdrop-blur-sm"
                staggerFrom="random"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.2}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000}
                splitBy="characters"
                auto
                loop
              />
              <h1>the real</h1>
              <RotatingText
                texts={["nature spirit", "music", "masterpiece"]}
                mainClassName="px-2 sm:px-3 md:px-4 bg-purple-500 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg backdrop-blur-sm"
                staggerFrom="random"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.2}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={4000}
                splitBy="characters"
                auto
                loop
              />
            </div>
            <div className="font-mono text-white font-semibold text-md border-red-200 w-full md:max-w-[40%] break-normal flex flex-wrap">
              As you may have seen on the home page, this project was developed
              as a final task for SP 2026. This web app is primarily designed
              for listening to music. Any users — whether authorized or not —
              can visit pages and listen to music from various games. Since this
              project is in a test phase, there won't be a large number of games
              or tracks available, but we hope you'll give it a shot and enjoy
              some real music. Thanks for reading, and have a great time!
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </div>
  );
};

export default About;
