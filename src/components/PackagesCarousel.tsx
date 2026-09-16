"use client";

import type { TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/**
 * Ang `tab` ay ang maikling pangalan sa ilalim ng carousel. Hiwalay ito sa
 * `title` dahil "Explore Golf Packages" ay masyadong mahaba para sa isang
 * hanay ng tatlo sa telepono.
 */
const PACKAGES = [
  {
    eyebrow: "Build your visit",
    title: "Explore Golf Packages",
    tab: "All packages",
    description: "Compare the available stays and golf itineraries, then shape the package around your dates and group.",
    image: "/packages-main-hero-option-3-4k-v2.jpg",
    href: "/packages",
    action: "Compare packages",
  },
  {
    eyebrow: "One-night escape",
    title: "Stay & Play",
    tab: "Stay & Play",
    description: "One comfortable night, one complete round, and an easy course-side stay beneath Mt. Isarog.",
    image: "/stay-and-play-hero-option-2.png",
    href: "/packages/stay-and-play",
    action: "View itinerary",
  },
  {
    eyebrow: "Friends getaway",
    title: "Buddy Golf Trip",
    tab: "Buddy trip",
    description: "Bring the group together for two rounds, relaxed meals, and the kind of trip everyone keeps talking about.",
    image: "/buddy-golf-trip-hero-v2.png",
    href: "/packages/buddy-trip",
    action: "Plan the trip",
  },
] as const;

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d={direction === "left" ? "m14.5 5-7 7 7 7" : "m9.5 5 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PackagesCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const previous = () => setActive((current) => (current - 1 + PACKAGES.length) % PACKAGES.length);
  const next = () => setActive((current) => (current + 1) % PACKAGES.length);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % PACKAGES.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused]);

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStart.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
    touchStart.current = null;

    if (Math.abs(distance) < 45) return;
    if (distance > 0) previous();
    else next();
  };

  const pack = PACKAGES[active];

  return (
    <section
      id="home-packages"
      className="relative isolate overflow-hidden bg-[#f7f5ee] py-16 text-[#14271d] sm:py-20 lg:py-24"
      aria-roledescription="carousel"
      aria-label="Featured golf packages"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") previous();
        if (event.key === "ArrowRight") next();
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#98782f] sm:text-[11px]">
              Golf stays &amp; getaways
            </p>
            <h2 className="mt-4 max-w-2xl font-serif text-[clamp(2.25rem,4vw,4rem)] font-medium leading-[0.95] tracking-[-0.05em]">
              Find your way to play.
            </h2>
          </div>
          <Link
            href="/packages"
            className="hidden pb-1 font-navigation text-[10px] font-bold uppercase tracking-[0.15em] text-[#2f644b]/75 transition hover:text-[#174630] sm:inline-flex"
          >
            View all packages&nbsp; →
          </Link>
        </div>

        <div className="relative mt-9 sm:mt-11">
          <article
            key={pack.href}
            className="grid min-h-[530px] overflow-hidden rounded-[2rem] border border-[#173b2a]/10 bg-white text-[#14271d] shadow-[0_30px_80px_rgba(17,44,31,0.14)] lg:min-h-[520px] lg:grid-cols-[1.45fr_0.8fr]"
            aria-live="polite"
          >
            <Link href={pack.href} className="relative block min-h-[290px] overflow-hidden lg:min-h-full" tabIndex={-1}>
              <Image
                src={pack.image}
                alt={`${pack.title} at CamSur Uptown Golf Club`}
                fill
                sizes="(min-width: 1024px) 62vw, calc(100vw - 3rem)"
                className="carousel-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071b11]/30 via-transparent to-transparent" aria-hidden="true" />
              <p className="absolute bottom-5 right-6 font-navigation text-[9px] font-bold tracking-[0.18em] text-white/85 sm:bottom-7 sm:right-8">
                {String(active + 1).padStart(2, "0")} / {String(PACKAGES.length).padStart(2, "0")}
              </p>
            </Link>

            <div className="relative flex flex-col justify-center p-7 sm:p-10 lg:p-12">
              {/* Maninipis na gintong linya sa tahi ng larawan at teksto.
                  Pahalang ito sa telepono (nasa itaas ng kopya), patayo sa
                  desktop kung saan magkatabi ang dalawa. */}
              <span
                className="pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-[#b38c34]/40 to-transparent lg:inset-x-auto lg:bottom-10 lg:left-0 lg:top-10 lg:h-auto lg:w-px lg:bg-gradient-to-b"
                aria-hidden="true"
              />
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">{pack.eyebrow}</p>
              <h3 className="mt-4 font-serif text-[clamp(2.25rem,3.5vw,4rem)] font-medium leading-[0.94] tracking-[-0.05em]">{pack.title}</h3>
              <p className="mt-5 text-sm leading-7 text-[#59665e] sm:text-base sm:leading-8">{pack.description}</p>
              <Link
                href={pack.href}
                className="mt-7 inline-flex h-12 w-fit items-center justify-center rounded-full bg-[#2f644b] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a]"
              >
                {pack.action}
              </Link>
            </div>
          </article>

          <button
            type="button"
            onClick={previous}
            aria-label="Previous package"
            className="absolute left-3 top-[145px] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/55 bg-[#f7f5ee]/90 text-[#174630] shadow-lg backdrop-blur transition hover:bg-white sm:left-5 lg:left-6 lg:top-1/2 lg:h-12 lg:w-12"
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next package"
            className="absolute right-3 top-[145px] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/55 bg-[#f7f5ee]/90 text-[#174630] shadow-lg backdrop-blur transition hover:bg-white sm:right-5 lg:right-6 lg:top-1/2 lg:h-12 lg:w-12"
          >
            <Arrow direction="right" />
          </button>
        </div>

        {/* Dating tatlong tuldok. Walang sinasabi ang tuldok tungkol sa
            pupuntahan mo; ang pangalan ng bawat pakete ay mayroon — at
            nagiging maliit na nabigasyon ito sa halip na palamuti. */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-y-1 border-t border-[#173b2a]/12 pt-2"
          aria-label="Choose featured package"
        >
          {PACKAGES.map((item, index) => (
            <button
              key={item.href}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${item.title}`}
              aria-current={active === index ? "true" : undefined}
              className={`relative px-3.5 py-3 font-navigation text-[9px] font-bold uppercase tracking-[0.16em] transition-colors sm:px-6 sm:text-[10px] ${
                active === index ? "text-[#174630]" : "text-[#8a938c] hover:text-[#4f5d55]"
              }`}
            >
              {item.tab}
              <span
                className={`absolute inset-x-2 top-[-2px] h-[2px] transition-colors sm:inset-x-4 ${
                  active === index ? "bg-[#b38c34]" : "bg-transparent"
                }`}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
