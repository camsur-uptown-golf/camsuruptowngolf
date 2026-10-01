"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Ang mga occasion ng Events bilang scrollytelling — KAPAREHONG transition ng
 * mga kuwarto sa `/clubhouse` (tingnan ang ClubhouseRooms). Ito ang hiniling:
 * ilagay ang teksto SA LOOB ng larawan, hindi sa ibaba.
 *
 * Bawat occasion ay isang mataas na "stage" (220vh) na ang larawan ay
 * naka-`sticky` — dumidikit sa itaas at pumupuno sa buong tanaw habang
 * gumugulong ang stage. Sa loob ng dikit na iyon:
 *
 *   1. Pagdating mo, malinis muna ang larawan — walang teksto.
 *   2. Habang nag-scroll ka, kusang umuusbong ang caption sa kaliwang ibaba
 *      (fade + dausdos mula kaliwa), hinihila ng progreso ng stage.
 *   3. Pagkatapos nitong buo, may plateau pa bago dumausdos pataas ang larawan
 *      habang FLUSH na pumapasok ang susunod (walang puting agwat).
 *
 * Isang rAF loop lang: kinukuwenta ang progreso ng bawat stage (0..1) at
 * isinusulat sa `--text`; ang CSS na ang bahala sa opacity/transform. Kaparehong
 * TALES ng bilang (STAGE_VH, TEXT_START, TEXT_END) ng clubhouse, kaya iisa ang
 * pakiramdam. Iginagalang ang prefers-reduced-motion.
 *
 * HINDI ito pwede sa loob ng `overflow-hidden` na section — sinisira niyon ang
 * `position: sticky`. Kaya walang-overflow na section ang tumatawag nito.
 */

const STAGE_VH = 220;
const TEXT_START = 0;
const TEXT_END = 0.3;

type Occasion = {
  readonly title: string;
  readonly kicker: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly inclusions: readonly string[];
};

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[3px] h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="m4.5 10.5 3.2 3.1 7.8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EventsOccasions({ occasions }: { occasions: readonly Occasion[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-occasion-stage]"));
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
      {occasions.map((occasion) => (
        <article
          key={occasion.title}
          data-occasion-stage
          className="relative scroll-mt-28"
          style={{ height: `${STAGE_VH}vh` }}
        >
          {/* Naka-pin na larawan — pumupuno sa buong tanaw. Neutral (itim) ang
              fallback bg kaya walang berdeng gilid habang naglo-load. */}
          <div className="sticky top-0 h-screen overflow-hidden bg-black">
            <Image src={occasion.image} alt={occasion.imageAlt} fill sizes="100vw" className="object-cover" />

            {/* Kasabay ng caption ang dark overlay. Pinakamalalim sa
                lower-left text area at marahang kumukupas pataas at pakanan,
                kaya readable ang copy nang walang nakikitang kahon o seam. */}
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
                (`--text` = 0 muna). IISANG vertical na scrim lang: kumukupas
                mula transparent sa itaas papuntang madilim sa ibaba, kaya
                WALANG hard na linya. Dati may pangalawang pahalang (90deg) na
                layer para padilimin ang kaliwa, pero walang vertical fade iyon
                kaya may nakaka-off na horizontal seam sa itaas na gilid — inalis
                na. Mas mataas ang pt para unti-unti at maaga pa lang kumukupas
                ang dilim — "sakop na yung sa taas". Text-shadow ang dagdag na
                kontra para nabasa sa maliwanag na larawan. */}
            <div className="absolute inset-x-0 bottom-0">
              <div
                className="px-6 pb-6 pt-40 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.62)] sm:px-9 sm:pb-9 sm:pt-48 lg:px-12 lg:pb-12 lg:pt-56"
                style={
                  {
                    opacity: "var(--text, 0)",
                    transform: "translateX(calc((var(--text, 0) - 1) * 28px))",
                    willChange: "opacity, transform",
                  } as CSSProperties
                }
              >
                <div className="max-w-2xl">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0d98f] xl:text-[11px]">
                    {occasion.kicker}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl xl:text-4xl">
                    {occasion.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 line-clamp-4 sm:line-clamp-none xl:text-base xl:leading-8">
                    {occasion.description}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2 sm:mt-6">
                    {occasion.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[13px] leading-6 text-white/85 xl:text-sm">
                        <span className="text-[#f0d98f]">
                          <CheckIcon />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
