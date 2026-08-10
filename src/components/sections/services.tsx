"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAAEMOh3xANclpxp1R";

const services = [
  {
    num: "01",
    title: "Web Tasarım",
    body: "Sadece göze hitap eden değil, dönüşüm sağlayan web siteleri. SEO uyumlu, mobil öncelikli, kullanıcı deneyimini merkeze alan tasarımlar geliştiriyoruz.",
    detail: "Antalya merkezli web tasarım ekibimiz, markanızın dijital vitrini olan web sitenizi stratejik düşünce ve estetik mükemmellikle inşa ediyor. Kurumsal web sitelerinden e-ticaret platformlarına, landing page'lerden çok dilli portallara kadar her projede kullanıcı deneyimini, dönüşüm optimizasyonunu ve arama motoru görünürlüğünü merkeze alıyoruz. Mobil öncelikli tasarım yaklaşımımız, sitenizin her cihazda kusursuz çalışmasını garanti eder. Next.js, React ve modern web teknolojileriyle geliştirdiğimiz siteler, hız ve performans testlerinde üst sıralarda yer alır.",
  },
  {
    num: "02",
    title: "Otomasyon",
    body: "İş süreçlerinizi yapay zekâ ile otomatikleştirin. CRM entegrasyonlarından chatbot sistemlerine, tekrarlayan işleri teknolojiye bırakın.",
    detail: "Antalya'daki işletmelerin dijital dönüşümünü hızlandıran otomasyon çözümlerimiz, tekrarlayan manuel süreçleri akıllı sistemlere dönüştürür. CRM entegrasyonları, yapay zekâ destekli chatbot sistemleri, otomatik e-posta ve SMS kampanyaları, stok yönetimi otomasyonu ve iş akışı optimizasyonu gibi geniş bir yelpazede hizmet veriyoruz. n8n, Make ve özel API entegrasyonlarıyla mevcut sistemlerinizi birbirine bağlıyor, veri akışını otomatikleştiriyor ve operasyonel verimliliğinizi ölçülebilir şekilde artırıyoruz.",
  },
  {
    num: "03",
    title: "Video Prodüksiyon",
    body: "Markanızın hikâyesini görselleştiriyoruz. Tanıtım filmleri, sosyal medya içerikleri, drone çekimleri ve animasyon — her formatta üretim.",
    detail: "Antalya'nın eşsiz doğal güzelliklerini ve şehrin dinamik enerjisini projelerinize yansıtan profesyonel video prodüksiyon hizmetimiz, markanızın hikâyesini en etkili şekilde anlatır. Kurumsal tanıtım filmleri, ürün videoları, sosyal medya içerikleri, drone ile havadan çekim, 2D/3D animasyon ve motion graphics alanlarında uzman ekibimizle çalışıyoruz. 4K çekim ekipmanlarımız ve post-prodüksiyon stüdyomuzla Hollywood standartlarında içerik üretiyoruz.",
  },
  {
    num: "04",
    title: "Dijital Reklamcılık",
    body: "Google, Meta, Yandex — doğru kitleye, doğru zamanda, doğru mesajla. Veriye dayalı kampanyalarla reklam yatırımınızdan maksimum geri dönüş.",
    detail: "Antalya ve Türkiye genelinde dijital reklam yönetimi hizmetimiz, reklam bütçenizi en verimli şekilde kullanmanızı sağlar. Google Ads (Arama, Display, YouTube, Performance Max), Meta Ads (Facebook ve Instagram), Yandex Direct ve LinkedIn Ads platformlarında uzmanlaşmış ekibimiz, hedef kitlenize doğru zamanda doğru mesajla ulaşır. A/B testleri, dönüşüm takibi, remarketing stratejileri ve detaylı raporlama ile kampanya performansınızı sürekli optimize ediyoruz.",
  },
];

function BeamCard({ num, title, body, onClick }: { num: string; title: string; body: string; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const IDLE = 42, HOVER = 240, K = 30, D = 11;
    let angle = (parseInt(num) * 137.508) % 360;
    let speed = IDLE, vel = 0, target = IDLE, last = 0;
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
    return () => { cancelAnimationFrame(raf); card.removeEventListener("pointerenter", onEnter); card.removeEventListener("pointerleave", onLeave); };
  }, [num]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="reveal relative isolate overflow-hidden cursor-pointer group"
      style={{ background: "var(--cream-08)", border: "1px solid var(--cream-16)", borderRadius: 20, padding: "2rem 1.8rem", transition: "transform .3s cubic-bezier(.4,0,.2,1)" }}
    >
      <div
        className="absolute -inset-px pointer-events-none z-[1]"
        style={{
          borderRadius: 20, padding: 2,
          background: `conic-gradient(from var(--beam-angle,0deg),transparent 0deg,transparent 18deg,rgba(74,144,217,.04) 36deg,rgba(74,144,217,.45) 56deg,rgba(100,180,255,.7) 60deg,transparent 63deg,transparent 198deg,rgba(233,86,74,.04) 216deg,rgba(233,86,74,.4) 252deg,rgba(255,120,100,.65) 258deg,transparent 261deg,transparent 360deg)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude",
        }}
      />
      <div
        className="absolute -inset-px pointer-events-none -z-[1]"
        style={{
          borderRadius: 20,
          background: `conic-gradient(from var(--beam-angle,0deg),transparent 0deg,transparent 18deg,rgba(74,144,217,.04) 36deg,rgba(74,144,217,.45) 56deg,rgba(100,180,255,.7) 60deg,transparent 63deg,transparent 198deg,rgba(233,86,74,.04) 216deg,rgba(233,86,74,.4) 252deg,rgba(255,120,100,.65) 258deg,transparent 261deg,transparent 360deg)`,
          filter: "blur(14px)", opacity: 0.3,
        }}
      />
      <p className="relative z-[2]" style={{ fontFamily: "var(--font-m)", fontSize: ".7rem", color: "var(--cream-46)", letterSpacing: ".06em", marginBottom: "1.1rem" }}>{num}</p>
      <h3 className="relative z-[2]" style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.12rem", letterSpacing: "-.01em", marginBottom: ".65rem" }}>{title}</h3>
      <p className="relative z-[2]" style={{ fontSize: ".87rem", lineHeight: 1.62, color: "var(--cream-70)" }}>{body}</p>
      <div className="relative z-[2] flex items-center gap-1 mt-4 text-[var(--cream-46)] group-hover:text-[var(--cream)] transition-colors duration-300" style={{ fontSize: ".78rem", fontWeight: 500 }}>
        Detayları İncele
        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" style={{ stroke: "currentColor", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      </div>
    </div>
  );
}

function ServiceModal({ service, open, onClose }: { service: typeof services[0] | null; open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const renderTurnstile = useCallback(() => {
    if (!turnstileRef.current || !(window as any).turnstile) return;
    if (turnstileWidgetId.current) {
      (window as any).turnstile.reset(turnstileWidgetId.current);
      return;
    }
    turnstileWidgetId.current = (window as any).turnstile.render(turnstileRef.current, {
      sitekey: TURNSTILE_SITE_KEY, theme: "dark",
      size: "flexible", appearance: "interaction-only",
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    setSubmitted(false); setError(""); setTurnstileToken("");
    if (turnstileWidgetId.current) { turnstileWidgetId.current = null; }
    if ((window as any).turnstile) { setTimeout(renderTurnstile, 150); return; }
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => setTimeout(renderTurnstile, 150);
    document.head.appendChild(script);
  }, [open, renderTurnstile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true); setError("");
    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("svc_name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("svc_phone") as HTMLInputElement).value,
      service: service?.title || "",
      turnstileToken,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, email: "—", message: `${data.name} — ${service?.title} hizmeti hakkında bilgi almak istiyor. Tel: ${data.phone}` }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setTimeout(() => { onClose(); setSubmitted(false); form.reset(); }, 1500);
    } catch {
      setError("Gönderilemedi, lütfen tekrar deneyin.");
    } finally {
      setSending(false);
    }
  }

  if (!service) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        padding: "clamp(.75rem, 2vw, 1.5rem)",
        background: "rgba(0,0,0,.45)", backdropFilter: "blur(12px) saturate(120%)", WebkitBackdropFilter: "blur(12px) saturate(120%)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity .35s cubic-bezier(.4,0,.2,1)",
      }}
    >
      <div
        className="liquid-glass-panel w-full max-w-[520px] relative max-h-[90vh] overflow-y-auto"
        style={{
          padding: "clamp(1.4rem, 4vw, 2.2rem)", transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(.97)",
          transition: "transform .4s cubic-bezier(.16,1,.3,1), opacity .35s",
        }}
      >
        <button
          onClick={onClose}
          className="glass-close absolute top-[1.2rem] right-[1.2rem] w-8 h-8 flex items-center justify-center cursor-pointer text-[var(--cream-46)] hover:text-[var(--cream)]"
          aria-label="Kapat"
        >
          <svg viewBox="0 0 16 16" className="w-[14px] h-[14px]" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </button>

        <div className="relative z-[2]">
          <p style={{ fontFamily: "var(--font-m)", fontSize: ".65rem", color: "rgba(243,239,230,.4)", letterSpacing: ".08em", marginBottom: ".5rem" }}>{service.num}</p>
          <h3 style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.25rem", letterSpacing: "-.02em", marginBottom: ".8rem", color: "var(--cream)" }}>{service.title}</h3>
          <p style={{ fontSize: ".86rem", lineHeight: 1.72, color: "rgba(243,239,230,.55)", marginBottom: "1.8rem" }}>{service.detail}</p>

          <div style={{ height: 1, background: "rgba(255,255,255,.08)", marginBottom: "1.5rem" }} />

          <p style={{ fontFamily: "var(--font-d)", fontWeight: 500, fontSize: ".92rem", color: "var(--cream)", marginBottom: ".3rem" }}>Örnek çalışmalarımızı incelemek için</p>
          <p style={{ fontSize: ".78rem", color: "rgba(243,239,230,.4)", marginBottom: "1.2rem" }}>Bilgilerinizi bırakın, sizinle paylaşalım.</p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input type="text" name="svc_name" placeholder="Ad Soyad" required className="glass-input" style={{ fontSize: ".82rem" }} />
              <input type="tel" name="svc_phone" placeholder="+90 5__ ___ __ __" required className="glass-input" style={{ fontSize: ".82rem" }} />
            </div>
            <div ref={turnstileRef} className="flex justify-center" style={{ margin: ".8rem 0 1rem", minHeight: 0, borderRadius: 12, overflow: "hidden" }} />
            {error && <p style={{ fontSize: ".78rem", color: "#ef4444", marginBottom: ".5rem" }}>{error}</p>}
            <button type="submit" disabled={sending || submitted || !turnstileToken} className={`glass-submit${submitted ? " submitted" : ""}`} style={{ fontSize: ".84rem", padding: ".7rem", opacity: (sending || (!turnstileToken && !submitted)) ? 0.5 : 1 }}>
              {submitted ? "Gönderildi!" : sending ? "Gönderiliyor..." : "Formu Gönder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeService, setActiveService] = useState<typeof services[0] | null>(null);

  return (
    <>
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
            <BeamCard key={s.num} {...s} onClick={() => setActiveService(s)} />
          ))}
        </div>
      </section>
      <ServiceModal service={activeService} open={!!activeService} onClose={() => setActiveService(null)} />
    </>
  );
}
