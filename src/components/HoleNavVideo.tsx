"use client";

import { useEffect, useRef } from "react";

/**
 * Flyover sa mga card na "Previous / Next hole" sa ibaba ng pahina ng butas.
 *
 * Naka-mute at paulit-ulit; tumutugtog lang habang nakikita ang card
 * (IntersectionObserver) at humihinto kapag lumayo — kaya hindi naglo-load
 * ang dalawang video hangga't hindi naaabot ng bisita ang dulo ng pahina.
 * Bersyong walang numero sa kanan (flyover.clear): 1920 sa desktop (halos
 * kalahati ng screen ang card, kaya malabo ang 1280 doon), 1280 sa cellphone
 * (isang card bawat hanay, < 640px). Nasa ilalim ang
 * larawan (poster) habang naglo-load. Kapag naka-"reduce motion", larawan lang.
 */
export default function HoleNavVideo({
  src,
  poster,
}: {
  src: { desktop: string; mobile: string };
  poster: string;
}) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = video.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.muted = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void element.play().catch(() => undefined);
        else element.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={video}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      /* Buong frame, hindi naka-zoom: wala nang "17 | PAR 5" sa kanan ng mga
         flyover, at 16:9 din ang card, kaya buo ang kita. Bahagyang zoom lang
         kapag naka-hover. */
      className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
    >
      <source src={src.mobile} type="video/mp4" media="(max-width: 639px)" />
      <source src={src.desktop} type="video/mp4" />
    </video>
  );
}
