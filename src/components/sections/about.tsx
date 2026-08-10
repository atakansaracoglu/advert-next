"use client";

import { useEffect, useRef } from "react";

function ParticleGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      const r = c!.parentElement!.getBoundingClientRect();
      c!.width = r.width * dpr;
      c!.height = r.height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const pts: { theta: number; phi: number; r: number }[] = [];
    for (let i = 0; i < 220; i++) {
      pts.push({
        theta: Math.acos(2 * Math.random() - 1),
        phi: 2 * Math.PI * Math.random(),
        r: 0.38 + Math.random() * 0.04,
      });
    }

    let t = 0;
    let raf: number;
    function draw() {
      const w = c!.width / dpr,
        h = c!.height / dpr;
      ctx!.clearRect(0, 0, w, h);
      const cx = w / 2,
        cy = h / 2,
        radius = (Math.min(w, h) / 2) * 0.88;
      t += 0.003;

      const sorted = pts
        .map((p) => {
          const st = Math.sin(p.theta),
            ct2 = Math.cos(p.theta);
          const sp = Math.sin(p.phi + t),
            cp = Math.cos(p.phi + t);
          return { x: st * cp, y: ct2, z: st * sp, r: p.r };
        })
        .sort((a, b) => a.z - b.z);

      sorted.forEach((p) => {
        const depth = (p.z + 1) / 2;
        const px = cx + p.x * radius;
        const py = cy - p.y * radius;
        const sz = p.r * (1 + depth * 0.6);
        const alpha = 0.12 + depth * 0.55;
        ctx!.beginPath();
        ctx!.arc(px, py, sz, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(13,11,9,${alpha})`;
        ctx!.fill();
      });

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}

function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w: number, h: number;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, r: 0.45, color: "rgba(30,123,214,.18)" },
      { x: 0.8, y: 0.6, vx: -0.0002, vy: 0.0003, r: 0.5, color: "rgba(30,123,214,.12)" },
      { x: 0.5, y: 0.2, vx: 0.00025, vy: -0.00015, r: 0.4, color: "rgba(120,80,220,.10)" },
      { x: 0.3, y: 0.8, vx: -0.0003, vy: -0.0002, r: 0.38, color: "rgba(30,180,160,.09)" },
      { x: 0.7, y: 0.4, vx: 0.00015, vy: 0.00025, r: 0.42, color: "rgba(60,100,240,.08)" },
    ];

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = 0;
    let raf: number;

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      blobs.forEach((b) => {
        if (!reduced) {
          b.x += b.vx + Math.sin(t * 0.0007 + b.r * 10) * 0.0002;
          b.y += b.vy + Math.cos(t * 0.0005 + b.r * 8) * 0.0002;
          if (b.x < -0.2 || b.x > 1.2) b.vx *= -1;
          if (b.y < -0.2 || b.y > 1.2) b.vy *= -1;
        }
        const cx = b.x * w,
          cy = b.y * h;
        let radius = b.r * Math.max(w, h);
        const pulse = reduced ? 1 : 1 + Math.sin(t * 0.0008 + b.r * 20) * 0.08;
        radius *= pulse;
        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx!.beginPath();
        ctx!.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();
      });
      t++;
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function About() {
  return (
    <div className="relative overflow-hidden" style={{ background: "#f5f2ec" }}>
      <MeshGradient />
      <section
        className="relative z-[2]"
        id="biz-kimiz"
        style={{ padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,4vw,4rem)", maxWidth: 1180, margin: "0 auto" }}
      >
        <p
          className="reveal"
          style={{ fontFamily: "var(--font-m)", fontSize: ".66rem", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(13,11,9,.4)", marginBottom: "1.2rem" }}
        >
          Hakkımızda
        </p>
        <h2
          className="reveal"
          style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "clamp(1.8rem,3.2vw,2.6rem)", lineHeight: 1.12, letterSpacing: "-.025em", textWrap: "balance", marginBottom: ".8rem", color: "#0d0b09" }}
        >
          Teknolojiyi anlatan değil, kullanan ajans.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col">
            <div className="reveal" style={{ fontSize: ".9rem", lineHeight: 1.75, color: "rgba(13,11,9,.65)" }}>
              <p>Advert, 2014 yılından bu yana markaların dijital dönüşümüne öncülük eden bir ajans. İşin merkezinde her zaman aynı soru var: teknolojiyi işimize nasıl gerçekten entegre ederiz?</p>
              <p style={{ marginTop: "1.2rem" }}>
                Web tasarımdan otomasyona, video prodüksiyondan dijital reklamcılığa &mdash; her projemizde yapay zek&acirc;nın gücünü stratejik düşünceyle birleştiriyoruz. Amacımız sadece güzel görünen değil, ölçülebilir sonuç üreten dijital deneyimler yaratmak.
              </p>
              <p style={{ marginTop: "1.2rem", marginBottom: "1.2rem" }}>Antalya merkezli ekibimiz, yerel pazarın dinamiklerini global standartlarla buluşturarak her ölçekte markaya hizmet veriyor.</p>
            </div>
            <div className="reveal flex flex-wrap gap-[2.5rem] mt-[2.4rem]">
              {[
                { num: "10+", label: "Yıl deneyim" },
                { num: "500+", label: "Tamamlanan proje" },
                { num: "150+", label: "Aktif müşteri" },
              ].map((stat) => (
                <div key={stat.num}>
                  <div style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "clamp(2rem,3vw,2.8rem)", letterSpacing: "-.03em", lineHeight: 1, color: "#0d0b09" }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: ".76rem", color: "rgba(13,11,9,.45)", marginTop: ".4rem" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal relative w-full min-h-[420px] flex items-center justify-center">
            <style>{`
              @keyframes orbit-spin-cw { from { transform: translate(-50%,-50%) rotate(0) } to { transform: translate(-50%,-50%) rotate(360deg) } }
              @keyframes orbit-spin-ccw { from { transform: translate(-50%,-50%) rotate(0) } to { transform: translate(-50%,-50%) rotate(-360deg) } }
              @keyframes orbit-counter-cw { from { transform: translate(-50%,-50%) rotate(0) } to { transform: translate(-50%,-50%) rotate(-360deg) } }
              @keyframes orbit-counter-ccw { from { transform: translate(-50%,-50%) rotate(0) } to { transform: translate(-50%,-50%) rotate(360deg) } }
            `}</style>
            <div className="relative w-full aspect-square max-w-[420px]">
              {/* Globe center */}
              <div
                className="absolute z-[2] rounded-full cursor-pointer transition-transform duration-500 hover:scale-125"
                style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "28%", height: "28%" }}
              >
                <ParticleGlobe />
              </div>

              {/* Ring 1 */}
              <div
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{ width: "55%", height: "55%", border: "1px solid rgba(13,11,9,.1)", animation: "orbit-spin-cw 18s linear infinite", transform: "translate(-50%,-50%)" }}
              >
                <OrbitIcon style={{ top: 0, left: "50%" }} title="ChatGPT" anim="orbit-counter-cw 18s linear infinite">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="w-5 h-5" style={{ color: "rgba(13,11,9,.55)" }}>
                    <path d="M12 2L9.5 5.5 5.5 4l.5 4.2L2 11l4 2.8L5.5 18l4-1.5L12 20l2.5-3.5 4 1.5-.5-4.2L22 11l-4-2.8.5-4.2-4 1.5z" />
                  </svg>
                </OrbitIcon>
                <OrbitIcon style={{ top: "75%", left: "93%" }} title="Claude" anim="orbit-counter-cw 18s linear infinite">
                  <svg viewBox="0 0 24 24" fill="rgba(13,11,9,.55)" className="w-5 h-5">
                    <path d="M16.1 8.3l-4.1 9.2-2-4.5-4.5-2L14.7 7l1.4 1.3zM15.5 3.5L7 7.2l5.5 2.3 2.3 5.5 3.7-8.5-3-3z" />
                  </svg>
                </OrbitIcon>
                <OrbitIcon style={{ top: "75%", left: "7%" }} title="Gemini" anim="orbit-counter-cw 18s linear infinite">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                    <path d="M12 2C12 7.52 7.52 12 2 12c5.52 0 10 4.48 10 10 0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10z" fill="rgba(13,11,9,.55)" />
                  </svg>
                </OrbitIcon>
              </div>

              {/* Ring 2 */}
              <div
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{ width: "72%", height: "72%", border: "1px solid rgba(13,11,9,.1)", animation: "orbit-spin-ccw 24s linear infinite", transform: "translate(-50%,-50%)" }}
              >
                <OrbitIcon style={{ top: "50%", left: 0 }} title="Grok" anim="orbit-counter-ccw 24s linear infinite">
                  <span style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: 15, color: "rgba(13,11,9,.6)", lineHeight: 1 }}>X</span>
                </OrbitIcon>
                <OrbitIcon style={{ top: "50%", left: "100%" }} title="Perplexity" anim="orbit-counter-ccw 24s linear infinite">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: "rgba(13,11,9,.55)" }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M11 8v6M8 11h6" />
                  </svg>
                </OrbitIcon>
              </div>

              {/* Ring 3 */}
              <div
                className="absolute top-1/2 left-1/2 rounded-full"
                style={{ width: "90%", height: "90%", border: "1px solid rgba(13,11,9,.1)", animation: "orbit-spin-cw 30s linear infinite", transform: "translate(-50%,-50%)" }}
              >
                <OrbitIcon style={{ top: "15%", left: "93%" }} title="Midjourney" anim="orbit-counter-cw 30s linear infinite">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" style={{ color: "rgba(13,11,9,.55)" }}>
                    <path d="M3 18l4-6 3 4 4-8 7 10" />
                    <circle cx="8" cy="6" r="2" />
                  </svg>
                </OrbitIcon>
                <OrbitIcon style={{ top: "100%", left: "50%" }} title="Higgsfield" anim="orbit-counter-cw 30s linear infinite">
                  <span style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: 15, color: "rgba(13,11,9,.6)", lineHeight: 1 }}>Hf</span>
                </OrbitIcon>
                <OrbitIcon style={{ top: "15%", left: "7%" }} title="Stable Diffusion" anim="orbit-counter-cw 30s linear infinite">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" style={{ color: "rgba(13,11,9,.55)" }}>
                    <path d="M12 3v18M3 12h18" />
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="12" cy="12" r="8" strokeDasharray="3 3" />
                  </svg>
                </OrbitIcon>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OrbitIcon({
  style,
  title,
  anim,
  children,
}: {
  style: React.CSSProperties;
  title: string;
  anim: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="absolute w-[42px] h-[42px] flex items-center justify-center rounded-full"
      style={{
        ...style,
        border: "1px solid rgba(13,11,9,.1)",
        background: "#f5f2ec",
        animation: anim,
      }}
      title={title}
    >
      {children}
    </div>
  );
}
