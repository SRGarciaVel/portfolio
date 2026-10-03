"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { setActiveSlide } from "@/hooks/useActiveSlide";
import { useSlideSnap } from "@/hooks/useSlideSnap";

export default function LayeredStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useSlideSnap(ref);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const slide = (entry.target.parentElement as HTMLElement | null)?.dataset.slide;
          if (slide !== undefined) setActiveSlide(Number(slide));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    container.querySelectorAll(".panel").forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
