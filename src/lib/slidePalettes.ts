import type { Palette } from "@/lib/colorSystem";

export type SlidePalette = Omit<Palette, "timeLabel" | "seasonLabel">;

/** One palette per slide, in page order. Every slide is a cool hue (teal to
 *  violet) and the slides alternate dark and light for rhythm, so the scroll
 *  reads as one family. Index matches the panel's position on the page. Edit these values to tune the look. */
export const SLIDE_PALETTES: SlidePalette[] = [
  // 0 Hero: abismo (dark, cyan)
  { bg: "#040a14", bgSecondary: "#071426", surface: "#0b1d33", primary: "#22d3ee", secondary: "#0ea5e9", accent: "#67e8f9", text: "#f0f9ff", textMuted: "#7dd3fc", border: "#0c4a6e", glow: "rgba(34,211,238,0.25)" },
  // 1 About: ola clara (light, blue)
  { bg: "#f0f9ff", bgSecondary: "#e0f2fe", surface: "#ffffff", primary: "#0369a1", secondary: "#0284c7", accent: "#38bdf8", text: "#0c1a2b", textMuted: "#334155", border: "#bae6fd", glow: "rgba(3,105,161,0.2)" },
  // 2 Experience 1: bosque (dark, teal)
  { bg: "#04211f", bgSecondary: "#062b28", surface: "#0a3834", primary: "#2dd4bf", secondary: "#0f766e", accent: "#5eead4", text: "#ecfdf5", textMuted: "#99f6e4", border: "#115e59", glow: "rgba(45,212,191,0.25)" },
  // 3 Experience 2: menta (light, teal)
  { bg: "#f7fdfc", bgSecondary: "#ecfdf5", surface: "#ffffff", primary: "#0f766e", secondary: "#14b8a6", accent: "#5eead4", text: "#052e2b", textMuted: "#3f6b66", border: "#ccfbf1", glow: "rgba(15,118,110,0.2)" },
  // 4 Experience 3: medianoche (dark, indigo)
  { bg: "#0b0f2e", bgSecondary: "#111640", surface: "#161c4f", primary: "#818cf8", secondary: "#6366f1", accent: "#a5b4fc", text: "#eef2ff", textMuted: "#a5b4fc", border: "#312e81", glow: "rgba(129,140,248,0.28)" },
  // 5 Projects 1: lavanda (light, indigo)
  { bg: "#f5f7ff", bgSecondary: "#eef2ff", surface: "#ffffff", primary: "#4338ca", secondary: "#6366f1", accent: "#818cf8", text: "#111827", textMuted: "#4b5563", border: "#c7d2fe", glow: "rgba(67,56,202,0.18)" },
  // 6 Projects 2: crepusculo (dark, violet)
  { bg: "#0a0716", bgSecondary: "#120c24", surface: "#1a1133", primary: "#c084fc", secondary: "#a855f7", accent: "#e9d5ff", text: "#faf5ff", textMuted: "#d8b4fe", border: "#3b0764", glow: "rgba(192,132,252,0.3)" },
  // 7 Projects 3: cielo (light, cyan)
  { bg: "#ecfeff", bgSecondary: "#cffafe", surface: "#ffffff", primary: "#0e7490", secondary: "#06b6d4", accent: "#67e8f9", text: "#083344", textMuted: "#155e75", border: "#a5f3fc", glow: "rgba(14,116,144,0.2)" },
  // 8 Projects 4: marino (dark, blue)
  { bg: "#061a33", bgSecondary: "#0a2442", surface: "#0f2e52", primary: "#38bdf8", secondary: "#2563eb", accent: "#7dd3fc", text: "#eff6ff", textMuted: "#93c5fd", border: "#1e3a8a", glow: "rgba(56,189,248,0.25)" },
  // 9 Skills: niebla (light, slate-teal)
  { bg: "#f1f5f9", bgSecondary: "#e2e8f0", surface: "#ffffff", primary: "#0f766e", secondary: "#0891b2", accent: "#22d3ee", text: "#0f172a", textMuted: "#475569", border: "#cbd5e1", glow: "rgba(15,118,110,0.18)" },
  // 10 Certifications: noche (dark, deep indigo)
  { bg: "#070a24", bgSecondary: "#0c1033", surface: "#121847", primary: "#a5b4fc", secondary: "#818cf8", accent: "#c7d2fe", text: "#eef2ff", textMuted: "#a5b4fc", border: "#312e81", glow: "rgba(165,180,252,0.25)" },
  // 11 Contact: perla (light, lavender-violet)
  { bg: "#faf5ff", bgSecondary: "#f3e8ff", surface: "#ffffff", primary: "#7e22ce", secondary: "#a855f7", accent: "#c084fc", text: "#1e1333", textMuted: "#5b4a78", border: "#e9d5ff", glow: "rgba(126,34,206,0.18)" },
];

export function isLightHex(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}
