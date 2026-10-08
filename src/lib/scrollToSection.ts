import { smoothScrollTo } from "@/lib/smoothScrollTo";

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
  programmaticScrollUntil = Date.now() + 1100;
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  if (getComputedStyle(el).position === "sticky") {
    const h = window.innerHeight;
    const index = Array.from(document.querySelectorAll(".panel")).indexOf(el);
    const panelsCrossed = Math.abs(index * h - window.scrollY) / h;
    const duration = Math.min(850, Math.max(350, panelsCrossed * 180));
    smoothScrollTo(index * h, duration);
    return;
  }
  el.scrollIntoView({ behavior: "smooth" });
}
