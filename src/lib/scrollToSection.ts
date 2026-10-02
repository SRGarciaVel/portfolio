let programmaticScrollUntil = 0;

/** True for a short window after scrollToSection() runs. Navbar's
 *  hide-on-scroll-down logic checks this so a programmatic jump to a
 *  section isn't mistaken for the user manually scrolling down — which
 *  would hide the navbar right as they land on the section. */
export function isProgrammaticScroll(): boolean {
  return Date.now() < programmaticScrollUntil;
}

/** Scrolls to a section via native smooth scrolling. Used by both the
 *  Navbar links and the Hero/Contact CTA buttons so they share one
 *  mechanism instead of each re-implementing it. */
export function scrollToSection(href: string) {
  programmaticScrollUntil = Date.now() + 1200;
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}
