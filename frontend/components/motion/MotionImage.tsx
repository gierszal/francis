"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { memo } from "react";

interface MotionImageProps {
  src: string;
  delay?: number;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  load?: "eager" | "lazy" | undefined;
}

const MotionImage = memo(
  ({ src, delay, width, height, className, alt, load }: MotionImageProps) => {
    const transition = {
      duration: 0.8,
      delay: delay ?? 0.5,
      ease: [0, 0.71, 0.2, 1.01] as const,
    };
    return (
      <motion.div
        transition={transition}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Image
          src={src}
          width={width ?? 150}
          height={height ?? 150}
          alt={alt ?? "pic"}
          className={className}
          loading={load}

          // className=""
        />
      </motion.div>
    );
  },
);

export default MotionImage;
