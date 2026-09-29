"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CLUBHOUSE_SPACES } from "@/lib/clubhouse";

/**
 * Ang mga kuwarto bilang scrollytelling.
 *
 * Bawat kuwarto ay isang mataas na "stage" (150vh) na ang larawan ay
 * naka-`sticky` — dumidikit ito sa itaas at pumupuno sa buong tanaw habang
 * gumugulong ang natitirang taas ng stage. Sa loob ng dikit na iyon:
 *
 *   1. Pagdating mo, walang teksto — malinis muna ang larawan.
 *   2. Habang nag-scroll ka, kusang umuusbong ang teksto sa kaliwa (fade +
 *      dausdos mula kaliwa), hinihila ng progreso ng stage.
 *   3. Pagkatapos nitong buo na, may kaunti pang dikit bago mag-scroll
 *      papunta sa susunod na larawan.
 *
 * Isang rAF loop lang ang humahawak: kinukuwenta ang progreso ng bawat stage
 * (0..1) at isinusulat sa `--text` na custom property; ang CSS na lang ang
 * bahala sa opacity at transform. Iginagalang ang prefers-reduced-motion:
 * naka-buo agad ang teksto at walang scrub.
 *
 * HINDI ito pwedeng nasa loob ng EDITORIAL_SECTION — may `overflow-hidden`
 * iyon, at sinisira niyon ang `position: sticky`. Sariling section ito na
 * walang overflow; ang pahalang na scroll ay bantay pa rin ng `overflow-x:
 * clip` sa <html>.
 */

/* Taas ng bawat stage. Ang larawan ay `sticky top-0 h-screen`, kaya buong
   tanaw itong nakadikit habang gumugulong ang unang (STAGE − 100vh) — dito
   naka-hold ang larawan at umuusbong ang teksto. Sa huling 100vh, dumadausdos
   pataas ang larawan habang FLUSH na pumapasok ang susunod (walang puting
   agwat). */
const STAGE_VH = 220;

/* Saan sa loob ng hold umuusbong ang teksto (p = 0..1 sa buong hold). May
   dalawang delay: (1) malinis muna ang larawan bago umahon ang teksto
   (TEXT_START), at (2) pagkatapos nitong buo (TEXT_END), may mahabang plateau
   pa — naka-pin pa rin ang larawan, hindi agad bumababa sa susunod. */
const TEXT_START = 0.35;
const TEXT_END = 0.65;

export default function ClubhouseRooms() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-room-stage]"));
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
      {CLUBHOUSE_SPACES.map((space) => (
        <article
          key={space.id}
          id={space.id}
          data-room-stage
          className="relative scroll-mt-28"
          style={{ height: `${STAGE_VH}vh` }}
        >
          {/* Naka-pin na larawan — pumupuno sa buong tanaw habang gumugulong
              ang stage. Neutral (itim) ang fallback bg, hindi berde, para
              walang berdeng gilid na sumisilip. Ang sariling overflow-hidden
              nito ay hindi sumisira sa stickiness (sa elemento mismo, hindi sa
              ninuno). */}
          <div className="sticky top-0 h-screen overflow-hidden bg-black">
            <Image src={space.image} alt={space.imageAlt} fill sizes="100vw" className="object-cover" />

            {/* Teksto sa kaliwang ibaba. Neutral (itim) na malambot na scrim —
                walang green tint — kasama sa fade, dagdag ng text-shadow para
                nabasa sa ibabaw ng maliwanag na larawan. Nakatago muna
                (`--text` = 0) at kusang umuusbong habang nag-scroll, may delay
                bago lumitaw.

                BUONG-LAPAD ANG SCRIM, HINDI `max-w-2xl` NA KAHON. Dati ay nasa
                672px na kahon ang gradient, kaya may vertical seam sa kanang
                gilid nito at mahina ang dilim sa itaas kung saan nakaupo ang
                eyebrow at pamagat — mahirap basahin sa maliwanag na larawan.
                Ngayon: buong-lapad (walang seam), mas madilim at mas mataas ang
                saklaw (bottom gradient), dagdag na kaliwang gradient sa panig ng
                teksto, at mas malakas na text-shadow. Ang teksto na lang ang
                naka-`max-w-2xl` sa loob. */}
            <div className="absolute inset-x-0 bottom-0">
              <div
                className="[background:linear-gradient(0deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.48)_36%,rgba(0,0,0,0.16)_66%,transparent_100%),linear-gradient(90deg,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.2)_46%,transparent_74%)] px-6 pb-6 pt-28 text-white [text-shadow:0_1px_22px_rgba(0,0,0,0.62)] sm:px-9 sm:pb-9 sm:pt-32 lg:px-12 lg:pb-12 lg:pt-36"
                style={
                  {
                    opacity: "var(--text, 0)",
                    transform: "translateX(calc((var(--text, 0) - 1) * 28px))",
                    willChange: "opacity, transform",
                  } as CSSProperties
                }
              >
                <div className="max-w-2xl">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#f0d98f] xl:text-[11px]">
                    {space.floor}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl xl:text-4xl">
                    {space.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 line-clamp-4 sm:line-clamp-none xl:text-base xl:leading-8">
                    {space.description}
                  </p>
                  {/* Ang `id` ang slug ng sariling ruta — tingnan ang
                      CLUBHOUSE_SPACES. Nananatili rin itong anchor dito. */}
                  <Link
                    href={`/clubhouse/${space.id}`}
                    className="mt-6 inline-flex h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-[#e7d18d]/70 bg-black/20 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.12em] text-[#f0d98f] backdrop-blur-[2px] transition-colors hover:border-[#e7d18d] hover:bg-[#e7d18d] hover:text-[#14271d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7d18d] xl:text-[11px]"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
