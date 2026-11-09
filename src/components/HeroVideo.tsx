"use client";

import { useRef } from "react";
import { TEASER_VIDEO_SOURCES } from "@/lib/site-content";

/**
 * Hero background video.
 *
 * Native <video> sa direktang MP4, kaya walang panlabas na player script at
 * walang iframe. Ang muted + playsInline ang kailangan ng mga browser bago
 * nila payagan ang autoplay — huwag alisin ang alinman sa dalawa.
 *
 * Maikli ang clip (~20s) kaya ang native na `loop` ang bumabalik sa simula —
 * hindi na kailangan ng manu-manong hiwa sa pamamagitan ng timeupdate.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div className="hero-image pointer-events-none absolute inset-0 overflow-hidden">
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
        className="absolute inset-0 h-full w-full object-cover"
      >
        {/* Ang unang tumugmang `<source>` ang pinipili: 1280 sa cellphone,
            2560 sa retina o napakalapad na screen (kung hindi ay pinalalaki ang
            1080p at lumalabo), 1920 sa iba. Tingnan ang TEASER_VIDEO_SOURCES. */}
        <source src={TEASER_VIDEO_SOURCES.mobile} type="video/mp4" media="(max-width: 767px)" />
        <source
          src={TEASER_VIDEO_SOURCES.retina}
          type="video/mp4"
          media="(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 2), (min-width: 1921px)"
        />
        <source src={TEASER_VIDEO_SOURCES.desktop} type="video/mp4" />
      </video>
    </div>
  );
}
