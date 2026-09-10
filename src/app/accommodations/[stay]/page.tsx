import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClubhouseVision from "@/components/ClubhouseVision";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import GotaVillageStays from "@/components/GotaVillageStays";
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
  const previous = ACCOMMODATIONS[(index - 1 + ACCOMMODATIONS.length) % ACCOMMODATIONS.length];
  const next = ACCOMMODATIONS[(index + 1) % ACCOMMODATIONS.length];
  const hasEditorialStayLayout =
    stay.slug === "clubhouse-lodge" || stay.slug === "villa-del-rey" || stay.slug === "gota-village-resort";

  return (
    <>
      <main>
        <section
          id="top"
          className={`relative isolate flex w-full items-end overflow-hidden bg-[#0b2419] text-white ${
            hasEditorialStayLayout
              ? "h-[80svh] min-h-[620px]"
              : "min-h-[78svh]"
          }`}
        >
          <Image
            src={stay.image}
            alt={`${stay.title} accommodation concept at CamSur Uptown`}
            fill
            preload
            sizes="100vw"
            className="-z-20 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,20,13,0.48)_0%,rgba(4,20,13,0.08)_40%,rgba(4,20,13,0.88)_100%)]" />
          {/* #f7f5ee ang unang section sa ilalim sa parehong stay, kaya
              ganoon din ang harapang burol — kung hindi magkatugma ay may
              lumalabas na tahi sa dugtungan. */}
          {!hasEditorialStayLayout ? <FairwayDivider fill="#f7f5ee" /> : null}
          {/* Dagdag na pb sa mga hero na may fairway divider; mas mababa ang
              text block kapag malinis at tuwid ang ilalim ng hero. */}
          <div
            className={`relative z-10 mx-auto w-full max-w-7xl px-6 pt-64 lg:px-8 ${
              stay.slug === "villa-del-rey"
                ? "pb-24 sm:pb-28 lg:pb-32"
                : stay.slug === "clubhouse-lodge"
                  ? "pb-24 sm:pb-28 lg:pb-32"
                : stay.slug === "gota-village-resort"
                  ? "pb-16 sm:pb-20 lg:pb-24"
                  : "pb-28 sm:pb-36 lg:pb-44"
            }`}
          >
            <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#e1c56e]">{stay.eyebrow}</p>
            <h1
              className={`mt-4 max-w-5xl font-medium leading-[0.92] tracking-[-0.06em] drop-shadow-[0_3px_14px_rgba(0,0,0,0.55)] ${
                stay.slug === "villa-del-rey" || stay.slug === "gota-village-resort"
                  ? "text-[clamp(2.75rem,5vw,4.75rem)]"
                  : "text-[clamp(3.25rem,6vw,6rem)]"
              }`}
            >
              {stay.title}
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${stay.slug === "villa-del-rey" ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]" : "text-white/78"}`}>
              {stay.description}
            </p>
          </div>
          {hasEditorialStayLayout ? (
            <a
              href={
                stay.slug === "villa-del-rey"
                  ? "#villa-stays"
                  : stay.slug === "clubhouse-lodge"
                    ? "#clubhouse-stays"
                    : "#gota-stays"
              }
              aria-label={`Explore ${stay.title} stays`}
              className="group absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-black/[0.04] backdrop-blur-[1px] transition-colors group-hover:border-white group-hover:bg-white/10">
                <svg viewBox="0 0 24 14" className="h-2.5 w-4" fill="none" aria-hidden="true">
                  <path d="M3 2.5 12 11l9-8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="mt-2 h-3 w-px bg-white/75 transition-colors group-hover:bg-white sm:h-4" aria-hidden="true" />
            </a>
          ) : null}
        </section>

        {stay.slug === "clubhouse-lodge" ? <ClubhouseVision /> : null}
        {stay.slug === "villa-del-rey" ? <VillaDelReyStays /> : null}
        {stay.slug === "gota-village-resort" ? <GotaVillageStays /> : null}

        <nav aria-label="Accommodation navigation" className="grid bg-[#0b2419] sm:grid-cols-2">
          <Link href={`/accommodations/${previous.slug}`} className="group relative min-h-80 overflow-hidden border-b border-white/15 sm:border-b-0 sm:border-r">
            <Image src={previous.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#0b2419]/62 transition group-hover:bg-[#0b2419]/48" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-10">
              <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">← Previous stay</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{previous.title}</p>
            </div>
          </Link>
          <Link href={`/accommodations/${next.slug}`} className="group relative min-h-80 overflow-hidden">
            <Image src={next.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#0b2419]/62 transition group-hover:bg-[#0b2419]/48" />
            <div className="absolute inset-0 flex flex-col items-end justify-end p-8 text-right text-white sm:p-10">
              <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">Next stay →</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{next.title}</p>
            </div>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
