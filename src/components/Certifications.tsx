"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePalette } from "@/context/PaletteContext";
import type { Palette } from "@/lib/colorSystem";

gsap.registerPlugin(ScrollTrigger);

const CREDENTIALS = [
  {
    id: "dp600",
    title: "Microsoft DP-600",
    subtitle: "Fabric Analytics Engineer Associate",
    issuer: "Microsoft",
    status: "En preparación · 2026",
    icon: (
      <path d="M12 2 3 6v6c0 5 3.8 8.6 9 10 5.2-1.4 9-5 9-10V6l-9-4Zm-1 13-3-3 1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z" />
    ),
  },
  {
    id: "ubb",
    title: "Ingeniería de Ejecución en Computación e Informática",
    subtitle: "Universidad del Bío-Bío, Concepción, Chile",
    issuer: "Universidad del Bío-Bío",
    status: "Tesis aprobada Dic 2025 · Titulación estimada Ago–Dic 2026",
    icon: (
      <path d="M12 3 1 8l11 5 9-4.1V17h2V8L12 3Zm-7 8.8V16c0 2.2 3.1 4 7 4s7-1.8 7-4v-4.2l-7 3.2-7-3.2Z" />
    ),
  },
];

function CredentialCard({
  cred,
  palette,
}: {
  cred: (typeof CREDENTIALS)[number];
  palette: Palette;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const move = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--sheen-x", `${x}%`);
      card.style.setProperty("--sheen-y", `${y}%`);
    };

    card.addEventListener("mousemove", move);
    return () => card.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cardRef}
      className="glass relative rounded-[2rem] p-6 md:p-10 overflow-hidden"
    >
      <div className="glass-sheen" />

      <div className="relative z-10">
        <div
          className="chip w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill={palette.primary}>
            {cred.icon}
          </svg>
        </div>

        <h3
          className="text-xl md:text-2xl font-bold mb-2 tracking-tight leading-snug"
          style={{ color: palette.text }}
        >
          {cred.title}
        </h3>
        <p
          className="text-sm font-medium mb-5"
          style={{ color: palette.primary }}
        >
          {cred.subtitle}
        </p>

        <div
          className="chip inline-block rounded-full px-4 py-2 text-xs font-semibold"
          style={{ color: palette.textMuted }}
        >
          {cred.status}
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const palette = usePalette();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certificaciones"
      className="relative px-6 md:px-16 lg:px-24 py-32 overflow-hidden"
      style={{ backgroundColor: palette.bg }}
    >
      <div
        className="absolute w-[34vw] h-[34vw] rounded-full blur-[130px] opacity-15 bottom-[5%] right-[-10%] pointer-events-none"
        style={{ backgroundColor: palette.accent }}
      />

      <div ref={headerRef} className="max-w-3xl mb-16 md:mb-20 relative z-10">
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 block"
          style={{ color: palette.primary }}
        >
          Certificaciones
        </span>
        <h2
          className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
          style={{ color: palette.text }}
        >
          Formación{" "}
          <span style={{ color: palette.primary }}>en curso</span>
        </h2>
      </div>

      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
      >
        {CREDENTIALS.map((cred) => (
          <CredentialCard key={cred.id} cred={cred} palette={palette} />
        ))}
      </div>
    </section>
  );
}