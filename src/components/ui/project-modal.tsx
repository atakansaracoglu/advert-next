"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { onClose(); setSubmitted(false); }, 1200);
  }

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 transition-opacity duration-[350ms]"
      style={{
        background: "rgba(13,11,9,.82)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        className="w-full max-w-[520px] relative max-h-[90vh] overflow-y-auto transition-transform duration-[400ms]"
        style={{
          background: "rgba(20,18,15,.95)",
          border: "1px solid var(--cream-16)",
          borderRadius: 24,
          padding: "2.4rem",
          transform: open ? "translateY(0)" : "translateY(20px)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-[1.2rem] right-[1.2rem] w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 text-[var(--cream-46)] hover:text-[var(--cream)]"
          style={{ background: "rgba(243,239,230,.06)", border: "1px solid var(--cream-16)" }}
          aria-label="Kapat"
        >
          <svg viewBox="0 0 16 16" className="w-[14px] h-[14px]" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        <h3 style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.3rem", letterSpacing: "-.02em", marginBottom: ".4rem" }}>Projenizi anlatın</h3>
        <p style={{ fontSize: ".84rem", color: "var(--cream-46)", marginBottom: "2rem" }}>Formu doldurun, 24 saat içinde size dönelim.</p>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[1.2rem]">
            <div>
              <label className="block text-[var(--cream-70)] mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em" }}>Ad Soyad</label>
              <input type="text" placeholder="Örn. Ahmet Yılmaz" required className="form-input" />
            </div>
            <div>
              <label className="block text-[var(--cream-70)] mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em" }}>Şirket / Marka Adı</label>
              <input type="text" placeholder="Örn. ABC Ltd." className="form-input" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[1.2rem]">
            <div>
              <label className="block text-[var(--cream-70)] mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em" }}>E-posta</label>
              <input type="email" placeholder="ornek@şirket.com" required className="form-input" />
            </div>
            <div>
              <label className="block text-[var(--cream-70)] mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em" }}>Telefon</label>
              <input type="tel" placeholder="+90 5__ ___ __ __" className="form-input" />
            </div>
          </div>
          <div className="mb-[1.2rem]">
            <label className="block text-[var(--cream-70)] mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em" }}>Hangi hizmeti arıyorsunuz?</label>
            <select required className="form-select">
              <option value="" disabled>Seçiniz</option>
              <option>Web Tasarım</option>
              <option>Otomasyon</option>
              <option>Video Prodüksiyon</option>
              <option>Dijital Reklamcılık</option>
              <option>Birden fazla hizmet</option>
              <option>Henüz karar vermedim</option>
            </select>
          </div>
          <div className="mb-[1.2rem]">
            <label className="block text-[var(--cream-70)] mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em" }}>Tahmini bütçe</label>
            <select className="form-select" defaultValue="">
              <option value="" disabled>Seçiniz (opsiyonel)</option>
              <option>Henüz belirlemedim</option>
              <option>10.000 - 25.000 TL</option>
              <option>25.000 - 50.000 TL</option>
              <option>50.000 - 100.000 TL</option>
              <option>100.000 TL ve üzeri</option>
            </select>
          </div>
          <div className="mb-[1.2rem]">
            <label className="block text-[var(--cream-70)] mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em" }}>Projenizi kısaca anlatın</label>
            <textarea placeholder="Hedefiniz, zamanlamanız, mevcut durumunuz... Ne kadar detay verirseniz o kadar iyi." rows={4} className="form-textarea" />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer transition-all duration-300 hover:opacity-90 hover:-translate-y-px"
            style={{
              fontFamily: "var(--font-b)",
              fontSize: ".88rem",
              fontWeight: 500,
              color: "var(--base)",
              background: "var(--cream)",
              border: "none",
              borderRadius: 12,
              padding: ".8rem",
              marginTop: ".6rem",
            }}
          >
            {submitted ? "Gönderildi!" : "Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}
