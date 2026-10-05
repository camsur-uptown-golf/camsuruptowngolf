"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import HeroWords from "@/components/HeroWords";
import { CLUBHOUSE_FACTS } from "@/lib/clubhouse";

const HERO_FACTS = CLUBHOUSE_FACTS.filter(
  (fact) => fact.label !== "Square metres" && fact.label !== "Levels + rooftop",
);
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export default function ClubhouseHeroOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const paint = () => {
      frame = 0;
      const overlay = overlayRef.current;
      const track = document.getElementById("clubhouse-hero-track");
      if (!overlay || !track) return;

      /* Progreso sa loob ng naka-pin na track: 0 sa taas, 1 kapag bibitaw na
         ang sticky hero papunta sa section sa ilalim. Pixel-independent ito —
         gumagana sa anumang taas ng track o viewport. */
      const rect = track.getBoundingClientRect();
      const maxProgress = Math.max(1, rect.height - window.innerHeight);
      const progress = clamp(-rect.top / maxProgress);

      /* Unang umaalis ang title; kasunod na papasok ang stats at mananatili;
         umaalis ang stats sa dulo habang bumibitaw ang hero. */
      const titleGone = clamp(progress / 0.22);
      const titleOpacity = 1 - titleGone;
      const factsEntrance = clamp((progress - 0.18) / 0.22);
      const factsExit = clamp((1 - progress) / 0.16);
      const factsOpacity = Math.min(factsEntrance, factsExit);

      overlay.style.setProperty("--clubhouse-title-opacity", String(titleOpacity));
      overlay.style.setProperty("--clubhouse-facts-opacity", String(factsOpacity));
      overlay.style.setProperty("--clubhouse-title-shift", `${titleGone * -24}px`);
      overlay.style.setProperty("--clubhouse-facts-shift", `${(1 - factsOpacity) * 20}px`);
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-10"
      style={
        {
          "--clubhouse-title-opacity": "1",
          "--clubhouse-facts-opacity": "0",
          "--clubhouse-title-shift": "0px",
          "--clubhouse-facts-shift": "20px",
        } as CSSProperties
      }
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 flex items-center justify-center px-6 text-center will-change-[opacity,transform]"
        style={{
          opacity: "var(--clubhouse-title-opacity)",
          transform: "translateY(var(--clubhouse-title-shift))",
          /* Ibinaba ang title mula sa gitna papuntang ~77% ng tanaw. Inline
             ang offset (hindi Tailwind [value] class) dahil hindi laging
             nire-regenerate ng dev ang CSS para sa bagong arbitrary class. */
          paddingTop: "54vh",
        }}
      >
        {/* Word-by-word entrance (HeroWords); nasa parent container ang
            scroll-driven na kupas (--clubhouse-title-opacity/shift). */}
        <h1 className="max-w-4xl text-balance text-[clamp(2.25rem,4.5vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.055em] text-white [text-shadow:0_3px_28px_rgba(0,0,0,0.5)]">
          <HeroWords text="The Heart of the Course" />
        </h1>
      </div>

      <div
        className="absolute inset-x-0 bottom-4 px-4 will-change-[opacity,transform] sm:bottom-6 sm:px-6 lg:bottom-8 lg:px-8"
        style={{
          opacity: "var(--clubhouse-facts-opacity)",
          transform: "translateY(var(--clubhouse-facts-shift))",
        }}
      >
        {/* Tatlong fact lang (sinala ang "Square metres" at "Levels + rooftop"),
            kaya `grid-cols-3` sa lahat ng lapad — isang malinis na row. Dati ay
            `grid-cols-2` sa mobile, kaya nag-iisa ang pangatlo sa ibabang row. */}
        <dl className="mx-auto grid max-w-3xl grid-cols-3 overflow-hidden rounded-xl border border-[#d1af58]/25 bg-[#1f3f2e]/85 text-center shadow-[0_16px_44px_rgba(6,26,17,0.32)] backdrop-blur-md">
          {HERO_FACTS.map((fact, index) => (
            <div
              key={fact.label}
              className={`flex min-h-[68px] flex-col justify-center px-2 py-3 sm:min-h-[80px] sm:px-4 ${index > 0 ? "border-l border-[#c9a54e]/15" : ""}`}
            >
              <dt className="font-display text-xl font-medium leading-none tracking-[-0.04em] text-[#f2d98d] sm:text-2xl">
                {fact.value}
              </dt>
              <dd className="mt-1.5 font-navigation text-[8px] font-bold uppercase leading-4 tracking-[0.14em] text-white/60 sm:text-[9px]">
                {fact.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
