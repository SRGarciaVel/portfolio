"use client";

import { useState, useEffect } from "react";
import { getPalette, type Palette } from "@/lib/colorSystem";

export function useLivePalette(): Palette {
  const [palette, setPalette] = useState<Palette>(() => getPalette());

  useEffect(() => {
    // Apply CSS variables immediately
    applyPalette(getPalette());

    // Update every minute
    const interval = setInterval(() => {
      const next = getPalette();
      applyPalette(next);
      setPalette(next);
    }, 60_000);

    return () => clearInterval(interval);
  }, []);

  return palette;
}

function applyPalette(p: Palette) {
  const root = document.documentElement;
  root.style.setProperty("--color-bg", p.bg);
  root.style.setProperty("--color-bg-secondary", p.bgSecondary);
  root.style.setProperty("--color-surface", p.surface);
  root.style.setProperty("--color-primary", p.primary);
  root.style.setProperty("--color-secondary", p.secondary);
  root.style.setProperty("--color-accent", p.accent);
  root.style.setProperty("--color-text", p.text);
  root.style.setProperty("--color-text-muted", p.textMuted);
  root.style.setProperty("--color-border", p.border);
  root.style.setProperty("--color-glow", p.glow);
}
