"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { COURSE_PAGES as SLIDES } from "@/lib/site-content";

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

export default function ConceptCarousel() {
  const [active, setActive] = useState(0);
  const previous = (active - 1 + SLIDES.length) % SLIDES.length;
  const next = (active + 1) % SLIDES.length;

  const goPrevious = () => setActive(previous);
  const goNext = () => setActive(next);

  return (
    <section
      id="concepts"
      className="overflow-hidden bg-[#f7f5ee] pb-6 pt-8 text-[#14271d] sm:pb-8 sm:pt-10 lg:pb-10 lg:pt-12"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goPrevious();
        if (event.key === "ArrowRight") goNext();
      }}
    >
      <div className="relative">
        {/* Reveals go only on elements without a transform of their own — the
            side previews and the divider rules are centred with -translate-y,
            which a landed reveal would reset to none. */}
        <button
          type="button"
          onClick={goPrevious}
          aria-label={`Previous image: ${SLIDES[previous].title}`}
          className="group absolute left-0 top-1/2 hidden aspect-[1.25] w-[20vw] max-w-[410px] -translate-y-1/2 overflow-hidden bg-[#1f3f2e] lg:block"
        >
          <Image src={SLIDES[previous].image} alt="" fill sizes="20vw" className="object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute inset-0 bg-[#082218]/10" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label={`Next image: ${SLIDES[next].title}`}
          className="group absolute right-0 top-1/2 hidden aspect-[1.25] w-[20vw] max-w-[410px] -translate-y-1/2 overflow-hidden bg-[#1f3f2e] lg:block"
        >
          <Image src={SLIDES[next].image} alt="" fill sizes="20vw" className="object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="absolute inset-0 bg-[#082218]/10" aria-hidden="true" />
        </button>

        <span className="absolute left-[22vw] top-1/2 hidden h-20 w-px -translate-y-1/2 bg-[#1f3f2e]/55 lg:block" aria-hidden="true" />
        <span className="absolute right-[22vw] top-1/2 hidden h-20 w-px -translate-y-1/2 bg-[#1f3f2e]/55 lg:block" aria-hidden="true" />

        <Link
          href={`/golf/courses/${SLIDES[active].slug}`}
          aria-label={`View ${SLIDES[active].title}`}
          data-reveal="scale"
          className="relative z-10 mx-auto block aspect-[1.94] w-[calc(100%-3rem)] max-w-[1040px] overflow-hidden bg-[#1f3f2e] shadow-[0_18px_42px_rgba(17,44,31,0.1)] sm:w-[52vw]"
        >
          <Image
            key={SLIDES[active].image}
            src={SLIDES[active].image}
            alt={`${SLIDES[active].title} — CamSur Uptown Golf Club hole`}
            fill
            priority={active === 0}
            sizes="(min-width: 640px) 52vw, calc(100vw - 3rem)"
            className="carousel-image object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061a11]/30 to-transparent" aria-hidden="true" />
          <p className="absolute bottom-4 right-5 text-[10px] xl:text-[11px] font-bold tracking-[0.18em] text-white/85 sm:bottom-6 sm:right-7">
            {String(active + 1).padStart(2, "0")} / {SLIDES.length}
          </p>
        </Link>
      </div>

      <div
        data-reveal="up"
        style={{ "--reveal-delay": "150ms" } as CSSProperties}
        className="mx-auto grid w-full max-w-[1040px] grid-cols-[auto_1fr_auto] items-start gap-4 px-6 pt-7 sm:w-[52vw] sm:min-w-[720px] sm:gap-7 sm:px-0 sm:pt-8"
      >
        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous hole image"
          className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#265136]/35 text-[#265136] transition hover:border-[#265136] hover:bg-[#265136] hover:text-white"
        >
          <Arrow direction="left" />
        </button>

        <div className="grid min-w-0 gap-5 lg:grid-cols-2 lg:gap-10">
          <div className="min-w-0 lg:border-r lg:border-[#1f3f2e]/35 lg:pr-10">
            {/* NASA PAMAGAT ANG "HOLE", HINDI SA EYEBROW. Dating "Hole" ang
                eyebrow at "No. 1" lang ang pamagat, kaya nasa 10px na
                teksto nakasabit ang pinakamahalagang salita. "Hole No. N"
                din ang tawag dito sa nav, sa breadcrumb at sa ruta, kaya
                iisa na ang pangalan nito sa buong site.

                NANATILING HINDI NAGBABAGO ANG EYEBROW. Sinubukan dito ang
                sariling pangalan ng bawat butas ("Opening Fairway"), pero
                dalawang gumagalaw na teksto iyon nang magkapatong — lumilipat
                ang eyebrow at ang pamagat nang sabay, at nagulo ang mata.
                Label ng section ito, hindi bahagi ng datos ng butas, kaya
                iisa lang ito sa labing-walo. */}
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
              The Course
            </p>
            {/* 3.1vw AT HINDI HIGIT PA. Ang hanay na ito ay 238px lang sa
                1440px. Sa 3.6vw (51.8px) ay pumuputol sa dalawang linya ang
                butas 10 at 18 habang nananatiling isang linya ang iba, kaya
                tumatalon ang taas habang pinapalitan ang butas. Sa 3.1vw
                (44.6px) ay kasya ang lahat ng labing-walo sa isang linya —
                sinubukan ko ang bawat isa. Kapag pinalaki ito o pinaliit ang
                hanay, subukan muli ang 10 at ang 18, hindi lang ang 1. */}
            <h3 className="mt-2 max-w-full font-serif text-[clamp(2.5rem,3.1vw,4rem)] font-medium leading-[0.9] tracking-[-0.055em]">
              Hole No. {active + 1}
            </h3>
          </div>
          <div className="hidden lg:block lg:pt-6" aria-live="polite">
            <p className="text-sm leading-6 text-[#536058]">{SLIDES[active].description}</p>
            <Link href={`/golf/courses/${SLIDES[active].slug}`} className="mt-5 inline-flex h-12 min-w-[130px] items-center justify-center rounded-full bg-[#265136] px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#1f3f2e]">
              Explore
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next hole image"
          className="mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-[#265136]/35 text-[#265136] transition hover:border-[#265136] hover:bg-[#265136] hover:text-white"
        >
          <Arrow direction="right" />
        </button>
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
