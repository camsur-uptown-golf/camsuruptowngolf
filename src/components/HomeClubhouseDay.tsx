"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";
import { CLUBHOUSE_DAY } from "@/lib/clubhouse";

/**
 * "How a day here runs." ng /clubhouse, bilang interactive na section ng
 * homepage. Iisa ang pinagmulan: `CLUBHOUSE_DAY` sa lib/clubhouse.ts.
 *
 * Tatlong panel (Umaga → Hapon → Gabi). Lumalapad ang aktibo at ipinapakita
 * ang buong caption; makikitid ang iba. Kusang lumilipat sa susunod kapag
 * napuno ang gold na timeline — `animationend` ng bar ang nagtutulak, kaya
 * walang hiwalay na timer na puwedeng magkalayo sa nakikita. Humihinto ito
 * kapag hinover/naka-focus, wala sa viewport, o naka-reduced motion.
 */

const DURATION_MS = 6500;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

export default function HomeClubhouseDay() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const paused = hovering || !inView;
  const next = () => setActive((index) => (index + 1) % CLUBHOUSE_DAY.length);

  return (
    <section
      ref={sectionRef}
      id="clubhouse-day"
      className="relative isolate overflow-hidden bg-[#f7f5ee] pb-6 pt-4 text-[#14271d] sm:pb-8 sm:pt-6 lg:pb-10 lg:pt-8"
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              data-reveal="up"
              className="font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#98782f] sm:text-xs"
            >
              {t("home.day.eyebrow")}
            </p>
            <h2
              data-reveal="up"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              className="mt-3 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]"
            >
              {t("home.day.title")}
            </h2>
          </div>
          <Link
            href="/clubhouse"
            data-reveal="up"
            className="group inline-flex h-12 shrink-0 items-center gap-3 self-start rounded-full bg-[#e7d18d] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] shadow-[0_14px_34px_rgba(152,120,47,0.14)] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] sm:self-auto xl:text-[11px]"
          >
            {t("home.day.cta")}
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" aria-hidden="true">
              <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Timeline: isang segment bawat oras ng araw. */}
        <div className="mt-10 grid grid-cols-3 gap-3 sm:mt-12 sm:gap-5" role="tablist" aria-label={t("home.day.title")}>
          {CLUBHOUSE_DAY.map((part, index) => {
            const isActive = index === active;
            const isDone = index < active;
            return (
              <button
                key={part.time}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`day-panel-${index}`}
                onClick={() => setActive(index)}
                className="group text-left focus-visible:outline-none"
              >
                <span className="relative block h-[3px] overflow-hidden rounded-full bg-[#14271d]/12">
                  <span
                    key={isActive ? `${active}-on` : "off"}
                    className="absolute inset-0 origin-left rounded-full bg-[#98782f]"
                    style={
                      isActive && !reducedMotion
                        ? {
                            animation: `day-progress ${DURATION_MS}ms linear forwards`,
                            animationPlayState: paused ? "paused" : "running",
                          }
                        : { transform: `scaleX(${isActive || isDone ? 1 : 0})` }
                    }
                    onAnimationEnd={isActive ? next : undefined}
                  />
                </span>
                <span
                  className={`mt-3 block font-navigation text-[10px] font-bold uppercase tracking-[0.18em] transition-colors group-hover:text-[#14271d] group-focus-visible:text-[#14271d] sm:text-[11px] ${
                    isActive ? "text-[#14271d]" : "text-[#14271d]/55"
                  }`}
                >
                  {part.time}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mga panel: patayo sa phone, pahalang mula lg. */}
        <div
          className="mt-6 flex flex-col gap-3 sm:mt-8 lg:h-[560px] lg:flex-row lg:gap-4"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocus={() => setHovering(true)}
          onBlur={() => setHovering(false)}
        >
          {CLUBHOUSE_DAY.map((part, index) => {
            const isActive = index === active;
            return (
              <div
                key={part.time}
                id={`day-panel-${index}`}
                role="tabpanel"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className={`group relative isolate cursor-pointer overflow-hidden rounded-[1.6rem] bg-[#1f3f2e] transition-[flex-grow,height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:h-auto ${
                  isActive ? "h-[440px] sm:h-[480px] lg:flex-[3.2]" : "h-[96px] lg:flex-1"
                }`}
              >
                <Image
                  src={part.image}
                  alt={`${part.title} at the CamSur Uptown clubhouse`}
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className={`-z-20 object-cover transition-transform duration-[1400ms] ease-out ${isActive ? "scale-100" : "scale-110"}`}
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 -z-10 transition-opacity duration-700 ${
                    isActive
                      ? "bg-[linear-gradient(180deg,transparent_35%,rgba(10,26,18,0.55)_65%,rgba(10,26,18,0.92)_100%)]"
                      : "bg-[rgba(10,26,18,0.62)] group-hover:bg-[rgba(10,26,18,0.45)]"
                  }`}
                />

                {/* Naka-collapse: oras lang — pahalang sa phone, patayo sa lg. */}
                <div
                  aria-hidden={isActive}
                  className={`absolute inset-0 flex items-center justify-between px-6 transition-opacity duration-300 lg:flex-col lg:justify-end lg:px-0 lg:pb-8 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100 delay-200"
                  }`}
                >
                  <span className="font-navigation text-[11px] font-bold uppercase tracking-[0.22em] text-white lg:rotate-180 lg:[writing-mode:vertical-rl]">
                    {part.title}
                  </span>
                </div>

                {/* Bukas: buong caption. */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 sm:p-8 lg:p-10 ${
                    isActive ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="font-display text-[clamp(1.9rem,3vw,3rem)] font-medium leading-[1.02] tracking-[-0.04em] text-white">
                    {part.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-[15px] leading-7 text-white/85 sm:text-[17px] sm:leading-8">{part.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
