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

/* Zoom ng mapa. BASE ang simula (kasya ang buong mapa sa frame); hanggang
   MAX_SCALE ang lapit — 2560px ang larawan kaya malinaw pa hanggang ~2.5×. */
const BASE_SCALE = 0.96;
const MIN_SCALE = 0.8;
const MAX_SCALE = 2.5;
const ZOOM_STEP = 1.25;
/* Ilang pixel ng galaw bago ituring na drag (hindi click sa pin). */
const DRAG_THRESHOLD = 5;

type View = { scale: number; x: number; y: number };
const INITIAL_VIEW: View = { scale: BASE_SCALE, x: 0, y: 0 };

/**
 * Pin anchor: nakapuwesto sa x/y ng mapa pero kinokontra ang zoom
 * (`scale(BASE / scale)`) para hindi lumaki ang mga pin at preview card
 * habang lumalapit — ang mapa lang ang lumalaki.
 */
function MapAnchor({
  x,
  y,
  counterScale,
  animate,
  className = "",
  children,
}: {
  x: number;
  y: number;
  counterScale: number;
  animate: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute h-0 w-0 ${animate ? "transition-transform duration-300 ease-out" : ""} ${className}`}
      style={{ left: `${x}%`, top: `${y}%`, transform: `scale(${counterScale})`, transformOrigin: "0 0" }}
    >
      {children}
    </div>
  );
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
      className="map-preview pointer-events-none absolute left-0 top-0 hidden w-60 overflow-hidden rounded-2xl border border-[#d8c783]/60 bg-[#f8f5ea] text-left shadow-[0_22px_48px_rgba(8,27,18,0.28)] sm:block lg:w-64"
      style={{ transform: `translate(${toLeft ? "calc(-100% - 22px)" : "22px"}, ${translateY})` }}
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

const CONTROL_BUTTON =
  "grid h-11 w-11 place-items-center rounded-full border border-[#d8c783] bg-[#1f3f2e]/90 text-[#f8e9b7] transition-colors hover:bg-[#1f3f2e] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-[#1f3f2e]/90";

export default function CourseRoutingMap() {
  const [hoveredSpot, setHoveredSpot] = useState<Spot | null>(null);
  const [focusedSpot, setFocusedSpot] = useState<Spot | null>(null);
  const [view, setView] = useState<View>(INITIAL_VIEW);
  const [isFullscreen, setIsFullscreen] = useState(false);
  /* Habang nagda-drag/pinch: walang transition para sumunod agad sa daliri. */
  const [isGesturing, setIsGesturing] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    startView: View;
    startX: number;
    startY: number;
    startDist: number;
    moved: number;
  } | null>(null);
  const suppressClick = useRef(false);
  /* Posisyon ng scroll bago mag-fullscreen — ibinabalik pag-exit, dahil
     nagbabago ang layout habang fullscreen at napupunta sa ibang section. */
  const scrollBeforeFullscreen = useRef<number | null>(null);
  const activeSpot = hoveredSpot ?? focusedSpot;
  const isZoomedIn = view.scale > BASE_SCALE + 0.001;
  const isDefaultView = view.scale === BASE_SCALE && view.x === 0 && view.y === 0;
  const counterScale = BASE_SCALE / view.scale;

  /* Hindi puwedeng itulak ang mapa nang lampas sa gilid ng frame. */
  function clampView(next: View): View {
    const map = mapRef.current;
    const layer = layerRef.current;
    const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next.scale));
    if (!map || !layer) return { scale, x: 0, y: 0 };
    const size = layer.offsetWidth * scale;
    const maxX = Math.max(0, (size - map.clientWidth) / 2);
    const maxY = Math.max(0, (size - map.clientHeight) / 2);
    return {
      scale,
      x: Math.min(maxX, Math.max(-maxX, next.x)),
      y: Math.min(maxY, Math.max(-maxY, next.y)),
    };
  }

  /* Zoom na nakatutok sa isang punto (relative sa gitna ng frame) — ang
     puntong iyon ay hindi gumagalaw habang lumalapit/lumalayo. */
  function zoomAround(from: View, scale: number, focusX = 0, focusY = 0): View {
    const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
    const ratio = next / from.scale;
    return clampView({
      scale: next,
      x: focusX - (focusX - from.x) * ratio,
      y: focusY - (focusY - from.y) * ratio,
    });
  }

  function focusPoint(clientX: number, clientY: number) {
    const rect = mapRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left - rect.width / 2, y: clientY - rect.top - rect.height / 2 };
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      const entered = document.fullscreenElement === mapRef.current;
      setIsFullscreen(entered);
      setView(INITIAL_VIEW);
      const savedScroll = scrollBeforeFullscreen.current;
      if (!entered && savedScroll !== null) {
        scrollBeforeFullscreen.current = null;
        /* Hintaying matapos ang re-render at layout bago ibalik. */
        requestAnimationFrame(() =>
          requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: "instant" })),
        );
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  /* Trackpad pinch (ctrl + wheel) — non-passive para mapigilan ang zoom ng
     buong pahina. Ang ordinaryong scroll ay hindi ginagalaw. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const handleWheel = (event: WheelEvent) => {
      if (!event.ctrlKey) return;
      event.preventDefault();
      const rect = map.getBoundingClientRect();
      const fx = event.clientX - rect.left - rect.width / 2;
      const fy = event.clientY - rect.top - rect.height / 2;
      setView((current) => {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, current.scale * Math.exp(-event.deltaY * 0.01)));
        const ratio = next / current.scale;
        const size = (layerRef.current?.offsetWidth ?? 0) * next;
        const maxX = Math.max(0, (size - map.clientWidth) / 2);
        const maxY = Math.max(0, (size - map.clientHeight) / 2);
        return {
          scale: next,
          x: Math.min(maxX, Math.max(-maxX, fx - (fx - current.x) * ratio)),
          y: Math.min(maxY, Math.max(-maxY, fy - (fy - current.y) * ratio)),
        };
      });
    };
    map.addEventListener("wheel", handleWheel, { passive: false });
    return () => map.removeEventListener("wheel", handleWheel);
  }, []);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        scrollBeforeFullscreen.current = window.scrollY;
        await mapRef.current?.requestFullscreen();
      }
    } catch {
      setIsFullscreen(false);
    }
  }

  function startGesture() {
    const points = [...pointers.current.values()];
    const [a, b] = points;
    const midX = b ? (a.x + b.x) / 2 : a.x;
    const midY = b ? (a.y + b.y) / 2 : a.y;
    gesture.current = {
      startView: view,
      startX: midX,
      startY: midY,
      startDist: b ? Math.hypot(a.x - b.x, a.y - b.y) : 0,
      moved: gesture.current?.moved ?? 0,
    };
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if ((event.target as Element).closest("button")) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.current.size === 1) gesture.current = null;
    startGesture();
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!pointers.current.has(event.pointerId) || !gesture.current) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const g = gesture.current;
    const [a, b] = [...pointers.current.values()];

    if (b) {
      /* Pinch: lapit/layo ayon sa distansya ng dalawang daliri, nakatutok
         sa gitna nila, at sumusunod din ang mapa kung igagalaw ang dalawa. */
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const midX = (a.x + b.x) / 2;
      const midY = (a.y + b.y) / 2;
      const focus = focusPoint(g.startX, g.startY);
      const zoomed = zoomAround(g.startView, g.startView.scale * (dist / (g.startDist || dist)), focus.x, focus.y);
      g.moved += DRAG_THRESHOLD + 1;
      setIsGesturing(true);
      setView(clampView({ ...zoomed, x: zoomed.x + midX - g.startX, y: zoomed.y + midY - g.startY }));
      return;
    }

    const dx = a.x - g.startX;
    const dy = a.y - g.startY;
    g.moved = Math.max(g.moved, Math.hypot(dx, dy));
    if (g.moved < DRAG_THRESHOLD || g.startView.scale <= BASE_SCALE + 0.001) return;
    setIsGesturing(true);
    setView(clampView({ ...g.startView, x: g.startView.x + dx, y: g.startView.y + dy }));
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    if (!pointers.current.delete(event.pointerId)) return;
    if (gesture.current && gesture.current.moved >= DRAG_THRESHOLD) {
      /* Drag ito, hindi click — huwag buksan ang pin na binitawan. */
      suppressClick.current = true;
      window.setTimeout(() => (suppressClick.current = false), 0);
    }
    if (pointers.current.size === 0) {
      gesture.current = null;
      setIsGesturing(false);
    } else {
      /* Isang daliri na lang — ituloy bilang drag mula sa kasalukuyang view. */
      startGesture();
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
  const activePreview = activeSpot !== null && !isGesturing ? previewFor(activeSpot) : null;

  return (
    <section
      id="course-map"
      aria-label="Interactive CamSur Uptown golf course map"
      className="relative isolate overflow-hidden bg-[#f8f5ea] py-6 sm:py-8 lg:py-10"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-8 lg:px-12">
        {/* Nasa hiwalay na balot ang data-reveal: nagbabago ang className ng
            mapa (fullscreen, drag), at kapag ni-render ulit ni React ay
            natatanggal ang idinagdag na `is-in` — kaya nagiging opacity 0
            (itim na screen sa fullscreen). */}
        <div data-reveal="scale">
        <div
          ref={mapRef}
          onMouseLeave={() => setHoveredSpot(null)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onPointerLeave={(event) => event.pointerType === "mouse" && handlePointerEnd(event)}
          onClickCapture={(event) => {
            if (!suppressClick.current) return;
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }}
          onDragStart={(event) => event.preventDefault()}
          /* Naka-zoom: ang isang daliri ay pang-galaw ng mapa. Hindi naka-zoom:
             normal na scroll ng pahina, pero ang pinch ay para sa mapa. */
          style={{ touchAction: isZoomedIn ? "none" : "pan-y" }}
          className={`${isFullscreen ? "h-screen w-screen" : "aspect-square min-h-[340px] w-full sm:aspect-[16/10] sm:min-h-[520px]"} relative select-none overflow-hidden bg-[#f8f5ea] ${
            isZoomedIn ? (isGesturing ? "cursor-grabbing" : "cursor-grab") : ""
          }`}
        >
          <div
            ref={layerRef}
            className={`${isFullscreen ? "h-[96%] max-h-none" : "h-[96%] max-h-[1040px]"} absolute left-1/2 top-1/2 aspect-square origin-center ${
              isGesturing ? "" : "transition-transform duration-300 ease-out"
            }`}
            style={{ transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
          >
            <Image
              src={COURSE_PLAN_IMAGE}
              alt="CamSur Uptown 18-hole golf course master plan"
              fill
              /* Maliit muna (mabilis lumabas); saka lang kinukuha ang malaking
                 bersyon kapag talagang naka-zoom. */
              sizes={view.scale > 1.2 ? "(max-width: 639px) 200vw, (max-width: 1535px) 180vw, 2560px" : "(max-width: 639px) 112vw, (max-width: 1535px) 92vw, 1000px"}
              className="pointer-events-none select-none object-contain"
            />

            {HOLE_LINKS.map((hole) => {
              const position = HOLE_POSITIONS[hole.number];
              const selected = activeSpot === hole.number;

              return (
                <MapAnchor
                  key={hole.number}
                  x={position.x}
                  y={position.y}
                  counterScale={counterScale}
                  animate={!isGesturing}
                  className={selected ? "z-20" : "z-10"}
                >
                  {/* Numero lang ang laman ng pin — ang dating "No." ay
                      nagsisiksikan sa maliit na pin. */}
                  <Link
                    href={hole.href}
                    draggable={false}
                    aria-label={`Explore hole number ${hole.number}, ${HOLE_PROFILES[hole.number].name}`}
                    {...spotHandlers(hole.number)}
                    className={`absolute left-0 top-0 grid h-6 w-6 place-content-center rounded-[50%_50%_50%_10%] border font-display shadow-[0_6px_12px_rgba(8,27,18,0.3)] transition-[background-color,color,transform] duration-200 sm:h-8 sm:w-8 ${
                      selected
                        ? "border-[#ead99e] bg-[#1f3f2e] text-[#f8e9b7]"
                        : "border-[#b99742] bg-[#f8f1da] text-[#1f3f2e]"
                    }`}
                    style={{ transform: `translate(-50%, -100%) rotate(-45deg)${selected ? " scale(1.15)" : ""}` }}
                  >
                    <span className="rotate-45 text-center text-[9px] font-semibold leading-none sm:text-[12px]">
                      {hole.number}
                    </span>
                  </Link>
                </MapAnchor>
              );
            })}

            {/* Clubhouse pin: transparent habang tahimik (puting balangkas at
                icon lang sa ibabaw ng larawan), saka nagiging berde kapag
                naka-hover/focus — hindi agad buong berde. */}
            <MapAnchor
              x={CLUBHOUSE_POSITION.x}
              y={CLUBHOUSE_POSITION.y}
              counterScale={counterScale}
              animate={!isGesturing}
              className={clubhouseSelected ? "z-20" : "z-10"}
            >
              <Link
                href="/clubhouse"
                draggable={false}
                aria-label="Explore the clubhouse"
                {...spotHandlers("clubhouse")}
                className={`absolute left-0 top-0 grid h-7 w-7 place-content-center rounded-[50%_50%_50%_10%] border-2 transition-[background-color,border-color,color,transform] duration-200 sm:h-9 sm:w-9 ${
                  clubhouseSelected
                    ? "border-[#ead99e] bg-[#1f3f2e] text-[#f8e9b7] shadow-[0_6px_12px_rgba(8,27,18,0.3)]"
                    : "border-[#f8f1da] bg-transparent text-[#f8f1da] [filter:drop-shadow(0_2px_4px_rgba(8,27,18,0.65))]"
                }`}
                style={{ transform: `translate(-50%, -100%) rotate(-45deg)${clubhouseSelected ? " scale(1.15)" : ""}` }}
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 rotate-45 sm:h-4 sm:w-4" fill="none" aria-hidden="true">
                  <path d="M3 10.5 12 4l9 6.5M5.5 9v10h13V9M10 19v-5h4v5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </MapAnchor>

            {activePreview ? (
              <MapAnchor x={activePreview.x} y={activePreview.y} counterScale={counterScale} animate={!isGesturing} className="z-30">
                <SpotPreview key={String(activeSpot)} data={activePreview} />
              </MapAnchor>
            ) : null}
          </div>

          <div className={`${isFullscreen ? "h-[96%] max-h-none" : "h-[96%] max-h-[1040px]"} pointer-events-none absolute left-1/2 top-1/2 z-20 aspect-square -translate-x-1/2 -translate-y-1/2`}>
            <div className="pointer-events-auto absolute bottom-3 left-2 grid gap-2 sm:bottom-5 sm:left-4">
              <button
                type="button"
                aria-label="Zoom in"
                disabled={view.scale >= MAX_SCALE}
                onClick={() => setView((current) => zoomAround(current, current.scale * ZOOM_STEP))}
                className={`${CONTROL_BUTTON} text-xl font-light`}
              >
                +
              </button>
              <button
                type="button"
                aria-label={isFullscreen ? "Exit full screen map" : "View map full screen"}
                aria-pressed={isFullscreen}
                onClick={toggleFullscreen}
                className={CONTROL_BUTTON}
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
                disabled={view.scale <= MIN_SCALE}
                onClick={() => setView((current) => zoomAround(current, current.scale / ZOOM_STEP))}
                className={`${CONTROL_BUTTON} text-xl font-light`}
              >
                −
              </button>
              <button
                type="button"
                aria-label="Reset map view"
                disabled={isDefaultView}
                onClick={() => setView(INITIAL_VIEW)}
                className={CONTROL_BUTTON}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                  <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
