"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

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
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(" ");
  const Tag = as;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const spans = Array.from(el.children) as HTMLElement[];

    const tween = gsap.fromTo(
      spans,
      { filter: "blur(10px)", opacity: 0, y: 30 },
      {
        filter: "blur(0px)",
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: wordDelay,
        delay,
      }
    );

    return () => {
      tween.kill();
    };
  }, [text, delay, wordDelay]);

  return (
    <Tag
      ref={containerRef as React.Ref<never>}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align,
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          style={{
            display: "inline-block",
            marginRight: "0.28em",
            color: colorOverrides[i] ?? defaultColor,
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}
