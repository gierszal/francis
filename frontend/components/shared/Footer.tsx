"use client";

import { memo, useRef } from "react";
import ScrollVelocity from "../motion/ScrollVelocity";
import RevealByLetter from "../motion/RevealByLetter";
import AnimatedDiv from "../motion/AnimatedDiv";
import MusicWidget from "../player/MusicWidget";
import Header from "../ui/Header";
import Link from "next/link";

const additionalPages = [
  { label: "About", ariaLabel: "To about page", link: "/about" },
  { label: "Our Team", ariaLabel: "To our team page", link: "/team" },
  {
    label: "Project Contribution",
    ariaLabel: "To project contribution page",
    link: "/contribution",
  },
];

const languages = [
  { label: "English", ariaLabel: "Switch to English" },
  { label: "Russian", ariaLabel: "Switch to Russian" },
  { label: "French", ariaLabel: "Switch to French" },
];

const Footer = memo(() => {
  const renders = useRef(0);
  renders.current++;
  console.log(renders.current);
  return (
    <>
      <div className="flex flex-col gap-3 bg-background px-4 md:px-10 font-light text-lg md:text-2xl py-6 md:py-10">
        <RevealByLetter>Feedback?</RevealByLetter>
        <RevealByLetter>Questions?</RevealByLetter>
        <RevealByLetter>Thoughts?</RevealByLetter>

        <div className="font-bold text-2xl md:text-4xl">
          <div className="flex flex-row gap-2 items-center">
            <RevealByLetter>Contact with us!</RevealByLetter>
            <AnimatedDiv>
              <span className="relative flex size-3">
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
              <Header key={ind} ariaLabel={lang.ariaLabel}>
                {lang.label}
              </Header>
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
                  texts={[
                    "Developed with love (and lots of coffee)",
                    "Contribute us on GitHub!",
                  ]}
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
