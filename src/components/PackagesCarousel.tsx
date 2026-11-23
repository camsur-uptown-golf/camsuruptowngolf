"use client";

import Image from "next/image";
import Link from "next/link";
import SectionBlend from "@/components/SectionBlend";
import { useTranslation } from "@/i18n/LanguageProvider";

/** Full-width package photography with copy aligned to the page gutters. */
export default function PackagesCarousel() {
  const { t } = useTranslation();

  return (
    <section id="home-packages" aria-labelledby="home-packages-title" className="bg-[#f3ede1]">
      <div className="w-full">
        <div className="relative isolate flex h-[520px] w-full items-end overflow-hidden bg-[#dfe4df] sm:aspect-[16/9] sm:h-auto sm:items-center lg:aspect-[1.9/1] lg:max-h-[780px]">
          <Image
            src="/golf-clubhouse-aerial-hero-v2.png"
            alt="The clubhouse, pool, and lakes at the heart of the course, CamSur Uptown Golf"
            fill
            quality={90}
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(15,17,13,0.76)_0%,rgba(15,17,13,0.3)_45%,rgba(15,17,13,0.04)_100%)] sm:bg-[radial-gradient(ellipse_50%_42%_at_16%_58%,rgba(15,17,13,0.3)_0%,rgba(15,17,13,0.12)_55%,transparent_100%)]"
            aria-hidden="true"
          />
          {/* Blend mula sa cream ng Villa Del Rey sa itaas papasok sa langit ng
              larawan — walang matigas na putol sa pagitan ng dalawang section. */}
          <SectionBlend surface="#f3ede1" edge="top" height="clamp(6rem, 14vw, 12rem)" />
          {/* `max-w-[1600px]` at px-6/lg:px-8: kapareho ng Villa Del Rey sa itaas,
              kaya kapantay ng kaliwang gilid ng mga card ng stay ang pamagat. */}
          <div className="mx-auto w-full max-w-[1600px] px-6 pb-10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_2px_18px_rgba(0,0,0,0.45)] sm:pb-0 lg:px-8">
            <div className="max-w-[760px]">
              <h2 id="home-packages-title" className="font-display text-[clamp(2.5rem,4.6vw,4.125rem)] font-normal leading-[0.98] tracking-[-0.04em]">
                Plan your golf getaway
              </h2>
              <p className="mt-5 max-w-[270px] text-sm font-normal leading-7 text-white/80 sm:max-w-[460px] sm:text-[15px]">
                {t("packages.blurbMain")}
              </p>
              <Link
                href="/packages"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[#e2c77a] px-7 py-3 font-navigation text-[11px] font-bold uppercase tracking-[0.1em] text-[#03321b] [text-shadow:none] transition-colors hover:bg-[#efd99b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2c77a]"
              >
                See packages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
