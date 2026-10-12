"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CLUBHOUSE_POSITION, COURSE_PLAN_IMAGE, HOLE_POSITIONS, HOLE_PROFILES } from "@/lib/course-holes";
import { COURSE_PAGES, SITE_SECTIONS } from "@/lib/site-content";

const HOLE_LINKS = COURSE_PAGES.map((course, index) => ({
  number: index + 1,
  href: `/golf/courses/${course.slug}`,
  image: course.image,
}));

const CLUBHOUSE_SECTION = SITE_SECTIONS.find((section) => section.slug === "clubhouse");

/** Isang butas (1–18) o ang clubhouse — ang mga bagay na may pin sa mapa. */
type Spot = number | "clubhouse";

type PreviewData = {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  x: number;
  y: number;
};

function previewFor(spot: Spot): PreviewData {
  if (spot === "clubhouse") {
    return {
      href: "/clubhouse",
      image: CLUBHOUSE_SECTION?.image ?? "/clubhouse/clubhouse-hero.jpg",
      eyebrow: "Clubhouse",
      title: CLUBHOUSE_SECTION?.title ?? "At the heart of the course",
      description: CLUBHOUSE_SECTION?.description ?? "",
      ...CLUBHOUSE_POSITION,
    };
  }

  const profile = HOLE_PROFILES[spot];
  return {
    href: HOLE_LINKS[spot - 1].href,
    image: HOLE_LINKS[spot - 1].image,
    eyebrow: `Hole ${String(spot).padStart(2, "0")} · Par ${profile.par} · ${profile.yards} yds`,
    title: profile.name,
    description: profile.description,
    ...HOLE_POSITIONS[spot],
  };
}

/**
 * Preview card na lumalabas sa tabi ng pin habang naka-hover / naka-focus.
 *
 * Nasa loob ito ng zoom layer kaya laging nakatapat sa pin. Lumilipat ito sa
 * kabilang gilid ng pin depende sa kinalalagyan (kaliwa/kanan, itaas/ibaba)
 * para hindi maputol ng gilid ng mapa. `pointer-events-none`: impormasyon lang
 * ito — ang pin mismo ang link, kaya hindi nito inaagaw ang hover ng pin.
 */
function SpotPreview({ data }: { data: PreviewData }) {
  const toLeft = data.x > 55;
  const translateY = data.y < 32 ? "-18%" : data.y > 68 ? "-88%" : "-55%";

  return (
    <div
      aria-hidden="true"
      className="map-preview pointer-events-none absolute z-30 hidden w-60 overflow-hidden rounded-2xl border border-[#d8c783]/60 bg-[#f8f5ea] text-left shadow-[0_22px_48px_rgba(8,27,18,0.28)] sm:block lg:w-64"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        transform: `translate(${toLeft ? "calc(-100% - 22px)" : "22px"}, ${translateY})`,
      }}
    >
      <div className="relative aspect-[16/10] bg-[#1f3f2e]">
        <Image src={data.image} alt="" fill sizes="256px" className="object-cover" />
      </div>
      <div className="p-4">
        <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.16em] text-[#98782f]">{data.eyebrow}</p>
        <p className="mt-1.5 font-display text-lg font-medium leading-tight tracking-[-0.02em] text-[#14271d]">{data.title}</p>
      </div>
    </div>
  );
}

export default function CourseRoutingMap() {
  const [hoveredSpot, setHoveredSpot] = useState<Spot | null>(null);
  const [focusedSpot, setFocusedSpot] = useState<Spot | null>(null);
  const [scale, setScale] = useState(0.96);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const activeSpot = hoveredSpot ?? focusedSpot;

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

  /* Pareho ang hover/focus ng bawat pin (butas man o clubhouse): nawawala ang
     highlight pag-alis ng cursor sa mismong pin, at keyboard focus lang
     (`:focus-visible`) ang nagpapanatili nito — hindi naiiwang naka-highlight
     pagkatapos ng mouse click (hal. middle-click papuntang bagong tab). */
  function spotHandlers(spot: Spot) {
    return {
      onMouseEnter: () => setHoveredSpot(spot),
      onMouseLeave: () => setHoveredSpot((current) => (current === spot ? null : current)),
      onFocus: (event: React.FocusEvent<HTMLAnchorElement>) => {
        if (event.currentTarget.matches(":focus-visible")) setFocusedSpot(spot);
      },
      onBlur: () => setFocusedSpot(null),
    };
  }

  const clubhouseSelected = activeSpot === "clubhouse";

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
          onMouseLeave={() => setHoveredSpot(null)}
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
              className="pointer-events-none select-none object-contain"
            />

            {HOLE_LINKS.map((hole) => {
              const position = HOLE_POSITIONS[hole.number];
              const selected = activeSpot === hole.number;

              return (
                /* Numero lang ang laman ng pin — ang dating "No." ay
                   nagsisiksikan sa maliit na pin. */
                <Link
                  key={hole.number}
                  href={hole.href}
                  aria-label={`Explore hole number ${hole.number}, ${HOLE_PROFILES[hole.number].name}`}
                  {...spotHandlers(hole.number)}
                  className={`absolute grid h-6 w-6 place-content-center rounded-[50%_50%_50%_10%] border font-display shadow-[0_6px_12px_rgba(8,27,18,0.3)] transition-[background-color,color,transform] duration-200 sm:h-8 sm:w-8 ${
                    selected
                      ? "z-20 border-[#ead99e] bg-[#1f3f2e] text-[#f8e9b7]"
                      : "z-10 border-[#b99742] bg-[#f8f1da] text-[#1f3f2e]"
                  }`}
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: `translate(-50%, -100%) rotate(-45deg)${selected ? " scale(1.15)" : ""}`,
                  }}
                >
                  <span className="rotate-45 text-center text-[9px] font-semibold leading-none sm:text-[12px]">
                    {hole.number}
                  </span>
                </Link>
              );
            })}

            {/* Clubhouse pin: transparent habang tahimik (puting balangkas at
                icon lang sa ibabaw ng larawan), saka nagiging berde kapag
                naka-hover/focus — hindi agad buong berde. */}
            <Link
              href="/clubhouse"
              aria-label="Explore the clubhouse"
              {...spotHandlers("clubhouse")}
              className={`absolute grid h-7 w-7 place-content-center rounded-[50%_50%_50%_10%] border-2 transition-[background-color,border-color,color,transform] duration-200 sm:h-9 sm:w-9 ${
                clubhouseSelected
                  ? "z-20 border-[#ead99e] bg-[#1f3f2e] text-[#f8e9b7] shadow-[0_6px_12px_rgba(8,27,18,0.3)]"
                  : "z-10 border-[#f8f1da] bg-transparent text-[#f8f1da] [filter:drop-shadow(0_2px_4px_rgba(8,27,18,0.65))]"
              }`}
              style={{
                left: `${CLUBHOUSE_POSITION.x}%`,
                top: `${CLUBHOUSE_POSITION.y}%`,
                transform: `translate(-50%, -100%) rotate(-45deg)${clubhouseSelected ? " scale(1.15)" : ""}`,
              }}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rotate-45 sm:h-4 sm:w-4" fill="none" aria-hidden="true">
                <path d="M3 10.5 12 4l9 6.5M5.5 9v10h13V9M10 19v-5h4v5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {activeSpot !== null ? <SpotPreview key={String(activeSpot)} data={previewFor(activeSpot)} /> : null}
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
          </div>
        </div>
      </div>
    </section>
  );
}
