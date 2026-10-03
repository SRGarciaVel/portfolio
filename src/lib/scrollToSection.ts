let programmaticScrollUntil = 0;

/** True for a short window after scrollToSection() runs. Navbar's
 *  hide-on-scroll-down logic checks this so a programmatic jump to a
 *  section isn't mistaken for the user manually scrolling down — which
 *  would hide the navbar right as they land on the section. */
export function isProgrammaticScroll(): boolean {
  return Date.now() < programmaticScrollUntil;
}

/** Scrolls to a section. Used by both the Navbar links and the Hero/Contact
 *  CTA buttons. Sticky desktop panels can't use scrollIntoView (they already
 *  sit at the top of the viewport), so their offset comes from their index. */
export function scrollToSection(href: string) {
  programmaticScrollUntil = Date.now() + 2200;
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  if (getComputedStyle(el).position === "sticky") {
    const index = Array.from(document.querySelectorAll(".panel")).indexOf(el);
    window.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
    return;
  }
  el.scrollIntoView({ behavior: "smooth" });
}
