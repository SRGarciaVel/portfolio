"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { usePalette } from "@/context/PaletteContext";
import Panel from "@/components/Panel";
import Image from "next/image";

type ProjectImage = { src: string; alt: string };

/** Real screenshots replace the abstract mockup for projects that have them.
 *  More than one image renders a small switcher inside the mock frame. */
const PROJECT_IMAGES: Partial<Record<string, ProjectImage[]>> = {
  gestionfactura: [
    {
      src: "/projects/gestionfactura.webp",
      alt: "Dashboard de GestionFactura con datos de ejemplo",
    },
  ],
  "tdf-edeportes": [
    {
      src: "/projects/tdf-edeportes.webp",
      alt: "Página principal de TDF e-deportes",
    },
  ],
  "tdf-random-select": [
    {
      src: "/projects/tdf-random-select-1.webp",
      alt: "Panel de control de TDF Random Select durante un baneo",
    },
    {
      src: "/projects/tdf-random-select-2.webp",
      alt: "Overlay de TDF Random Select mostrando el reveal de personajes en OBS",
    },
  ],
  "sf6-session-tracker": [
    {
      src: "/projects/sf6-session-tracker.webp",
      alt: "Dashboard de SF6 Session Tracker con datos de demostración",
    },
  ],
};
import { prefersReducedMotion } from "@/lib/motionPrefs";
import type { Palette } from "@/lib/colorSystem";

gsap.registerPlugin(ScrollTrigger);

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LockIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

const PROJECTS = [
  {
    id: "gestionfactura",
    index: "01",
    title: "GestionFactura",
    subtitle: "Sistema de Gestión de Facturación Móvil",
    description:
      "Plataforma completa para Masisa S.A. que automatiza la facturación de telefonía corporativa. Pipeline ETL con sincronización a SAP, dashboard de KPIs en tiempo real y autenticación segura con JWT.",
    result: "↓ 98% tiempo de procesamiento · 0% errores en imputación",
    stack: ["Python", "Flask", "React", "PostgreSQL", "JWT", "SAP"],
    variant: "dashboard" as const,
    github: null,
    private: true,
  },
  {
    id: "tdf-edeportes",
    index: "02",
    title: "TDF e-deportes",
    subtitle: "Plataforma de Organización y Comunidad para Esports",
    description:
      "Plataforma completa para un club de esports de Street Fighter 6: autenticación con Twitch OAuth, perfiles de jugador con estadísticas reales obtenidas por scraping automatizado del perfil oficial de Capcom, tier list de la comunidad y panel de administración para el staff.",
    result: "Scraping automatizado vía GitHub Actions · Twitch OAuth · En producción",
    stack: ["FastAPI", "React", "PostgreSQL", "Supabase", "Playwright", "Twitch OAuth"],
    variant: "dashboard" as const,
    github: "https://github.com/SRGarciaVel/tdf-edeportes",
    private: false,
  },
  {
    id: "tdf-random-select",
    index: "03",
    title: "TDF Random Select",
    subtitle: "Draft de Torneo con Overlay en Vivo para OBS",
    description:
      "Herramienta de escritorio para Windows que arma el draft de selección random de personaje en torneos: baneo alternado sobre una grilla compartida, asignación random del personaje final y overlay integrado a OBS Studio vía WebSocket, sin depender de la web del club para funcionar durante el stream.",
    result: "Integración nativa con OBS · 100% local, sin backend externo",
    stack: ["Python", "PyQt6", "Flask", "Socket.IO", "React", "OBS WebSocket"],
    variant: "draft" as const,
    github: "https://github.com/SRGarciaVel/tdf-random-select",
    private: false,
  },
  {
    id: "sf6-session-tracker",
    index: "04",
    title: "SF6 Session Tracker",
    subtitle: "Tracker de Sesión y Overlay para Stream en Tiempo Real",
    description:
      "Dashboard y overlay de OBS que siguen una sesión de Street Fighter 6 en vivo: victorias, derrotas, racha y cambio de LP por personaje, sin hotkeys ni conteo manual. Una extensión de navegador (SST Companion) lee los datos de Buckler's Boot Camp dentro de la sesión del propio usuario; las credenciales de Capcom nunca llegan al servidor.",
    result: "Actualizaciones en tiempo real vía SSE · Closed beta",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "SSE", "Chrome Extension"],
    variant: "dashboard" as const,
    github: "https://github.com/SRGarciaVel/sf6-session-tracker",
    private: false,
  },
];

function DashboardMock({ palette }: { palette: Palette }) {
  const barsRef = useRef<HTMLDivElement>(null);
  const heights = [40, 65, 50, 85, 60, 95, 70];

  useEffect(() => {
    if (!barsRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barsRef.current!.children,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          stagger: 0.06,
          ease: "power3.out",
          transformOrigin: "bottom",
          scrollTrigger: { trigger: barsRef.current, start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-end gap-3 p-6">
      <div className="flex gap-2 mb-2">
        {[palette.primary, palette.secondary, palette.accent].map((c, i) => (
          <div
            key={i}
            className="chip rounded-lg px-3 py-2 flex-1"
            style={{ borderColor: c + "40" }}
          >
            <div className="w-6 h-1.5 rounded-full mb-1.5" style={{ backgroundColor: c }} />
            <div className="w-10 h-1 rounded-full opacity-40" style={{ backgroundColor: palette.textMuted }} />
          </div>
        ))}
      </div>
      <div ref={barsRef} className="flex items-end gap-2 h-24">
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md"
            style={{
              height: `${h}%`,
              backgroundColor: i % 2 === 0 ? palette.primary : palette.secondary,
              opacity: 0.75,
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Alternating character-ban grid, echoing TDF Random Select's actual draft
 *  flow: cells dim one by one, then the last one left lights up as the
 *  random pick, before the cycle resets. */
function DraftMock({ palette }: { palette: Palette }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { ref: viewRef, inView } = useInView<HTMLDivElement>(0.2);

  useEffect(() => {
    if (!gridRef.current || prefersReducedMotion()) return;
    const cells = Array.from(gridRef.current.children);
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8, paused: true });

    cells.slice(0, -1).forEach((cell, i) => {
      tl.to(cell, { opacity: 0.15, scale: 0.85, duration: 0.3, ease: "power2.out" }, i * 0.2);
    });
    tl.to(
      cells[cells.length - 1],
      { scale: 1.15, borderColor: palette.primary, duration: 0.4, ease: "back.out(2)" },
      "+=0.1"
    );
    tl.to(cells, { opacity: 1, scale: 1, borderColor: palette.border, duration: 0.3 }, "+=1");

    tlRef.current = tl;
    return () => {
      tl.kill();
    };
  }, [palette.primary, palette.border]);

  useEffect(() => {
    if (!tlRef.current) return;
    if (inView) {
      tlRef.current.play();
    } else {
      tlRef.current.pause();
    }
  }, [inView]);

  return (
    <div ref={viewRef} className="w-full h-full flex items-center justify-center p-6">
      <div ref={gridRef} className="grid grid-cols-4 gap-2.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-lg chip"
            style={{ border: `1.5px solid ${palette.border}` }}
          />
        ))}
      </div>
    </div>
  );
}

const MOCKS = {
  dashboard: DashboardMock,
  draft: DraftMock,
};

const FIRST_SLIDE_INDEX = 5;

type Project = (typeof PROJECTS)[number];

function ProjectSlide({ project, index }: { project: Project; index: number }) {
  const palette = usePalette();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const Mock = MOCKS[project.variant];
  const images = PROJECT_IMAGES[project.id];
  const [activeImage, setActiveImage] = useState(0);
  const imageFirst = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
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
      }
      if (rowRef.current) {
        gsap.fromTo(
          rowRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: rowRef.current, start: "top 80%" },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={index === 0 ? "proyectos" : undefined}
      className="panel relative flex flex-col justify-center min-h-svh md:h-svh md:overflow-hidden px-6 md:px-16 lg:px-24 py-24 md:py-0"
      style={{ backgroundColor: palette.bg }}
    >
      <div
        className="absolute w-[38vw] h-[38vw] rounded-full blur-[140px] opacity-15 top-[15%] right-[-10%] pointer-events-none"
        style={{ backgroundColor: palette.primary }}
      />

      {index === 0 && (
        <div ref={headerRef} className="max-w-3xl mb-12 md:mb-14 relative z-10">
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 block"
            style={{ color: palette.primary }}
          >
            Proyectos
          </span>
          <h2
            className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight"
            style={{ color: palette.text }}
          >
            Cosas que construí{" "}
            <span style={{ color: palette.primary }}>y sostengo en producción</span>
          </h2>
        </div>
      )}

      <div className="relative z-10">
        <div ref={rowRef} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className={imageFirst ? "md:order-1" : "md:order-2"}>
            <div className="glass rounded-[2rem] aspect-[4/3] overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-9 flex items-center gap-1.5 px-4 border-b" style={{ borderColor: palette.border }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.textMuted, opacity: 0.4 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.textMuted, opacity: 0.4 }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: palette.textMuted, opacity: 0.4 }} />
              </div>
              <div className="absolute inset-0 top-9">
                {images ? (
                  <Image
                    key={images[activeImage].src}
                    src={images[activeImage].src}
                    alt={images[activeImage].alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <Mock palette={palette} />
                )}
              </div>

              {images && images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                  {images.map((img, i) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      aria-label={`Ver captura ${i + 1} de ${images.length}`}
                      aria-current={i === activeImage}
                      className="w-1.5 h-1.5 rounded-full transition-transform duration-200"
                      style={{
                        backgroundColor: i === activeImage ? palette.primary : palette.textMuted,
                        opacity: i === activeImage ? 1 : 0.5,
                        transform: i === activeImage ? "scale(1.4)" : "scale(1)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={imageFirst ? "md:order-2" : "md:order-1"}>
            <span className="text-sm font-bold tracking-widest mb-4 block" style={{ color: palette.primary, opacity: 0.6 }}>
              {project.index}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight" style={{ color: palette.text }}>
              {project.title}
            </h3>
            <p className="text-sm font-medium mb-5" style={{ color: palette.primary }}>
              {project.subtitle}
            </p>
            <p className="text-base leading-relaxed mb-5" style={{ color: palette.textMuted }}>
              {project.description}
            </p>
            <p className="text-sm font-semibold mb-6" style={{ color: palette.text }}>
              {project.result}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {project.stack.map((tech) => (
                <span key={tech} className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium" style={{ color: palette.textMuted }}>
                  {tech}
                </span>
              ))}
            </div>

            {project.private ? (
              <span
                className="inline-flex items-center gap-2 glass-pill rounded-full px-5 py-2.5 text-sm font-medium"
                style={{ color: palette.textMuted, opacity: 0.75 }}
              >
                <LockIcon size={14} />
                Código privado · Propiedad de la empresa
              </span>
            ) : (
              <a
                href={project.github ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass-pill rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 hover:scale-105"
                style={{ color: palette.text }}
              >
                <GithubIcon size={16} />
                Ver código
                <ExternalLink size={13} style={{ opacity: 0.6 }} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <>
      {PROJECTS.map((project, i) => (
        <Panel key={project.id} index={FIRST_SLIDE_INDEX + i}>
          <ProjectSlide project={project} index={i} />
        </Panel>
      ))}
    </>
  );
}
