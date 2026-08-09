"use client";

import { useEffect, useRef, useCallback } from "react";

const slides = [
  { image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=800&fit=crop&q=80", title: "Kurumsal Web Sitesi", desc: "SEO uyumlu, mobil öncelikli tasarımlarla markaları dijitale taşıyoruz.", badge: "Web Tasarım" },
  { image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=800&fit=crop&q=80", title: "CRM Otomasyon Sistemi", desc: "İş süreçlerini yapay zeka ile otomatikleştiren akıllı altyapılar.", badge: "Otomasyon" },
  { image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=800&fit=crop&q=80", title: "Marka Tanıtım Filmi", desc: "Drone çekimi, animasyon ve kurguyla markanızın hikâyesini anlatıyoruz.", badge: "Video" },
  { image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=600&h=800&fit=crop&q=80", title: "Google Ads Kampanyası", desc: "Veriye dayalı stratejilerle reklam yatırımından maksimum geri dönüş.", badge: "Reklam" },
  { image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=800&fit=crop&q=80", title: "Sosyal Medya Yönetimi", desc: "İçerik üretimi, topluluk yönetimi ve performans analiziyle büyüme.", badge: "Sosyal Medya" },
];

export default function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    progress: 0,
    targetProgress: 0,
    isDragging: false,
    startX: 0,
    startProgress: 0,
    lastX: 0,
    velocity: 0,
    autoTimer: null as ReturnType<typeof setInterval> | null,
  });
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const getConfig = useCallback(() => {
    const w = window.innerWidth;
    if (w < 640) return { sens: 120, xMul: 80, yMul: 18, rotMul: 7, scaleMul: 0.055, distDiv: 100, velDiv: 400 };
    if (w < 1024) return { sens: 180, xMul: 120, yMul: 28, rotMul: 9, scaleMul: 0.08, distDiv: 140, velDiv: 600 };
    return { sens: 220, xMul: 160, yMul: 36, rotMul: 11, scaleMul: 0.1, distDiv: 180, velDiv: 750 };
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const total = slides.length;
    const s = stateRef.current;
    const cards = cardsRef.current;

    function updateCards() {
      const cfg = getConfig();
      cards.forEach((card, i) => {
        let diff = (i - s.progress) % total;
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        const absD = Math.abs(diff);
        const x = diff * cfg.xMul;
        const rot = absD < 0.05 ? 0 : diff * cfg.rotMul;
        const y = absD < 0.05 ? 0 : absD * cfg.yMul;
        const centerBoost = absD < 1 ? 1.08 * (1 - absD) + absD : 1;
        const sc = Math.max(0.5, (1 - absD * cfg.scaleMul) * centerBoost);
        const z = Math.round(100 - absD * 10);
        let op = 1;
        const half = total / 2;
        if (absD > half - 0.5) op = Math.max(0, (half - absD) * 2);
        const dimOp = Math.min(0.5, absD * 0.25);
        const infoOp = absD < 0.5 ? 1 - absD * 2 : 0;

        card.style.transform = `translate3d(${x}px,${y}px,0) rotate(${rot}deg) scale(${sc})`;
        card.style.opacity = String(op);
        card.style.zIndex = String(z);
        const dim = card.querySelector<HTMLElement>(".carousel-card-dim");
        if (dim) dim.style.background = `rgba(0,0,0,${dimOp})`;
        const info = card.querySelector<HTMLElement>(".carousel-info");
        if (info) info.style.opacity = String(infoOp);
      });
    }

    let raf: number;
    function animationLoop() {
      if (!s.isDragging) {
        const diff = s.targetProgress - s.progress;
        s.progress += diff * 0.06;
        if (Math.abs(diff) < 0.0005) s.progress = s.targetProgress;
      }
      updateCards();
      raf = requestAnimationFrame(animationLoop);
    }

    function startAuto() {
      stopAuto();
      s.autoTimer = setInterval(() => { s.targetProgress = Math.round(s.targetProgress) + 1; }, 5000);
    }
    function stopAuto() {
      if (s.autoTimer) { clearInterval(s.autoTimer); s.autoTimer = null; }
    }

    function onPointerDown(e: MouseEvent | TouchEvent) {
      stopAuto();
      s.isDragging = true;
      s.startX = "touches" in e ? e.touches[0].clientX : e.clientX;
      s.startProgress = s.progress;
      s.lastX = s.startX;
      s.velocity = 0;
    }
    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!s.isDragging) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const cfg = getConfig();
      const delta = -(x - s.lastX) / cfg.sens;
      s.progress += delta;
      s.velocity = -(x - s.lastX);
      s.lastX = x;
    }
    function onPointerUp() {
      if (!s.isDragging) return;
      s.isDragging = false;
      const cfg = getConfig();
      const distShift = -(s.lastX - s.startX) / cfg.distDiv;
      const velShift = -s.velocity / cfg.velDiv;
      let totalShift = Math.round(distShift + velShift);
      totalShift = Math.max(-3, Math.min(3, totalShift));
      s.targetProgress = Math.round(s.startProgress) + totalShift;
      startAuto();
    }

    wrap.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    wrap.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    let wheelLocked = false;
    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (wheelLocked) return;
      if (Math.abs(e.deltaX) < 8) return;
      wheelLocked = true;
      stopAuto();
      s.targetProgress = Math.round(s.targetProgress) + (e.deltaX > 0 ? 1 : -1);
      setTimeout(() => { wheelLocked = false; startAuto(); }, 1200);
    }
    wrap.addEventListener("wheel", onWheel, { passive: false });

    updateCards();
    raf = requestAnimationFrame(animationLoop);
    startAuto();

    return () => {
      cancelAnimationFrame(raf);
      stopAuto();
      wrap.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      wrap.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      wrap.removeEventListener("wheel", onWheel);
    };
  }, [getConfig]);

  return (
    <section
      id="projelerimiz"
      style={{ padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,4vw,4rem)", maxWidth: 1180, margin: "0 auto" }}
    >
      <p className="reveal" style={{ fontFamily: "var(--font-m)", fontSize: ".66rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--cream-46)", marginBottom: "1.2rem" }}>
        Projelerimiz
      </p>
      <h2 className="reveal" style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "clamp(1.8rem,3.2vw,2.6rem)", lineHeight: 1.12, letterSpacing: "-.025em", textWrap: "balance", marginBottom: ".8rem" }}>
        İşlerimiz bizim yerimize konuşsun.
      </h2>
      <p className="reveal" style={{ fontSize: ".92rem", color: "var(--cream-70)", maxWidth: 540, marginBottom: "3rem", lineHeight: 1.7 }}>
        Farklı sektörlerden markalara ürettiğimiz çözümlerden bazıları. Her proje, müşterimizin hedeflerine özel tasarlandı.
      </p>

      <div
        ref={wrapRef}
        className="reveal relative w-full flex items-center justify-center overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{ height: "clamp(320px,50vw,520px)", touchAction: "pan-y" }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="absolute pointer-events-none overflow-hidden"
            style={{
              width: "clamp(180px,38vw,280px)",
              height: "clamp(260px,50vw,400px)",
              borderRadius: 20,
              willChange: "transform,opacity",
              background: "var(--cream-08)",
            }}
          >
            <img src={slide.image} alt={slide.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
            <div className="carousel-card-dim absolute inset-0 pointer-events-none" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,.78) 0%,rgba(0,0,0,.18) 40%,transparent 100%)" }} />
            <div
              className="absolute"
              style={{
                top: "clamp(.6rem,1.5vw,1.2rem)",
                right: "clamp(.6rem,1.5vw,1.2rem)",
                padding: ".3rem .7rem",
                borderRadius: 100,
                background: "rgba(255,255,255,.92)",
                backdropFilter: "blur(8px)",
                fontFamily: "var(--font-b)",
                fontSize: ".62rem",
                fontWeight: 700,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "#111",
              }}
            >
              {slide.badge}
            </div>
            <div
              className="carousel-info absolute text-white"
              style={{ bottom: "clamp(1rem,2.5vw,2rem)", left: "clamp(.8rem,2vw,1.4rem)", right: "clamp(.8rem,2vw,1.4rem)" }}
            >
              <p style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "clamp(.88rem,1.8vw,1.2rem)", lineHeight: 1.2, marginBottom: ".3rem" }}>{slide.title}</p>
              <p className="hidden sm:block" style={{ fontSize: "clamp(.7rem,1.2vw,.82rem)", color: "rgba(255,255,255,.7)", lineHeight: 1.5, fontStyle: "italic" }}>{slide.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
