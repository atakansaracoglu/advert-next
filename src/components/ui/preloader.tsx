"use client";

import { useEffect, useState } from "react";

const letters = ["A", "d", "v", "e", "r", "t"];

export default function Preloader() {
  const [exit, setExit] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExit(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!exit) return;
    const timer = setTimeout(() => setRemoved(true), 1300);
    return () => clearTimeout(timer);
  }, [exit]);

  if (removed) return null;

  return (
    <>
      <style>{`
        @keyframes pl-letter-in {
          0% { opacity: 0; transform: translateY(110%) }
          100% { opacity: 1; transform: translateY(0) }
        }
        @keyframes pl-dot-in {
          0% { opacity: 0; transform: scale(0) }
          60% { opacity: 1; transform: scale(1.4) }
          100% { opacity: 1; transform: scale(1) }
        }
        @keyframes pl-line-in {
          0% { transform: translateX(-50%) scaleX(0) }
          100% { transform: translateX(-50%) scaleX(1) }
        }
        @keyframes pl-fade {
          0% { opacity: 0 }
          100% { opacity: 1 }
        }
      `}</style>
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        style={{
          background: "var(--base)",
          transition: "transform .9s cubic-bezier(.76,0,.18,1), opacity .4s .5s",
          transform: exit ? "translateY(-100%)" : "translateY(0)",
          opacity: exit ? 0 : 1,
        }}
      >
        <div
          className="flex items-baseline overflow-hidden"
          style={{
            fontFamily: "var(--font-d)",
            fontWeight: 600,
            fontSize: "clamp(2.4rem,6vw,4.2rem)",
            letterSpacing: "-.03em",
            color: "var(--cream)",
          }}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                opacity: 0,
                transform: "translateY(110%)",
                animation: `pl-letter-in .65s cubic-bezier(.16,1,.3,1) ${0.15 + i * 0.07}s forwards`,
              }}
            >
              {letter}
            </span>
          ))}
          <span
            className="inline-block rounded-full"
            style={{
              width: "clamp(8px,1.6vw,14px)",
              height: "clamp(8px,1.6vw,14px)",
              background: "#4a90d9",
              marginLeft: ".08em",
              marginBottom: ".12em",
              opacity: 0,
              transform: "scale(0)",
              animation: "pl-dot-in .5s cubic-bezier(.34,1.56,.64,1) .7s forwards",
            }}
          />
        </div>

        <span
          className="absolute"
          style={{
            bottom: "calc(50% - clamp(1.2rem,3vw,2.1rem) - 1.8rem)",
            left: "50%",
            transform: "translateX(-50%) scaleX(0)",
            width: "clamp(120px,22vw,200px)",
            height: 1,
            background: "linear-gradient(90deg,transparent,var(--cream-46),transparent)",
            animation: "pl-line-in .6s cubic-bezier(.16,1,.3,1) .9s forwards",
            transformOrigin: "center",
          }}
        />

        <span
          className="absolute"
          style={{
            bottom: "calc(50% - clamp(1.2rem,3vw,2.1rem) - 3.6rem)",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-m)",
            fontSize: ".6rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "var(--cream-46)",
            opacity: 0,
            animation: "pl-fade .5s ease 1.1s forwards",
          }}
        >
          INTELLIGENCE, REDEFINED.
        </span>
      </div>
    </>
  );
}
