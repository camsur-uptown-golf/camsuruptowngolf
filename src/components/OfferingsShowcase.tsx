"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const OFFERINGS = [
  {
    title: "Championship Golf",
    eyebrow: "Play",
    description: "Explore the complete 18-hole routing beneath Mt. Isarog.",
    image: "/golf-hero-aerial-clean-4k.jpg",
    href: "/golf",
  },
  {
    title: "Golf Packages",
    eyebrow: "Plan",
    description: "Compare golf stays and build a visit around your group.",
    image: "/packages-main-hero-option-3-4k-v2.jpg",
    href: "/packages",
  },
  {
    title: "Stay & Play",
    eyebrow: "One-night escape",
    description: "One comfortable night and one complete round at CamSur Uptown.",
    image: "/stay-and-play-hero-option-2.png",
    href: "/packages/stay-and-play",
  },
  {
    title: "Buddy Golf Trip",
    eyebrow: "Friends getaway",
    description: "Rounds, meals, and an easy golf trip shaped around your group.",
    image: "/buddy-golf-trip-hero-v2.png",
    href: "/packages/buddy-trip",
  },
  {
    title: "Clubhouse Lodge",
    eyebrow: "Stay",
    description: "A boutique golf lodge close to the course and clubhouse.",
    image: "/clubhouse/clubhouse-hero.jpg",
    href: "/accommodations/clubhouse-lodge",
  },
  {
    title: "Villa Del Rey",
    eyebrow: "Resort stay",
    description: "A relaxed base for families, friends, and golf groups.",
    image: "/villa-del-rey/hero-4k-cropped.jpg",
    href: "/accommodations/villa-del-rey",
  },
  {
    title: "Gota Village Resort",
    eyebrow: "Nature-side stay",
    description: "Extend the journey with a retreat shaped by CamSur’s landscape.",
    image: "/gota-village-resort/hero-4k.jpg",
    href: "/accommodations/gota-village-resort",
  },
  {
    title: "CamSur Experiences",
    eyebrow: "Beyond the course",
    description: "Wakepark, ATV trails, family activities, and more between rounds.",
    image: "/experiences/banner11-dehazed.jpg",
    href: "/experiences",
  },
  {
    title: "Dining",
    eyebrow: "Gather & unwind",
    description: "Good food, relaxed tables, and places to share the day’s stories.",
    image: "/dining/vip-dining-bar-hero-clean-4k-v1.png",
    href: "/dining",
  },
  {
    title: "Events at CamSur",
    eyebrow: "Meet & celebrate",
    description: "Course-side settings for tournaments, groups, and special occasions.",
    image: "/clubhouse-rooftop-pool-gardens-clean-4k-v2.png",
    href: "/events",
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

function routeOffset(pathname: string) {
  let hash = 0;
  for (const character of pathname) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return hash % OFFERINGS.length;
}

export default function OfferingsShowcase() {
  const pathname = usePathname();
  const rail = useRef<HTMLDivElement>(null);
  /* 0 hanggang 1 — gaano na kalayo ang narating ng rail. Walang ibang
     nagsasabi kung ilan pa ang natitira sa sampung kard. */
  const [progress, setProgress] = useState(0);

  const offerings = useMemo(() => {
    const start = routeOffset(pathname);
    return [...OFFERINGS.slice(start), ...OFFERINGS.slice(0, start)];
  }, [pathname]);

  const syncProgress = useCallback(() => {
    const node = rail.current;
    if (!node) return;
    const travel = node.scrollWidth - node.clientWidth;
    /* Walang maii-scroll (malapad na screen, kaunting kard): punuin ang bar
       sa halip na hatiin sa zero. */
    setProgress(travel <= 0 ? 1 : Math.min(1, Math.max(0, node.scrollLeft / travel)));
  }, []);

  useEffect(() => {
    syncProgress();
    window.addEventListener("resize", syncProgress);
    return () => window.removeEventListener("resize", syncProgress);
  }, [syncProgress, offerings]);

  const scroll = (direction: "left" | "right") => {
    rail.current?.scrollBy({
      left: (direction === "left" ? -1 : 1) * Math.max(300, rail.current.clientWidth * 0.72),
      behavior: "smooth",
    });
  };

  return (
    <section className="overflow-hidden border-t border-[#173b2a]/10 bg-[#f7f5ee] py-16 text-[#14271d] sm:py-20 lg:py-24" aria-labelledby="discover-more-title">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-7 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#98782f] sm:text-[11px]">
              More to discover
            </p>
            <h2 id="discover-more-title" className="mt-4 max-w-3xl font-serif text-[clamp(2.15rem,4vw,3.9rem)] font-medium leading-[0.96] tracking-[-0.05em]">
              Make more of your CamSur visit.
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#5d685f] sm:text-base sm:leading-8">
              From the first tee to where you stay, dine, unwind, and celebrate—see everything the destination can bring together.
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Show previous offers"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2f644b]/30 text-[#2f644b] transition-colors hover:border-[#2f644b] hover:bg-[#2f644b] hover:text-white"
            >
              <Arrow direction="left" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Show more offers"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2f644b]/30 text-[#2f644b] transition-colors hover:border-[#2f644b] hover:bg-[#2f644b] hover:text-white"
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>

        {/* Dating larawan-sa-itaas at puting kahon-sa-ibaba — kamukhang-kamukha
            ng kard ng packages carousel sa itaas ng pahina. Matangkad na tile
            na ngayon at nasa ibabaw ng larawan ang teksto, kaya malinaw na
            ibang banda ito kahit pareho pa rin ang cream na background. */}
        <div
          ref={rail}
          onScroll={syncProgress}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="CamSur Uptown offerings"
        >
          {offerings.map((offering, index) => (
            <Link
              key={offering.href}
              href={offering.href}
              className="group relative isolate aspect-[3/4] w-[78%] shrink-0 snap-start overflow-hidden rounded-[1.5rem] bg-[#173b2a] sm:w-[44%] lg:w-[30.5%]"
            >
              <Image
                src={offering.image}
                alt={`${offering.title} at CamSur Uptown`}
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 44vw, 78vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              {/* Dalawang layer: mabigat sa ilalim para mabasa ang teksto,
                  manipis sa itaas para mabasa ang numero. */}
              <div
                className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,18,11,0.90)_0%,rgba(4,18,11,0.58)_28%,rgba(4,18,11,0.06)_58%,rgba(4,18,11,0.34)_100%)]"
                aria-hidden="true"
              />
              <span
                className="absolute inset-0 rounded-[1.5rem] border border-white/12 transition-colors group-hover:border-[#e7d18d]/45"
                aria-hidden="true"
              />

              <p className="absolute right-5 top-5 font-navigation text-[9px] font-bold tracking-[0.16em] text-white/75">
                {String(index + 1).padStart(2, "0")} / {OFFERINGS.length}
              </p>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-7">
                <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.2em] text-[#f1d98f]">{offering.eyebrow}</p>
                <h3 className="mt-3 font-serif text-[1.7rem] font-medium leading-none tracking-[-0.04em]">{offering.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/72">{offering.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-navigation text-[9px] font-bold uppercase tracking-[0.14em] text-[#f1d98f]">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Ang haba ng gintong bahagi ay kung gaano na kalayo ang narating sa
            sampung kard. Nakatago sa screen reader — pang-scroll lang ito. */}
        <div className="mt-6 h-px w-full bg-[#173b2a]/12" aria-hidden="true">
          <div
            className="h-px bg-[#b38c34] transition-[width] duration-200 ease-out"
            style={{ width: `${Math.max(12, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}
