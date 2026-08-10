"use client";

export default function Footer({ onOpenPrivacy, onOpenTerms }: { onOpenPrivacy: () => void; onOpenTerms: () => void }) {
  return (
    <div style={{ padding: "0 clamp(1.5rem,4vw,4rem) 2rem", maxWidth: 1180, margin: "0 auto" }}>
      <footer
        className="flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap gap-[1rem]"
        style={{ padding: "1.8rem 0", borderTop: "1px solid var(--cream-16)" }}
      >
        <span style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: "1.05rem", letterSpacing: "-.02em" }}>
          Advert<span style={{ color: "#1e7bd6" }}>.</span>
        </span>
        <span style={{ fontSize: ".74rem", color: "var(--cream-46)" }}>&copy; 2026 Advert. Tüm hakları saklıdır.</span>
        <div className="flex gap-[1.4rem]">
          <button onClick={onOpenPrivacy} className="no-underline transition-colors duration-300 hover:text-[var(--cream)] cursor-pointer bg-transparent border-none" style={{ fontSize: ".74rem", color: "var(--cream-46)" }}>Gizlilik</button>
          <button onClick={onOpenTerms} className="no-underline transition-colors duration-300 hover:text-[var(--cream)] cursor-pointer bg-transparent border-none" style={{ fontSize: ".74rem", color: "var(--cream-46)" }}>Kullanım Koşulları</button>
          <a href="#merhaba" className="no-underline transition-colors duration-300 hover:text-[var(--cream)]" style={{ fontSize: ".74rem", color: "var(--cream-46)" }}>Yukarı</a>
        </div>
      </footer>
    </div>
  );
}
