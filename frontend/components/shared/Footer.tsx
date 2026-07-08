"use client";

import { memo, useRef } from "react";
import ScrollVelocity from "../motion/ScrollVelocity";
import RevealByLetter from "../motion/RevealByLetter";
import AnimatedDiv from "../motion/AnimatedDiv";
import MusicWidget from "../player/MusicWidget";
import Header from "../ui/Header";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";

const Footer = memo(() => {
  const t = useTranslations("components.Footer");
  const path = usePathname();
  const router = useRouter();

  const additionalPages = [
    { label: t("aboutLabel"), ariaLabel: t("aboutAria"), link: "/about" },
    { label: t("teamLabel"), ariaLabel: t("teamAria"), link: "/team" },
    {
      label: t("contributionLabel"),
      ariaLabel: t("contributionAria"),
      link: "/contribution",
    },
  ];

  const languages = [
    {
      label: t("englishLabel"),
      ariaLabel: t("englishAria"),
      locale: t("englishLocale"),
    },
    {
      label: t("russianLabel"),
      ariaLabel: t("russianAria"),
      locale: t("russianLocale"),
    },
    {
      label: t("frenchLabel"),
      ariaLabel: t("frenchAria"),
      locale: t("frenchLocale"),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-3 bg-background px-4 md:px-10 font-light text-lg md:text-2xl py-6 md:py-10">
        <RevealByLetter>{t("feedback")}</RevealByLetter>
        <RevealByLetter>{t("questions")}</RevealByLetter>
        <RevealByLetter>{t("thoughts")}</RevealByLetter>

        <div className="font-bold text-2xl md:text-4xl">
          <div className="flex flex-row gap-2 items-center">
            <RevealByLetter>{t("contactUs")}</RevealByLetter>
            <AnimatedDiv>
              <span className="relative mb-5 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
              </span>
            </AnimatedDiv>
          </div>
        </div>
      </div>
      <MusicWidget />
      <div className="bg-background px-4 md:px-10">
        <div>
          <div className="py-5 flex flex-row flex-wrap justify-center items-center gap-6 md:gap-15">
            {languages.map((lang, ind) => (
              <div
                onClick={() => router.replace(path, { locale: lang.locale })}
              >
                <Header key={ind}>{lang.label}</Header>
              </div>
            ))}
          </div>
          <div className="py-2 flex flex-row flex-wrap justify-center items-center gap-6 md:gap-15">
            {additionalPages.map((item, ind) => (
              <Header key={ind}>
                <Link href={item.link} aria-label={item.ariaLabel}>
                  {item.label}
                </Link>
              </Header>
            ))}
          </div>
          <div className="p-3 md:p-5">
            <div className="bg-linear-to-r/oklch from-purple-500 via-sky-500 to-indigo-500 w-full overflow-x-hidden border border-transparent rounded-md">
              <div className="ml-0 md:ml-10 flex justify-center items-center py-4 md:py-5 px-4 md:px-10">
                <ScrollVelocity
                  velocity={70}
                  texts={[t("scrollDeveloped"), t("scrollContribute")]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Footer;
