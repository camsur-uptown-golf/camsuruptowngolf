"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COURSE_PLAN_IMAGE, HOLE_POSITIONS } from "@/lib/course-holes";
import { COURSE_PAGES } from "@/lib/site-content";

const HOLE_LINKS = COURSE_PAGES.map((course, index) => ({
  number: index + 1,
  href: `/golf/courses/${course.slug}`,
}));

export default function CourseRoutingMap() {
  const [activeHole, setActiveHole] = useState(1);
  const [scale, setScale] = useState(0.96);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(document.fullscreenElement === mapRef.current);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await mapRef.current?.requestFullscreen();
      }
    } catch {
      setIsFullscreen(false);
    }
  }

  return (
    <section
      id="course-map"
      aria-label="Interactive CamSur Uptown golf course map"
      className="relative isolate overflow-hidden bg-[#f8f5ea] py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-8 lg:px-12">
        <div
          ref={mapRef}
          data-reveal="scale"
          className={`${isFullscreen ? "h-screen w-screen" : "aspect-square min-h-[340px] w-full sm:aspect-[16/10] sm:min-h-[520px]"} relative overflow-hidden bg-[#f8f5ea]`}
        >
          <div
            className={`${isFullscreen ? "h-[96%] max-h-none" : "h-[96%] max-h-[1040px]"} absolute left-1/2 top-1/2 aspect-square origin-center transition-transform duration-300 ease-out`}
            style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
          >
            <Image
              src={COURSE_PLAN_IMAGE}
              alt="CamSur Uptown 18-hole golf course master plan"
              fill
              sizes="(max-width: 639px) 112vw, (max-width: 1535px) 92vw, 1000px"
              className="pointer-events-none select-none object-contain drop-shadow-[0_24px_32px_rgba(8,27,18,0.38)]"
            />

            {HOLE_LINKS.map((hole) => {
              const position = HOLE_POSITIONS[hole.number];
              const selected = activeHole === hole.number;

              return (
                <Link
                  key={hole.number}
                  href={hole.href}
                  aria-label={`Explore hole number ${hole.number}`}
                  onMouseEnter={() => setActiveHole(hole.number)}
                  onFocus={() => setActiveHole(hole.number)}
                  className={`absolute z-10 grid h-7 w-7 place-content-center rounded-[50%_50%_50%_10%] border font-display shadow-[0_6px_12px_rgba(8,27,18,0.3)] transition-[background-color,color,transform] duration-200 sm:h-9 sm:w-9 ${
                    selected
                      ? "border-[#ead99e] bg-[#1f3f2e] text-[#f8e9b7]"
                      : "border-[#b99742] bg-[#f8f1da] text-[#1f3f2e]"
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: `translate(-50%, -100%) rotate(-45deg)${selected ? " scale(1.1)" : ""}`,
                  }}
                >
                  <span className="rotate-45 text-center text-[5px] font-normal leading-none sm:text-[7px]">No.</span>
                  <span className="-mt-0.5 rotate-45 text-center text-[9px] font-medium leading-none sm:text-[13px]">
                    {hole.number}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className={`${isFullscreen ? "h-[96%] max-h-none" : "h-[96%] max-h-[1040px]"} pointer-events-none absolute left-1/2 top-1/2 z-20 aspect-square -translate-x-1/2 -translate-y-1/2`}>
            <div className="pointer-events-auto absolute bottom-3 left-2 grid gap-2 sm:bottom-5 sm:left-4">
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => setScale((current) => Math.min(1.28, current + 0.08))}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d8c783] bg-[#1f3f2e]/90 text-xl font-light text-[#f8e9b7] transition-colors hover:bg-[#1f3f2e]"
              >
                +
              </button>
              <button
                type="button"
                aria-label={isFullscreen ? "Exit full screen map" : "View map full screen"}
                aria-pressed={isFullscreen}
                onClick={toggleFullscreen}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d8c783] bg-[#1f3f2e]/90 text-[#f8e9b7] transition-colors hover:bg-[#1f3f2e]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  {isFullscreen ? (
                    <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  ) : (
                    <path d="M9 4H4v5M15 4h5v5M9 20H4v-5M15 20h5v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              </button>
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => setScale((current) => Math.max(0.8, current - 0.08))}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d8c783] bg-[#1f3f2e]/90 text-xl font-light text-[#f8e9b7] transition-colors hover:bg-[#1f3f2e]"
              >
                −
              </button>
            </div>

            <Link
              href={HOLE_LINKS[activeHole - 1].href}
              aria-live="polite"
              aria-label={`Open hole number ${activeHole}`}
              className="pointer-events-auto absolute bottom-4 right-2 rounded-full border border-[#d8c783]/70 bg-[#1f3f2e]/90 px-4 py-2 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#f8e9b7] transition-colors hover:bg-[#1f3f2e] sm:bottom-6 sm:right-4 sm:text-[11px]"
            >
              Hole {String(activeHole).padStart(2, "0")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
