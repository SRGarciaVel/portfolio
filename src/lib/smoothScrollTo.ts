"use client";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

let rafId: number | null = null;
let lastFrom = 0;
let lastTo = 0;
let lastCallAt = 0;

/** True while smoothScrollTo's own animation is actively stepping. */
export function isScrollAnimating(): boolean {
  return rafId !== null;
}

/** True for a scrollY that's an echo of our own last animation rather than
 *  new user movement. Each of smoothScrollTo's per-frame `window.scrollTo()`
 *  calls fires a native 'scroll' event, but under load (a continuous rAF
 *  loop keeping the main thread busy for the whole animation) the browser
 *  can defer and batch-deliver those events well after the animation's own
 *  rAF loop has finished — well past any fixed grace-period timeout.
 *  Checking the reported value against the animated range, instead of
 *  guessing how long that delay can be, is robust regardless of how late
 *  the events arrive: a genuine new gesture moves the page outside the
 *  range this animation ever crossed. The 500ms cap keeps that safety net
 *  from blocking a genuinely new gesture that overlaps the same range
 *  (e.g. the adjacent panel in the opposite direction). */
export function isAnimationEcho(y: number): boolean {
  if (performance.now() - lastCallAt > 900) return false;
  const lo = Math.min(lastFrom, lastTo) - 2;
  const hi = Math.max(lastFrom, lastTo) + 2;
  return y >= lo && y <= hi;
}

/** Animates window.scrollY to `top` on a cubic ease, replacing the browser's
 *  native `behavior: "smooth"` (a fixed, not-very-polished curve with a
 *  duration the page can't control). Used for both the slide-snap settle and
 *  programmatic nav jumps, so the whole site scrolls on the same curve. */
export function smoothScrollTo(top: number, duration = 450) {
  if (rafId !== null) cancelAnimationFrame(rafId);

  const start = window.scrollY;
  const distance = top - start;
  if (Math.abs(distance) < 1) return;

  lastFrom = start;
  lastTo = top;
  lastCallAt = performance.now();

  const startTime = performance.now();

  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(t));
    rafId = t < 1 ? requestAnimationFrame(step) : null;
  }

  rafId = requestAnimationFrame(step);
}
