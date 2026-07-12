export type TimeOfDay =
  | "dawn"
  | "morning"
  | "midday"
  | "afternoon"
  | "sunset"
  | "night";

export type Season = "winter" | "spring" | "summer" | "autumn";

export interface Palette {
  bg: string;
  bgSecondary: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textMuted: string;
  border: string;
  glow: string;
  timeLabel: string;
  seasonLabel: string;
}

// Chile: seasons are inverted vs northern hemisphere
export function getSeason(month: number): Season {
  if (month >= 6 && month <= 8) return "winter";   // Jun–Ago
  if (month >= 9 && month <= 11) return "spring";  // Sep–Nov
  if (month === 12 || month <= 2) return "summer";  // Dic–Feb
  return "autumn";                                   // Mar–May
}

export function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 0 && hour < 6) return "dawn";
  if (hour >= 6 && hour < 12) return "morning";
  if (hour >= 12 && hour < 15) return "midday";
  if (hour >= 15 && hour < 18) return "afternoon";
  if (hour >= 18 && hour < 20) return "sunset";
  return "night";
}

const timePalettes: Record<TimeOfDay, Omit<Palette, "timeLabel" | "seasonLabel">> = {
  dawn: {
    bg: "#0a0e1a",
    bgSecondary: "#0d1224",
    surface: "#111827",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#c4b5fd",
    text: "#e2e8f0",
    textMuted: "#94a3b8",
    border: "#1e293b",
    glow: "rgba(99,102,241,0.3)",
  },
  morning: {
    bg: "#fefce8",
    bgSecondary: "#fef9c3",
    surface: "#ffffff",
    primary: "#d97706",
    secondary: "#f59e0b",
    accent: "#fbbf24",
    text: "#1c1917",
    textMuted: "#57534e",
    border: "#e7e5e4",
    glow: "rgba(217,119,6,0.25)",
  },
  midday: {
    bg: "#f8fafc",
    bgSecondary: "#f1f5f9",
    surface: "#ffffff",
    primary: "#0284c7",
    secondary: "#0ea5e9",
    accent: "#38bdf8",
    text: "#0f172a",
    textMuted: "#475569",
    border: "#e2e8f0",
    glow: "rgba(2,132,199,0.2)",
  },
  afternoon: {
    bg: "#1a0f0a",
    bgSecondary: "#1f1208",
    surface: "#2a1810",
    primary: "#ea580c",
    secondary: "#f97316",
    accent: "#fb923c",
    text: "#fef3c7",
    textMuted: "#d97706",
    border: "#431407",
    glow: "rgba(234,88,12,0.35)",
  },
  sunset: {
    bg: "#0f0515",
    bgSecondary: "#130720",
    surface: "#1a0a2e",
    primary: "#c026d3",
    secondary: "#a855f7",
    accent: "#e879f9",
    text: "#fae8ff",
    textMuted: "#d946ef",
    border: "#3b0764",
    glow: "rgba(192,38,211,0.4)",
  },
  night: {
    bg: "#020617",
    bgSecondary: "#0a0f1e",
    surface: "#0f172a",
    primary: "#22d3ee",
    secondary: "#06b6d4",
    accent: "#67e8f9",
    text: "#f0f9ff",
    textMuted: "#7dd3fc",
    border: "#0c4a6e",
    glow: "rgba(34,211,238,0.25)",
  },
};

const seasonModifiers: Record<Season, Partial<Omit<Palette, "timeLabel" | "seasonLabel">>> = {
  winter: {
    // Cooler, less saturated — shift primaries slightly blue
    glow: undefined, // keep time glow
  },
  spring: {},
  summer: {},
  autumn: {},
};

const timeLabels: Record<TimeOfDay, string> = {
  dawn: "Madrugada",
  morning: "Mañana",
  midday: "Mediodía",
  afternoon: "Tarde",
  sunset: "Atardecer",
  night: "Noche",
};

const seasonLabels: Record<Season, string> = {
  winter: "Invierno ❄️",
  spring: "Primavera 🌸",
  summer: "Verano ☀️",
  autumn: "Otoño 🍂",
};

export function getPalette(date: Date = new Date()): Palette {
  const hour = date.getHours();
  const month = date.getMonth() + 1; // 1-indexed
  const timeOfDay = getTimeOfDay(hour);
  const season = getSeason(month);
  const base = timePalettes[timeOfDay];
  const modifier = seasonModifiers[season];

  return {
    ...base,
    ...modifier,
    glow: modifier.glow ?? base.glow,
    timeLabel: timeLabels[timeOfDay],
    seasonLabel: seasonLabels[season],
  };
}
