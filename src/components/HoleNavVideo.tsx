"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
 *
 * Ang poster ay `<Image>` (lazy, naka-resize), hindi `poster` attribute: ang
 * attribute ay buong orihinal na webp (~1.7 MB bawat card) na dina-download
 * agad pagbukas ng pahina, kahit nasa pinakababa pa ang mga card.
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
    <>
    <Image
      src={poster}
      alt=""
      fill
      loading="lazy"
      sizes="(min-width: 640px) 50vw, 100vw"
      className="-z-10 object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
    />
    <video
      ref={video}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      /* Buong frame, hindi naka-zoom: wala nang "17 | PAR 5" sa kanan ng mga
         flyover, at 16:9 din ang card, kaya buo ang kita. Bahagyang zoom lang
         kapag naka-hover. */
      className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
    >
      <source src={src.mobile} type="video/mp4" media="(max-width: 639px)" />
      <source src={src.desktop} type="video/mp4" />
    </video>
    </>
  );
}
