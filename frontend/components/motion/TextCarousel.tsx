"use client";
import { AnimatePresence, motion } from "framer-motion";
import RevealByLetter from "./RevealByLetter";
import { useEffect, useState } from "react";

interface TextCarouselProps {
  textArray: string[][];
  delayChilden?: number;
  staggerChildren?: number;
}

const wordVariants = {
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

const TextCarousel = ({ textArray }: TextCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === textArray.length - 1 ? 0 : ++prev));
    }, 3000);
  }, [currentIndex]);

  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex}>
          {textArray[currentIndex].map((row, rowIdx) => (
            <motion.span
              key={rowIdx}
              variants={wordVariants}
              className="p-2"
              transition={transition}
              exit="hidden"
            >
              {<RevealByLetter>{row}</RevealByLetter>}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.h1>
  );
};

export default TextCarousel;
