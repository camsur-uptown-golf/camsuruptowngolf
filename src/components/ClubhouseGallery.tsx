"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Ang mga dagdag na kuha ng isang espasyo, bilang scrollytelling — kapareho
 * ng mga kuwarto sa `/clubhouse` (tingnan ang ClubhouseRooms).
 *
 * Bawat kuha ay isang mataas na stage na ang larawan ay naka-`sticky` at
 * pumupuno sa buong tanaw. Sa unang scroll pa lang ay kusang umuusbong ang
 * caption sa kaliwang ibaba, tapos may mahabang
 * plateau bago dumausdos pataas ang larawan habang FLUSH na pumapasok ang
 * susunod (walang puting agwat).
 *
 * Isang rAF loop lang: kinukuwenta ang progreso ng bawat stage (0..1) at
 * isinusulat sa `--text`; ang CSS na ang bahala sa opacity/transform.
 * Iginagalang ang prefers-reduced-motion. HINDI ito pwede sa loob ng
 * `overflow-hidden` na section — sinisira niyon ang `position: sticky`.
 */

const STAGE_VH = 220;
const TEXT_START = 0;
const TEXT_END = 0.3;

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

            {/* Parehong treatment ng main clubhouse tour: habang lumalabas ang
                caption, sabay na nagfa-fade ang malambot na shadow field sa
                lower-left at bottom. Inline ang gradient para tiyak na ma-render
                sa lahat ng slug gallery at walang Tailwind-generated seam. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={
                {
                  background:
                    "radial-gradient(ellipse 78% 82% at 0% 100%, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.46) 38%, rgba(0,0,0,0.20) 66%, transparent 92%), linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.28) 60%, rgba(0,0,0,0.58) 100%)",
                  opacity: "var(--text, 0)",
                  willChange: "opacity",
                } as CSSProperties
              }
            />

            {/* Caption sa kaliwang ibaba — kusang umuusbong habang nag-scroll
                (`--text` = 0 muna). BUONG-LAPAD na scrim, HINDI `max-w-2xl` na
                kahon: dati naka-672px box ang gradient kaya may hard na vertical
                seam sa KANANG gilid — yun ang black line na inaalis. Ngayon:
                buong-lapad at iisang vertical gradient na kumukupas pataas
                (transparent sa taas), kaya walang linya kahit saan. Ang teksto
                na lang ang naka-`max-w-xl` sa kaliwa; text-shadow ang dagdag na
                kontra. */}
            <div className="absolute inset-x-0 bottom-0">
              <div
                className="px-6 pb-6 pt-20 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.6)] sm:px-9 sm:pb-9 sm:pt-24 lg:px-12 lg:pb-12 lg:pt-28"
                style={
                  {
                    opacity: "var(--text, 0)",
                    transform: "translateX(calc((var(--text, 0) - 1) * 28px))",
                    willChange: "opacity, transform",
                  } as CSSProperties
                }
              >
                <div className="max-w-xl">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#e7d18d] xl:text-[11px]">
                    {label}
                  </p>
                  <p className="mt-3 text-lg leading-8 text-white sm:text-xl xl:text-2xl xl:leading-9">
                    {shot.alt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
