"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { usePalette } from "@/context/PaletteContext";
import { useActiveSlide } from "@/hooks/useActiveSlide";
import { SLIDE_PALETTES } from "@/lib/slidePalettes";
import { isProgrammaticScroll, scrollToSection } from "@/lib/scrollToSection";

const LINKS = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#skills", label: "Skills" },
  { href: "#certificaciones", label: "Certificaciones" },
  { href: "#contacto", label: "Contacto" },
];

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

export default function Navbar() {
  const globalPalette = usePalette();
  const activeSlide = useActiveSlide();
  const palette = { ...SLIDE_PALETTES[activeSlide] ?? SLIDE_PALETTES[0], timeLabel: globalPalette.timeLabel, seasonLabel: globalPalette.seasonLabel };
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mobileWrapRef = useRef<HTMLDivElement>(null);
  const mobileInnerRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const light = isLightColor(palette.bg);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScroll.current;

      if (Math.abs(delta) < 6) {
        ticking = false;
        return;
      }

      const goingDown = delta > 0 && current > 120 && !isProgrammaticScroll();
      setCompact(current > 40);

      if (navRef.current) {
        gsap.to(navRef.current, {
          y: goingDown && !open ? -100 : 0,
          duration: 0.5,
          ease: "power3.out",
        });
      }

      lastScroll.current = current;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Expand/collapse the mobile menu by animating real height (measured from
  // content), keeping it as ONE continuous shape with the header row above —
  // no floating second panel, no gap.
  useEffect(() => {
    const wrap = mobileWrapRef.current;
    const inner = mobileInnerRef.current;
    if (!wrap || !inner) return;

    if (open) {
      const targetHeight = inner.scrollHeight;
      gsap.to(wrap, {
        height: targetHeight,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.fromTo(
        inner,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, delay: 0.1, ease: "power2.out" }
      );
    } else {
      gsap.to(wrap, {
        height: 0,
        duration: 0.35,
        ease: "power3.in",
      });
      gsap.to(inner, { opacity: 0, duration: 0.15 });
    }
  }, [open]);

  const moveIndicatorTo = (target: HTMLElement) => {
    const container = linksContainerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return;

    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    gsap.to(indicator, {
      x: targetRect.left - containerRect.left,
      width: targetRect.width,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  };

  const hideIndicator = () => {
    if (!indicatorRef.current) return;
    gsap.to(indicatorRef.current, { opacity: 0, duration: 0.3 });
  };

  const goTo = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  const opaqueBg = light ? "rgba(255,255,255,0.96)" : "rgba(12,12,16,0.96)";
  const compactBg = light ? "rgba(255,255,255,0.72)" : "rgba(15,15,20,0.72)";

  const containerBackground = open ? opaqueBg : compact ? compactBg : "var(--glass-bg)";
  const containerBlur = open
    ? "blur(24px) saturate(160%)"
    : compact
      ? "blur(28px) saturate(180%)"
      : "blur(20px) saturate(160%)";
  const containerBorder = open || compact ? "var(--glass-border)" : "transparent";
  const containerShadow = open
    ? "0 16px 48px rgba(0,0,0,0.4)"
    : compact
      ? "0 8px 24px var(--glass-shadow), inset 0 1px 0 var(--glass-highlight)"
      : "inset 0 1px 0 var(--glass-highlight)";

  return (
    <>
      <div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
        style={{ paddingTop: compact && !open ? "0.75rem" : "1.5rem" }}
      >
        {/* Single unified shape: pill when closed, panel when open.
            Both header row and mobile list live inside this ONE element,
            so there's never a visible seam or gap between them. */}
        <div
          className="w-full max-w-3xl overflow-hidden"
          style={{
            borderRadius: open ? "2rem" : "9999px",
            background: containerBackground,
            backdropFilter: containerBlur,
            WebkitBackdropFilter: containerBlur,
            border: `1px solid ${containerBorder}`,
            boxShadow: containerShadow,
            transition:
              "border-radius 0.45s ease, background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
          }}
        >
          <nav
            className="flex items-center justify-between transition-[padding] duration-500"
            style={{
              paddingLeft: compact && !open ? "1.25rem" : "1.5rem",
              paddingRight: compact && !open ? "0.75rem" : "1rem",
              paddingTop: compact && !open ? "0.5rem" : "0.75rem",
              paddingBottom: compact && !open ? "0.5rem" : "0.75rem",
            }}
          >
            <button
              onClick={() => goTo("#hero")}
              className="font-bold text-sm tracking-tight shrink-0 pr-4"
              style={{ color: palette.text }}
            >
              SGdev<span style={{ color: palette.primary }}>.</span>
            </button>

            <div
              className="hidden md:block w-px h-5 shrink-0"
              style={{ backgroundColor: palette.border, opacity: 0.6 }}
            />

            <div
              ref={linksContainerRef}
              onMouseLeave={hideIndicator}
              className="hidden md:flex items-center gap-1 px-2 flex-1 justify-center relative"
            >
              <div
                ref={indicatorRef}
                className="absolute top-0 left-0 h-full rounded-full pointer-events-none opacity-0"
                style={{
                  backgroundColor: light ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)",
                }}
              />

              {LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  onMouseEnter={(e) => moveIndicatorTo(e.currentTarget)}
                  onFocus={(e) => moveIndicatorTo(e.currentTarget)}
                  className="relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-300 whitespace-nowrap z-10"
                  style={{ color: palette.textMuted }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <a
              href="/cv-sebastian-garcia.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold transition-transform duration-300 hover:scale-110 shrink-0"
              style={{
                backgroundColor: palette.primary,
                color: light ? "#ffffff" : palette.bg,
              }}
              title="Descargar CV"
            >
              CV
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-full shrink-0"
              style={{ color: palette.text }}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>

          {/* Mobile expandable list — same shape, height-animated, no gap */}
          <div ref={mobileWrapRef} className="md:hidden overflow-hidden" style={{ height: 0 }}>
            <div ref={mobileInnerRef} className="px-6 pb-6 pt-1 flex flex-col gap-1">
              {LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => goTo(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-base font-medium"
                  style={{ color: palette.text }}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/cv-sebastian-garcia.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-center px-4 py-3 rounded-xl text-base font-semibold"
                style={{
                  backgroundColor: palette.primary,
                  color: light ? "#ffffff" : palette.bg,
                }}
              >
                Descargar CV
              </a>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-md"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}