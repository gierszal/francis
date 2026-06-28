"use client";

import React from "react";
import ScrollVelocity from "../motion/ScrollVelocity";
import RevealByLetter from "../motion/RevealByLetter";
import AnimatedDiv from "../motion/AnimatedDiv";
import MusicWidget from "../music/MusicWidget";
import Header from "../ui/Header";
import Link from "next/link";
import { LoadingBoundaryProvider } from "next/dist/client/components/layout-router";

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

const Footer = () => {
  return (
    <>
      <div className="flex flex-col gap-3 bg-background px-10 font-light text-2xl py-10">
        <RevealByLetter>Feedback?</RevealByLetter>
        <RevealByLetter>Questions?</RevealByLetter>
        <RevealByLetter>Thoughts?</RevealByLetter>

        <div className="font-bold text-4xl">
          <div className="flex flex-row gap-2">
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
      <div className="bg-background px-10">
        <div>
          <div className="py-5 flex flex-row justify-center items-center gap-15">
            {languages.map((lang, ind) => (
              <Header key={ind} ariaLabel={lang.ariaLabel}>
                {lang.label}
              </Header>
            ))}
          </div>
          <div className="py-2 flex flex-row justify-center items-center gap-15">
            {additionalPages.map((item, ind) => (
              <Header key={ind}>
                <Link href={item.link} key={ind} aria-label={item.ariaLabel}>
                  {item.label}
                </Link>
              </Header>
            ))}
            {/* <Header>About</Header>
            <Header>Contacts</Header>
            <Header>Project Contribution</Header> */}
          </div>
          <div className="p-5">
            <div className="bg-linear-to-r/oklch from-purple-500 via-sky-500 to-indigo-500 w-full overflow-x-hidden border border-transparent rounded-md">
              <div className="ml-10 flex justify-center items-center py-5 px-10">
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
};

export default Footer;
