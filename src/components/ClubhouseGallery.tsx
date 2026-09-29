"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Ang mga dagdag na kuha ng isang espasyo, bilang scrollytelling — kapareho
 * ng mga kuwarto sa `/clubhouse` (tingnan ang ClubhouseRooms).
 *
 * Bawat kuha ay isang mataas na stage na ang larawan ay naka-`sticky` at
 * pumupuno sa buong tanaw. Pagdating mo: malinis muna ang larawan (may delay),
 * saka kusang umuusbong ang caption sa kaliwang ibaba, tapos may mahabang
 * plateau bago dumausdos pataas ang larawan habang FLUSH na pumapasok ang
 * susunod (walang puting agwat).
 *
 * Isang rAF loop lang: kinukuwenta ang progreso ng bawat stage (0..1) at
 * isinusulat sa `--text`; ang CSS na ang bahala sa opacity/transform.
 * Iginagalang ang prefers-reduced-motion. HINDI ito pwede sa loob ng
 * `overflow-hidden` na section — sinisira niyon ang `position: sticky`.
 */

const STAGE_VH = 220;
const TEXT_START = 0.35;
const TEXT_END = 0.65;

export default function ClubhouseGallery({
  label,
  shots,
}: {
  label: string;
  shots: readonly { readonly src: string; readonly alt: string }[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-shot-stage]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      stages.forEach((stage) => stage.style.setProperty("--text", "1"));
      return;
    }

    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    let frame = 0;

    const paint = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const stage of stages) {
        const rect = stage.getBoundingClientRect();
        const total = stage.offsetHeight - vh;
        const p = total > 0 ? clamp(-rect.top / total) : 0;
        const t = clamp((p - TEXT_START) / (TEXT_END - TEXT_START));
        stage.style.setProperty("--text", t.toFixed(3));
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const repaintWhenVisible = () => {
      if (!document.hidden) paint();
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pageshow", repaintWhenVisible);
    document.addEventListener("visibilitychange", repaintWhenVisible);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pageshow", repaintWhenVisible);
      document.removeEventListener("visibilitychange", repaintWhenVisible);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full bg-[#f7f5ee]">
      {shots.map((shot) => (
        <div
          key={shot.src}
          data-shot-stage
          className="relative"
          style={{ height: `${STAGE_VH}vh` }}
        >
          <div className="sticky top-0 h-screen overflow-hidden bg-black">
            <Image src={shot.src} alt={shot.alt} fill sizes="100vw" className="object-cover" />

            {/* Caption sa kaliwang ibaba — neutral na scrim + text-shadow,
                nakatago muna at kusang umuusbong habang nag-scroll. */}
            <div className="absolute inset-x-0 bottom-0 flex">
              <div
                className="w-full max-w-2xl bg-[linear-gradient(0deg,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.32)_45%,rgba(0,0,0,0)_100%)] p-6 pt-14 text-white [text-shadow:0_1px_18px_rgba(0,0,0,0.5)] sm:p-9 sm:pt-20 lg:p-12 lg:pt-24"
                style={
                  {
                    opacity: "var(--text, 0)",
                    transform: "translateX(calc((var(--text, 0) - 1) * 28px))",
                    willChange: "opacity, transform",
                  } as CSSProperties
                }
              >
                <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#e7d18d] xl:text-[11px]">
                  {label}
                </p>
                <p className="mt-3 max-w-xl text-lg leading-8 text-white sm:text-xl xl:text-2xl xl:leading-9">
                  {shot.alt}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
