import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import EventsDetails from "@/components/EventsDetails";
import GolfDetails from "@/components/GolfDetails";
import PackagesDetails from "@/components/PackagesDetails";
import ScrollMotion from "@/components/ScrollMotion";
import ShopExperience from "@/components/ShopExperience";
import VisitDetails from "@/components/VisitDetails";
import { ACCOMMODATIONS, SITE_SECTIONS } from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_SECTIONS.map((section) => ({ section: section.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section: slug } = await params;
  const section = SITE_SECTIONS.find((item) => item.slug === slug);
  return section ? { title: `${section.label} | CamSur Uptown Golf Club`, description: section.description } : {};
}

/** Stagger helper — nababasa sa CSS bilang `transition-delay`. */
const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section: slug } = await params;
  const section = SITE_SECTIONS.find((item) => item.slug === slug);
  if (!section) notFound();
  const isVisit = section.slug === "visit";
  const isGolf = section.slug === "golf";
  const isShop = section.slug === "shop";
  const isEvents = section.slug === "events";
  const isPackages = section.slug === "packages";

  /**
   * Ang mga pahinang may sariling detail component: sila ang may fairway
   * divider, hero parallax, at staggered reveals.
   *
   * Dalawang kondisyon ang kailangan ng divider — puti ang unang section sa
   * ilalim (dahil puti ang harapang burol), at may <ScrollMotion /> ang
   * pahina (dahil nakatago ang data-reveal hangga't walang naglalagay ng
   * .is-in). Pasado ang tatlo sa dalawang ito.
   */
  const isAccommodations = section.slug === "accommodations";

  /* Mga pahinang may <ScrollMotion />. Dito lang pwede ang data-reveal:
     nakatago ito sa CSS hangga't walang naglalagay ng .is-in, kaya sa
     pahinang walang motion driver ay mananatiling blangko ang teksto. */
  const usesFairwayHero = isVisit || isGolf || isEvents || isPackages || isAccommodations;
  const usesHeroParallax = isVisit || isGolf || isEvents;

  /* Pareho na sila: bawat pahinang may divider ay may ScrollMotion na rin. */
  const usesFairwayDivider = usesFairwayHero;

  /* Ang harapang burol ay dapat eksaktong katumbas ng background ng unang
     section sa ilalim — kahit bahagyang pagkakaiba ay lumilitaw bilang tahi. */
  const dividerFill = isGolf ? "#f6f5f5" : "#f7f5ee";

  if (isShop) {
    return (
      <>
        <main>
          <ShopExperience />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main>
        <section
          id="top"
          className={`relative isolate flex items-end overflow-hidden bg-[#071d13] text-white ${
            isGolf ? "min-h-[820px] sm:min-h-[720px] lg:min-h-[600px]" : "min-h-[660px]"
          }`}
        >
          <Image
            src={section.image}
            alt={`${section.label} at CamSur Uptown Golf Club`}
            fill
            priority
            sizes="100vw"
            data-parallax={usesHeroParallax ? "-0.06" : undefined}
            className={`-z-20 object-cover ${usesHeroParallax ? "parallax-media" : ""}`}
          />
          <div
            className={`absolute inset-0 -z-10 ${
              isPackages
                ? "bg-[linear-gradient(180deg,rgba(4,20,13,0.48)_0%,rgba(4,20,13,0.08)_40%,rgba(4,20,13,0.88)_100%)]"
                : "bg-[linear-gradient(180deg,rgba(5,22,15,0.62)_0%,rgba(5,22,15,0.2)_45%,rgba(5,22,15,0.88)_100%)]"
            }`}
          />
          {usesFairwayDivider && <FairwayDivider fill={dividerFill} />}
          {isGolf ? (
            <div className="mx-auto flex min-h-[820px] w-full max-w-7xl items-end px-6 pb-32 pt-40 sm:min-h-[720px] sm:pb-36 lg:min-h-[600px] lg:px-8 lg:pb-36 lg:pt-32">
              <p data-reveal="up" className="text-[12px] font-bold uppercase tracking-[0.24em] text-[#e1c56e] sm:text-sm">
                Clubhouse and course
              </p>
            </div>
          ) : (
            <div
              className={`mx-auto w-full max-w-7xl px-6 pt-64 lg:px-8 ${usesFairwayDivider ? "pb-28 sm:pb-36 lg:pb-44" : "pb-16 lg:pb-20"}`}
            >
              <p
                data-reveal={usesFairwayHero ? "up" : undefined}
                className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e1c56e]"
              >
                {section.eyebrow}
              </p>
              <h1
                data-reveal={usesFairwayHero ? "up" : undefined}
                style={usesFairwayHero ? ({ "--reveal-delay": "110ms" } as CSSProperties) : undefined}
                className="mt-5 max-w-4xl text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.92] tracking-[-0.06em]"
              >
                {section.title}
              </h1>
              <p
                data-reveal={usesFairwayHero ? "up" : undefined}
                style={usesFairwayHero ? ({ "--reveal-delay": "220ms" } as CSSProperties) : undefined}
                className="mt-6 max-w-2xl text-base leading-8 text-white/68 sm:text-lg"
              >
                {section.description}
              </p>
            </div>
          )}
        </section>

        {isVisit ? <VisitDetails /> : isGolf ? <GolfDetails /> : isEvents ? <EventsDetails /> : isPackages ? <PackagesDetails /> : (
        <section className="bg-[#f7f5ee] py-20 text-[#14271d] sm:py-24 lg:py-28">
          {/* Ang ScrollMotion ang naglalagay ng .is-in. Kung wala siya ay
              mananatiling opacity: 0 ang lahat ng data-reveal dito. */}
          <ScrollMotion />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 border-b border-[#173b2a]/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p data-reveal="up" className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">Explore {section.label}</p>
                <h2
                  data-reveal="up"
                  style={revealDelay(110)}
                  className="mt-4 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-none tracking-[-0.055em]"
                >
                  Find the stay that suits your visit.
                </h2>
              </div>
              <p
                data-reveal="up"
                style={revealDelay(220)}
                className="max-w-2xl text-base leading-8 text-[#56625b] lg:justify-self-end"
              >
                Choose the privacy of a course-side Fairway Villa or the convenience of an intimate lodge at the heart
                of the club.
              </p>
            </div>

            {/* Accommodations lang ang nakakarating dito — may sariling
                component na ang lahat ng ibang section. */}
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {ACCOMMODATIONS.map((stay, index) => (
                /* Ang data-reveal ay nasa balot, hindi sa Link mismo: ang
                   `.is-in` ay nagtatakda ng `transform: none`, at papatayin
                   niyon ang hover:-translate-y-1 ng kard. */
                <div key={stay.slug} data-reveal="up" style={revealDelay(index * 120)}>
                  <Link
                    id={`option-${index + 1}`}
                    href={`/accommodations/${stay.slug}`}
                    className="group block overflow-hidden bg-white shadow-[0_14px_34px_rgba(20,45,32,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(20,45,32,0.14)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#173a29]">
                      <Image
                        src={stay.image}
                        alt={`${stay.title} accommodation concept at CamSur Uptown`}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 2.5rem), 608px"
                        className="object-cover transition duration-700 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-6 sm:p-7">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">{stay.eyebrow}</p>
                      <div className="mt-4 flex items-start justify-between gap-5">
                        <div>
                          <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em]">{stay.title}</h3>
                          <p className="mt-3 max-w-xl text-sm leading-6 text-[#5d685f]">{stay.description}</p>
                        </div>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/20 transition group-hover:bg-[#174630] group-hover:text-white" aria-hidden="true">→</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}
      </main>
      <Footer />
    </>
  );
}
