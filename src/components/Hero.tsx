"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Palette } from "@/lib/colorSystem";

interface HeroProps {
  palette: Palette;
}

/* Luminance check: decides glass tint direction (dark glass on light bg, light glass on dark bg) */
function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

export default function Hero({ palette }: HeroProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  const light = isLightColor(palette.bg);

  /* Glass CSS variables — adapt to palette luminance */
  useEffect(() => {
    const root = document.documentElement;
    if (light) {
      root.style.setProperty("--glass-bg", "rgba(255,255,255,0.45)");
      root.style.setProperty("--glass-border", "rgba(255,255,255,0.65)");
      root.style.setProperty("--glass-highlight", "rgba(255,255,255,0.9)");
      root.style.setProperty("--glass-shadow", "rgba(30,41,59,0.12)");
    } else {
      root.style.setProperty("--glass-bg", "rgba(255,255,255,0.06)");
      root.style.setProperty("--glass-border", "rgba(255,255,255,0.14)");
      root.style.setProperty("--glass-highlight", "rgba(255,255,255,0.25)");
      root.style.setProperty("--glass-shadow", "rgba(0,0,0,0.35)");
    }
  }, [light]);

  /* Drifting gradient blobs — the "weather" behind the glass */
  useEffect(() => {
    if (!blobsRef.current) return;
    const blobs = blobsRef.current.children;
    const tweens: gsap.core.Tween[] = [];

    Array.from(blobs).forEach((blob, i) => {
      tweens.push(
        gsap.to(blob, {
          x: `random(-120, 120)`,
          y: `random(-100, 100)`,
          scale: `random(0.85, 1.2)`,
          duration: 14 + i * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      );
    });

    return () => tweens.forEach((t) => t.kill());
  }, []);

  /* Specular sheen follows pointer over the glass panel */
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

  /* Entrance timeline */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      panelRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 1.1 }
    )
      .fromTo(badgeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.6")
      .fromTo(nameRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.35")
      .fromTo(titleRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4")
      .fromTo(ctaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden grain"
      style={{ backgroundColor: palette.bg }}
    >
      {/* ── The weather: drifting gradient blobs ── */}
      <div ref={blobsRef} className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-45 -top-[10%] -left-[8%]"
          style={{ backgroundColor: palette.primary }}
        />
        <div
          className="absolute w-[45vw] h-[45vw] rounded-full blur-[110px] opacity-35 top-[35%] -right-[12%]"
          style={{ backgroundColor: palette.secondary }}
        />
        <div
          className="absolute w-[38vw] h-[38vw] rounded-full blur-[100px] opacity-30 -bottom-[15%] left-[20%]"
          style={{ backgroundColor: palette.accent }}
        />
        <div
          className="absolute w-[30vw] h-[30vw] rounded-full blur-[90px] opacity-25 top-[12%] left-[45%]"
          style={{ backgroundColor: palette.secondary }}
        />
      </div>

      {/* ── Glass panel ── */}
      <div
        ref={panelRef}
        className="glass relative z-10 w-full max-w-3xl rounded-[2rem] px-8 py-14 md:px-16 md:py-20 text-center"
      >
        <div className="glass-sheen" />

        {/* Badge hora/estación */}
        <div ref={badgeRef} className="mb-10 flex justify-center">
          <span
            className="glass-pill rounded-full px-5 py-2 text-sm font-medium tracking-wide"
            style={{ color: palette.textMuted }}
          >
            {palette.timeLabel} · {palette.seasonLabel}
          </span>
        </div>

        {/* Nombre */}
        <h1
          ref={nameRef}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-5 leading-[1.05]"
          style={{ color: palette.text }}
        >
          {"Sebastián "}
          <span style={{ color: palette.primary }}>{"García"}</span>
        </h1>

        {/* Rol */}
        <p
          ref={titleRef}
          className="text-lg md:text-xl font-light mb-3 tracking-wide"
          style={{ color: palette.textMuted }}
        >
          Desarrollador Full Stack · Backend · IA Aplicada
        </p>

        <p
          className="text-sm mb-12"
          style={{ color: palette.textMuted, opacity: 0.7 }}
        >
          Ingeniero Informático · Universidad del Bío-Bío · Chile
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
          <a
            href="#proyectos"
            className="rounded-2xl px-8 py-4 font-semibold text-base transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{
              backgroundColor: palette.primary,
              color: light ? "#ffffff" : palette.bg,
              boxShadow: `0 8px 32px ${palette.glow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
            }}
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="glass-pill rounded-2xl px-8 py-4 font-semibold text-base transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{ color: palette.text }}
          >
            Contacto
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ color: palette.textMuted, opacity: 0.6 }}
      >
        <span className="text-[11px] tracking-[0.25em] uppercase">Scroll</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="animate-bounce"
        >
          <path d="M8 12L2 6h12L8 12z" />
        </svg>
      </div>
    </section>
  );
}