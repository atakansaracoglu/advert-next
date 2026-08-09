"use client";

import { useEffect, useRef } from "react";

const services = [
  { num: "01", title: "Web Tasarım", body: "Sadece göze hitap eden değil, dönüşüm sağlayan web siteleri. SEO uyumlu, mobil öncelikli, kullanıcı deneyimini merkeze alan tasarımlar geliştiriyoruz." },
  { num: "02", title: "Otomasyon", body: "İş süreçlerinizi yapay zekâ ile otomatikleştirin. CRM entegrasyonlarından chatbot sistemlerine, tekrarlayan işleri teknolojiye bırakın." },
  { num: "03", title: "Video Prodüksiyon", body: "Markanızın hikâyesini görselleştiriyoruz. Tanıtım filmleri, sosyal medya içerikleri, drone çekimleri ve animasyon — her formatta üretim." },
  { num: "04", title: "Dijital Reklamcılık", body: "Google, Meta, Yandex — doğru kitleye, doğru zamanda, doğru mesajla. Veriye dayalı kampanyalarla reklam yatırımınızdan maksimum geri dönüş." },
];

function BeamCard({ num, title, body }: { num: string; title: string; body: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const IDLE = 42, HOVER = 240, K = 30, D = 11;
    let angle = (parseInt(num) * 137.508) % 360;
    let speed = IDLE, vel = 0, target = IDLE;
    let last = 0;
    let raf: number;

    const onEnter = () => { target = HOVER; };
    const onLeave = () => { target = IDLE; };

    card.addEventListener("pointerenter", onEnter);
    card.addEventListener("pointerleave", onLeave);

    function frame(now: number) {
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const a = K * (target - speed) - D * vel;
      vel += a * dt;
      speed += vel * dt;
      angle += speed * dt;
      const deg = ((angle % 360) + 360) % 360;
      card!.style.setProperty("--beam-angle", deg.toFixed(1) + "deg");
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, [num]);

  return (
    <div
      ref={cardRef}
      className="reveal relative isolate overflow-hidden"
      style={{
        background: "var(--cream-08)",
        border: "1px solid var(--cream-16)",
        borderRadius: 20,
        padding: "2rem 1.8rem",
      }}
    >
      <div
        className="absolute -inset-px pointer-events-none z-[1]"
        style={{
          borderRadius: 20,
          padding: 2,
          background: `conic-gradient(from var(--beam-angle,0deg),
            transparent 0deg, transparent 18deg,
            rgba(74,144,217,.04) 36deg, rgba(74,144,217,.45) 56deg, rgba(100,180,255,.7) 60deg,
            transparent 63deg, transparent 198deg,
            rgba(233,86,74,.04) 216deg, rgba(233,86,74,.4) 252deg, rgba(255,120,100,.65) 258deg,
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
            rgba(74,144,217,.04) 36deg, rgba(74,144,217,.45) 56deg, rgba(100,180,255,.7) 60deg,
            transparent 63deg, transparent 198deg,
            rgba(233,86,74,.04) 216deg, rgba(233,86,74,.4) 252deg, rgba(255,120,100,.65) 258deg,
            transparent 261deg, transparent 360deg)`,
          filter: "blur(14px)",
          opacity: 0.3,
        }}
      />
      <p className="relative z-[2]" style={{ fontFamily: "var(--font-m)", fontSize: ".7rem", color: "var(--cream-46)", letterSpacing: ".06em", marginBottom: "1.1rem" }}>{num}</p>
      <h3 className="relative z-[2]" style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.12rem", letterSpacing: "-.01em", marginBottom: ".65rem" }}>{title}</h3>
      <p className="relative z-[2]" style={{ fontSize: ".87rem", lineHeight: 1.62, color: "var(--cream-70)" }}>{body}</p>
    </div>
  );
}

export default function Services() {
  return (
    <section
      id="hizmetlerimiz"
      style={{ padding: "clamp(5rem,10vh,8rem) clamp(1.5rem,4vw,4rem)", maxWidth: 1180, margin: "0 auto" }}
    >
      <p className="reveal" style={{ fontFamily: "var(--font-m)", fontSize: ".66rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--cream-46)", marginBottom: "1.2rem" }}>
        Hizmetlerimiz
      </p>
      <h2 className="reveal" style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "clamp(1.8rem,3.2vw,2.6rem)", lineHeight: 1.12, letterSpacing: "-.025em", textWrap: "balance", marginBottom: ".8rem" }}>
        Dört disiplin, tek vizyon.
      </h2>
      <p className="reveal" style={{ fontSize: ".92rem", color: "var(--cream-70)", maxWidth: 540, marginBottom: "3rem", lineHeight: 1.7 }}>
        Her hizmette aynı inanç: teknolojiyi doğru kullanan markalar, rakiplerinden her zaman bir adım öndedir.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.2rem]">
        {services.map((s) => (
          <BeamCard key={s.num} {...s} />
        ))}
      </div>
    </section>
  );
}
