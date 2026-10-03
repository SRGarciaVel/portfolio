"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePalette } from "@/context/PaletteContext";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    period: "Feb 2025 – Mar 2025",
    title: "Desarrollador Full Stack",
    org: "Masisa S.A. · Práctica Profesional",
    description:
      "Desarrollo de herramientas de gestión interna de facturación. Integración con SAP mediante scripts Python, APIs REST con Flask, refactorización de código legacy para mejorar escalabilidad.",
    tags: ["Python", "Flask", "SAP", "APIs REST"],
  },
  {
    period: "Sep 2025 – Dic 2025",
    title: "GestionFactura · Tesis de Grado",
    org: "Masisa S.A.",
    description:
      "Diseño e implementación completa de una plataforma de facturación móvil bajo metodología ágil. Pipeline ETL con sincronización a SAP, dashboard de KPIs en tiempo real, autenticación JWT.",
    tags: ["React", "PostgreSQL", "JWT", "ETL"],
    highlight: "↓ 98% tiempo de procesamiento · 0% errores en imputación",
  },
  {
    period: "2025 – Presente",
    title: "Profesor de Computación",
    org: "Independiente",
    description:
      "Clases personalizadas a adultos mayores, adaptando conceptos técnicos a su contexto y ritmo. Diagnóstico de necesidades individuales y diseño de contenido progresivo orientado a resultados prácticos.",
    tags: ["Enseñanza", "Comunicación", "Adaptabilidad"],
  },
];

export default function Experience() {
  const palette = usePalette();
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          scrollTrigger: { trigger: panelRefs.current[0], start: "top 75%" },
        }
      );

      itemRefs.current.forEach((item, i) => {
        const dot = dotRefs.current[i];
        if (!item || !dot) return;
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 82%" },
          }
        );
        gsap.fromTo(
          dot,
          { scale: 0, backgroundColor: palette.border },
          {
            scale: 1,
            backgroundColor: palette.primary,
            duration: 0.4,
            ease: "back.out(2)",
            scrollTrigger: { trigger: dot, start: "top 82%" },
          }
        );
      });
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {EXPERIENCE.map((item, i) => (
        <section
          key={item.title}
          id={i === 0 ? "experiencia" : undefined}
          ref={(el) => {
            panelRefs.current[i] = el;
          }}
          className="panel relative flex flex-col justify-center min-h-svh md:h-svh md:overflow-hidden px-6 md:px-16 lg:px-24 py-24 md:py-0"
          style={{ backgroundColor: palette.bg }}
        >
          <div
            className="absolute w-[36vw] h-[36vw] rounded-full blur-[130px] opacity-15 top-[10%] left-[-12%] pointer-events-none"
            style={{ backgroundColor: palette.secondary }}
          />

          {i === 0 && (
            <div ref={headerRef} className="relative z-10 max-w-3xl mb-14 md:mb-16">
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 block"
                style={{ color: palette.primary }}
              >
                Experiencia
              </span>
              <h2
                className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
                style={{ color: palette.text }}
              >
                Cómo llegué{" "}
                <span style={{ color: palette.primary }}>hasta acá</span>
              </h2>
            </div>
          )}

          <div
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative z-10 max-w-3xl pl-10 md:pl-12"
          >
            <div
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="absolute left-0 top-1.5 w-4 h-4 rounded-full"
              style={{
                backgroundColor: palette.border,
                boxShadow: `0 0 0 4px ${palette.bg}`,
              }}
            />

            <span
              className="text-xs font-semibold tracking-wide mb-2 block"
              style={{ color: palette.primary, opacity: 0.75 }}
            >
              {item.period}
            </span>
            <h3
              className="text-xl md:text-2xl font-bold mb-1 tracking-tight"
              style={{ color: palette.text }}
            >
              {item.title}
            </h3>
            <p className="text-sm font-medium mb-4" style={{ color: palette.textMuted }}>
              {item.org}
            </p>
            <p
              className="text-sm md:text-base leading-relaxed mb-4 max-w-2xl"
              style={{ color: palette.textMuted }}
            >
              {item.description}
            </p>

            {item.highlight && (
              <p className="text-sm font-semibold mb-4" style={{ color: palette.text }}>
                {item.highlight}
              </p>
            )}

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium"
                  style={{ color: palette.textMuted }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
