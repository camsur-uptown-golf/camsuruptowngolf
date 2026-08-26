"use client";

import Image from "next/image";
import { useState } from "react";

const SLIDES = [
  { image: "/course-concepts/concept-01.jpg", title: "Aerial Perspective", description: "A sweeping first look at the scale, rhythm, and open character envisioned for the course." },
  { image: "/course-concepts/concept-02.jpg", title: "Championship Layout", description: "Generous fairways, strategic water, and a landscape designed to reward thoughtful play." },
  { image: "/course-concepts/concept-03.jpg", title: "Resort & Fairway", description: "Golf and hospitality brought together in one destination beneath the Bicol landscape." },
  { image: "/course-concepts/concept-04.jpg", title: "Lakeside Course", description: "Waterfront holes create memorable views and a distinctive challenge from tee to green." },
  { image: "/course-concepts/concept-05.jpg", title: "Golden Hour", description: "A course experience shaped by warm light, wide horizons, and long afternoons outdoors." },
  { image: "/course-concepts/concept-06.jpg", title: "Waterfront Greens", description: "Sculpted greens and reflective water bring drama and calm to every round." },
  { image: "/course-concepts/concept-07.jpg", title: "The Grand Course", description: "An expansive championship landscape designed to feel both elevated and welcoming." },
  { image: "/course-concepts/concept-08.jpg", title: "Signature Green", description: "Bold bunkering and considered contours frame a green made to be remembered." },
  { image: "/course-concepts/concept-09.jpg", title: "Clubhouse Village", description: "A complete golf destination where the course, clubhouse, and community come together." },
  { image: "/hero-4k.png", title: "Mt. Isarog Vision", description: "The defining idea for CamSur Uptown: championship golf meeting the spirit of Bicol." },
];

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
      className="overflow-hidden bg-[#f7f5ee] pb-16 pt-20 text-[#14271d] sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goPrevious();
        if (event.key === "ArrowRight") goNext();
      }}
    >
      <div className="relative">
        <button
          type="button"
          onClick={goPrevious}
          aria-label={`Previous image: ${SLIDES[previous].title}`}
          className="group absolute left-0 top-1/2 hidden aspect-[1.25] w-[20vw] max-w-[410px] -translate-y-1/2 overflow-hidden bg-[#173a29] lg:block"
        >
          <Image src={SLIDES[previous].image} alt="" fill sizes="20vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100" />
          <span className="absolute inset-0 bg-[#082218]/10" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={goNext}
          aria-label={`Next image: ${SLIDES[next].title}`}
          className="group absolute right-0 top-1/2 hidden aspect-[1.25] w-[20vw] max-w-[410px] -translate-y-1/2 overflow-hidden bg-[#173a29] lg:block"
        >
          <Image src={SLIDES[next].image} alt="" fill sizes="20vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100" />
          <span className="absolute inset-0 bg-[#082218]/10" aria-hidden="true" />
        </button>

        <span className="absolute left-[22vw] top-1/2 hidden h-20 w-px -translate-y-1/2 bg-[#173126]/55 lg:block" aria-hidden="true" />
        <span className="absolute right-[22vw] top-1/2 hidden h-20 w-px -translate-y-1/2 bg-[#173126]/55 lg:block" aria-hidden="true" />

        <div className="relative z-10 mx-auto aspect-[1.94] w-[calc(100%-3rem)] max-w-[1040px] overflow-hidden bg-[#173a29] shadow-[0_18px_42px_rgba(17,44,31,0.1)] sm:w-[52vw]">
          <Image
            key={SLIDES[active].image}
            src={SLIDES[active].image}
            alt={`${SLIDES[active].title} — CamSur Uptown Golf Club concept`}
            fill
            priority={active === 0}
            sizes="(min-width: 640px) 52vw, calc(100vw - 3rem)"
            className="carousel-image object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#061a11]/30 to-transparent" aria-hidden="true" />
          <p className="absolute bottom-4 right-5 text-[10px] font-bold tracking-[0.18em] text-white/85 sm:bottom-6 sm:right-7">
            {String(active + 1).padStart(2, "0")} / {SLIDES.length}
          </p>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1040px] grid-cols-[auto_1fr_auto] items-center gap-4 px-6 pt-7 sm:w-[52vw] sm:min-w-[720px] sm:gap-7 sm:px-0 sm:pt-8">
        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous concept image"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#183e2b]/30 text-[#183e2b] transition hover:border-[#174630] hover:bg-[#174630] hover:text-white sm:h-14 sm:w-14"
        >
          <Arrow direction="left" />
        </button>

        <div className="grid min-w-0 gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-10">
          <div className="min-w-0 lg:border-r lg:border-[#183e2b]/35 lg:pr-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">Concept {String(active + 1).padStart(2, "0")}</p>
            <h3 className="mt-2 text-xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-4xl">
              {SLIDES[active].title}
            </h3>
          </div>
          <div className="hidden lg:block" aria-live="polite">
            <p className="text-base leading-7 text-[#536058]">{SLIDES[active].description}</p>
            <a href="#contact" className="mt-5 inline-flex rounded-full bg-[#174630] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#0f3825]">
              Plan your round
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next concept image"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#183e2b]/30 text-[#183e2b] transition hover:border-[#174630] hover:bg-[#174630] hover:text-white sm:h-14 sm:w-14"
        >
          <Arrow direction="right" />
        </button>
      </div>

      <div className="mx-auto mt-6 flex max-w-[1040px] justify-center gap-2 px-6 sm:w-[52vw]" aria-label="Choose concept image">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Show ${slide.title}`}
            aria-current={active === index ? "true" : undefined}
            className={`h-1.5 rounded-full transition-all ${active === index ? "w-8 bg-[#b38c34]" : "w-1.5 bg-[#183e2b]/20 hover:bg-[#183e2b]/45"}`}
          />
        ))}
      </div>
    </section>
  );
}
