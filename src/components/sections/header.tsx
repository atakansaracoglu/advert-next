"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#merhaba", label: "Merhaba" },
  { href: "#biz-kimiz", label: "Biz Kimiz?" },
  { href: "#hizmetlerimiz", label: "Hizmetlerimiz" },
  { href: "#projelerimiz", label: "Projelerimiz" },
  { href: "#bize-ulasin", label: "Bize Ulaşın" },
];

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px]">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M16.6 5.82A4.28 4.28 0 0115.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5c-1.43 0-2.59-1.16-2.59-2.59a2.59 2.59 0 012.59-2.59c.28 0 .55.04.8.12V9.6a5.73 5.73 0 00-.8-.06A5.82 5.82 0 004 15.4a5.82 5.82 0 005.86 5.78 5.82 5.82 0 005.86-5.78V9.73a7.35 7.35 0 004.28 1.37V8.01a4.28 4.28 0 01-3.4-2.19z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Header({ onOpenModal }: { onOpenModal: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("merhaba");
    if (!hero) return;
    const io = new IntersectionObserver(
      (entries) => setScrolled(!entries[0].isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @keyframes headerSlideIn {
          from { opacity: 0; transform: translateY(-12px) }
          to { opacity: 1; transform: translateY(0) }
        }
        @keyframes headerLineExpand {
          from { transform: scaleX(0) }
          to { transform: scaleX(1) }
        }
        .site-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 20;
          background: rgba(13,11,9,.35);
          backdrop-filter: blur(28px); -webkit-backdrop-filter: blur(28px);
          transition: background .5s, box-shadow .5s;
          animation: headerSlideIn .9s cubic-bezier(.16,1,.3,1) both;
        }
        .site-header::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,transparent,rgba(243,239,230,.12) 20%,rgba(243,239,230,.18) 50%,rgba(243,239,230,.12) 80%,transparent);
          animation: headerLineExpand 1.2s cubic-bezier(.16,1,.3,1) .3s both;
          transform-origin: center;
        }
        .site-header.scrolled { background: rgba(13,11,9,.94); box-shadow: 0 1px 30px rgba(0,0,0,.3) }
      `}</style>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        {/* Desktop bar */}
        <div className="hidden md:flex items-center justify-between min-h-[62px]" style={{ padding: "0 clamp(1.5rem,4vw,4rem)" }}>
          <div
            className="flex items-center gap-[1.25rem] flex-shrink-0"
            style={{ animation: "headerSlideIn .9s cubic-bezier(.16,1,.3,1) .1s both" }}
          >
            <a
              href="#merhaba"
              className="flex-shrink-0 no-underline text-[var(--cream)]"
              style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.28rem", letterSpacing: "-.03em", lineHeight: 1 }}
            >
              Advert<span style={{ color: "#1e7bd6" }}>.</span>
            </a>

            <div
              className="w-px h-[14px] flex-shrink-0"
              style={{ background: "rgba(243,239,230,.15)" }}
            />

            <div className="flex items-center gap-[.65rem]">
              {socials.map((s, i) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center w-[28px] h-[28px] text-[var(--cream-46)] transition-all duration-300 hover:text-[var(--cream)]"
                  style={{ animation: `headerSlideIn .9s cubic-bezier(.16,1,.3,1) ${0.12 + i * 0.04}s both` }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className="flex items-center gap-[2.4rem] justify-center flex-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-[var(--cream-70)] no-underline transition-colors duration-300 hover:text-[var(--cream)] py-[.7rem] group"
                style={{
                  fontFamily: "var(--font-b)",
                  fontSize: ".84rem",
                  fontWeight: 500,
                  letterSpacing: ".02em",
                  animation: `headerSlideIn .9s cubic-bezier(.16,1,.3,1) ${0.2 + i * 0.06}s both`,
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-[var(--cream)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </nav>

          <div style={{ animation: "headerSlideIn .9s cubic-bezier(.16,1,.3,1) .5s both" }}>
            <button
              onClick={onOpenModal}
              className="cursor-pointer whitespace-nowrap text-[var(--cream)] rounded-full transition-all duration-300 hover:-translate-y-px"
              style={{
                fontFamily: "var(--font-b)",
                fontSize: ".82rem",
                fontWeight: 500,
                background: "rgba(243,239,230,.08)",
                border: "1px solid var(--cream-16)",
                padding: ".55rem 1.4rem",
                letterSpacing: ".01em",
              }}
            >
              Projeniz mi var?
            </button>
          </div>
        </div>

        {/* Mobile bar */}
        <div
          className="flex md:hidden items-center justify-between"
          style={{ padding: "0 1.25rem", minHeight: 56, touchAction: "manipulation" }}
        >
          <a
            href="#merhaba"
            className="no-underline text-[var(--cream)] flex items-center min-h-[44px]"
            style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.22rem", letterSpacing: "-.03em" }}
          >
            Advert<span style={{ color: "#1e7bd6" }}>.</span>
          </a>
          <button
            className="flex items-center justify-center w-[44px] h-[44px] bg-transparent border-none cursor-pointer -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <div className="relative w-[20px] h-[14px]">
              <span
                className="absolute left-0 right-0 h-[1.5px] bg-[var(--cream)] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
                style={menuOpen
                  ? { top: "50%", transform: "translateY(-50%) rotate(45deg)" }
                  : { top: 0, transform: "none" }
                }
              />
              <span
                className="absolute left-0 right-0 h-[1.5px] bg-[var(--cream)] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
                style={{ top: "50%", transform: "translateY(-50%)", opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="absolute left-0 right-0 h-[1.5px] bg-[var(--cream)] transition-all duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
                style={menuOpen
                  ? { bottom: "50%", transform: "translateY(50%) rotate(-45deg)" }
                  : { bottom: 0, transform: "none" }
                }
              />
            </div>
          </button>
        </div>

        {/* Mobile menu — fullscreen overlay */}
        <div
          className="md:hidden flex flex-col"
          style={{
            position: "fixed",
            top: 56,
            left: 0,
            right: 0,
            height: "calc(100dvh - 56px)",
            background: "#0d0b09",
            opacity: menuOpen ? 1 : 0,
            pointerEvents: menuOpen ? "auto" : "none",
            transition: "opacity .35s cubic-bezier(.16,1,.3,1)",
            touchAction: "manipulation",
            zIndex: 999,
          }}
        >
          <div className="flex-1 flex flex-col overflow-y-auto" style={{ padding: "2rem 1.5rem" }}>
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[var(--cream)] no-underline flex items-center min-h-[52px] transition-opacity duration-300 hover:opacity-70"
                  style={{
                    fontFamily: "var(--font-d)",
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    letterSpacing: "-.02em",
                    borderBottom: "1px solid rgba(243,239,230,.08)",
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? "none" : "translateY(8px)",
                    transition: `opacity .4s cubic-bezier(.16,1,.3,1) ${0.06 + i * 0.05}s, transform .4s cubic-bezier(.16,1,.3,1) ${0.06 + i * 0.05}s`,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div
              className="flex items-center gap-1 mt-8"
              style={{
                opacity: menuOpen ? 1 : 0,
                transition: "opacity .4s cubic-bezier(.16,1,.3,1) .4s",
              }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center w-[44px] h-[44px] text-[var(--cream-46)] transition-colors duration-300 hover:text-[var(--cream)]"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div
              className="mt-8 grid grid-cols-2 gap-6"
              style={{
                opacity: menuOpen ? 1 : 0,
                transition: "opacity .4s cubic-bezier(.16,1,.3,1) .45s",
              }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-m)", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--cream-46)", marginBottom: ".5rem" }}>Adres</p>
                <p style={{ fontSize: ".82rem", lineHeight: 1.7, color: "var(--cream-46)" }}>
                  Güzeloba Mah. 2139 Sok.<br />No:21/C Muratpaşa / Antalya
                </p>
              </div>
              <div>
                <p style={{ fontFamily: "var(--font-m)", fontSize: ".62rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--cream-46)", marginBottom: ".5rem" }}>İletişim</p>
                <p style={{ fontSize: ".82rem", lineHeight: 1.7 }}>
                  <a href="tel:+905322935129" className="text-[var(--cream-46)] no-underline hover:text-[var(--cream)] transition-colors block">+90 532 293 51 29</a>
                  <a href="mailto:info@advert.com.tr" className="text-[var(--cream-46)] no-underline hover:text-[var(--cream)] transition-colors block">info@advert.com.tr</a>
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              padding: "1.25rem 1.5rem",
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
              borderTop: "1px solid rgba(243,239,230,.08)",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity .4s cubic-bezier(.16,1,.3,1) .5s",
            }}
          >
            <button
              onClick={() => { onOpenModal(); setMenuOpen(false); }}
              className="w-full text-center cursor-pointer text-white rounded-full transition-colors duration-300"
              style={{
                fontFamily: "var(--font-b)",
                fontSize: ".88rem",
                fontWeight: 500,
                background: "#1e7bd6",
                border: "none",
                padding: ".85rem 1.4rem",
                minHeight: 48,
              }}
            >
              Projeniz mi var?
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
