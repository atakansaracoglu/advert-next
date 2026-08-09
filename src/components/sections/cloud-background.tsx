"use client";

import { useEffect, useRef } from "react";

export default function CloudBackground() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const cloudCount = 2;
    const minSize = 400, maxSize = 678, gapMin = 100, gapMax = 500, repeat = 4;

    const clouds: { width: number; gap: number }[] = [];
    for (let i = 0; i < cloudCount; i++) {
      clouds.push({
        width: Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize,
        gap: Math.floor(Math.random() * (gapMax - gapMin + 1)) + gapMin,
      });
    }

    for (let r = 0; r < repeat; r++) {
      const strip = document.createElement("div");
      strip.className = "cloud-strip";
      clouds.forEach((c) => {
        const img = document.createElement("img");
        img.src = "/cloud.webp";
        img.alt = "";
        img.width = c.width;
        img.height = 350;
        img.style.marginRight = c.gap + "px";
        strip.appendChild(img);
      });
      marquee.appendChild(strip);
    }
  }, []);

  return (
    <>
      <style>{`
        .cloud-bg {
          position: fixed; inset: 0; z-index: 0;
          background: url('https://images.shadcnspace.com/assets/backgrounds/real-estate-bg.webp') center/contain repeat;
        }
        .cloud-marquee {
          position: absolute; top: 14rem; left: 0; right: 0; z-index: 0;
          overflow: hidden; pointer-events: none;
          display: flex; gap: 1rem; padding: .5rem;
        }
        @media(min-width: 640px) { .cloud-marquee { top: 10rem; } }
        .cloud-strip {
          display: flex; flex-shrink: 0; gap: 1rem;
          animation: cloud-scroll 30s linear infinite;
        }
        @keyframes cloud-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - 1rem)); }
        }
        .cloud-strip img { flex-shrink: 0; opacity: .6; }
        .scrim {
          position: fixed; inset: 0; z-index: 1; pointer-events: none;
          background:
            linear-gradient(180deg,
              rgba(13,11,9,.78) 0%, rgba(13,11,9,.32) 12%,
              rgba(13,11,9,.05) 32%, rgba(13,11,9,.03) 54%,
              rgba(13,11,9,.16) 76%, rgba(13,11,9,.64) 100%),
            radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(13,11,9,.48) 100%);
        }
        .vignette {
          position: fixed; inset: 0; z-index: 2; pointer-events: none;
          box-shadow: inset 0 0 220px 70px rgba(13,11,9,.72);
        }
      `}</style>
      <div className="cloud-bg">
        <div className="cloud-marquee" ref={marqueeRef} />
      </div>
      <div className="scrim" />
      <div className="vignette" />
    </>
  );
}
