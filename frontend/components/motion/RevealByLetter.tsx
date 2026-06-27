"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";

const letterVariants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: -20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
  },
};

const transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

interface RevealByLetterProps {
  children: string;
  delayChildren?: number;
}

const RevealByLetter = ({ children, delayChildren }: RevealByLetterProps) => {
  const characters = useMemo(() => children.split(""), [children]);
  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      transition={{ staggerChildren: 0.01, delayChildren: delayChildren || 0 }}
    >
      {characters.map((char, idx) => (
        <motion.span
          key={idx}
          variants={letterVariants}
          transition={transition}
          className={
            char === " "
              ? "inline-block w-[0.3em]"
              : "inline-block" + "break-words"
          }
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default RevealByLetter;
