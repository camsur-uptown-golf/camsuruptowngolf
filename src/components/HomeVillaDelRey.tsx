"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageLightbox from "@/components/ImageLightbox";
import { useTranslation } from "@/i18n/LanguageProvider";
import { ACCOMMODATIONS } from "@/lib/site-content";
import { VILLA_DEL_REY_STAYS } from "@/lib/villa-del-rey";

/**
 * Villa Del Rey sa homepage: malaking larawan sa kaliwa, listahan ng apat na
 * uri ng tuluyan sa kanan. Ang piniling tuluyan ang nagpapalit ng larawan
 * (labas) at ng maliit na inset (loob ng kuwarto), saka bumubukas ang
 * description at highlights nito sa listahan.
 *
 * Puwedeng pindutin ang dalawang larawan: binubuksan nila ang parehong
 * fullscreen lightbox ng /accommodations/villa-del-rey, kasama ang buong
 * gallery ng piniling tuluyan (labas → kuwarto → iba pang kuha).
 *
 * Iisa ang pinagmulan ng /accommodations/villa-del-rey: `VILLA_DEL_REY_STAYS`
 * at `ACCOMMODATIONS`, kaya sumasabay ito kapag may binago doon.
 */

const VILLA = ACCOMMODATIONS[0];
const VILLA_HREF = `/accommodations/${VILLA.slug}`;

function ZoomIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2.1" />
      <path d="M16.5 16.5 21 21M11 8.4v5.2M8.4 11h5.2" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}

export default function HomeVillaDelRey() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const current = VILLA_DEL_REY_STAYS[active];
  const lightboxGroup = `home-villa-${current.name.toLowerCase()}`;

  return (
    <section id="villa-del-rey" className="bg-[#f7f5ee] pb-16 pt-6 text-[#14271d] sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
      <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 lg:grid-cols-[1.12fr_1fr] lg:gap-16 lg:px-10">
        {/* Larawan: lahat ng exterior ay nakapatong at nagka-crossfade, kaya
            walang kurap kapag nagpalit. */}
        <div data-reveal="left" className="relative pb-10 pr-6 sm:pb-14 sm:pr-10">
          <div
            role="button"
            tabIndex={0}
            aria-label={`View ${current.name} photos`}
            data-lightbox
            data-lightbox-group={lightboxGroup}
            data-src={current.exterior}
            data-alt={`${current.name} exterior at Villa Del Rey`}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.currentTarget.click();
              }
            }}
            className="group/photo relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-[1.8rem] bg-[#1f3f2e] shadow-[0_26px_60px_rgba(20,50,35,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] sm:aspect-[5/5.4]"
          >
            {VILLA_DEL_REY_STAYS.map((stay, index) => (
              <Image
                key={stay.name}
                src={stay.exterior}
                alt={`${stay.name} at Villa Del Rey`}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className={`object-cover transition-[opacity,transform,filter] duration-[900ms] ease-out group-hover/photo:brightness-[0.88] ${
                  index === active ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                }`}
              />
            ))}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.42)_0%,transparent_28%,transparent_62%,rgba(10,26,18,0.6)_100%)]"
            />
            <Image
              src="/villa-del-rey/logo-white.png"
              alt="Villa Del Rey"
              width={528}
              height={291}
              className="absolute left-6 top-6 h-auto w-[120px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] sm:left-8 sm:top-8 sm:w-[150px]"
            />
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0d98f] xl:text-[11px]">
                {current.setting}
              </p>
              <p className="mt-1 font-display text-3xl font-medium tracking-[-0.03em] text-white sm:text-4xl">{current.name}</p>
            </div>
            <span className="pointer-events-none absolute right-5 top-5 grid size-10 place-items-center text-white transition-transform duration-300 group-hover/photo:scale-110 sm:right-7 sm:top-7">
              <ZoomIcon className="size-7 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]" />
            </span>
          </div>

          {/* Inset: loob ng kuwarto ng piniling tuluyan. */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`View ${current.name} room photo`}
            data-lightbox
            data-lightbox-group={lightboxGroup}
            data-src={current.interior}
            data-alt={`${current.name} room at Villa Del Rey`}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.currentTarget.click();
              }
            }}
            className="group/inset absolute bottom-0 right-0 aspect-[4/3] w-[44%] cursor-zoom-in overflow-hidden rounded-[1.2rem] border-[6px] border-[#f7f5ee] bg-[#1f3f2e] shadow-[0_20px_44px_rgba(20,50,35,0.22)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98782f]"
          >
            {VILLA_DEL_REY_STAYS.map((stay, index) => (
              <Image
                key={stay.name}
                src={stay.interior}
                alt={`${stay.name} bedroom at Villa Del Rey`}
                fill
                sizes="(min-width: 1024px) 280px, 45vw"
                className={`object-cover transition-[opacity,filter] duration-700 group-hover/inset:brightness-[0.88] ${index === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <span className="pointer-events-none absolute bottom-2.5 right-2.5 text-white">
              <ZoomIcon className="size-5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)]" />
            </span>
          </div>

          {/* Iba pang kuha ng piniling tuluyan — kasama sa gallery ng
              lightbox (next/prev) pero hindi ipinapakita dito. */}
          {current.gallery.map((photo) => (
            <span
              key={photo.src}
              data-lightbox
              data-lightbox-group={lightboxGroup}
              data-src={photo.src}
              data-alt={photo.alt}
              className="hidden"
              aria-hidden="true"
            />
          ))}
        </div>

        <div>
          <p
            data-reveal="up"
            className="font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#98782f] sm:text-xs"
          >
            {t("home.stay.eyebrow")}
          </p>
          <h2
            data-reveal="up"
            style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            className="mt-3 text-[clamp(2.25rem,3.6vw,3.6rem)] font-medium leading-[1] tracking-[-0.045em] text-[#17251e]"
          >
            {t("home.stay.title")}
          </h2>
          <p data-reveal="up" className="mt-5 max-w-lg text-[17px] leading-8 text-[#3f4c45]">
            {VILLA.description}
          </p>

          <ul data-reveal="up" className="mt-8 border-t border-[#14271d]/12">
            {VILLA_DEL_REY_STAYS.map((stay, index) => {
              const isActive = index === active;
              return (
                <li key={stay.name} className="border-b border-[#14271d]/12">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    className="group flex w-full items-center gap-5 py-4 text-left focus-visible:outline-none"
                  >
                    <span
                      className={`font-navigation text-[11px] font-bold tracking-[0.18em] transition-colors ${
                        isActive ? "text-[#98782f]" : "text-[#14271d]/35"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`flex-1 font-display text-2xl tracking-[-0.03em] transition-all duration-300 group-focus-visible:underline sm:text-[1.7rem] ${
                        isActive ? "translate-x-1 text-[#14271d]" : "text-[#14271d]/55 group-hover:text-[#14271d]"
                      }`}
                    >
                      {stay.name}
                    </span>
                    <span
                      className={`hidden font-navigation text-[10px] font-bold uppercase tracking-[0.16em] sm:block ${
                        isActive ? "text-[#98782f]" : "text-[#14271d]/40"
                      }`}
                    >
                      {stay.setting}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-px transition-all duration-500 ${isActive ? "w-10 bg-[#98782f]" : "w-4 bg-[#14271d]/25"}`}
                    />
                  </button>

                  {/* Bumubukas na detalye — grid-rows trick para sa
                      makinis na taas na animation. */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-3 pl-[3.1rem] text-[15px] leading-7 text-[#3f4c45]">{stay.description}</p>
                      <ul className="flex flex-wrap gap-2 pb-5 pl-[3.1rem]">
                        {stay.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="rounded-full border border-[#98782f]/35 px-3 py-1 text-xs font-medium text-[#5d4a1c]"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div data-reveal="up" className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href={VILLA_HREF}
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#e7d18d] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] shadow-[0_14px_34px_rgba(152,120,47,0.14)] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] xl:text-[11px]"
            >
              {t("home.stay.cta")}
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      <ImageLightbox />
    </section>
  );
}
