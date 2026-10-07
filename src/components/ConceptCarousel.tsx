"use client";

import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { COURSE_PAGES as SLIDES } from "@/lib/site-content";
import { useTranslation } from "@/i18n/LanguageProvider";

const N = SLIDES.length;
const SWIPE_THRESHOLD = 56;

// Hugis ng curved na belt (coverflow). Ang gitna ay flat (rotateY 0); ang mga
// gilid ay naka-tilt papaloob at humuhurong sa Z para magmukhang nakabilog.
const ANGLE = 40; // deg tilt ng kapitbahay
const DEPTH = 150; // px na urong sa Z kada hakbang
const SCALE_STEP = 0.1; // liit kada hakbang palayo
const SPREAD = 0.56; // agwat kada hakbang bilang bahagi ng lapad ng card
const WINDOW = 1.5; // gitna + isang katabi kada panig lang ang makikita

const wrapIndex = (index: number) => ((index % N) + N) % N;

// Pinakamalapit na agwat ng isang slide mula sa kasalukuyang posisyon, may wrap
// (kaya katabi ni hole 1 sa kaliwa si hole 18).
function wrappedDelta(index: number, pos: number) {
  let d = index - pos;
  if (d > N / 2) d -= N;
  else if (d < -N / 2) d += N;
  return d;
}

function cardTransform(d: number): CSSProperties {
  const dist = Math.abs(d);
  const dir = Math.sign(d);
  const rotateY = -dir * Math.min(dist, 1) * ANGLE;
  const translateX = d * SPREAD * 100; // porsiyento ng lapad ng card
  const translateZ = -Math.min(dist, 2) * DEPTH;
  const scale = 1 - Math.min(dist, 2) * SCALE_STEP;
  // Gitna + isang katabi lang ang kita. Ang pangatlo (dist >= 2) ay itinatago;
  // may fade zone (1→2) para marahan itong pumasok habang hinihila o nasa
  // transition sa halip na biglang sumulpot.
  const opacity = dist <= 1 ? 1 : dist >= 2 ? 0 : 2 - dist;
  return {
    transform: `translate3d(${translateX}%, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    opacity,
    zIndex: Math.round(100 - dist * 10),
    pointerEvents: dist < WINDOW ? "auto" : "none",
  };
}

export default function ConceptCarousel() {
  const { t } = useTranslation();
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number; pointerId: number; target: Element | null } | null>(null);
  const swipeConsumed = useRef(false);

  const goPrevious = () => setActive((current) => wrapIndex(current - 1));
  const goNext = () => setActive((current) => wrapIndex(current + 1));

  const step = stageWidth * SPREAD;
  // Fractional na posisyon: sa drag, sumusunod sa daliri; kapag tapos, buo ang
  // active. Ang bawat card ay transform ayon sa layo nito sa `pos`.
  const pos = isDragging && step > 0 ? active - dragOffset / step : active;

  const measure = useCallback(() => {
    if (stageRef.current) setStageWidth(stageRef.current.clientWidth);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const startSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    dragStart.current = { x: event.clientX, y: event.clientY, pointerId: event.pointerId, target: event.target as Element };
    swipeConsumed.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveSwipe = (event: ReactPointerEvent<HTMLDivElement>) => {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 6) return;
    swipeConsumed.current = true;
    setIsDragging(true);
    setDragOffset(deltaX);
  };

  const finishSwipe = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const start = dragStart.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const horizontal = Math.abs(deltaX) > Math.abs(deltaY);

    if (!cancelled && horizontal && step > 0) {
      const stepped = Math.round(deltaX / step);
      let target = active - stepped;
      // Siguraduhing gumagalaw man lang nang isa ang mabilis na maliit na swipe.
      if (target === active && Math.abs(deltaX) >= SWIPE_THRESHOLD) {
        target = active + (deltaX > 0 ? -1 : 1);
      }
      setActive(wrapIndex(target));
    } else if (!cancelled && Math.abs(deltaX) < 6 && Math.abs(deltaY) < 6) {
      /* TAP (hindi swipe) sa isang card: kung ito ang active (gitna), buksan
         ang hole; kung gilid, dalhin sa gitna. Ginagawa rito, hindi sa native
         na click ng Link, dahil ang pointer capture sa swipe surface ay minsang
         hindi naipapasa ang click sa loob — kaya mukhang "hindi clickable" ang
         gitnang larawan. `swipeConsumed` para hindi doblehin ng native click. */
      const card = start.target?.closest<HTMLElement>("[data-slide]");
      const index = card ? Number(card.dataset.slide) : -1;
      if (index >= 0) {
        swipeConsumed.current = true;
        if (index === active) router.push(`/golf/courses/${SLIDES[index].slug}`);
        else setActive(index);
      }
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragStart.current = null;
    setIsDragging(false);
    setDragOffset(0);

    window.setTimeout(() => {
      swipeConsumed.current = false;
    }, 0);
  };

  return (
    <section
      id="concepts"
      className="overflow-hidden bg-[#f7f5ee] pb-6 pt-5 text-[#14271d] sm:pb-8 sm:pt-6 lg:pb-10 lg:pt-8"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goPrevious();
        if (event.key === "ArrowRight") goNext();
      }}
    >
      {/* Ang data-reveal ay may sarili nang transform, kaya nasa labas ito ng
          3D stage na humahawak ng mga naka-perspective na card. */}
      <div data-reveal="scale">
        <div
          onPointerDown={startSwipe}
          onPointerMove={moveSwipe}
          onPointerUp={(event) => finishSwipe(event)}
          onPointerCancel={(event) => finishSwipe(event, true)}
          className={`w-full touch-pan-y select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          <div
            ref={stageRef}
            style={{ perspective: "1600px", transformStyle: "preserve-3d" }}
            className="relative mx-auto aspect-[1.94] w-[calc(100vw-3rem)] max-w-[1040px] sm:w-[52vw]"
          >
            {SLIDES.map((slide, index) => {
              const d = wrappedDelta(index, pos);
              const isActive = index === active;
              return (
                <Link
                  key={slide.slug}
                  href={`/golf/courses/${slide.slug}`}
                  data-slide={index}
                  aria-label={isActive ? `View ${slide.title}` : `Show ${slide.title}`}
                  aria-current={isActive ? "true" : undefined}
                  aria-hidden={Math.abs(d) > WINDOW ? "true" : undefined}
                  tabIndex={isActive ? 0 : -1}
                  draggable={false}
                  onDragStart={(event) => event.preventDefault()}
                  onClick={(event) => {
                    if (swipeConsumed.current) {
                      event.preventDefault();
                      return;
                    }
                    if (!isActive) {
                      event.preventDefault();
                      setActive(index);
                    }
                  }}
                  style={cardTransform(d)}
                  className={`group absolute inset-0 block overflow-hidden bg-[#1f3f2e] outline-none [backface-visibility:hidden] focus-visible:ring-2 focus-visible:ring-[#b38c34] ${
                    isActive ? "shadow-[0_26px_60px_rgba(17,44,31,0.22)]" : ""
                  } ${isDragging ? "" : "transition-[transform,opacity] duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)]"}`}
                >
                  <Image
                    src={slide.image}
                    alt={`${slide.title} — CamSur Uptown Golf Club hole`}
                    fill
                    priority={index === 0}
                    sizes="(min-width: 640px) 52vw, calc(100vw - 3rem)"
                    className="pointer-events-none object-cover"
                  />
                  {/* Bahagyang dumidilim ang mga gilid para umurong ang tingin. */}
                  <div
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-[560ms] ${
                      isActive ? "opacity-0" : "bg-[#061a11]/40 opacity-100"
                    }`}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061a11]/30 to-transparent"
                    aria-hidden="true"
                  />
                  {isActive && (
                    <p className="pointer-events-none absolute bottom-4 right-5 text-[10px] font-bold tracking-[0.18em] text-white/85 sm:bottom-6 sm:right-7 xl:text-[11px]">
                      {String(active + 1).padStart(2, "0")} / {N}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div
        data-reveal="up"
        style={{ "--reveal-delay": "150ms" } as CSSProperties}
        className="mx-auto w-full max-w-[1040px] px-6 pt-7 sm:w-[52vw] sm:min-w-[720px] sm:px-0 sm:pt-8"
      >
        <div className="grid min-w-0 gap-7 lg:grid-cols-2 lg:gap-10" aria-live="polite">
          <div className="min-w-0 lg:border-r lg:border-[#1f3f2e]/35 lg:pr-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
              {t("course.eyebrow")}
            </p>
            <h3 className="mt-2 max-w-full font-serif text-[clamp(2rem,2.5vw,3rem)] font-medium leading-[0.92] tracking-[-0.05em]">
              {t("course.holeNo")} {active + 1}
            </h3>
            <Link href={`/golf/courses/${SLIDES[active].slug}`} className="mt-5 inline-flex h-10 min-w-[112px] items-center justify-center rounded-full bg-[#265136] px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#1f3f2e]">
              {t("action.explore")}
            </Link>
          </div>
          <div className="hidden lg:block lg:pt-6">
            <p className="text-sm leading-6 text-[#536058]">{SLIDES[active].description}</p>
          </div>
        </div>
      </div>

      <div
        data-reveal="up"
        style={{ "--reveal-delay": "260ms" } as CSSProperties}
        className="mx-auto mt-6 flex max-w-[1040px] justify-center gap-2 px-6 sm:w-[52vw]"
        aria-label="Choose hole image"
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.slug}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show ${slide.title}`}
            aria-current={active === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all ${active === index ? "w-8 bg-[#b38c34]" : "w-1.5 bg-[#1f3f2e]/20 hover:bg-[#1f3f2e]/45"}`}
          />
        ))}
      </div>
    </section>
  );
}
