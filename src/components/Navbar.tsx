"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { usePalette } from "@/context/PaletteContext";

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
  const palette = usePalette();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const lastScroll = useRef(0);
  const light = isLightColor(palette.bg);

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const current = window.scrollY;
      const goingDown = current > lastScroll.current && current > 120;

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

  // Sliding indicator that follows whichever link is hovered
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
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(href, true, "top top");
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4"
        style={{ paddingTop: compact ? "0.75rem" : "1.5rem" }}
      >
        <nav
          className="glass rounded-full flex items-center justify-between w-full max-w-3xl transition-[padding] duration-500"
          style={{
            paddingLeft: compact ? "1.25rem" : "1.5rem",
            paddingRight: compact ? "0.75rem" : "1rem",
            paddingTop: compact ? "0.5rem" : "0.75rem",
            paddingBottom: compact ? "0.5rem" : "0.75rem",
          }}
        >
          <button
            onClick={() => goTo("#hero")}
            className="font-bold text-sm tracking-tight shrink-0 pr-4"
            style={{ color: palette.text }}
          >
            SG<span style={{ color: palette.primary }}>.</span>
          </button>

          <div
            className="hidden md:block w-px h-5 shrink-0"
            style={{ backgroundColor: palette.border, opacity: 0.6 }}
          />

          {/* Desktop links with sliding indicator */}
          <div
            ref={linksContainerRef}
            onMouseLeave={hideIndicator}
            className="hidden md:flex items-center gap-1 px-2 flex-1 justify-center relative"
          >
            {/* Sliding indicator pill */}
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
                className="relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-300 whitespace-nowrap z-10"
                style={{ color: palette.textMuted }}
                onFocus={(e) => moveIndicatorTo(e.currentTarget)}
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
      </div>

      {open && (
        <div className="fixed inset-x-4 top-20 z-40 md:hidden glass rounded-3xl px-6 py-6 flex flex-col gap-1">
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
      )}
    </>
  );
}