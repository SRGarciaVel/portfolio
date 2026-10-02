/** Reads prefers-reduced-motion once per call. Only ambient/continuous GSAP
 *  loops (parallax drift, breathing glows, 3D tilt, magnetic pull) need to
 *  check this — they run forever and are the vestibular-trigger case
 *  prefers-reduced-motion exists for. One-shot entrance reveals are left
 *  alone since the global CSS rule in globals.css already collapses any
 *  CSS transition/animation duration to ~0.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
