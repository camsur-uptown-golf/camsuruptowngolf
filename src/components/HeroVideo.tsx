"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { TEASER_POSTER, TEASER_VIDEO_SOURCES } from "@/lib/site-content";

// Timeline for file-2027-centered-logo-4K.mp4 (92s), compared with the numbered flyovers.
// Aerials include the visible neighbouring holes; only the opening is an overview.
const HERO_SCENES = [
  { start: 0, holes: [] },
  { start: 8, holes: [5] },
  { start: 16, holes: [6] },
  { start: 28, holes: [7] },
  { start: 36, holes: [9] },
  { start: 46, holes: [6, 7, 16, 17] },
  { start: 50, holes: [13] },
  { start: 64, holes: [14] },
  { start: 68, holes: [13, 14] },
  { start: 74, holes: [18] },
  { start: 84, holes: [13, 14] },
] as const;

/**
 * Hero background video.
 *
 * Native <video> sa direktang MP4, kaya walang panlabas na player script at
 * walang iframe. Ang muted + playsInline ang kailangan ng mga browser bago
 * nila payagan ang autoplay — huwag alisin ang alinman sa dalawa.
 *
 * Native loop repeats the full 92-second edit. The playback time also drives
 * the hole label, so it resets with the video and follows seeking/buffering.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [sceneIndex, setSceneIndex] = useState(0);
  const holes: readonly number[] = HERO_SCENES[sceneIndex].holes;

  function updateScene() {
    const time = ref.current?.currentTime ?? 0;
    let index = 0;
    for (let i = 1; i < HERO_SCENES.length; i++) {
      if (time < HERO_SCENES[i].start) break;
      index = i;
    }
    setSceneIndex(index);
  }

  return (
    <>
    <div aria-hidden="true" data-parallax="-0.04" style={{ "--parallax-scale": "1.15" } as CSSProperties} className="parallax-media pointer-events-none absolute inset-0">
    <div className="hero-image absolute inset-0 overflow-hidden">
      <Image src={TEASER_POSTER} alt="" fill preload sizes="100vw" className="object-cover object-center" />
      {/* Walang poster attribute: hinahayaan nitong makita ang <Image /> na
          nasa likod habang naglo-load, sa halip na itim na parisukat. */}
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onTimeUpdate={updateScene}
        onSeeked={updateScene}
        onLoadedData={updateScene}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {/* Ang unang tumugmang `<source>` ang pinipili: 1280 sa cellphone,
            1920 sa iba. Nasa Cloudinary ang dalawa; tingnan ang
            TEASER_VIDEO_SOURCES. */}
        <source src={TEASER_VIDEO_SOURCES.mobile} type="video/mp4" media="(max-width: 767px)" />
        <source src={TEASER_VIDEO_SOURCES.desktop} type="video/mp4" />
      </video>
    </div>
    </div>
    <div className="pointer-events-none absolute bottom-40 right-5 z-20 sm:bottom-9 sm:right-6 lg:bottom-10 lg:right-8">
      <p className="font-navigation text-[13px] font-medium tracking-[0.04em] text-white/85 [text-shadow:0_1px_5px_rgba(0,0,0,0.65)] sm:text-[15px]">
        {holes.length === 0
          ? "Course overview"
          : `${holes.length > 1 ? "Holes" : "Hole"} ${holes.map((hole) => String(hole).padStart(2, "0")).join(" · ")}`}
      </p>
    </div>
    </>
  );
}
