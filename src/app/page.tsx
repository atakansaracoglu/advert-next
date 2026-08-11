"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useFullpage } from "@/hooks/use-fullpage";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Testimonials from "@/components/sections/testimonials";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import ContactWidget from "@/components/ui/contact-widget";
import ProjectModal from "@/components/ui/project-modal";
import LegalModal from "@/components/ui/legal-modal";
import Preloader from "@/components/ui/preloader";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"privacy" | "terms" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useReveal();
  useFullpage(containerRef);

  return (
    <>
      <Preloader />
      <Header onOpenModal={() => setModalOpen(true)} />
      <div ref={containerRef} className="fullpage-container">
        <div className="fullpage-wrapper">
          <div className="fullpage-section">
            <Hero />
          </div>
          <div className="fullpage-section" style={{ background: "var(--base)" }}>
            <About />
          </div>
          <div className="fullpage-section" style={{ background: "var(--base)" }}>
            <Services />
          </div>
          <div className="fullpage-section" style={{ background: "var(--base)" }}>
            <Testimonials />
            <Projects />
          </div>
          <div className="fullpage-section-auto" style={{ background: "var(--base)" }}>
            <Contact />
            <Footer
              onOpenPrivacy={() => setLegalType("privacy")}
              onOpenTerms={() => setLegalType("terms")}
            />
          </div>
        </div>
      </div>
      <ContactWidget />
      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <LegalModal type={legalType} open={!!legalType} onClose={() => setLegalType(null)} />
    </>
  );
}
