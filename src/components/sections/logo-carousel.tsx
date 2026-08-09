"use client";

import { Marquee } from "@/components/animations/marquee";

const brands = [
  {
    name: "Volkswagen",
    svg: (
      <svg viewBox="0 0 200 200" className="h-8 w-auto">
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="6" />
        <path d="M100 15 L65 100 L80 100 L92 62 L100 85 L108 62 L120 100 L135 100 L100 15Z" fill="currentColor" />
        <path d="M65 100 L80 100 L92 138 L100 115 L108 138 L120 100 L135 100 L100 185Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Trendyol",
    svg: (
      <svg viewBox="0 0 180 40" className="h-7 w-auto">
        <text x="0" y="32" fontFamily="var(--font-d)" fontWeight="600" fontSize="34" fill="currentColor" letterSpacing="-0.02em">
          trendyol
        </text>
      </svg>
    ),
  },
  {
    name: "Apple",
    svg: (
      <svg viewBox="0 0 170 200" className="h-8 w-auto">
        <path
          d="M141.6 124.8c-.3 7.1 2.3 14.2 6.4 19.8-4.5 6.5-10.8 11.8-18.3 14.5-7.5 2.9-15.2.2-22.3.2-7.1 0-14.8 2.7-22.3-.2-7.4-2.7-13.8-8-18.3-14.5 4.1-5.6 6.7-12.7 6.4-19.8-.3-7.1-3.3-14-8-19.3 5.5-5.8 13.2-9.1 21.3-9.1 7.4 0 14.3 3.3 20.9 3.3 6.6 0 13.5-3.3 20.9-3.3 8.1 0 15.8 3.3 21.3 9.1-4.7 5.3-7.7 12.2-8 19.3zM120 78c-5.3 6.2-13.8 9.7-21.3 9.1.1-7.5 3.3-14.8 8.6-20 5.3-5.3 13.2-8.8 20-9.1.3 7.5-2.1 15-7.3 20z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "BMW",
    svg: (
      <svg viewBox="0 0 200 200" className="h-8 w-auto">
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="6" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M100 20 L100 100 L180 100 A80 80 0 0 0 100 20Z" fill="currentColor" opacity="0.3" />
        <path d="M20 100 L100 100 L100 180 A80 80 0 0 1 20 100Z" fill="currentColor" opacity="0.3" />
        <text x="100" y="16" textAnchor="middle" fontFamily="var(--font-d)" fontWeight="600" fontSize="18" fill="currentColor">
          BMW
        </text>
      </svg>
    ),
  },
  {
    name: "Audi",
    svg: (
      <svg viewBox="0 0 320 80" className="h-7 w-auto">
        <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="100" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="160" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="5" />
        <circle cx="220" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="5" />
      </svg>
    ),
  },
  {
    name: "Samsung",
    svg: (
      <svg viewBox="0 0 260 40" className="h-6 w-auto">
        <text x="0" y="32" fontFamily="var(--font-d)" fontWeight="600" fontSize="32" fill="currentColor" letterSpacing="0.08em">
          SAMSUNG
        </text>
      </svg>
    ),
  },
];

export default function LogoCarousel() {
  return (
    <div className="relative overflow-hidden bg-[#f5f2ec] py-10 border-b border-[rgba(13,11,9,0.06)]">
      <Marquee pauseOnHover className="[--duration:24s] p-0">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex items-center mx-8 lg:mx-14 text-[rgba(13,11,9,0.3)] hover:text-[rgba(13,11,9,0.6)] transition-colors duration-400"
          >
            {brand.svg}
          </div>
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#f5f2ec] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#f5f2ec] to-transparent z-10" />
    </div>
  );
}
