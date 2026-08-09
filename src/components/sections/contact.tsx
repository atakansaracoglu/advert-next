"use client";

import { useEffect, useRef } from "react";

function BeamMapCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const IDLE = 42, HOVER = 240, K = 30, D = 11;
    let angle = 200, speed = IDLE, vel = 0, target = IDLE, last = 0;
    let raf: number;

    const onEnter = () => { target = HOVER; };
    const onLeave = () => { target = IDLE; };
    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);

    function frame(now: number) {
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      vel += (K * (target - speed) - D * vel) * dt;
      speed += vel * dt;
      angle += speed * dt;
      card!.style.setProperty("--beam-angle", (((angle % 360) + 360) % 360).toFixed(1) + "deg");
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="reveal relative isolate overflow-hidden mt-[2.4rem]"
      style={{ background: "rgba(13,11,9,.04)", border: "1px solid rgba(13,11,9,.1)", borderRadius: 20 }}
    >
      <div
        className="absolute -inset-px pointer-events-none z-[1]"
        style={{
          borderRadius: 20,
          padding: 2,
          background: `conic-gradient(from var(--beam-angle,0deg),
            transparent 0deg, transparent 18deg,
            rgba(74,144,217,.06) 36deg, rgba(74,144,217,.5) 56deg, rgba(100,180,255,.75) 60deg,
            transparent 63deg, transparent 198deg,
            rgba(233,86,74,.06) 216deg, rgba(233,86,74,.45) 252deg, rgba(255,120,100,.7) 258deg,
            transparent 261deg, transparent 360deg)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />
      <div
        className="absolute -inset-px pointer-events-none -z-[1]"
        style={{
          borderRadius: 20,
          background: `conic-gradient(from var(--beam-angle,0deg),
            transparent 0deg, transparent 18deg,
            rgba(74,144,217,.06) 36deg, rgba(74,144,217,.5) 56deg, rgba(100,180,255,.75) 60deg,
            transparent 63deg, transparent 198deg,
            rgba(233,86,74,.06) 216deg, rgba(233,86,74,.45) 252deg, rgba(255,120,100,.7) 258deg,
            transparent 261deg, transparent 360deg)`,
          filter: "blur(14px)",
          opacity: 0.3,
        }}
      />
      {children}
    </div>
  );
}

export default function Contact() {
  return (
    <div className="relative overflow-hidden" style={{ background: "#f5f2ec" }}>
      <section
        id="bize-ulasin"
        style={{ padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,4vw,4rem)", maxWidth: 1180, margin: "0 auto" }}
      >
        <p className="reveal" style={{ fontFamily: "var(--font-m)", fontSize: ".66rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(13,11,9,.4)", marginBottom: "1.2rem" }}>
          İletişim
        </p>
        <h2 className="reveal" style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "clamp(1.8rem,3.2vw,2.6rem)", lineHeight: 1.12, letterSpacing: "-.025em", textWrap: "balance", marginBottom: ".8rem", color: "#0d0b09" }}>
          Bir sonraki projeniz için konuşalım.
        </h2>
        <p className="reveal" style={{ fontSize: ".92rem", color: "rgba(13,11,9,.55)", maxWidth: 540, marginBottom: "3rem", lineHeight: 1.7 }}>
          Fikriniz hazır olsun ya da olmasın &mdash; bir kahve eşliğinde konuşmak için her zaman varız.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ marginBottom: "3rem" }}>
          <div className="reveal">
            <p style={{ fontFamily: "var(--font-m)", fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(13,11,9,.4)", marginBottom: ".8rem" }}>Adres</p>
            <p style={{ fontSize: ".9rem", lineHeight: 1.8, color: "rgba(13,11,9,.65)" }}>
              Güzeloba Mah. 2139 Sok. No:21/C<br />Muratpaşa / Antalya
            </p>
          </div>
          <div className="reveal">
            <p style={{ fontFamily: "var(--font-m)", fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(13,11,9,.4)", marginBottom: ".8rem" }}>Telefon</p>
            <p style={{ fontSize: ".9rem", lineHeight: 1.8, color: "rgba(13,11,9,.65)" }}>
              <a href="tel:+905322935129" className="no-underline transition-colors duration-300" style={{ color: "rgba(13,11,9,.65)" }}>+90 532 293 51 29</a><br />
              <a href="tel:+902422555323" className="no-underline transition-colors duration-300" style={{ color: "rgba(13,11,9,.65)" }}>+90 242 255 53 23</a>
            </p>
          </div>
          <div className="reveal">
            <p style={{ fontFamily: "var(--font-m)", fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(13,11,9,.4)", marginBottom: ".8rem" }}>E-Posta</p>
            <p style={{ fontSize: ".9rem", lineHeight: 1.8, color: "rgba(13,11,9,.65)" }}>
              <a href="mailto:info@advert.com.tr" className="no-underline transition-colors duration-300" style={{ color: "rgba(13,11,9,.65)" }}>info@advert.com.tr</a><br />
              <a href="mailto:satis@advert.com.tr" className="no-underline transition-colors duration-300" style={{ color: "rgba(13,11,9,.65)" }}>satis@advert.com.tr</a>
            </p>
          </div>
        </div>

        <BeamMapCard>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.2255555647207!2d30.78493167663695!3d36.86101956426745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39b0344d55c75%3A0x8843f4161691e323!2sAdvert%20Web%20Tasar%C4%B1m%20Antalya%20%7C%20Dijital%20Reklam%20Ajans%C4%B1!5e0!3m2!1str!2str!4v1786207541031!5m2!1str!2str"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full block border-0"
            style={{ height: 320, filter: "grayscale(1) brightness(.95)", borderRadius: 18 }}
          />
        </BeamMapCard>
      </section>
    </div>
  );
}
