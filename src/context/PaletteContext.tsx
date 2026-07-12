"use client";

import { createContext, useContext, useEffect } from "react";
import { useLivePalette } from "@/hooks/useLivePalette";
import type { Palette } from "@/lib/colorSystem";

const PaletteContext = createContext<Palette | null>(null);

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const palette = useLivePalette();
  const light = isLightColor(palette.bg);

  // Centralized glass CSS variables — every .glass / .glass-strong / .glass-pill
  // element on the page reads from these, adapting to time-of-day luminance.
  useEffect(() => {
    const root = document.documentElement;
    if (light) {
      root.style.setProperty("--glass-bg", "rgba(255,255,255,0.35)");
      root.style.setProperty("--glass-border", "rgba(255,255,255,0.6)");
      root.style.setProperty("--glass-highlight", "rgba(255,255,255,0.85)");
      root.style.setProperty("--glass-shadow", "rgba(30,41,59,0.10)");
      root.style.setProperty("--glass-edge-strong", "rgba(255,255,255,0.9)");
      root.style.setProperty("--glass-edge-soft", "rgba(255,255,255,0.35)");
    } else {
      root.style.setProperty("--glass-bg", "rgba(255,255,255,0.045)");
      root.style.setProperty("--glass-border", "rgba(255,255,255,0.14)");
      root.style.setProperty("--glass-highlight", "rgba(255,255,255,0.18)");
      root.style.setProperty("--glass-shadow", "rgba(0,0,0,0.35)");
      root.style.setProperty("--glass-edge-strong", "rgba(255,255,255,0.45)");
      root.style.setProperty("--glass-edge-soft", "rgba(255,255,255,0.15)");
    }
  }, [light]);

  return (
    <PaletteContext.Provider value={palette}>
      {children}
    </PaletteContext.Provider>
  );
}

export function usePalette(): Palette {
  const ctx = useContext(PaletteContext);
  if (!ctx) {
    throw new Error("usePalette must be used within a PaletteProvider");
  }
  return ctx;
}