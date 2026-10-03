import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import LayeredStack from "@/components/LayeredStack";
import Panel from "@/components/Panel";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <LayeredStack>
        <Panel index={0}><Hero /></Panel>
        <Panel index={1}><About /></Panel>
        <Experience />
        <Projects />
        <Panel index={9}><Skills /></Panel>
        <Panel index={10}><Certifications /></Panel>
        <Panel index={11}><Contact /></Panel>
      </LayeredStack>
    </main>
  );
}
