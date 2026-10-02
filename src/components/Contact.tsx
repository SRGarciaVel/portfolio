"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlurText from "./BlurText";
import { useMagnetic } from "@/hooks/useMagnetic";
import { usePalette } from "@/context/PaletteContext";
import { prefersReducedMotion } from "@/lib/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

function MailIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

const LINKS = [
  {
    label: "LinkedIn",
    value: "in/sebastián-garcía-velásquez",
    href: "https://www.linkedin.com/in/sebasti%C3%A1n-garc%C3%ADa-vel%C3%A1squez/",
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "SRGarciaVel",
    href: "https://github.com/SRGarciaVel",
    icon: GithubIcon,
  },
];

export default function Contact() {
  const palette = usePalette();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const primaryBtnRef = useRef<HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const light = isLightColor(palette.bg);
  useMagnetic(primaryBtnRef, 0.4);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        panelRef.current,
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1 }
      )
        .fromTo(badgeRef.current, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
        .fromTo(
          linksRef.current?.children ?? [],
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          "+=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!glowRef.current || prefersReducedMotion()) return;
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
      ref={sectionRef}
      id="contacto"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24 overflow-hidden grain"
      style={{ backgroundColor: palette.bg }}
    >
      <div
        className="absolute w-[45vw] h-[45vw] rounded-full blur-[130px] opacity-35 top-[10%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ backgroundColor: palette.primary }}
      />

      <div
        ref={panelRef}
        className="glass-strong relative z-10 w-full max-w-3xl rounded-[2.5rem] px-6 py-14 md:px-16 md:py-20 text-center"
      >
        <div className="glass-sheen" />

        <div ref={badgeRef} className="mb-8 flex justify-center">
          <span
            className="chip rounded-full px-6 py-2.5 text-sm font-medium tracking-wide"
            style={{ color: palette.textMuted }}
          >
            Disponible para nuevas oportunidades
          </span>
        </div>

        <BlurText
          as="h2"
          text="Conversemos"
          delay={0.2}
          wordDelay={0.15}
          align="center"
          defaultColor={palette.text}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.02]"
        />

        <p
          className="text-base md:text-lg mb-12 max-w-lg mx-auto"
          style={{ color: palette.textMuted }}
        >
          Si un rol de desarrollo, datos o IA aplicada te parece que puedo
          aportar, escríbeme. Respondo rápido.
        </p>

        <div className="mb-10">
          <div className="relative inline-block">
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
              href="mailto:sebastian.rgarciavelasquez@gmail.com"
              className="relative flex items-center gap-2.5 rounded-2xl px-8 md:px-10 py-4 md:py-5 font-semibold text-base"
              style={{
                backgroundColor: palette.primary,
                color: light ? "#ffffff" : palette.bg,
                boxShadow: `0 8px 32px ${palette.glow}, inset 0 1px 0 rgba(255,255,255,0.3)`,
              }}
            >
              <MailIcon size={18} />
              <span className="hidden sm:inline">
                sebastian.rgarciavelasquez@gmail.com
              </span>
              <span className="sm:hidden">Escríbeme</span>
            </a>
          </div>

          {/* Full address visible on mobile below the compact button, easy to copy */}
          <p
            className="sm:hidden text-xs mt-3 break-all px-4"
            style={{ color: palette.textMuted, opacity: 0.7 }}
          >
            sebastian.rgarciavelasquez@gmail.com
          </p>
        </div>

        <div ref={linksRef} className="flex flex-wrap gap-4 justify-center">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="chip inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-300 hover:scale-105"
                style={{ color: palette.text }}
              >
                <Icon size={16} />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>

      <p
        className="relative z-10 text-xs mt-10 text-center"
        style={{ color: palette.textMuted, opacity: 0.5 }}
      >
        San Pedro de la Paz, Chile · Diseñado y construido por Sebastián García
      </p>
    </section>
  );
}