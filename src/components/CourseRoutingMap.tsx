"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COURSE_PLAN_IMAGE, HOLE_POSITIONS } from "@/lib/course-holes";

const HOLE_NUMBERS = Object.keys(HOLE_POSITIONS).map(Number);

export default function CourseRoutingMap() {
  const [activeHole, setActiveHole] = useState(1);
  const [scale, setScale] = useState(0.96);

  return (
    <section
      id="course-map"
      aria-label="Interactive CamSur Uptown golf course map"
      className="relative isolate scroll-mt-24 overflow-hidden bg-[#f8f5ea] py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-8 lg:px-12">
        <div
          data-reveal="scale"
          className="relative aspect-square min-h-[340px] w-full overflow-hidden bg-[#f8f5ea] sm:aspect-[16/10] sm:min-h-[520px]"
        >
          <div
            className="absolute left-1/2 top-1/2 aspect-square h-[92%] max-h-[1000px] origin-center transition-transform duration-300 ease-out"
            style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
          >
            <Image
              src={COURSE_PLAN_IMAGE}
              alt="CamSur Uptown 18-hole golf course master plan"
              fill
              sizes="(max-width: 639px) 112vw, (max-width: 1535px) 92vw, 1000px"
              className="pointer-events-none select-none object-contain drop-shadow-[0_24px_32px_rgba(8,27,18,0.38)]"
            />

            {HOLE_NUMBERS.map((number) => {
              const position = HOLE_POSITIONS[number];
              const selected = activeHole === number;

              return (
                <Link
                  key={number}
                  href={`/golf/courses/no-${number}`}
                  aria-label={`Explore hole number ${number}`}
                  onMouseEnter={() => setActiveHole(number)}
                  onFocus={() => setActiveHole(number)}
                  className={`absolute z-10 grid h-7 w-7 place-content-center rounded-[50%_50%_50%_10%] border font-display shadow-[0_6px_12px_rgba(8,27,18,0.3)] transition-[background-color,color,transform] duration-200 sm:h-9 sm:w-9 ${
                    selected
                      ? "border-[#ead99e] bg-[#173b2a] text-[#f8e9b7]"
                      : "border-[#b99742] bg-[#f8f1da] text-[#173b2a]"
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: `translate(-50%, -100%) rotate(-45deg)${selected ? " scale(1.1)" : ""}`,
                  }}
                >
                  <span className="rotate-45 text-center text-[5px] font-normal leading-none sm:text-[7px]">No.</span>
                  <span className="-mt-0.5 rotate-45 text-center text-[9px] font-medium leading-none sm:text-[13px]">
                    {number}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 aspect-square h-[92%] max-h-[1000px] -translate-x-1/2 -translate-y-1/2">
            <div className="pointer-events-auto absolute bottom-3 left-2 grid gap-2 sm:bottom-5 sm:left-4">
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => setScale((current) => Math.min(1.28, current + 0.08))}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d8c783] bg-[#173b2a]/90 text-xl font-light text-[#f8e9b7] transition-colors hover:bg-[#214d37]"
              >
                +
              </button>
              <button
                type="button"
                aria-label="Reset map view"
                onClick={() => setScale(0.96)}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d8c783] bg-[#173b2a]/90 text-lg text-[#f8e9b7] transition-colors hover:bg-[#214d37]"
              >
                ⌖
              </button>
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => setScale((current) => Math.max(0.8, current - 0.08))}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#d8c783] bg-[#173b2a]/90 text-xl font-light text-[#f8e9b7] transition-colors hover:bg-[#214d37]"
              >
                −
              </button>
            </div>

            <div
              aria-live="polite"
              className="pointer-events-auto absolute bottom-4 right-2 rounded-full border border-[#d8c783]/70 bg-[#173b2a]/90 px-4 py-2 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#f8e9b7] sm:bottom-6 sm:right-4 sm:text-[11px]"
            >
              Hole {String(activeHole).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
