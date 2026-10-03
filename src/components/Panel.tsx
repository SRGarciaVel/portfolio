"use client";

import type { CSSProperties, ReactNode } from "react";
import { PaletteContext } from "@/context/PaletteContext";
import { SLIDE_PALETTES, isLightHex } from "@/lib/slidePalettes";
import type { Palette } from "@/lib/colorSystem";

/** Gives everything inside one slide its own palette and matching glass
 *  surfaces. `display: contents` keeps this wrapper out of the layout, so the
 *  slide stays a direct child for the layered pinning logic. */
export default function Panel({ index, children }: { index: number; children: ReactNode }) {
  const base = SLIDE_PALETTES[index % SLIDE_PALETTES.length];
  const palette: Palette = { ...base, timeLabel: "", seasonLabel: "" };
  const light = isLightHex(base.bg);

  const glassVars: CSSProperties = light
    ? {
        "--glass-bg": "rgba(255,255,255,0.55)",
        "--glass-border": "rgba(255,255,255,0.8)",
        "--glass-highlight": "rgba(255,255,255,0.9)",
        "--glass-shadow": "rgba(15,23,42,0.12)",
        "--glass-edge-strong": "rgba(255,255,255,0.95)",
        "--glass-edge-soft": "rgba(255,255,255,0.4)",
      } as CSSProperties
    : {
        "--glass-bg": "rgba(255,255,255,0.045)",
        "--glass-border": "rgba(255,255,255,0.14)",
        "--glass-highlight": "rgba(255,255,255,0.18)",
        "--glass-shadow": "rgba(0,0,0,0.35)",
        "--glass-edge-strong": "rgba(255,255,255,0.45)",
        "--glass-edge-soft": "rgba(255,255,255,0.15)",
      } as CSSProperties;

  return (
    <PaletteContext.Provider value={palette}>
      <div data-slide={index} style={{ display: "contents", ...glassVars }}>{children}</div>
    </PaletteContext.Provider>
  );
}
