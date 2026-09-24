import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ClubhouseDetails from "@/components/ClubhouseDetails";
import EventsDetails from "@/components/EventsDetails";
import GolfDetails from "@/components/GolfDetails";
import DiningDetails from "@/components/DiningDetails";
import ExperiencesDetails from "@/components/ExperiencesDetails";
import PackagesDetails from "@/components/PackagesDetails";
import ScrollCue from "@/components/ScrollCue";
import ScrollMotion from "@/components/ScrollMotion";
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
  const isGolf = section.slug === "golf";
  const isEvents = section.slug === "events";
  const isPackages = section.slug === "packages";
  const isExperiences = section.slug === "experiences";
  const isDining = section.slug === "dining";
  const isClubhouse = section.slug === "clubhouse";

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
  const usesFairwayHero =
    isGolf || isEvents || isPackages || isAccommodations || isExperiences || isDining || isClubhouse;
  const usesHeroParallax = isGolf || isEvents;

  /* Patag ang Golf, Experiences at Clubhouse heroes; ang iba lang ang may
     landscape wave. Sa Clubhouse ay may anim na pahina ng kuwarto sa ilalim
     nito na patag ang hero — kapag may alon dito, dalawang magkaibang anyo
     ang isang seksyon. */
  const usesFairwayDivider = usesFairwayHero && !isGolf && !isExperiences && !isClubhouse;

  /* Ang harapang burol ay dapat eksaktong katumbas ng background ng unang
     section sa ilalim — kahit bahagyang pagkakaiba ay lumilitaw bilang tahi. */
  const dividerFill = "#f7f5ee";

  return (
    <>
      <main>
        <section
          id="top"
          className={`relative isolate flex items-end overflow-hidden bg-[#071d13] text-white ${
            isGolf
              ? "min-h-[620px] sm:min-h-[680px] lg:min-h-[700px]"
              : isExperiences
                ? "h-[80svh] min-h-[620px]"
                : "min-h-[660px]"
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
                : isEvents
                  ? "bg-[linear-gradient(180deg,rgba(5,22,15,0.44)_0%,rgba(5,22,15,0.14)_45%,rgba(5,22,15,0.66)_100%)]"
                : isExperiences
                  ? "bg-[linear-gradient(180deg,rgba(5,22,15,0.58)_0%,rgba(5,22,15,0.16)_45%,rgba(5,22,15,0.72)_100%)]"
                : "bg-[linear-gradient(180deg,rgba(5,22,15,0.62)_0%,rgba(5,22,15,0.2)_45%,rgba(5,22,15,0.88)_100%)]"
            }`}
          />
          {usesFairwayDivider && <FairwayDivider fill={dividerFill} />}
          {!isGolf ? (
            <div
              /* Naka-kaliwa at nasa lapad ng Shell ang Clubhouse, tugma sa
                 anim na pahina ng kuwarto. Sa `max-w-7xl` ay hindi tumatapat
                 ang kaliwang gilid nito sa laman sa ibaba. */
              className={
                isClubhouse
                  ? "mx-auto w-full max-w-4xl px-6 pb-16 pt-56 sm:px-10 sm:pb-20 lg:px-12 xl:max-w-5xl"
                  : `mx-auto w-full max-w-7xl px-6 pt-64 text-center lg:px-8 ${isExperiences ? "pb-24 sm:pb-28 lg:pb-32" : usesFairwayDivider ? "pb-28 sm:pb-36 lg:pb-44" : "pb-16 lg:pb-20"}`
              }
            >
              <p
                data-reveal={usesFairwayHero ? "up" : undefined}
                className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#e1c56e]"
              >
                {section.eyebrow}
              </p>
              <h1
                data-reveal={usesFairwayHero ? "up" : undefined}
                style={usesFairwayHero ? ({ "--reveal-delay": "110ms" } as CSSProperties) : undefined}
                className={`mt-5 max-w-4xl text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em] ${isClubhouse ? "" : "mx-auto"}`}
              >
                {section.title}
              </h1>
            </div>
          ) : null}

          {isGolf ? (
            <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 text-center sm:pb-28 lg:px-8 lg:pb-32">
              <div className="mx-auto max-w-3xl">
                <p
                  data-reveal="up"
                  className="font-navigation text-[10px] font-bold uppercase tracking-[0.26em] text-[#e1c56e] sm:text-[11px]"
                >
                  Play Near Mt. Isarog
                </p>
                <h1
                  data-reveal="up"
                  style={{ "--reveal-delay": "120ms" } as CSSProperties}
                  className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em] text-white"
                >
                  Golf Course
                </h1>
                <p
                  className="relative z-10 mx-auto mt-5 max-w-xl text-sm font-medium leading-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] sm:text-base"
                >
                  Championship fairways, open views, and the striking silhouette of Mt. Isarog.
                </p>
              </div>
            </div>
          ) : null}

          {isExperiences ? <ScrollCue targetId="on-the-water" label="Explore CamSur experiences" /> : null}
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        {/* Lahat ng landas dito — ang limang detail component at ang
            fallback — ay nagsisimula sa EDITORIAL_SECTION_ALT (#f7f5ee),
            kaya iyon ang ibinibigay sa balot na ito. Hindi ito pwedeng
            ilagay sa loob ng susunod na section: iba-iba ang component
            kada section, at ang fallback lang ang may <section> dito. */}

        {isGolf ? <GolfDetails /> : isEvents ? <EventsDetails /> : isPackages ? <PackagesDetails /> : isExperiences ? <ExperiencesDetails /> : isDining ? <DiningDetails /> : isClubhouse ? <ClubhouseDetails /> : (
        <section className="bg-[#f7f5ee] py-20 text-[#14271d] sm:py-24 lg:py-28">
          {/* Ang ScrollMotion ang naglalagay ng .is-in. Kung wala siya ay
              mananatiling opacity: 0 ang lahat ng data-reveal dito. */}
          <ScrollMotion />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 border-b border-[#173b2a]/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p data-reveal="up" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.22em] text-[#98782f]">Explore {section.label}</p>
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
                    className="group relative isolate block aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-[#173b2a]/12 bg-[#173b2a] shadow-[0_18px_55px_rgba(20,39,29,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(20,45,32,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f644b] sm:aspect-[3/2]"
                  >
                    <Image
                      src={stay.image}
                      alt={`${stay.title} accommodation concept at CamSur Uptown`}
                      fill
                      sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 2.5rem), 608px"
                      className="-z-20 object-cover transition duration-700 ease-out group-hover:scale-[1.035] group-focus-visible:scale-[1.035]"
                    />
                    <div
                      className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,20,13,0.04)_22%,rgba(4,20,13,0.9)_100%)] transition duration-500 lg:group-hover:bg-[linear-gradient(180deg,rgba(4,20,13,0.3)_0%,rgba(4,20,13,0.95)_100%)] lg:group-focus-visible:bg-[linear-gradient(180deg,rgba(4,20,13,0.3)_0%,rgba(4,20,13,0.95)_100%)]"
                      aria-hidden="true"
                    />

                    <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e7d18d] xl:text-[11px]">
                        {stay.eyebrow}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
                        {stay.title}
                      </h3>
                      <div className="mt-3 max-h-44 translate-y-0 overflow-hidden opacity-100 transition-[max-height,opacity,transform] duration-500 ease-out lg:max-h-0 lg:translate-y-5 lg:opacity-0 lg:group-hover:max-h-44 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:max-h-44 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                        <p className="max-w-xl text-sm leading-6 text-white/78">{stay.description}</p>
                        <span className="mt-5 inline-flex h-10 items-center gap-3 rounded-full bg-[#e7d18d] px-5 font-navigation text-[10px] font-bold uppercase tracking-[0.13em] text-[#10281e]">
                          Explore this stay <span aria-hidden="true">→</span>
                        </span>
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
