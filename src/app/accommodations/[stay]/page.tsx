import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import HeroRevealMotion from "@/components/HeroRevealMotion";
import VillaDelReyStays from "@/components/VillaDelReyStays";
import { ACCOMMODATIONS } from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return ACCOMMODATIONS.map((stay) => ({ stay: stay.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ stay: string }> }): Promise<Metadata> {
  const { stay: slug } = await params;
  const stay = ACCOMMODATIONS.find((item) => item.slug === slug);
  return stay
    ? {
        title: `${stay.title} | CamSur Uptown Golf Club`,
        description: stay.description,
      }
    : {};
}

export default async function AccommodationPage({ params }: { params: Promise<{ stay: string }> }) {
  const { stay: slug } = await params;
  const index = ACCOMMODATIONS.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const stay = ACCOMMODATIONS[index];
  const hasEditorialStayLayout = stay.slug === "villa-del-rey";

  return (
    <>
      <main>
        <section
          id="top"
          className={`isolate flex w-full items-end overflow-hidden bg-[#0b2419] text-white ${
            hasEditorialStayLayout
              ? // Naka-pin ang hero (sticky top-0); pagbaba, umaangat ang
                // susunod na section para tabunan ito — reveal effect.
                "sticky top-0 h-svh min-h-[680px]"
              : "relative min-h-[78svh]"
          }`}
        >
          <Image
            src={stay.image}
            alt={`${stay.title} accommodation concept at CamSur Uptown`}
            fill
            preload
            sizes="100vw"
            data-hero-media={hasEditorialStayLayout ? "" : undefined}
            className={`-z-20 h-full w-full object-cover object-center ${
              hasEditorialStayLayout
                ? "[filter:brightness(1.03)_contrast(1.05)_saturate(1.07)]"
                : ""
            }`}
          />
          {/* Mas magaan na overlay para sa villa-del-rey — hiniling na palinawan
              ang hero (tugma sa clubhouse). Nananatiling madilim ang ilalim para
              nababasa ang scroll cue at malinis ang seam papuntang cream. Ibang
              stays: hindi hinahawakan ang dating tint. */}
          <div
            className={`absolute inset-0 -z-10 ${
              hasEditorialStayLayout
                ? "bg-[linear-gradient(180deg,rgba(4,20,13,0.30)_0%,rgba(4,20,13,0.00)_45%,rgba(4,20,13,0.55)_100%)]"
                : "bg-[linear-gradient(180deg,rgba(4,20,13,0.48)_0%,rgba(4,20,13,0.08)_40%,rgba(4,20,13,0.88)_100%)]"
            }`}
          />
          {hasEditorialStayLayout ? (
            <div className="absolute inset-0 z-10 flex items-start justify-center px-6 pt-[20vh] sm:pt-[22vh]">
              {/* Walang nang white card — dumidikit na ang logo (transparent
                  ang PNG) sa hero. Banayad na drop-shadow para nababasa ang
                  navy na logo sa ibabaw ng litrato, gaya ng ibang hero title.
                  Naka-angat sa itaas (items-start + pt) at mas maliit kaysa
                  dati (440 → 360px) — hiniling na liitan at itaas. */}
              <Image
                src="/villa-del-rey/logo.png"
                alt="Villa Del Rey, CamSur Philippines"
                width={528}
                height={291}
                sizes="(max-width: 639px) 66vw, 360px"
                data-hero-logo=""
                className="h-auto w-[min(66vw,360px)] drop-shadow-[0_6px_22px_rgba(0,0,0,0.45)]"
              />
            </div>
          ) : null}
          {/* #f7f5ee ang unang section sa ilalim ng stay, kaya
              ganoon din ang harapang burol — kung hindi magkatugma ay may
              lumalabas na tahi sa dugtungan. */}
          {!hasEditorialStayLayout ? <FairwayDivider fill="#f7f5ee" /> : null}
          {!hasEditorialStayLayout ? (
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-64 sm:pb-36 lg:px-8 lg:pb-44">
              <h1 className="max-w-5xl text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.92] tracking-[-0.06em] drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)]">
                {stay.title}
              </h1>
            </div>
          ) : null}
        </section>

        {/* Naka-`relative z-10` at solidong cream ang buong susunod na
            nilalaman kaya ito ang umaangat pataas at tumatabon sa naka-pin
            (sticky) na hero habang nagsi-scroll — ito ang reveal effect.
            Sa hindi-editorial na stay ay walang sticky, kaya walang wrapper. */}
        <div className={hasEditorialStayLayout ? "relative z-10 bg-[#f7f5ee]" : ""}>
          <div className="bg-[#f7f5ee]">
            <Breadcrumbs />
          </div>

          {/* Walang <section> dito pagkatapos ng hero — component agad ang
              kasunod. Cream ang simula ng dalawang stay component, kaya iyon
              ang ibinibigay dito; kung hindi, lumilitaw ang puti ng body
              bilang guhit sa pagitan. */}

          {stay.slug === "villa-del-rey" ? <VillaDelReyStays /> : null}
        </div>

      </main>
      {/* Scroll-driven na galaw ng naka-pin na hero (zoom + pag-angat ng logo).
          Editorial layout lang — dito lang sticky ang hero. */}
      {hasEditorialStayLayout ? <HeroRevealMotion /> : null}
      {/* Isa lang ito para sa buong pahina. Nakikinig ito sa pagpindot sa
          kahit anong `[data-lightbox]` sa loob ng dokumento, kaya walang
          kailangang ipasa mula rito patungo sa VillaDelReyStays, kaya
          nananatili itong server component. */}
      <ImageLightbox />
      <Footer />
    </>
  );
}
