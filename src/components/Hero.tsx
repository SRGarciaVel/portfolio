"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import BlurText from "./BlurText";
import { useInView } from "@/hooks/useInView";
import { useMagnetic } from "@/hooks/useMagnetic";
import type { Palette } from "@/lib/colorSystem";

interface HeroProps {
  palette: Palette;
}

const STATS = [
  { value: 1, suffix: "+", label: "Año construyendo software en producción" },
  { value: 3, suffix: "", label: "Proyectos propios desplegados y mantenidos" },
  { value: 98, suffix: "%", label: "Reducción de tiempo en GestionFactura" },
];

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

/** Same navigation mechanism as the Navbar: goes through ScrollSmoother
 *  instead of a native anchor jump, which would otherwise desync
 *  ScrollSmoother's virtual scroll position and lock up further scrolling. */
function scrollToSection(href: string) {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(href, true, "top top");
  } else {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Hero({ palette }: HeroProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const light = isLightColor(palette.bg);
  const glowTweenRef = useRef<gsap.core.Tween | null>(null);
  const { ref: sectionInViewRef, inView } = useInView<HTMLElement>(0.1);

  useMagnetic(primaryBtnRef, 0.4);
  useMagnetic(secondaryBtnRef, 0.3);

  // Symmetric drifting blobs
  useEffect(() => {
    if (!blobsRef.current) return;
    const blobs = blobsRef.current.children;
    const tweens: gsap.core.Tween[] = [];

    Array.from(blobs).forEach((blob, i) => {
      tweens.push(
        gsap.to(blob, {
          x: `random(-100, 100)`,
          y: `random(-80, 80)`,
          scale: `random(0.88, 1.15)`,
          duration: 14 + i * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const move = (e: MouseEvent) => {
      const rect = panel.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      panel.style.setProperty("--sheen-x", `${x}%`);
      panel.style.setProperty("--sheen-y", `${y}%`);
    };

    panel.addEventListener("mousemove", move);
    return () => panel.removeEventListener("mousemove", move);
  }, []);

  // Entrance timeline — badge, name, subtitle, CTAs, then the stats row
  // and its counters, all chained so everything is visible on load with
  // no scroll required.
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      panelRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 1.1 }
    )
      .fromTo(titleRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "+=0.7")
      .fromTo(ctaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3")
      .fromTo(
        statsRowRef.current?.children ?? [],
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.2"
      );

    STATS.forEach((stat, i) => {
      const counter = { val: 0 };
      tl.to(
        counter,
        {
          val: stat.value,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => {
            const el = numberRefs.current[i];
            if (el) el.textContent = Math.round(counter.val).toString();
          },
        },
        "<0.05"
      );
    });
  }, []);

  useEffect(() => {
    if (!glowRef.current) return;
    const tween = gsap.to(glowRef.current, {
      scale: 1.25,
      opacity: 0.55,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true,
    });
    glowTweenRef.current = tween;
    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    if (!glowTweenRef.current) return;
    if (inView) {
      glowTweenRef.current.play();
    } else {
      glowTweenRef.current.pause();
    }
  }, [inView]);

  return (
    <section
      ref={sectionInViewRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden grain"
      style={{ backgroundColor: palette.bg }}
    >
      <div ref={blobsRef} className="absolute inset-0 pointer-events-none">
        <div
          data-speed="0.85"
          className="absolute w-[48vw] h-[48vw] rounded-full blur-[120px] opacity-40 -top-[8%] -left-[10%]"
          style={{ backgroundColor: palette.primary }}
        />
        <div
          data-speed="1.1"
          className="absolute w-[42vw] h-[42vw] rounded-full blur-[115px] opacity-35 top-[30%] -right-[12%]"
          style={{ backgroundColor: palette.secondary }}
        />
        <div
          data-speed="0.95"
          className="absolute w-[36vw] h-[36vw] rounded-full blur-[100px] opacity-25 -bottom-[12%] left-[25%]"
          style={{ backgroundColor: palette.accent }}
        />
      </div>

      <div
        ref={panelRef}
        className="glass-strong relative z-10 w-full max-w-4xl rounded-[2.5rem] px-6 py-14 md:px-16 md:py-16 text-center"
      >
        <div className="glass-sheen" />

        <BlurText
          as="h1"
          text="Sebastián García Velásquez"
          delay={0.3}
          wordDelay={0.15}
          align="center"
          defaultColor={palette.text}
          colorOverrides={{ 1: palette.primary, 2: palette.primary }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-[1.05]"
        />

        <p
          ref={titleRef}
          className="text-lg md:text-xl font-light mb-2 tracking-wide"
          style={{ color: palette.textMuted }}
        >
          Desarrollador Full Stack · Backend · IA Aplicada
        </p>

        <p
          className="text-sm md:text-base mb-10"
          style={{ color: palette.textMuted, opacity: 0.7 }}
        >
          Ingeniero Informático · Universidad del Bío-Bío · Chile
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center mb-12">
          <div className="relative">
            <div
              ref={glowRef}
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                backgroundColor: palette.primary,
                filter: "blur(20px)",
                opacity: 0.35,
                transform: "scale(1)",
              }}
            />
            <a
              ref={primaryBtnRef}
              href="#proyectos"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#proyectos");
              }}
              className="relative block rounded-2xl px-8 py-4 font-semibold text-sm md:text-base"
              style={{
                backgroundColor: palette.primary,
                color: light ? "#ffffff" : palette.bg,
                boxShadow: `0 8px 32px ${palette.glow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
              }}
            >
              Ver proyectos
            </a>
          </div>

          <a
            ref={secondaryBtnRef}
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#contacto");
            }}
            className="chip rounded-2xl px-8 py-4 font-semibold text-sm md:text-base"
            style={{ color: palette.text }}
          >
            Contacto
          </a>
        </div>

        {/* Stats row — same fold, no scroll required */}
        <div
          ref={statsRowRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="glass rounded-2xl px-6 py-6 text-left"
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                  className="text-4xl md:text-5xl font-bold tabular-nums"
                  style={{ color: palette.primary }}
                >
                  0
                </span>
                <span
                  className="text-xl md:text-2xl font-bold"
                  style={{ color: palette.primary }}
                >
                  {stat.suffix}
                </span>
              </div>
              <p
                className="text-xs md:text-sm leading-snug"
                style={{ color: palette.textMuted }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ color: palette.textMuted, opacity: 0.6 }}
      >
        <span className="text-[11px] tracking-[0.25em] uppercase">Scroll</span>
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="animate-bounce">
          <path d="M8 12L2 6h12L8 12z" />
        </svg>
      </div>
    </section>
  );
}