"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Ang teaser ng Packages sa homepage — iisang banner na lang.
 *
 * Carousel ito dati na may tatlong slide (ang buong Packages, Stay & Play, at
 * Group Golf Getaway). Ang pangunahing larawan na lang ang natira, kasama ang
 * "See packages" na papunta sa /packages; nandoon na ang bawat package.
 *
 * WALANG `w-screen`, `100vw`, NI `50vw` DITO. Kasama ng `100vw` ang gutter ng
 * scrollbar, kaya may naputol sa bawat gilid noon. Direktang anak ng `section`
 * ang bloke, kaya natural itong kasinglapad ng body.
 *
 * ANG SCRIM AY HINDI PALAMUTI. Maliwanag ang kaliwa ng larawan, kaya
 * kailangan ng dilim sa likod ng teksto. Kapag pinalitan ang larawan,
 * tingnan muli ang scrim.
 */
const BANNER = {
  href: "/packages",
  image: "/packages-main-hero-v2.png",
  alt: "Golfers walking back to the clubhouse at sunset, CamSur Uptown Golf Club",
  title: "Plan Your Golf Getaway",
  blurbKey: "packages.blurbMain",
} as const;

export default function PackagesCarousel() {
  const { t } = useTranslation();

  return (
    /* WALANG PADDING SA ITAAS AT IBABA: ang `pb` ng section sa itaas at ang
       `pt` ng susunod na section ang nagbibigay ng espasyo. */
    <section id="home-packages" className="bg-[#f7f5ee] text-[#1b2730]">
      {/* Takdang taas sa cellphone (`h-[600px]`), `aspect` mula `sm`. Kailangang
          TAKDA ang taas, hindi `min-h` lang: `fill` ang larawan, at gumuguho ito
          kapag `min-height` lang ang magulang. Ang `max-h` sa `lg` ang
          pumipigil dito sa napakalaking screen. */}
      <div className="relative isolate flex h-[600px] w-full items-end overflow-hidden bg-[#dfe4df] sm:aspect-[16/9] sm:h-auto sm:items-center lg:aspect-[1.9/1] lg:max-h-[780px]">
        <Image
          src={BANNER.image}
          alt={BANNER.alt}
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* Mula sa ibaba sa cellphone, mula sa kaliwa mula `sm`: doon nakalagay
            ang teksto. */}
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(4,20,13,0.72)_0%,rgba(4,20,13,0.3)_45%,rgba(4,20,13,0.04)_100%)] sm:bg-[linear-gradient(90deg,rgba(4,20,13,0.62)_0%,rgba(4,20,13,0.32)_38%,rgba(4,20,13,0.04)_68%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Buong lapad ang larawan pero nananatili ang teksto sa gutter ng
            pahina — `max-w-7xl`, kaparehong kaliwang gilid ng header at footer. */}
        <div className="mx-auto w-full max-w-7xl px-6 pb-14 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_18px_rgba(0,0,0,0.45)] sm:pb-0 lg:px-8">
          <div className="max-w-[540px]">
            <h2 className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[0.98] tracking-[-0.04em]">
              {BANNER.title}
            </h2>
            {/* Mas makitid sa cellphone para 3 linya ang blurb. */}
            <p className="mt-5 max-w-[270px] text-sm leading-7 text-white/80 sm:max-w-[460px] sm:text-[15px]">
              {t(BANNER.blurbKey)}
            </p>
            <Link
              href={BANNER.href}
              className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#e7d18d] [text-shadow:none] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-[#14271d] transition-colors hover:bg-[#f3dfa0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7d18d]"
            >
              See packages
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
