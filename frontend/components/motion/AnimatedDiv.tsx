"use client";
import { motion } from "framer-motion";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
}

const transition = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01] as const,
};

const AnimatedDiv = ({ children, className }: AnimatedDivProps) => {
  return (
    <motion.div
      className={className}
      transition={transition}
      initial={{ opacity: 0, y: -25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
