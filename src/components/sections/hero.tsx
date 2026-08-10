"use client";

import LightTunnel from "@/components/ui/light-tunnel";

export default function Hero() {
  return (
    <section
      id="merhaba"
      className="relative h-screen max-md:h-auto min-h-[600px] max-md:min-h-0 flex flex-col overflow-hidden"
    >
      {/* LightTunnel background */}
      <div className="absolute inset-0 z-[1]">
        <LightTunnel
          cableColor="#1e7bd6"
          pulseColor="#4a9ee8"
          tunnelColor="#0d4a8a"
          tunnelOpacity={0}
          speed={0.08}
          flowDirection="outward"
          pulseSpeed={1.6}
          pulseLength={0.32}
          pulseBlend={1.2}
          pulseWidth={1}
          cableCount={24}
          thickness={0.3}
          rimWidth={0.12}
          waviness={0.25}
          sway={0.4}
          size={1.1}
          centerX={0.0}
          centerY={0.0}
          glow={1.2}
          fadeNear={0.4}
          fadeFar={2.2}
          brightness={0.9}
          colorVariance={true}
          grain={true}
          grainIntensity={0.04}
          opacity={0.65}
          mouseInteraction={true}
          mouseStrength={0.08}
        />
      </div>

      {/* Radial overlay for depth */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(13,11,9,0.7) 100%)",
        }}
      />

      {/* Center content */}
      <div className="hero-center absolute inset-0 z-[3] flex flex-col items-center justify-center text-center"
        style={{ padding: "0 clamp(1.5rem,4vw,4rem)" }}
      >
        {/* Main heading */}
        <h1
          className="rise rise-d5"
          style={{
            fontFamily: "var(--font-d)",
            fontWeight: 600,
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            color: "var(--cream)",
            maxWidth: 720,
            textWrap: "balance",
          }}
        >
          Yapay Zek&#226; &#199;a&#287;&#305;na
          <br />
          Ho&#351;geldiniz.
        </h1>

        {/* Subtitle */}
        <p
          className="rise rise-d6"
          style={{
            fontSize: "0.95rem",
            lineHeight: 1.7,
            color: "var(--cream-46)",
            maxWidth: 460,
            marginTop: "1.4rem",
            textWrap: "balance",
          }}
        >
          Markanızı geleceğe taşıyacak dijital çözümler.
          Strateji, tasarım ve teknoloji bir arada.
        </p>

        {/* CTA buttons */}
        <div className="rise rise-d7 flex items-center gap-3" style={{ marginTop: "1.4rem" }}>
          <a
            href="#bize-ulasin"
            className="hero-cta inline-flex items-center gap-2 rounded-full text-white no-underline cursor-pointer transition-all duration-300 hover:-translate-y-px"
            style={{
              padding: "0.7rem 1.5rem",
              background: "#1e7bd6",
              fontFamily: "var(--font-b)",
              fontSize: "0.84rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            Hemen Başlayın
            <svg
              viewBox="0 0 16 16"
              className="w-3.5 h-3.5"
              style={{
                stroke: "currentColor",
                fill: "none",
                strokeWidth: 2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
              }}
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="#hizmetlerimiz"
            className="hero-cta inline-flex items-center gap-2 rounded-full text-[var(--cream)] no-underline cursor-pointer transition-all duration-300 hover:-translate-y-px"
            style={{
              padding: "0.7rem 1.5rem",
              background: "rgba(243,239,230,0.06)",
              border: "1px solid var(--cream-16)",
              fontFamily: "var(--font-b)",
              fontSize: "0.84rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              whiteSpace: "nowrap",
            }}
          >
            Hizmetlerimiz
          </a>
        </div>
      </div>

      {/* Bottom bar: Advert. left, description right */}
      <div
        className="hero-bottom absolute bottom-0 left-0 right-0 z-[4] flex justify-between items-end gap-12 w-full max-md:flex-col max-md:items-start max-md:gap-4"
        style={{ padding: "0 clamp(1.5rem,4vw,4rem) clamp(1.5rem,3.5vh,3.5rem)" }}
      >
        <div className="flex-1 min-w-0">
          <h2
            className="rise rise-d5"
            style={{
              fontFamily: "var(--font-d)",
              fontWeight: 500,
              fontSize: "clamp(52px, 13vw, 180px)",
              lineHeight: 0.86,
              letterSpacing: "-0.045em",
              color: "var(--cream)",
            }}
          >
            Advert<span style={{ color: "#1e7bd6" }}>.</span>
          </h2>
        </div>
        <div className="flex-shrink-0 max-w-[380px] pb-2 max-md:max-w-full max-md:w-full">
          <p
            className="rise rise-d6"
            style={{
              fontSize: "clamp(0.82rem, 2.2vw, 0.92rem)",
              lineHeight: 1.68,
              color: "var(--cream-70)",
              maxWidth: 350,
            }}
          >
            10 yılı aşkın deneyimimizle yapay zek&acirc; destekli web tasarım,
            otomasyon, video prodüksiyon ve dijital reklamcılık çözümleri
            üretiyoruz. Antalya&apos;dan Türkiye&apos;ye.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #merhaba {
            height: 88vh !important;
            min-height: 0 !important;
          }
          .hero-center {
            justify-content: center !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }
          .hero-cta {
            padding: .6rem 1.1rem !important;
            font-size: .78rem !important;
          }
          .hero-bottom {
            gap: .8rem !important;
            padding-bottom: clamp(1.5rem, 4vh, 3rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
