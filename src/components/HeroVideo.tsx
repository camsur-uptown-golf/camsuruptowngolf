"use client";

import { useRef } from "react";
import { TEASER_VIDEO } from "@/lib/site-content";

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
        src={TEASER_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
