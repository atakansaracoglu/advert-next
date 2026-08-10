"use client";

import { useState, useEffect, useRef } from "react";

export default function ContactWidget() {
  const [open, setOpen] = useState(false);
  const cwRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (cwRef.current && !cwRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <style>{`
        @keyframes cw-ping {
          0% { opacity: .6; transform: scale(1) }
          70% { opacity: 0; transform: scale(1.08) }
          100% { opacity: 0; transform: scale(1.08) }
        }
      `}</style>
      <div ref={cwRef} className={`fixed bottom-8 left-8 z-30 flex flex-col items-start ${open ? "open" : ""}`}>
        {/* Panel */}
        <div
          className="mb-[.6rem] w-[240px] max-md:w-[220px] overflow-hidden transition-all duration-300"
          style={{
            background: "rgba(13,11,9,.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid var(--cream-16)",
            borderRadius: 16,
            transformOrigin: "bottom left",
            opacity: open ? 1 : 0,
            transform: open ? "scale(1) translateY(0)" : "scale(.92) translateY(8px)",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div className="flex items-center gap-[.5rem]" style={{ padding: ".85rem 1rem .6rem" }}>
            <span className="w-2 h-2 rounded-full bg-[#34d399] flex-shrink-0" />
            <div>
              <div style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: ".78rem", color: "var(--cream)" }}>Bize Ulaşın</div>
              <div style={{ fontFamily: "var(--font-m)", fontSize: ".58rem", color: "var(--cream-46)", marginTop: 1 }}>7/24 iletişim</div>
            </div>
          </div>
          <div className="h-px mx-3" style={{ background: "var(--cream-08)" }} />
          <div className="flex flex-col gap-1 p-[.5rem_.6rem]">
            <WidgetItem href="https://wa.me/902422555323" label="WhatsApp" value="+90 242 255 53 23" icon={<WhatsAppIcon />} open={open} delay=".06s" />
            <WidgetItem href="https://www.instagram.com/advert.com.tr/" label="Instagram" value="advert.com.tr" icon={<InstagramIcon />} open={open} delay=".12s" />
            <WidgetItem href="tel:+902422555323" label="Telefon" value="+90 242 255 53 23" icon={<PhoneIcon />} open={open} delay=".18s" external={false} />
            <WidgetItem href="https://www.linkedin.com/company/advertcomtr/" label="LinkedIn" value="Advert Dijital" icon={<LinkedInIcon />} open={open} delay=".24s" />
          </div>
          <div className="h-px mx-3" style={{ background: "var(--cream-08)" }} />
          <div style={{ padding: ".4rem .75rem .65rem" }}>
            <a
              href="mailto:info@advert.com.tr"
              className="flex items-center gap-1 no-underline transition-colors duration-200 hover:text-[var(--cream)]"
              style={{ fontFamily: "var(--font-m)", fontSize: ".58rem", color: "var(--cream-46)" }}
            >
              info@advert.com.tr
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-[.6rem] rounded-[28px] cursor-pointer relative transition-all duration-250 max-md:rounded-full max-md:w-12 max-md:h-12 max-md:justify-center max-md:!p-0"
          style={{
            padding: ".45rem .9rem .45rem .45rem",
            border: "1px solid var(--cream-16)",
            background: "rgba(13,11,9,.6)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
          aria-label="İletişim"
        >
          {!open && (
            <span
              className="absolute -inset-1 rounded-[28px] max-md:rounded-full"
              style={{ border: "1.5px solid #34d399", animation: "cw-ping 2.5s cubic-bezier(0,0,.2,1) infinite" }}
            />
          )}
          <div className="w-8 h-8 rounded-full bg-[var(--cream)] flex items-center justify-center flex-shrink-0 relative max-md:hidden">
            <span style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: ".85rem", color: "var(--base)", lineHeight: 1 }}>A</span>
            <span className="absolute -bottom-px -right-px w-[9px] h-[9px] rounded-full bg-[#34d399]" style={{ border: "2px solid rgba(13,11,9,.6)" }} />
          </div>
          <div className="flex flex-col max-md:hidden">
            <span style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: ".74rem", color: "var(--cream)", lineHeight: 1.2, whiteSpace: "nowrap" }}>Advert Ekibine Ulaşın</span>
            <span style={{ fontFamily: "var(--font-m)", fontSize: ".54rem", color: "var(--cream-46)", lineHeight: 1.2, whiteSpace: "nowrap" }}>Genellikle anında yanıt verir</span>
          </div>
          <svg
            viewBox="0 0 24 24"
            className="w-[14px] h-[14px] ml-[.1rem] flex-shrink-0 transition-transform duration-300 max-md:hidden"
            style={{ stroke: "var(--cream-46)", strokeWidth: 2, fill: "none", transform: open ? "rotate(90deg)" : "none" }}
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
          <svg viewBox="0 0 24 24" className="w-5 h-5 hidden max-md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ stroke: "var(--cream)", strokeWidth: 1.8, fill: "none" }} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </button>
      </div>
    </>
  );
}

function WidgetItem({ href, label, value, icon, open, delay, external = true }: {
  href: string; label: string; value: string; icon: React.ReactNode; open: boolean; delay: string; external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="flex items-center gap-[.6rem] rounded-[10px] no-underline text-[var(--cream-70)] transition-all duration-200 hover:bg-[var(--cream-08)] hover:text-[var(--cream)]"
      style={{
        padding: ".5rem .6rem",
        fontSize: ".74rem",
        fontFamily: "var(--font-b)",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-6px)",
        transition: "background .2s, color .2s, opacity .25s, transform .25s",
        transitionDelay: open ? delay : "0s",
      }}
    >
      <span className="w-4 h-4 flex-shrink-0 opacity-70">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span style={{ fontSize: ".7rem", color: "var(--cream-46)", lineHeight: 1.2 }}>{label}</span>
        <span style={{ fontSize: ".76rem", color: "var(--cream)", fontWeight: 500, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
      </div>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.019-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-4 h-4">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
