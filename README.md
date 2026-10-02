<div align="center">

# Sebastián García — Portfolio

**Portafolio profesional de [Sebastián García Velásquez](https://github.com/SRGarciaVel)** — Desarrollador Full Stack especializado en backend, datos e IA aplicada.

[![Live Demo](https://img.shields.io/badge/demo-sgdev--portfolio.vercel.app-22d3ee?style=for-the-badge&logo=vercel&logoColor=white)](https://sgdev-portfolio.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white)](https://gsap.com)

</div>

![Portfolio preview](.github/screenshot.jpg)

## Sobre este proyecto

Portafolio personal construido con Next.js (App Router) y TypeScript. El fondo y las superficies "glass" del sitio cambian de paleta según la hora del día y la estación del año en Chile, así que nunca se ve exactamente igual dos veces.

- **Server Components por defecto** — la paleta de color se lee del contexto solo donde hay interactividad real, no en el árbol completo de la página.
- **GSAP** para scroll-reveals, timelines y parallax, respetando `prefers-reduced-motion` en cada animación ambiental.
- **SEO completo** — metadata, `robots.ts`, `sitemap.ts`, imagen Open Graph generada con `next/og` y structured data (`Person`).
- **Un solo motor de animación** — sin dependencias de UI redundantes.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS 4 |
| Animación | GSAP · ScrollTrigger · ScrollSmoother |
| Iconos | lucide-react |
| Hosting | Vercel |

## Correr el proyecto localmente

```bash
git clone https://github.com/SRGarciaVel/portfolio.git
cd portfolio
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run lint    # ESLint
npm run build   # Build de producción
```

## Contacto

[![GitHub](https://img.shields.io/badge/GitHub-SRGarciaVel-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/SRGarciaVel)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sebasti%C3%A1n_Garc%C3%ADa-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sebasti%C3%A1n-garc%C3%ADa-vel%C3%A1squez/)
[![Email](https://img.shields.io/badge/Email-contacto-22d3ee?style=flat-square&logo=gmail&logoColor=white)](mailto:sebastian.rgarciavelasquez@gmail.com)
