"use client";

import { usePalette } from "@/context/PaletteContext";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";

export default function Home() {
  const palette = usePalette();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Hero palette={palette} />
      <About palette={palette} />
      <Experience palette={palette} />
      <Projects palette={palette} />
      <Skills palette={palette} />
      <Certifications palette={palette} />
      <Contact palette={palette} />
    </main>
  );
}