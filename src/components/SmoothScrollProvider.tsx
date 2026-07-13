"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const [smootherActive, setSmootherActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Touch devices (phones/tablets) get native scroll instead of
    // ScrollSmoother. Virtualized smoothing on touch competes with the
    // browser's own momentum scroll and is a common source of jank on
    // mid-range Android hardware and non-Chrome mobile browsers (e.g.
    // Samsung Internet). Every place in the app that calls
    // ScrollSmoother.get() already falls back to scrollIntoView() when
    // it's undefined, so this degrades cleanly — nav links, CTA buttons,
    // etc. keep working exactly the same.
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

    if (isTouchDevice || prefersReduced) {
      return;
    }

    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
      normalizeScroll: true,
    });
    setSmootherActive(true);

    return () => {
      smootherRef.current?.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" className={smootherActive ? "gsap-smooth-active" : ""}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}