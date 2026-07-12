"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import BlurText from "./BlurText";
import type { Palette } from "@/lib/colorSystem";

interface HeroProps {
  palette: Palette;
}

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

/** Attaches a magnetic pull effect: the element drifts toward the cursor
 *  within its own bounds, then eases back to rest on mouse leave. */
function useMagnetic(ref: React.RefObject<HTMLElement | null>, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, strength]);
}

export default function Hero({ palette }: HeroProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const secondaryBtnRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const light = isLightColor(palette.bg);

  useMagnetic(primaryBtnRef, 0.4);
  useMagnetic(secondaryBtnRef, 0.3);

  // Drifting gradient blobs
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

  // Specular sheen follows pointer over the glass panel
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

  // Entrance timeline
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      panelRef.current,
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 1.1 }
    )
      .fromTo(badgeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.6")
      .fromTo(titleRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "+=0.9")
      .fromTo(ctaRef.current, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.3");
  }, []);

  // Breathing glow behind the primary CTA — subtle, continuous, alive
  useEffect(() => {
    if (!glowRef.current) return;
    const tween = gsap.to(glowRef.current, {
      scale: 1.25,
      opacity: 0.55,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-24 overflow-hidden grain"
      style={{ backgroundColor: palette.bg }}
    >
      <div ref={blobsRef} className="absolute inset-0 pointer-events-none">
        <div
          data-speed="0.85"
          className="absolute w-[55vw] h-[55vw] rounded-full blur-[120px] opacity-45 -top-[10%] -left-[8%]"
          style={{ backgroundColor: palette.primary }}
        />
        <div
          data-speed="1.1"
          className="absolute w-[45vw] h-[45vw] rounded-full blur-[110px] opacity-35 top-[35%] -right-[12%]"
          style={{ backgroundColor: palette.secondary }}
        />
        <div
          data-speed="0.95"
          className="absolute w-[38vw] h-[38vw] rounded-full blur-[100px] opacity-30 -bottom-[15%] left-[20%]"
          style={{ backgroundColor: palette.accent }}
        />
        <div
          data-speed="1.05"
          className="absolute w-[30vw] h-[30vw] rounded-full blur-[90px] opacity-25 top-[12%] left-[45%]"
          style={{ backgroundColor: palette.secondary }}
        />
      </div>

      <div
        ref={panelRef}
        className="glass-strong relative z-10 w-full max-w-4xl rounded-[2.5rem] px-10 py-20 md:px-24 md:py-28 text-center"
      >
        <div className="glass-sheen" />

        <div ref={badgeRef} className="mb-12 flex justify-center">
          <span
            className="glass-pill rounded-full px-6 py-2.5 text-sm font-medium tracking-wide"
            style={{ color: palette.textMuted }}
          >
            {palette.timeLabel} · {palette.seasonLabel}
          </span>
        </div>

        <BlurText
          as="h1"
          text="Sebastián García"
          delay={0.3}
          wordDelay={0.15}
          defaultColor={palette.text}
          colorOverrides={{ 1: palette.primary }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-7 leading-[1.05]"
        />

        <p
          ref={titleRef}
          className="text-xl md:text-2xl font-light mb-4 tracking-wide"
          style={{ color: palette.textMuted }}
        >
          Desarrollador Full Stack · Backend · IA Aplicada
        </p>

        <p
          className="text-base mb-16"
          style={{ color: palette.textMuted, opacity: 0.7 }}
        >
          Ingeniero Informático · Universidad del Bío-Bío · Chile
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-5 justify-center">
          {/* Primary CTA — magnetic + breathing glow behind it */}
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
              className="relative block rounded-2xl px-10 py-5 font-semibold text-base"
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
            className="glass-pill rounded-2xl px-10 py-5 font-semibold text-base"
            style={{ color: palette.text }}
          >
            Contacto
          </a>
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