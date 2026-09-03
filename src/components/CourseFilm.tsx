"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const MEDIA_ID = "xfqyn64zqs";

/* Poster frame ng teaser. Ito ang nakikita hanggang sa may pumindot — kaya
   walang pangalawang 4K stream na naglo-load kasabay ng hero video. */
const POSTER_SRC = `https://embed-ssl.wistia.com/deliveries/155a533771b5ffe1629b18a44bd44046.jpg?image_crop_resized=1920x1080`;

/* autoPlay ay ligtas dito: pagkatapos lang ng totoong pag-click napapalitan
   ang poster, at pinapayagan ng browser ang tunog kapag galing sa gesture. */
const PLAYER_SRC = `https://fast.wistia.net/embed/iframe/${MEDIA_ID}?playerColor=174630&autoPlay=true`;

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CourseFilm() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="film"
      className="relative isolate flex min-h-[540px] items-center overflow-hidden bg-[#071d13] text-white sm:min-h-[620px] lg:min-h-[720px]"
    >
      {playing ? (
        <iframe
          src={PLAYER_SRC}
          title="CamSur Uptown Golf Club teaser film"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Image src={POSTER_SRC} alt="" fill sizes="100vw" className="-z-20 object-cover" />
          {/* Mas madilim sa kaliwa, kung saan nakapatong ang teksto. */}
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,20,13,0.9)_0%,rgba(4,20,13,0.62)_42%,rgba(4,20,13,0.24)_78%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,20,13,0.4)_0%,transparent_32%,transparent_66%,rgba(4,20,13,0.5)_100%)]
            "
            aria-hidden="true"
          />

          {/* Hindi positioned ang wrapper na ito, kaya ang lg:absolute ng play
              button ay sumusukat laban sa buong section — nasa gitna ito sa
              desktop, pero sumusunod lang sa daloy sa mobile kung saan wala
              namang puwang sa tabi ng teksto. */}
          <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
            <div className="max-w-xl">
              <p data-reveal="up" className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e1c56e]">
                Course film
              </p>
              <h2
                data-reveal="up"
                style={delay(110)}
                className="mt-5 text-[clamp(2.4rem,4.5vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.055em]"
              >
                See the course before you play it.
              </h2>
              <p
                data-reveal="up"
                style={delay(220)}
                className="mt-6 max-w-lg text-base leading-8 text-white/70 sm:text-lg sm:leading-8"
              >
                A short flight over the fairways, the water, and the Mt. Isarog landscape that frames them.
              </p>
              <Link
                href="/golf"
                data-reveal="up"
                style={delay(330)}
                className="mt-8 inline-flex h-12 items-center gap-3 rounded-full bg-[#e7d18d] px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
              >
                Explore the course <ArrowIcon />
              </Link>
            </div>

            {/* Walang data-reveal dito: may sarili itong translate para
                sa pagsentro, at ire-reset iyon ng landed na reveal. */}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play the CamSur Uptown teaser film"
              className="group mt-12 flex flex-col items-center gap-4 lg:absolute lg:left-1/2 lg:top-1/2 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2"
            >
              <span className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/55 bg-white/[0.06] backdrop-blur-[2px] transition duration-300 group-hover:scale-105 group-hover:border-white group-hover:bg-white/15 sm:h-24 sm:w-24">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.2 19.2 12 8 18.8Z" />
                </svg>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/85 transition-colors group-hover:text-white">
                Watch
              </span>
            </button>
          </div>
        </>
      )}
    </section>
  );
}
