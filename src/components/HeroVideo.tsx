"use client";

import { useEffect } from "react";
import Script from "next/script";

const MEDIA_ID = "xfqyn64zqs";

/** Ang teaser ay babalik sa simula pagsapit nito. 1:28 — halos buo na ang
    92-segundong teaser, apat na segundo bago ang tunay na dulo. */
const CUT_AT_SECONDS = 88;

/* Wistia reads its options from the class list, hindi mula sa props.
   silentAutoPlay=allow + muted ang kailangan para payagan ng browser ang
   autoplay; fitStrategy=cover ang pumupuno sa hero nang walang letterbox. */
const WISTIA_OPTIONS = [
  "autoPlay=true",
  "muted=true",
  "silentAutoPlay=allow",
  "endVideoBehavior=loop",
  "fitStrategy=cover",
  "controlsVisibleOnLoad=false",
  "playbar=false",
  "playButton=false",
  "smallPlayButton=false",
  "fullscreenButton=false",
  "settingsControl=false",
  "volumeControl=false",
].join(" ");

type WistiaVideo = {
  bind: (event: string, handler: (seconds: number) => void) => void;
  unbind?: (event: string, handler: (seconds: number) => void) => void;
  time: (seconds?: number) => number;
};

declare global {
  interface Window {
    _wq?: Array<{ id: string; onReady?: (video: WistiaVideo) => void }>;
  }
}

export default function HeroVideo() {
  useEffect(() => {
    let video: WistiaVideo | null = null;

    // Ang timechange ay tumitibok tuwing ~200ms, kaya bahagyang lumalampas
    // sa hangganan ang aktwal na hiwa. Hindi ito halata sa background loop.
    const onTimeChange = (seconds: number) => {
      if (seconds >= CUT_AT_SECONDS) video?.time(0);
    };

    window._wq = window._wq || [];
    window._wq.push({
      id: MEDIA_ID,
      onReady(instance) {
        video = instance;
        instance.bind("timechange", onTimeChange);
      },
    });

    return () => {
      video?.unbind?.("timechange", onTimeChange);
    };
  }, []);

  return (
    <>
      <Script src={`https://fast.wistia.com/embed/medias/${MEDIA_ID}.jsonp`} strategy="afterInteractive" />
      <Script src="https://fast.wistia.com/assets/external/E-v1.js" strategy="afterInteractive" />
      <div className="hero-image pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`wistia_embed wistia_async_${MEDIA_ID} ${WISTIA_OPTIONS} absolute inset-0 h-full w-full`} />
      </div>
    </>
  );
}
