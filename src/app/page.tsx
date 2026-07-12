"use client";

import { useEffect } from "react";
import { useLivePalette } from "@/hooks/useLivePalette";
import Hero from "@/components/Hero";

export default function Home() {
  const palette = useLivePalette();

  useEffect(() => {
    console.log(
      `%c🎨 ${palette.timeLabel} · ${palette.seasonLabel}`,
      `color: ${palette.primary}; font-size: 14px; font-weight: bold;`
    );
  }, [palette]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Hero palette={palette} />
    </main>
  );
}
