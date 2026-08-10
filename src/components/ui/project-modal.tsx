"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.target as HTMLFormElement;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      budget: (form.elements.namedItem("budget") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Gönderilemedi");
      setSubmitted(true);
      setTimeout(() => { onClose(); setSubmitted(false); form.reset(); }, 1500);
    } catch {
      setError("Bir hata oluştu, lütfen tekrar deneyin.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <style>{`
        @keyframes glassSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(.97) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
        @keyframes glassOverlayIn {
          from { opacity: 0 }
          to { opacity: 1 }
        }

        .liquid-glass-panel {
          position: relative;
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(40px) saturate(180%) brightness(1.1);
          -webkit-backdrop-filter: blur(40px) saturate(180%) brightness(1.1);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 28px;
          box-shadow:
            0 0 0 0.5px rgba(255,255,255,.1),
            0 8px 40px rgba(0,0,0,.35),
            0 2px 12px rgba(0,0,0,.2),
            inset 0 1px 0 rgba(255,255,255,.15);
          overflow: hidden;
        }

        .liquid-glass-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: linear-gradient(
            165deg,
            rgba(255,255,255,.14) 0%,
            rgba(255,255,255,.05) 25%,
            transparent 50%,
            rgba(255,255,255,.02) 80%,
            rgba(255,255,255,.08) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .liquid-glass-panel::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 50%;
          border-radius: 28px 28px 0 0;
          background: linear-gradient(
            180deg,
            rgba(255,255,255,.12) 0%,
            rgba(255,255,255,.04) 40%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        .glass-input {
          width: 100%;
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 14px;
          padding: .7rem .9rem;
          font-size: .84rem;
          color: var(--cream);
          transition: all .25s cubic-bezier(.4,0,.2,1);
          outline: none;
          font-family: var(--font-b);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
        }
        .glass-input::placeholder {
          color: rgba(243,239,230,.28);
        }
        .glass-input:focus {
          border-color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.1);
          box-shadow: 0 0 0 3px rgba(30,123,214,.2), inset 0 1px 0 rgba(255,255,255,.08);
        }

        .glass-select {
          width: 100%;
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 14px;
          padding: .7rem .9rem;
          font-size: .84rem;
          color: var(--cream);
          transition: all .25s cubic-bezier(.4,0,.2,1);
          outline: none;
          font-family: var(--font-b);
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='rgba(243,239,230,0.4)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
        }
        .glass-select:focus {
          border-color: rgba(255,255,255,.3);
          background-color: rgba(255,255,255,.1);
          box-shadow: 0 0 0 3px rgba(30,123,214,.2), inset 0 1px 0 rgba(255,255,255,.08);
        }
        .glass-select option {
          background: #1a1816;
          color: var(--cream);
        }

        .glass-textarea {
          width: 100%;
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 14px;
          padding: .7rem .9rem;
          font-size: .84rem;
          color: var(--cream);
          transition: all .25s cubic-bezier(.4,0,.2,1);
          outline: none;
          font-family: var(--font-b);
          resize: vertical;
          min-height: 100px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
        }
        .glass-textarea::placeholder {
          color: rgba(243,239,230,.28);
        }
        .glass-textarea:focus {
          border-color: rgba(255,255,255,.3);
          background: rgba(255,255,255,.1);
          box-shadow: 0 0 0 3px rgba(30,123,214,.2), inset 0 1px 0 rgba(255,255,255,.08);
        }

        .glass-submit {
          width: 100%;
          position: relative;
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 16px;
          padding: .85rem;
          font-family: var(--font-b);
          font-size: .88rem;
          font-weight: 600;
          color: var(--cream);
          cursor: pointer;
          transition: all .3s cubic-bezier(.4,0,.2,1);
          box-shadow: 0 2px 8px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.15);
          overflow: hidden;
        }
        .glass-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(165deg, rgba(255,255,255,.15), transparent 50%);
          pointer-events: none;
        }
        .glass-submit:hover {
          background: rgba(255,255,255,.18);
          border-color: rgba(255,255,255,.3);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.2);
        }
        .glass-submit:active {
          transform: translateY(0);
          background: rgba(255,255,255,.1);
        }

        .glass-close {
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 50%;
          transition: all .25s cubic-bezier(.4,0,.2,1);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
        }
        .glass-close:hover {
          background: rgba(255,255,255,.16);
          border-color: rgba(255,255,255,.25);
        }
      `}</style>

      <div
        ref={overlayRef}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{
          background: "rgba(0,0,0,.45)",
          backdropFilter: "blur(12px) saturate(120%)",
          WebkitBackdropFilter: "blur(12px) saturate(120%)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .35s cubic-bezier(.4,0,.2,1)",
          animation: open ? "glassOverlayIn .35s cubic-bezier(.4,0,.2,1)" : "none",
        }}
      >
        <div
          className="liquid-glass-panel w-full max-w-[540px] relative max-h-[90vh] overflow-y-auto"
          style={{
            padding: "2.4rem",
            animation: open ? "glassSlideUp .5s cubic-bezier(.16,1,.3,1)" : "none",
            transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(.97)",
            transition: "transform .4s cubic-bezier(.4,0,.2,1), opacity .35s",
          }}
        >
          <button
            onClick={onClose}
            className="glass-close absolute top-[1.2rem] right-[1.2rem] w-8 h-8 flex items-center justify-center cursor-pointer text-[var(--cream-46)] hover:text-[var(--cream)]"
            aria-label="Kapat"
          >
            <svg viewBox="0 0 16 16" className="w-[14px] h-[14px]" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>

          <div className="relative z-[2]">
            <h3 style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.3rem", letterSpacing: "-.02em", marginBottom: ".4rem", color: "var(--cream)" }}>
              Projenizi anlatın
            </h3>
            <p style={{ fontSize: ".84rem", color: "rgba(243,239,230,.45)", marginBottom: "2rem" }}>
              Formu doldurun, 24 saat içinde size dönelim.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[1.2rem]">
                <div>
                  <label className="block mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em", color: "rgba(243,239,230,.6)" }}>Ad Soyad</label>
                  <input type="text" name="name" placeholder="Örn. Ahmet Yılmaz" required className="glass-input" />
                </div>
                <div>
                  <label className="block mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em", color: "rgba(243,239,230,.6)" }}>Şirket / Marka Adı</label>
                  <input type="text" name="company" placeholder="Örn. ABC Ltd." className="glass-input" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[1.2rem]">
                <div>
                  <label className="block mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em", color: "rgba(243,239,230,.6)" }}>E-posta</label>
                  <input type="email" name="email" placeholder="ornek@sirket.com" required className="glass-input" />
                </div>
                <div>
                  <label className="block mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em", color: "rgba(243,239,230,.6)" }}>Telefon</label>
                  <input type="tel" name="phone" placeholder="+90 5__ ___ __ __" className="glass-input" />
                </div>
              </div>
              <div className="mb-[1.2rem]">
                <label className="block mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em", color: "rgba(243,239,230,.6)" }}>Hangi hizmeti arıyorsunuz?</label>
                <select name="service" required className="glass-select" defaultValue="">
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
                <label className="block mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em", color: "rgba(243,239,230,.6)" }}>Tahmini bütçe</label>
                <select name="budget" className="glass-select" defaultValue="">
                  <option value="" disabled>Seçiniz (opsiyonel)</option>
                  <option>Henüz belirlemedim</option>
                  <option>10.000 - 25.000 TL</option>
                  <option>25.000 - 50.000 TL</option>
                  <option>50.000 - 100.000 TL</option>
                  <option>100.000 TL ve üzeri</option>
                </select>
              </div>
              <div className="mb-[1.2rem]">
                <label className="block mb-[.45rem]" style={{ fontSize: ".74rem", fontWeight: 500, letterSpacing: ".01em", color: "rgba(243,239,230,.6)" }}>Projenizi kısaca anlatın</label>
                <textarea name="message" placeholder="Hedefiniz, zamanlamanız, mevcut durumunuz..." rows={4} className="glass-textarea" />
              </div>
              {error && (
                <p style={{ fontSize: ".8rem", color: "#ef4444", marginBottom: ".6rem" }}>{error}</p>
              )}
              <button type="submit" disabled={sending || submitted} className="glass-submit" style={{ marginTop: ".6rem", opacity: sending ? 0.6 : 1 }}>
                {submitted ? "Gönderildi!" : sending ? "Gönderiliyor..." : "Gönder"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
