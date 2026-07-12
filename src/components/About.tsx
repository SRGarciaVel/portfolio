"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Palette } from "@/lib/colorSystem";

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  palette: Palette;
}

export default function About({ palette }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        photoRef.current,
        { x: -40, opacity: 0, scale: 0.95 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        textRef.current?.children ?? [],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Breathing glow ring around the photo — echoes the Hero CTA glow for consistency
  useEffect(() => {
    if (!ringRef.current) return;
    const tween = gsap.to(ringRef.current, {
      scale: 1.08,
      opacity: 0.5,
      duration: 2.6,
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
      id="sobre-mi"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-32 overflow-hidden"
      style={{ backgroundColor: palette.bg }}
    >
      <div
        data-speed="0.9"
        className="absolute w-[40vw] h-[40vw] rounded-full blur-[130px] opacity-20 top-[10%] right-[-10%] pointer-events-none"
        style={{ backgroundColor: palette.secondary }}
      />

      <div
        ref={panelRef}
        className="glass relative z-10 w-full max-w-6xl rounded-[2.5rem] px-10 py-16 md:px-20 md:py-24"
      >
        <div className="grid md:grid-cols-[320px_1fr] gap-14 md:gap-20 items-center">
          {/* Photo with breathing glow ring + subtle scroll parallax */}
          <div ref={photoRef} data-speed="1.06" className="flex justify-center md:justify-start">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div
                ref={ringRef}
                className="absolute -inset-2 rounded-full pointer-events-none"
                style={{
                  border: `2px solid ${palette.primary}`,
                  opacity: 0.35,
                }}
              />
              <div
                className="relative w-full h-full rounded-full overflow-hidden"
                style={{
                  border: `3px solid ${palette.primary}55`,
                  boxShadow: `0 0 48px ${palette.glow}`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sebastian.jpg"
                  alt="Sebastián García Velásquez"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div ref={textRef}>
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 block"
              style={{ color: palette.primary }}
            >
              Sobre mí
            </span>

            <h2
              className="text-3xl md:text-5xl font-bold mb-8 leading-tight"
              style={{ color: palette.text }}
            >
              Construyo software que resuelve problemas reales de negocio.
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed mb-5"
              style={{ color: palette.textMuted }}
            >
              Soy Ingeniero Informático egresado de la Universidad del Bío-Bío,
              especializado en desarrollo Full Stack con foco en backend, datos
              e integración de sistemas. Mi trabajo en Masisa S.A. —donde
              diseñé un sistema de facturación con integración SAP que redujo
              el tiempo de procesamiento en un 98%— refleja cómo entiendo el
              desarrollo: no como código aislado, sino como una herramienta
              para resolver fricciones concretas en procesos reales.
            </p>

            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: palette.textMuted }}
            >
              Fuera del trabajo formal, sigo construyendo: proyectos con IA
              aplicada, integraciones con LLMs y bases de datos vectoriales,
              y herramientas propias que despliego y mantengo en producción.
              Creo en aprender haciendo, en entender el problema antes de
              escribir la primera línea de código, y en que la mejor
              tecnología es la que la gente realmente usa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}