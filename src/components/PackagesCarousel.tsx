"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Ang teaser ng Packages sa homepage — tatlong card sa isang frame.
 *
 * Ang una ay ang buong Packages; ang dalawa pa ay ang mismong package, may
 * sariling larawan at sariling patutunguhan. Ang blurb ng dalawa ay
 * tumutugma sa itinerary sa sariling pahina nila — dalawang gabi, dalawang
 * round sa Buddy Trip; isang gabi, isang round sa Stay & Play. Kapag
 * binago ang bilang doon, sundan dito.
 *
 * ANG PAGLIPAT AY PAGGALAW, HINDI CROSSFADE. Sa crossfade ay magkapatong
 * ang dalawang larawan sa tig-kalahating opacity sa kalagitnaan, at
 * nagiging maputik ang dalawa. Isang filmstrip ito na gumagalaw pakaliwa,
 * kaya buo at malinaw ang bawat larawan sa buong paglipat — at tugma ito
 * sa wipe ng PageCurtain.
 *
 * WALANG `w-screen`, `100vw`, NI `50vw` DITO. Kasama ng `100vw` ang gutter
 * ng scrollbar — 1440px iyon sa 1425px na tunay na espasyo — kaya may 8px
 * na naputol sa bawat gilid noong ginamit ito sa pahina ng butas. Ang
 * bloke ay direktang anak na lang ng `section`, kaya natural itong
 * kasinglapad ng body. Huwag itong balutin muli ng container.
 *
 * ANG SCRIM AY HINDI PALAMUTI. Maliwanag ang kaliwa ng tatlong larawan,
 * kaya kailangan ng dilim sa likod ng teksto. Kapag pinalitan ang alinman,
 * tingnan muli ang scrim.
 */
const SLIDES = [
  {
    href: "/packages",
    image: "/packages-main-hero-v2.png",
    alt: "Golfers walking back to the clubhouse at sunset, CamSur Uptown Golf Club",
    title: "CamSur Uptown Golf Packages",
    blurbKey: "packages.blurbMain",
    ctaKey: "packages.ctaExplore",
    focalPoint: "center",
  },
  {
    href: "/packages/stay-and-play",
    image: "/packages-stay-play-hero-v2.png",
    alt: "Golfers playing the fairway beneath Mt. Isarog at CamSur Uptown",
    title: "Stay & Play",
    blurbKey: "packages.blurbStayPlay",
    ctaKey: "packages.ctaView",
    focalPoint: "right center",
  },
  {
    href: "/packages/buddy-trip",
    image: "/packages-group-getaway-hero-v2.jpeg",
    alt: "Four friends walking the fairway together at CamSur Uptown",
    title: "Group Golf Getaway",
    blurbKey: "packages.blurbGroup",
    ctaKey: "packages.ctaView",
    focalPoint: "right center",
  },
] as const;

/** Gaano katagal bago lumipat. */
const INTERVAL_MS = 5000;

export default function PackagesCarousel() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  /* Humihinto lang kapag may keyboard focus sa loob. Tuloy ang autoplay
     kapag cursor lang ang nakapatong sa carousel. */
  const [paused, setPaused] = useState(false);
  /* `useSyncExternalStore` at hindi `useState` sa loob ng effect: ito ang
     paraan ng React para sa halagang nasa labas nito, at umaayon ito sa
     rule na `set-state-in-effect`. Ang huling argumento ang sagot habang
     nasa server pa — walang media query doon. */
  const reducedMotion = useSyncExternalStore(
    (onStoreChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onStoreChange);
      return () => query.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    /* Walang sariling paglipat kapag hiniling ang mas kaunting galaw. Nandoon
       pa rin ang mga tuldok, kaya hindi nawawala ang dalawang card. */
    if (paused || reducedMotion) return;

    const timer = window.setInterval(() => {
      /* Hindi umuusad habang nakatago ang tab: walang nakakakita, at
         nagigising ang bisita sa gitna ng ikatlong card. */
      if (document.hidden) return;
      setActive((current) => (current + 1) % SLIDES.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  return (
    /* WALANG PADDING SA ITAAS AT IBABA. Dati ay 112px na kremang guhit ang
       nasa magkabilang gilid ng larawan, at walang laman ang mga iyon —
       walang pamagat, walang eyebrow, dahil nasa loob na ng larawan ang
       lahat ng teksto. Kaya mukhang idinikit lang ang bloke sa pahina.
       Ngayon ay ang `pb` ng ConceptCarousel sa itaas at ang `pt` ng
       susunod na section sa ibaba ang nagbibigay ng espasyo — pareho
       silang may sariling nilalamang humahawak doon. Huwag itong
       bawiin nang hindi muna inilalabas ang pamagat sa krema. */
    <section id="home-packages" className="bg-[#f7f5ee] text-[#1b2730]">
      {/* `min-h` sa cellphone, `aspect` mula `sm`: sa 16/9 ay 211px lang ang
          taas sa 375px na screen at hindi kasya ang teksto. Ang `max-h` sa
          `lg` ang pumipigil dito sa napakalaking screen — sa 1920px ay 1010px
          ang 1.9 na aspect, at masyado nang mataas iyon para sa isang banda. */}
      <div
        className="relative isolate min-h-[600px] w-full overflow-hidden bg-[#dfe4df] sm:aspect-[16/9] sm:min-h-0 lg:aspect-[1.9/1] lg:max-h-[780px]"
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* Ang filmstrip. Kaparehong easing ng scroll reveals ng site. */}
        <div
          className={`${reducedMotion ? "" : "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"} flex h-full w-full`}
          style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}
        >
          {SLIDES.map((slide, index) => (
            /* `inert` sa hindi aktibo: inaalis nito ang card sa tab order at
               sa a11y tree nang sabay. Ang `aria-hidden` lang ay sira —
               naiiwan doon ang mga link na pwede pa ring ma-focus. */
            <div
              key={slide.href}
              inert={index !== active}
              className="relative flex h-full w-full shrink-0 items-end sm:items-center"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="-z-20 object-cover"
                style={{ objectPosition: slide.focalPoint }}
              />
              {/* Mula sa ibaba sa cellphone, mula sa kaliwa mula `sm`: doon
                  nakalagay ang teksto sa bawat isa. */}
              <div
                className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(4,20,13,0.88)_0%,rgba(4,20,13,0.45)_45%,rgba(4,20,13,0.12)_100%)] sm:bg-[linear-gradient(90deg,rgba(4,20,13,0.86)_0%,rgba(4,20,13,0.58)_38%,rgba(4,20,13,0.12)_72%,transparent_100%)]"
                aria-hidden="true"
              />

              {/* Buong lapad ang larawan pero nananatili ang teksto sa gutter
                  ng pahina — `max-w-7xl`, kaparehong kaliwang gilid ng
                  header, ng footer at ng OffCourseSection sa ibaba. Dapat
                  magkatugma ito at ang lalagyan ng mga tuldok sa ibaba;
                  kung hindi, hindi tumatapat ang tuldok sa teksto. */}
              <div className="mx-auto w-full max-w-7xl px-6 pb-20 text-white sm:pb-0 lg:px-8">
                <div className="max-w-[540px]">
                  <h2 className="font-serif text-[clamp(2.25rem,4vw,3.5rem)] font-normal leading-[0.98] tracking-[-0.04em]">
                    {slide.title}
                  </h2>
                  <p className="mt-5 max-w-[460px] text-sm leading-7 text-white/80 sm:text-[15px]">{t(slide.blurbKey)}</p>
                  <Link
                    href={slide.href}
                    className="mt-7 inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#e7d18d] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-[#14271d] transition-colors hover:bg-[#f3dfa0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7d18d]"
                  >
                    {slide.href === "/packages" ? "Explore" : "View"}
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls: direktang pagination at next. Mula sa huling
            slide ay umiikot ang arrow pabalik sa una. */}
        <div className="absolute inset-x-0 bottom-7 z-10 mx-auto flex max-w-7xl items-center justify-start gap-4 px-6 sm:bottom-10 lg:px-8">
          <div className="flex gap-2.5">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.href}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${slide.title}`}
                aria-current={index === active}
                className={`${index === active ? "scale-110 bg-[#e7d18d]" : "bg-white/45 hover:bg-white/75"} h-2.5 w-2.5 rounded-full transition-all duration-300`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActive((current) => (current + 1) % SLIDES.length)}
            aria-label={`Next slide: ${SLIDES[(active + 1) % SLIDES.length].title}`}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-transparent text-[#e7d18d] shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition hover:translate-x-0.5 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e7d18d]"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
