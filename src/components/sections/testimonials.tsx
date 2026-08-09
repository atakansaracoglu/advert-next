"use client";

const reviews = [
  { name: "Tahsin Sevim", text: "Kaliteli iş, uygun fiyat, yaratıcı fikirler, fark yaratan uygulamalar.", time: "10 ay önce" },
  { name: "Yalçın Kocaoğlan", text: "Atakan Saraçoğlu, hem grafik tasarım tarafında, gerek web site tarafında oldukça profesyoneldir, sizin ne istediğinizi anlayıp isteğinizi görsele dijitale yansıtan bir bakış açısına sahiptir.", time: "10 ay önce" },
  { name: "Madina Yelemesova", text: "Bir web tasarım hizmeti sipariş ettik ve çok memnun kaldık. Her şey profesyonelce, hızlı bir şekilde ve yüksek standartlarda yapıldı.", time: "10 ay önce" },
  { name: "Hasan Yalçın", text: "Oldukça başarılı tavsiye ederim.", time: "10 ay önce" },
  { name: "Cesur Karsavuran", text: "İşlerine vermiş olduğu emek ve profesyonel yaklaşım, gerçekten kaliteli işlerin çıkmasına vesile olmakta.", time: "2 yıl önce" },
  { name: "Tacettin Köse", text: "İşlerini titizlikle ve sanki kendi işiymiş gibi sahiplenerek yapan bir firma.", time: "2 yıl önce" },
  { name: "Rəvan Mirzəyev", text: "Rusya'daki şirketimiz için web tasarım hizmeti aldık. İşlerini iyi yapan profesyonel bir ekip.", time: "3 yıl önce" },
  { name: "S&J Dijital Baskı Merkezi", text: "Yoğunlukta destek aldığımız başarılı disiplinli bir ekip, teşekkürler.", time: "2 yıl önce" },
  { name: "Efendi Tasarımcı", text: "Tasarımcı olarak web olayında destek alabildiğim tek yer...", time: "2 yıl önce" },
  { name: "İlker Bedeloğlu", text: "İşini seven, dürüst ve güvenilir.", time: "2 yıl önce" },
  { name: "Umut Başaroğlu", text: "İşini iyi yapan bir firma.", time: "2 yıl önce" },
  { name: "Kaan Yolyapan", text: "Kapadokya'daki değerli çözüm ortağımız, teşekkür ederiz.", time: "2 yıl önce" },
];

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="w-[14px] h-[14px] fill-[#f5a623]">
      <path d="M10 1l2.47 5.01L18 6.9l-4 3.9.94 5.5L10 13.77 5.06 16.3 6 10.8l-4-3.9 5.53-.89z" />
    </svg>
  );
}

function TestimonialCard({ name, text, time }: { name: string; text: string; time: string }) {
  return (
    <div
      className="flex-shrink-0 w-[320px]"
      style={{
        background: "#fff",
        border: "1px solid rgba(13,11,9,.08)",
        borderRadius: 14,
        padding: "1.2rem 1.4rem",
      }}
    >
      <div className="flex items-center gap-[.6rem] mb-[.7rem]">
        <div>
          <div style={{ fontFamily: "var(--font-d)", fontWeight: 600, fontSize: ".85rem", color: "#0d0b09", lineHeight: 1.2 }}>{name}</div>
          <div style={{ fontFamily: "var(--font-m)", fontSize: ".62rem", color: "rgba(13,11,9,.4)", letterSpacing: ".04em" }}>Google Reviews &middot; {time}</div>
        </div>
      </div>
      <div className="flex gap-[2px] mb-[.5rem]">
        <Star /><Star /><Star /><Star /><Star />
      </div>
      <p
        style={{
          fontSize: ".82rem",
          lineHeight: 1.55,
          color: "rgba(13,11,9,.6)",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonials() {
  const half = Math.ceil(reviews.length / 2);
  const firstRow = reviews.slice(0, half);
  const secondRow = reviews.slice(half);

  return (
    <div className="relative overflow-hidden" style={{ background: "#f5f2ec" }}>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0) }
          to { transform: translateX(calc(-50% - .5rem)) }
        }
      `}</style>
      <section className="relative overflow-hidden" style={{ padding: "clamp(3rem,5vh,4rem) 0" }}>
        <div className="absolute top-0 bottom-0 left-0 w-[15%] pointer-events-none z-[2]" style={{ background: "linear-gradient(90deg,#f5f2ec,transparent)" }} />
        <div className="absolute top-0 bottom-0 right-0 w-[15%] pointer-events-none z-[2]" style={{ background: "linear-gradient(270deg,#f5f2ec,transparent)" }} />

        <div
          className="flex gap-4 w-max hover:[animation-play-state:paused]"
          style={{ animation: "marquee-scroll 35s linear infinite" }}
        >
          {[...Array(4)].flatMap((_, r) =>
            firstRow.map((review, i) => (
              <TestimonialCard key={`r1-${r}-${i}`} {...review} />
            ))
          )}
        </div>
        <div className="h-[.8rem]" />
        <div
          className="flex gap-4 w-max hover:[animation-play-state:paused]"
          style={{ animation: "marquee-scroll 40s linear infinite", animationDirection: "reverse" }}
        >
          {[...Array(4)].flatMap((_, r) =>
            secondRow.map((review, i) => (
              <TestimonialCard key={`r2-${r}-${i}`} {...review} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
