"use client";

import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
  as?: "h1" | "h2" | "p" | "span";
  colorOverrides?: Record<number, string>;
  defaultColor?: string;
  align?: "center" | "flex-start" | "flex-end";
}

const wordVariants = {
  hidden: { filter: "blur(10px)", opacity: 0, y: 30 },
  visible: {
    filter: ["blur(10px)", "blur(4px)", "blur(0px)"],
    opacity: [0, 0.6, 1],
    y: [30, -4, 0],
  },
};

export default function BlurText({
  text,
  className = "",
  delay = 0,
  wordDelay = 0.09,
  as = "span",
  colorOverrides = {},
  defaultColor,
  align = "center",
}: BlurTextProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align,
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial="hidden"
          animate="visible"
          variants={wordVariants}
          transition={{
            duration: 0.7,
            times: [0, 0.5, 1],
            ease: "easeOut",
            delay: delay + i * wordDelay,
          }}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            color: colorOverrides[i] ?? defaultColor,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}