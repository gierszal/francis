import RotatingText from "@/components/motion/RotatingText";
import MotionImage from "@/components/motion/MotionImage";
import AnimatedDiv from "@/components/motion/AnimatedDiv";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

const About = async () => {
  const t = await getTranslations("AboutPage");

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
              <h1>{t("weMake")}</h1>
              <RotatingText
                texts={t.raw("rotating1")}
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
                texts={t.raw("rotating2")}
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
              <h1>{t("theReal")}</h1>
              <RotatingText
                texts={t.raw("rotating3")}
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
              {t("description")}
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </div>
  );
};

export default About;
