"use client";

import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
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
import WebMCP from "@/components/ui/webmcp";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<"privacy" | "terms" | null>(null);
  useReveal();

  return (
    <>
      <Preloader />
      <Header onOpenModal={() => setModalOpen(true)} />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Projects />
        <Contact />
        <Footer
          onOpenPrivacy={() => setLegalType("privacy")}
          onOpenTerms={() => setLegalType("terms")}
        />
      </main>
      <ContactWidget />
      <WebMCP />
      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <LegalModal type={legalType} open={!!legalType} onClose={() => setLegalType(null)} />
    </>
  );
}
