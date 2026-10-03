"use client";

import { useEffect, type RefObject } from "react";

const DESKTOP_QUERY =
  "(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const ADVANCE_RATIO = 0.12;

/** Free scrolling during the gesture, then one settle step when it ends: move
 *  to the next or previous panel if the user went past ADVANCE_RATIO of the
 *  viewport, otherwise return to where the gesture started. */
export function useSlideSnap(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.matchMedia(DESKTOP_QUERY).matches) return;

    const panels = container.querySelectorAll(".panel");
    if (panels.length < 2) return;
    const last = panels.length - 1;

    let anchor = Math.round(window.scrollY / window.innerHeight);

    const settle = () => {
      const h = window.innerHeight;
      const pos = window.scrollY / h;
      const moved = pos - anchor;
      let target = anchor;
      if (Math.abs(moved) > 1.5) {
        target = Math.round(pos);
      } else if (moved > ADVANCE_RATIO) {
        target = anchor + 1;
      } else if (moved < -ADVANCE_RATIO) {
        target = anchor - 1;
      }
      target = Math.min(Math.max(target, 0), last);
      anchor = target;
      if (Math.abs(window.scrollY - target * h) > 1) {
        window.scrollTo({ top: target * h, behavior: "smooth" });
      }
    };

    const supportsScrollEnd = "onscrollend" in window;
    let timer: number | undefined;
    const onScroll = () => {
      if (!supportsScrollEnd) {
        window.clearTimeout(timer);
        timer = window.setTimeout(settle, 140);
      }
    };
    const onScrollEnd = () => settle();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
    };
  }, [containerRef]);
}
