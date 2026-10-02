import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PaletteProvider } from "@/context/PaletteContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://sgdev-portfolio.vercel.app";
const title = "Sebastián García · Desarrollador Full Stack";
const description =
  "Portafolio de Sebastián García Velásquez. Ingeniero Informático, Full Stack Developer especializado en Python, React, PostgreSQL e IA aplicada.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Sebastián García",
  },
  description,
  keywords: [
    "desarrollador full stack",
    "python",
    "react",
    "postgresql",
    "chile",
    "ingeniero informatico",
  ],
  authors: [{ name: "Sebastián García Velásquez", url: siteUrl }],
  creator: "Sebastián García Velásquez",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description:
      "Portafolio interactivo con paleta de colores dinámica según hora y estación.",
    url: siteUrl,
    siteName: "Sebastián García · Portafolio",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sebastián García Velásquez",
  url: siteUrl,
  jobTitle: "Desarrollador Full Stack",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad del Bío-Bío",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Pedro de la Paz",
    addressCountry: "CL",
  },
  sameAs: [
    "https://github.com/SRGarciaVel",
    "https://www.linkedin.com/in/sebasti%C3%A1n-garc%C3%ADa-vel%C3%A1squez/",
  ],
  knowsAbout: [
    "Python",
    "React",
    "PostgreSQL",
    "FastAPI",
    "TypeScript",
    "Inteligencia Artificial Aplicada",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <PaletteProvider>
          <Navbar />
          {children}
        </PaletteProvider>
      </body>
    </html>
  );
}