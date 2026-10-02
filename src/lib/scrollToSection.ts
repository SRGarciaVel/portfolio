import { ScrollSmoother } from "gsap/ScrollSmoother";

let programmaticScrollUntil = 0;

/** True for a short window after scrollToSection() runs. Navbar's
 *  hide-on-scroll-down logic checks this so a programmatic jump to a
 *  section isn't mistaken for the user manually scrolling down — which
 *  would hide the navbar right as they land on the section. */
export function isProgrammaticScroll(): boolean {
  return Date.now() < programmaticScrollUntil;
}

/** Scrolls to a section via ScrollSmoother's virtual scroll, falling back
 *  to native scrollIntoView when the smoother isn't running (touch
 *  devices, reduced motion — see SmoothScrollProvider). Used by both the
 *  Navbar links and the Hero/Contact CTA buttons so they share one
 *  mechanism instead of each re-implementing the ScrollSmoother dance. */
export function scrollToSection(href: string) {
  programmaticScrollUntil = Date.now() + 1200;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(href, true, "top top");
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
}
