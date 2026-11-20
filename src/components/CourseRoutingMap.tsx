"use client";

import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { CLUBHOUSE_POSITION, COURSE_PLAN_IMAGE, HOLE_POSITIONS, HOLE_PROFILES } from "@/lib/course-holes";
import { COURSE_PAGES, SITE_SECTIONS } from "@/lib/site-content";
import styles from "./CourseRoutingMap.module.css";

const HOLE_LINKS = COURSE_PAGES.map((course, index) => ({
  number: index + 1,
  href: `/golf/courses/${course.slug}`,
  image: course.image,
}));
const HOLE_NUMBERS = HOLE_LINKS.map((hole) => hole.number);
const CLUBHOUSE_SECTION = SITE_SECTIONS.find((section) => section.slug === "clubhouse");
const BASE_SCALE = 0.96;
const MIN_SCALE = 0.8;
const MAX_SCALE = 2.5;
const ZOOM_STEP = 1.25;
const DRAG_THRESHOLD = 5;
const TOUR_INTERVAL = 6500;

type Spot = number | "clubhouse";
type Nine = "all" | "front" | "back";
type Unit = "yards" | "metres";
type View = { scale: number; x: number; y: number };
const INITIAL_VIEW: View = { scale: BASE_SCALE, x: 0, y: 0 };
const NINES: { value: Nine; label: string }[] = [
  { value: "all", label: "All 18" },
  { value: "front", label: "Front 9" },
  { value: "back", label: "Back 9" },
];

function holesFor(nine: Nine) {
  return HOLE_NUMBERS.filter((number) => nine === "all" || (nine === "front" ? number <= 9 : number > 9));
}

const ICON_PATHS = {
  play: "m8 5 11 7-11 7V5Z",
  pause: "M8 5v14M16 5v14",
  locate: "M12 3v3m0 12v3M3 12h3m12 0h3M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z",
  clubhouse: "M12 8V2l5 1.5L12 5M2 11c3-4 17-4 20 0v2H2v-2ZM4 13v6h16v-6M8 13v6m8-6v6M2 19h20M4 22h16",
  expand: "M9 4H4v5m11-5h5v5M9 20H4v-5m11 5h5v-5",
  collapse: "M9 4v5H4m11-5v5h5M9 20v-5H4m11 5v-5h5",
  flag: "M6 21V3m0 1c4-3 7 3 12 0v9c-5 3-8-3-12 0",
} as const;

function Icon({ name }: { name: keyof typeof ICON_PATHS }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={ICON_PATHS[name]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/** Keep pins at the same screen size as the terrain zooms underneath. */
function MapAnchor({ x, y, counterScale, animate, className = "", children }: {
  x: number; y: number; counterScale: number; animate: boolean; className?: string; children: React.ReactNode;
}) {
  return <div className={`absolute h-0 w-0 ${animate ? "transition-transform duration-300 ease-out motion-reduce:transition-none" : ""} ${className}`} style={{ left: `${x}%`, top: `${y}%`, transform: `scale(${counterScale})`, transformOrigin: "0 0" }}>{children}</div>;
}

export default function CourseRoutingMap() {
  const [selectedSpot, setSelectedSpot] = useState<Spot>(1);
  const [hoveredSpot, setHoveredSpot] = useState<Spot | null>(null);
  const [focusedSpot, setFocusedSpot] = useState<Spot | null>(null);
  const [nine, setNine] = useState<Nine>("all");
  const [unit, setUnit] = useState<Unit>("yards");
  const [isTourPlaying, setIsTourPlaying] = useState(false);
  const [view, setView] = useState<View>(INITIAL_VIEW);
  const [isBrowserExpanded, setIsBrowserExpanded] = useState(false);
  const [isGesturing, setIsGesturing] = useState(false);
  const explorerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ startView: View; startX: number; startY: number; startDist: number; moved: number } | null>(null);
  const suppressClick = useRef(false);
  const scrollBeforeFullscreen = useRef<number | null>(null);
  const activeSpot = hoveredSpot ?? focusedSpot ?? selectedSpot;
  const isExpanded = isBrowserExpanded;
  const isZoomedIn = view.scale > BASE_SCALE + 0.001;
  const isDefaultView = view.scale === BASE_SCALE && view.x === 0 && view.y === 0;
  const counterScale = BASE_SCALE / view.scale;
  const visibleHoles = holesFor(nine);
  const selectedHole = typeof selectedSpot === "number" ? HOLE_PROFILES[selectedSpot] : null;
  const selectedLink = typeof selectedSpot === "number" ? HOLE_LINKS[selectedSpot - 1] : null;
  const previewImage = selectedLink?.image ?? CLUBHOUSE_SECTION?.image ?? "/clubhouse/clubhouse-hero.jpg";
  const selectedPosition = typeof selectedSpot === "number" ? HOLE_POSITIONS[selectedSpot] : CLUBHOUSE_POSITION;
  const unitLabel = unit === "yards" ? "yds" : "m";

  // This is an opt-in preview tour, not a suggested shot route or live GPS.
  useEffect(() => {
    if (!isTourPlaying) return;
    const sequence = holesFor(nine);
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setSelectedSpot((current) => {
        const index = typeof current === "number" ? sequence.indexOf(current) : -1;
        return sequence[(index + 1) % sequence.length];
      });
    }, TOUR_INTERVAL);
    return () => window.clearInterval(timer);
  }, [isTourPlaying, nine]);

  // Keep a zoomed map inside its frame when the viewport changes size.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const observer = new ResizeObserver(() => {
      setView((current) => {
        const size = (layerRef.current?.offsetWidth ?? 0) * current.scale;
        const maxX = Math.max(0, (size - map.clientWidth) / 2);
        const maxY = Math.max(0, (size - map.clientHeight) / 2);
        const x = Math.min(maxX, Math.max(-maxX, current.x));
        const y = Math.min(maxY, Math.max(-maxY, current.y));
        return x === current.x && y === current.y ? current : { ...current, x, y };
      });
    });
    observer.observe(map);
    return () => observer.disconnect();
  }, [isBrowserExpanded]);

  // Keep the expanded explorer accessible without browser fullscreen permissions.
  useEffect(() => {
    if (!isBrowserExpanded) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => Array.from(explorerRef.current?.querySelectorAll<HTMLElement>("button:not([disabled]), a[href]") ?? []);
    const frame = requestAnimationFrame(() => explorerRef.current?.querySelector<HTMLElement>("[data-fullscreen-toggle]")?.focus({ preventScroll: true }));
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsBrowserExpanded(false);
        setView(INITIAL_VIEW);
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      const restoreFocus = previousFocus?.isConnected ? previousFocus : document.getElementById("course-explorer-stage")?.querySelector<HTMLElement>("[data-fullscreen-toggle]");
      restoreFocus?.focus({ preventScroll: true });
      const savedScroll = scrollBeforeFullscreen.current;
      scrollBeforeFullscreen.current = null;
      if (savedScroll !== null) requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: "instant" }));
    };
  }, [isBrowserExpanded]);

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
  }, [isBrowserExpanded]);

  function toggleFullscreen() {
    if (!isBrowserExpanded) scrollBeforeFullscreen.current = window.scrollY;
    setIsBrowserExpanded((current) => !current);
    setView(INITIAL_VIEW);
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
    if ((event.target as Element).closest("button, a")) return;
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

  function selectSpot(spot: Spot) {
    setSelectedSpot(spot);
    setIsTourPlaying(false);
    setHoveredSpot(null);
    setFocusedSpot(null);
  }

  function changeNine(next: Nine) {
    const holes = holesFor(next);
    setNine(next);
    setIsTourPlaying(false);
    setSelectedSpot((current) => typeof current === "number" && holes.includes(current) ? current : holes[0]);
    setHoveredSpot(null);
    setFocusedSpot(null);
    setView(INITIAL_VIEW);
  }

  function stepHole(direction: number) {
    const index = typeof selectedSpot === "number" ? visibleHoles.indexOf(selectedSpot) : direction > 0 ? -1 : 0;
    selectSpot(visibleHoles[(index + direction + visibleHoles.length) % visibleHoles.length]);
  }

  function locateSelected() {
    const size = layerRef.current?.offsetWidth ?? 0;
    const scale = 1.65;
    setView(clampView({ scale, x: (0.5 - selectedPosition.x / 100) * size * scale, y: (0.5 - selectedPosition.y / 100) * size * scale }));
  }


  function spotHandlers(spot: Spot) {
    return {
      onMouseEnter: () => setHoveredSpot(spot),
      onMouseLeave: () => setHoveredSpot((current) => current === spot ? null : current),
      onFocus: () => setFocusedSpot(spot),
      onBlur: () => setFocusedSpot(null),
    };
  }

  // Portal the expanded view past the page’s stacking context and fixed header.
  const explorer = (
        <div id="course-explorer-stage" ref={explorerRef} role={isBrowserExpanded ? "dialog" : undefined} aria-modal={isBrowserExpanded || undefined} aria-label={isBrowserExpanded ? "Full screen course explorer" : undefined} className={`${styles.explorer} ${isExpanded ? styles.fullscreen : ""} ${isBrowserExpanded ? styles.browserExpanded : ""}`}>
          <div className={styles.toolbar}>
            <div className={styles.explorerTitle}><Icon name="flag" /><span>Course explorer</span></div>
            <div className={styles.nineSwitch} role="group" aria-label="Choose course nine">
              {NINES.map((item) => <button key={item.value} type="button" aria-pressed={nine === item.value} onClick={() => changeNine(item.value)}>{item.label}</button>)}
            </div>
            <div className={styles.unitSwitch} role="group" aria-label="Distance unit">
              <button type="button" aria-pressed={unit === "yards"} onClick={() => setUnit("yards")}>Yards</button>
              <span aria-hidden="true">/</span>
              <button type="button" aria-pressed={unit === "metres"} onClick={() => setUnit("metres")}>Metres</button>
            </div>
          </div>

          <div className={styles.workspace}>
            <div
              ref={mapRef}
              className={`${styles.map} ${isZoomedIn ? isGesturing ? styles.dragging : styles.draggable : ""}`}
              onMouseLeave={() => setHoveredSpot(null)}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerEnd}
              onPointerCancel={handlePointerEnd}
              onPointerLeave={(event) => event.pointerType === "mouse" && handlePointerEnd(event)}
              onClickCapture={(event) => {
                if (!suppressClick.current) return;
                event.preventDefault(); event.stopPropagation(); suppressClick.current = false;
              }}
              onDragStart={(event) => event.preventDefault()}
              style={{ touchAction: isZoomedIn ? "none" : "pan-y" }}
              aria-label="Interactive course map. Choose a numbered pin to preview a hole."
            >
              <div className={styles.mapCaption} aria-hidden="true"><span>CamSur Uptown Golf</span><span>Pili · Camarines Sur</span></div>
              <div ref={layerRef} className={`${styles.terrain} ${isGesturing ? styles.gesturing : ""}`} style={{ transform: `translate(-50%, -50%) translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
                <Image src={COURSE_PLAN_IMAGE} alt="CamSur Uptown 18-hole golf course master plan" fill sizes={view.scale > 1.2 ? "(max-width: 639px) 200vw, (max-width: 1535px) 140vw, 2000px" : "(max-width: 639px) 112vw, (max-width: 1023px) 92vw, 850px"} className={styles.mapImage} />
                {HOLE_LINKS.map((hole) => {
                  const position = HOLE_POSITIONS[hole.number];
                  const selected = selectedSpot === hole.number;
                  const included = visibleHoles.includes(hole.number);
                  return (
                    <MapAnchor key={hole.number} x={position.x} y={position.y} counterScale={counterScale} animate={!isGesturing} className={selected || activeSpot === hole.number ? "z-20" : "z-10"}>
                      <button type="button" disabled={!included} aria-pressed={selected} aria-controls="course-hole-detail" aria-label={`Preview hole ${hole.number}, ${HOLE_PROFILES[hole.number].name}`} onClick={() => selectSpot(hole.number)} {...spotHandlers(hole.number)} className={`${styles.pin} ${selected ? styles.selectedPin : ""} ${activeSpot === hole.number ? styles.activePin : ""}`}>
                        {selected ? <span className={styles.pinHalo} aria-hidden="true" /> : null}
                        <span>{hole.number}</span>
                      </button>
                      {activeSpot === hole.number && !selected && included && !isGesturing ? <span aria-hidden="true" className={`${styles.pinTooltip} ${position.x > 65 ? styles.tooltipLeft : ""}`}>{HOLE_PROFILES[hole.number].name}<small>Par {HOLE_PROFILES[hole.number].par} · {unit === "yards" ? HOLE_PROFILES[hole.number].yards : HOLE_PROFILES[hole.number].blueMetres} {unitLabel}</small></span> : null}
                    </MapAnchor>
                  );
                })}
                <MapAnchor x={CLUBHOUSE_POSITION.x} y={CLUBHOUSE_POSITION.y} counterScale={counterScale} animate={!isGesturing} className="z-20">
                  <button type="button" aria-label="Preview the clubhouse" title="Clubhouse" aria-pressed={selectedSpot === "clubhouse"} aria-controls="course-hole-detail" onClick={() => selectSpot("clubhouse")} {...spotHandlers("clubhouse")} className={`${styles.pin} ${styles.clubhousePin} ${selectedSpot === "clubhouse" ? styles.selectedPin : ""}`}><Icon name="clubhouse" /></button>
                </MapAnchor>
              </div>

              <div className={styles.mapControls}>
                <button type="button" aria-label="Zoom in" disabled={view.scale >= MAX_SCALE} onClick={() => setView((current) => zoomAround(current, current.scale * ZOOM_STEP))}>+</button>
                <span aria-hidden="true">{Math.round(view.scale / BASE_SCALE * 100)}%</span>
                <button type="button" aria-label="Zoom out" disabled={view.scale <= MIN_SCALE} onClick={() => setView((current) => zoomAround(current, current.scale / ZOOM_STEP))}>−</button>
                <span className={styles.controlDivider} />
                <button type="button" className={styles.resetControl} aria-label="Reset map view" disabled={isDefaultView} onClick={() => setView(INITIAL_VIEW)}><span className="text-[11px] font-medium">Reset</span></button>
                <button type="button" data-fullscreen-toggle aria-label={isExpanded ? "Exit full screen map" : "View map full screen"} aria-pressed={isExpanded} onClick={toggleFullscreen}><Icon name={isExpanded ? "collapse" : "expand"} /></button>
              </div>
              {isTourPlaying ? <div key={`${selectedSpot}-${nine}`} className={styles.tourProgress} style={{ animationDuration: `${TOUR_INTERVAL}ms` }} aria-hidden="true" /> : null}
            </div>

            <aside id="course-hole-detail" aria-label="Selected course preview" className={styles.detail}>
              <div key={String(selectedSpot)} className={styles.previewImage}>
                <Image src={previewImage} alt={selectedHole ? `${selectedHole.name}, hole ${selectedSpot}, course concept` : "CamSur Uptown clubhouse concept"} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 42vw, 380px" className="object-cover" />
                <div className={styles.imageShade} />
                <span className={styles.previewLabel}>{selectedHole ? selectedHole.name : "At the heart of the course"}</span>
                <span className={styles.conceptLabel}>Course concept</span>
              </div>
              <div className={styles.detailBody}>
                <div key={String(selectedSpot)} className={styles.detailCopy}>
                  {selectedHole ? null : <h3>The clubhouse</h3>}
                  {selectedHole ? <dl className={`${styles.holeFacts} lining-nums`}><div><dt>Hole No.</dt><dd>{selectedSpot}</dd></div><div><dt>Par</dt><dd>{selectedHole.par}</dd></div><div><dt>Back tees</dt><dd>{unit === "yards" ? selectedHole.yards : selectedHole.blueMetres}<span>{unitLabel}</span></dd></div></dl> : null}
                  <p className={styles.description}>{selectedHole?.description ?? CLUBHOUSE_SECTION?.description ?? "Return to the heart of the club before or after your round."}</p>
                </div>
                <button type="button" onClick={locateSelected} className={styles.locateButton}><Icon name="locate" />Locate on the map</button>
                <Link href={selectedLink?.href ?? "/clubhouse"} className={styles.holeLink}>{selectedHole ? `Explore Hole No. ${selectedSpot}` : "Explore the clubhouse"}<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></Link>
                <div className={styles.holeNavigation}>
                  <button type="button" aria-label="Previous hole" onClick={() => stepHole(-1)}>Previous</button>
                  <span>{selectedHole ? `${String(selectedSpot).padStart(2, "0")} / 18` : "Clubhouse"}</span>
                  <button type="button" aria-label="Next hole" onClick={() => stepHole(1)}>Next</button>
                </div>
              </div>
            </aside>
          </div>

          <div className={styles.holeStrip}>
            <p>Choose<br /><strong>your hole</strong></p>
            <div role="group" aria-label="Hole selector" className={styles.holeNumbers}>
              {visibleHoles.map((number) => <button key={number} type="button" aria-label={`Select hole ${number}`} aria-pressed={selectedSpot === number} onClick={() => selectSpot(number)} className={number === 10 ? styles.backNineStart : ""}>{String(number).padStart(2, "0")}</button>)}
            </div>
            <span className={styles.stripCount}>{visibleHoles.length} holes<br />One journey.</span>
          </div>
          <p className="sr-only" aria-live={isTourPlaying ? "off" : "polite"} aria-atomic="true">{selectedHole ? `Selected hole ${selectedSpot}: ${selectedHole.name}. Par ${selectedHole.par}, ${unit === "yards" ? selectedHole.yards : selectedHole.blueMetres} ${unitLabel} from the back tees.` : "Selected clubhouse."}</p>
        </div>
  );

  /* Walang ulo ang section ("Every hole. A new perspective." at ang tatlong
     bilang) — tuloy agad sa explorer. Kaya `aria-label` ang pangalan nito,
     hindi na `aria-labelledby` sa inalis na pamagat. */
  return (
    <section id="course-map" aria-label="Course explorer" className={styles.section}>
      <div className={styles.container}>
        {isBrowserExpanded ? createPortal(explorer, document.body) : explorer}
        <p className={styles.planNote}>An introduction to the course. Explore each hole for its individual layout and details.</p>
      </div>
    </section>
  );
}
