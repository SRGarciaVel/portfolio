"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePalette } from "@/context/PaletteContext";
import { prefersReducedMotion } from "@/lib/motionPrefs";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    title: "Backend",
    description:
      "Diseño APIs y arquitecturas que procesan datos reales sin romperse. Integración de sistemas, pipelines ETL y autenticación segura son mi terreno.",
    icon: <path d="M4 4h16v6H4V4Zm0 10h16v6H4v-6Zm2-8h.01M6 16h.01M14 6h4M14 16h4" />,
    tags: ["Python", "FastAPI", "Flask", "PostgreSQL"],
  },
  {
    title: "Frontend",
    description:
      "Construyo interfaces reactivas y mantenibles. De dashboards de KPIs a aplicaciones en producción con usuarios reales.",
    icon: <path d="M3 4h18v12H3V4Zm0 16h18M9 8h6M9 11h4" />,
    tags: ["React", "TypeScript", "Tailwind", "Vite"],
  },
  {
    title: "IA Aplicada",
    description:
      "Integro LLMs en flujos reales: memoria semántica, búsqueda vectorial, voz. No como demo, como sistema en producción.",
    icon: <path d="M12 2a5 5 0 0 1 5 5c0 2-1 3-1 5v2H8v-2c0-2-1-3-1-5a5 5 0 0 1 5-5ZM9 18h6M10 21h4" />,
    tags: ["LLMs", "pgvector", "RAG", "Whisper"],
  },
];

/** 3D tilt on hover, tracking the pointer within the card bounds. */
function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || prefersReducedMotion()) return;

    const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const liftY = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * 10);
      rotateX(-py * 10);
      liftY(-4);
    };

    const onLeave = () => {
      rotateX(0);
      rotateY(0);
      liftY(0);
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        data-card-index={index}
        className="glass rounded-[1.5rem] p-7 flex flex-col"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Skills() {
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
        { y: 60, opacity: 0, rotationX: -8 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
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
      id="skills"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32 overflow-hidden"
      style={{ backgroundColor: palette.bg }}
    >
      <div
        data-speed="0.9"
        className="absolute w-[35vw] h-[35vw] rounded-full blur-[130px] opacity-20 top-[5%] left-[-10%] pointer-events-none"
        style={{ backgroundColor: palette.accent }}
      />

      <div ref={headerRef} className="max-w-3xl mb-14 md:mb-16 relative z-10">
        <span
          className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 block"
          style={{ color: palette.primary }}
        >
          Skills
        </span>
        <h2
          className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
          style={{ color: palette.text }}
        >
          Tres dominios,{" "}
          <span style={{ color: palette.primary }}>un mismo criterio</span>
        </h2>
      </div>

      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {CATEGORIES.map((cat, i) => (
          <TiltCard key={cat.title} index={i}>
            <div
              className="chip w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mb-5"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke={palette.primary}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {cat.icon}
              </svg>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className="chip rounded-full px-3 py-1.5 text-[11px] font-medium"
                  style={{ color: palette.textMuted }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3
              className="text-2xl font-bold mb-2.5 tracking-tight"
              style={{ color: palette.text }}
            >
              {cat.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: palette.textMuted }}
            >
              {cat.description}
            </p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}