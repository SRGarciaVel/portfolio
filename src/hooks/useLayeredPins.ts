"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LAYERED_QUERY =
  "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/** Stacks each direct `.panel` child of the container: every panel pins at
 *  the top while the next one slides over it, and the page snaps to panel
 *  boundaries. Only runs on desktop with a fine pointer and no reduced
 *  motion; elsewhere the panels just flow normally. Panels must be exactly
 *  one viewport tall (md:h-svh) so the snap positions are uniform. */
export function useLayeredPins(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.matchMedia(LAYERED_QUERY).matches) return;

    const panels = gsap.utils.toArray<HTMLElement>(".panel", container);
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          pin: true,
          pinSpacing: false,
        });
      });

      ScrollTrigger.create({
        snap: {
          snapTo: 1 / (panels.length - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.1,
          ease: "power2.out",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [containerRef]);
}
