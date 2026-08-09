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
import Preloader from "@/components/ui/preloader";
import ScrollToTop from "@/components/ui/scroll-to-top";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  useReveal();

  return (
    <>
      <Preloader />
      <div className="relative z-[3]">
        <Header onOpenModal={() => setModalOpen(true)} />
        <Hero />
        <div className="relative z-[4]" style={{ background: "var(--base)" }}>
          <About />
          <Services />
          <Testimonials />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </div>
      <ContactWidget />
      <ScrollToTop />
      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
