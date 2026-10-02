export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

/** Shared visual for opengraph-image.tsx and twitter-image.tsx — same
 *  dark/cyan mark used in the site favicon (src/app/icon.svg), rendered
 *  through @vercel/og's Satori engine (plain inline styles only, no
 *  blur/backdrop-filter support there). */
export function OgCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#020617",
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(34,211,238,0.35), transparent 45%), radial-gradient(circle at 85% 85%, rgba(6,182,212,0.25), transparent 45%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 48 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 72,
            height: 72,
            borderRadius: 20,
            backgroundColor: "#0f172a",
            border: "2px solid rgba(34,211,238,0.4)",
            color: "#22d3ee",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          SG
        </div>
        <div style={{ fontSize: 26, color: "#7dd3fc", letterSpacing: 4, textTransform: "uppercase" }}>
          Portafolio
        </div>
      </div>

      <div style={{ fontSize: 72, fontWeight: 700, color: "#f0f9ff", letterSpacing: -1 }}>
        Sebastián García Velásquez
      </div>
      <div style={{ fontSize: 34, color: "#7dd3fc", marginTop: 20 }}>
        Desarrollador Full Stack · Backend · IA Aplicada
      </div>
    </div>
  );
}
