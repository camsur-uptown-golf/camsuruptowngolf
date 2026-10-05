"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import Image from "next/image";

const STAGE_VH = 220;
const TEXT_START = 0;
/* Mas mabilis buong lumabas ang caption (~15% ng stage), tugma sa /events. */
const TEXT_END = 0.15;

type Activity = {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly href: string;
  readonly description: string;
};

export default function ExperiencesActivities({ kicker, items }: { kicker: string; items: readonly Activity[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-activity-stage]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      stages.forEach((stage) => stage.style.setProperty("--text", "1"));
      return;
    }

    const clamp = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);
    let frame = 0;

    const paint = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      for (const stage of stages) {
        const rect = stage.getBoundingClientRect();
        const total = stage.offsetHeight - viewportHeight;
        const progress = total > 0 ? clamp(-rect.top / total) : 0;
        const textProgress = clamp((progress - TEXT_START) / (TEXT_END - TEXT_START));
        stage.style.setProperty("--text", textProgress.toFixed(3));
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
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
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative w-full bg-[#f7f5ee]">
      {items.map((item) => (
        <article
          key={item.id}
          id={item.id}
          data-activity-stage
          className="relative scroll-mt-28"
          style={{ height: `${STAGE_VH}vh` }}
        >
          <div className="sticky top-0 h-screen overflow-hidden bg-black">
            {/* Static (walang galaw) ang larawan — pumupuno lang sa tanaw. */}
            <Image src={item.image} alt={item.name} fill sizes="100vw" className="object-cover" />

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

            <div className="absolute inset-x-0 bottom-0">
              <div
                className="px-6 pb-6 pt-32 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.9),0_2px_10px_rgba(0,0,0,0.62)] sm:px-9 sm:pb-9 sm:pt-40 lg:px-12 lg:pb-12 lg:pt-48"
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
                    {kicker}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.04em] text-white sm:text-4xl xl:text-5xl">
                    {item.name}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:text-base sm:leading-8">
                    {item.description}
                  </p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex h-11 items-center gap-3 rounded-full border border-[#e7d18d]/70 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.12em] text-[#f0d98f] transition-colors hover:border-[#e7d18d] hover:bg-[#e7d18d] hover:text-[#14271d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7d18d] xl:text-[11px]"
                  >
                    View facility <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
