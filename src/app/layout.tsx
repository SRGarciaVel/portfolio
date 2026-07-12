import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PaletteProvider } from "@/context/PaletteContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
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

export const metadata: Metadata = {
  title: "Sebastián García — Desarrollador Full Stack",
  description:
    "Portafolio de Sebastián García Velásquez. Ingeniero Informático, Full Stack Developer especializado en Python, React, PostgreSQL e IA aplicada.",
  keywords: [
    "desarrollador full stack",
    "python",
    "react",
    "postgresql",
    "chile",
    "ingeniero informatico",
  ],
  authors: [{ name: "Sebastián García Velásquez" }],
  openGraph: {
    title: "Sebastián García — Desarrollador Full Stack",
    description:
      "Portafolio interactivo con paleta de colores dinámica según hora y estación.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PaletteProvider>
          <Navbar />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </PaletteProvider>
      </body>
    </html>
  );
}