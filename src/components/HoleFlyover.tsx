"use client";

import { useEffect, useRef, useState } from "react";

type FlyoverSources = { desktop: string; mobile: string; poster: string };

/**
 * Flyover video ng isang butas sa /golf/courses/hole-no.N — kanang column ng
 * section ng pangalan at stats (aerial-study), hindi na hiwalay na section na
 * may sariling heading. Bahagyang bilugan ang kanto (12px), kaayon ng
 * malambot na kurba ng hero.
 *
 * AUTOPLAY, naka-mute at paulit-ulit (loop): pinapayagan lang ng mga browser
 * ang autoplay kapag walang tunog — ang speaker sa controls ang pang-unmute.
 * Kapag naka-"reduce motion" ang device ng bisita, hindi ito kusang tutugtog.
 * Ang unang tumugmang `<source>` ang pinipili: 1280 sa cellphone, 1920 sa iba.
 *
 * May play button sa gitna habang naka-pause; nawawala ito habang tumutugtog,
 * at naiiwan ang native controls.
 */
export default function HoleFlyover({
  hole,
  name,
  flyover,
}: {
  hole: number;
  name: string;
  flyover: FlyoverSources;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  /* Sa effect, hindi sa `autoPlay`/`muted` na attribute: hindi laging
     inilalagay ng React ang `muted` sa HTML, kaya puwedeng tanggihan ng
     browser ang autoplay. Dito, siguradong muted bago mag-play. */
  useEffect(() => {
    const element = video.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.muted = true;
    void element.play().catch(() => undefined);
  }, []);

  return (
    /* aspect-video: nakareserba ang 16:9 na kahon bago mag-load, kaya walang
       layout shift. Madilim na berde habang wala pa ang poster. */
    <div id="flyover" className="relative aspect-video w-full scroll-mt-24 overflow-hidden rounded-xl bg-[#071d13]">
      <video
        ref={video}
        controls
        playsInline
        muted
        loop
        preload="metadata"
        poster={flyover.poster}
        aria-label={`Flyover of Hole No. ${hole}, ${name}`}
        /* object-contain, hindi cover: sa fullscreen (hal. 16:10 na Mac) ay
           pinuputol ng cover ang gilid — nawawala ang logo at ang PAR/YDS sa
           kanan. Sa pahina, pareho lang ang hitsura dahil 16:9 din ang kahon. */
        className="absolute inset-0 h-full w-full object-contain"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={flyover.mobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={flyover.desktop} type="video/mp4" />
        Your browser does not play this video. <a href={flyover.desktop}>Download the flyover</a>.
      </video>

      {playing ? null : (
        <button
          type="button"
          onClick={() => void video.current?.play()}
          aria-label={`Play the flyover of Hole No. ${hole}`}
          className="group absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#03321b]/70 text-[#efd99b] ring-1 ring-[#efd99b]/60 backdrop-blur-sm transition hover:scale-105 hover:bg-[#03321b]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efd99b] sm:h-14 sm:w-14"
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" aria-hidden="true">
            <path d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z" />
          </svg>
        </button>
      )}
    </div>
  );
}
