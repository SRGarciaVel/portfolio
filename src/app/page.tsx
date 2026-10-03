import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import LayeredStack from "@/components/LayeredStack";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <LayeredStack>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </LayeredStack>
    </main>
  );
}
