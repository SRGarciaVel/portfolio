"use client";

import { usePalette } from "@/context/PaletteContext";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";

export default function Home() {
  const palette = usePalette();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Hero palette={palette} />
      <About palette={palette} />
      <Skills palette={palette} />
    </main>
  );
}