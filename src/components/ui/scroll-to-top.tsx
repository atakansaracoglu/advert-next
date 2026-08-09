"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-30 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-all duration-[350ms]"
      style={{
        border: "1px solid var(--cream-16)",
        background: "rgba(13,11,9,.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
      aria-label="Yukari git"
    >
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" stroke="var(--cream)" strokeWidth="2" fill="none">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
