import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ClubhouseDetails from "@/components/ClubhouseDetails";
import ClubhouseHeroOverlay from "@/components/ClubhouseHeroOverlay";
import EventsDetails from "@/components/EventsDetails";
import GolfDetails from "@/components/GolfDetails";
import ExperiencesDetails from "@/components/ExperiencesDetails";
import PackagesDetails from "@/components/PackagesDetails";
import ScrollMotion from "@/components/ScrollMotion";
import HeroRevealMotion from "@/components/HeroRevealMotion";
import { EDITORIAL_SECTION, EditorialHeading, Shell, delay } from "@/components/EditorialKit";
import { ACCOMMODATIONS, CLUB_PHONE, SITE_SECTIONS } from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return SITE_SECTIONS.filter((section) => section.slug !== "accommodations").map((section) => ({
    section: section.slug,
  }));
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
  if (slug === "accommodations") notFound();
  const section = SITE_SECTIONS.find((item) => item.slug === slug);
  if (!section) notFound();
  const isGolf = section.slug === "golf";
  const isEvents = section.slug === "events";
  const isPackages = section.slug === "packages";
  const isExperiences = section.slug === "experiences";
  const isClubhouse = section.slug === "clubhouse";
  const isAccommodations = section.slug === "accommodations";

  /**
   * Ang mga pahinang may sariling detail component: sila ang may fairway
   * divider, hero parallax, at staggered reveals.
   *
   * Dalawang kondisyon ang kailangan ng divider — puti ang unang section sa
   * ilalim (dahil puti ang harapang burol), at may <ScrollMotion /> ang
   * pahina (dahil nakatago ang data-reveal hangga't walang naglalagay ng
   * .is-in). Pasado ang tatlo sa dalawang ito.
   */
  /* Mga pahinang may <ScrollMotion />. Dito lang pwede ang data-reveal:
     nakatago ito sa CSS hangga't walang naglalagay ng .is-in, kaya sa
     pahinang walang motion driver ay mananatiling blangko ang teksto. */
  const usesFairwayHero =
    isGolf || isEvents || isPackages || isAccommodations || isExperiences || isClubhouse;

  /* Naka-pin (sticky top-0) na hero na tinatabunan ng susunod na section, may
     scroll-zoom sa larawan at umaangat/kumukupas na title — gaya ng Villa del
     Rey stay. Ginagamit ito ng Golf, Packages, Events at Experiences. Dahil
     naka-pin ang hero, ang scroll-zoom (data-hero-media) ang galaw, hindi ang
     rect-based parallax — kaya wala nang parallax na section. */
  const usesStickyReveal = isPackages || isEvents || isGolf || isExperiences;
  const usesHeroParallax = false;

  /* Patag ang Golf, Experiences at Clubhouse heroes; ang iba lang ang may
     landscape wave. Sa Clubhouse ay may anim na pahina ng kuwarto sa ilalim
     nito na patag ang hero — kapag may alon dito, dalawang magkaibang anyo
     ang isang seksyon. Ang mga sticky-reveal (packages, events) ay walang wave:
     ang pagtabon ng susunod na section na mismo ang transition papuntang cream. */
  const usesFairwayDivider =
    usesFairwayHero && !isGolf && !isExperiences && !isClubhouse && !usesStickyReveal;

  /* Ang harapang burol ay dapat eksaktong katumbas ng background ng unang
     section sa ilalim — kahit bahagyang pagkakaiba ay lumilitaw bilang tahi. */
  const dividerFill = "#f7f5ee";

  return (
    <>
      <main>
        {/* Naka-pin ang clubhouse hero: nananatili ang larawan sa sukat ng
            viewport habang tumatakbo ang sequence (title out → stats in →
            hold), saka lang bumibitaw papunta sa section sa ilalim. Ang balot
            na `h-[220svh]` ang nagbibigay ng scroll distance; sa ibang pahina
            ay `contents` — parang walang balot, kaya walang naaapektuhan. */}
        <div
          id={isClubhouse ? "clubhouse-hero-track" : undefined}
          className={isClubhouse ? "relative h-[220svh]" : "contents"}
        >
        <section
          id="top"
          className={`relative isolate flex overflow-hidden bg-[#071d13] text-white ${
            usesStickyReveal ? "items-center justify-center" : "items-end"
          } ${
            // Naka-pin ang hero (sticky top-0); umaangat ang susunod na section
            // para tabunan ito — reveal, gaya ng Villa del Rey. Ang clubhouse ay
            // sticky din pero sa loob ng sariling h-[220svh] na track.
            isClubhouse || usesStickyReveal
              ? "sticky top-0 h-svh min-h-[680px]"
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
            data-hero-media={usesStickyReveal ? "" : undefined}
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
          {!isGolf && !isClubhouse ? (
            <div
              className={`mx-auto w-full max-w-7xl px-6 text-center lg:px-8 ${
                usesStickyReveal
                  ? "py-16"
                  : `pt-64 ${isExperiences ? "pb-24 sm:pb-28 lg:pb-32" : usesFairwayDivider ? "pb-28 sm:pb-36 lg:pb-44" : "pb-16 lg:pb-20"}`
              }`}
              style={
                usesStickyReveal
                  ? // Inline transform ang vertical offset (hindi Tailwind
                    // [value] class — minsang hindi nire-regenerate ng dev ang
                    // CSS para roon, kaya nananatili sa gitna). Packages ay
                    // pataas dahil nasa center-bottom ang mga tao; Events ay
                    // tunay na centered. Hindi ito humahawak sa
                    // h1 na may sariling scroll transform.
                    { transform: `translateY(${isPackages ? "-14vh" : isExperiences ? "-4vh" : "0"})` }
                  : undefined
              }
            >
              <h1
                data-reveal={usesFairwayHero && !usesStickyReveal ? "up" : undefined}
                data-hero-logo={usesStickyReveal ? "" : undefined}
                className={`mx-auto max-w-4xl font-medium leading-[0.98] tracking-[-0.055em] ${
                  usesStickyReveal
                    ? // Mas maliit na title para sa naka-gitnang sticky hero.
                      "text-[clamp(2.25rem,4.5vw,4.75rem)] drop-shadow-[0_3px_18px_rgba(0,0,0,0.45)]"
                    : "text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95]"
                }`}
              >
                {section.title}
              </h1>
            </div>
          ) : null}

          {isClubhouse ? <ClubhouseHeroOverlay /> : null}

          {isGolf ? (
            /* Hindi naka-gitna: naka-angkla ang title malapit sa ibaba ng hero.
               Inline style ang posisyon (hindi Tailwind arbitrary class) dahil
               minsang hindi nire-regenerate ng dev ang CSS para sa bagong
               [value] — kaya tiyak itong tumatalab. Umaangat/kumukupas pa rin
               ang title (data-hero-logo) habang natatabunan, gaya ng iba. */
            <div
              className="mx-auto w-full max-w-7xl px-6 text-center lg:px-8"
              style={{ position: "absolute", left: 0, right: 0, bottom: "14vh", zIndex: 10 }}
            >
              <div className="mx-auto max-w-3xl">
                <h1
                  data-hero-logo=""
                  className="mx-auto max-w-3xl text-balance text-[clamp(2.25rem,4.5vw,4.75rem)] font-medium leading-[0.98] tracking-[-0.055em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.45)]"
                >
                  A course shaped by Camarines Sur
                </h1>
              </div>
            </div>
          ) : null}

        </section>
        </div>

        {/* Para sa sticky-reveal (packages, events): naka-`relative z-10` at
            solidong cream ang buong susunod na nilalaman kaya ito ang umaangat
            at tumatabon sa naka-pin na hero habang nagsi-scroll — reveal, gaya
            ng Villa del Rey. Sa ibang section ay walang klase ang balot, kaya
            walang naaapektuhan. */}
        <div className={usesStickyReveal ? "relative z-10 bg-[#f7f5ee]" : ""}>
        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        {/* Lahat ng landas dito — ang limang detail component at ang
            fallback — ay nagsisimula sa EDITORIAL_SECTION_ALT (#f7f5ee),
            kaya iyon ang ibinibigay sa balot na ito. Hindi ito pwedeng
            ilagay sa loob ng susunod na section: iba-iba ang component
            kada section, at ang fallback lang ang may <section> dito. */}

        {isGolf ? <GolfDetails /> : isEvents ? <EventsDetails /> : isPackages ? <PackagesDetails /> : isExperiences ? <ExperiencesDetails /> : isClubhouse ? <ClubhouseDetails /> : (
        <>
        <section className="bg-[#f7f5ee] py-20 text-[#14271d] sm:py-24 lg:py-28">
          {/* Ang ScrollMotion ang naglalagay ng .is-in. Kung wala siya ay
              mananatiling opacity: 0 ang lahat ng data-reveal dito. */}
          <ScrollMotion />
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-8 border-b border-[#1f3f2e]/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p data-reveal="up" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.22em] text-[#98782f]">Explore {section.label}</p>
                <h2
                  data-reveal="up"
                  style={revealDelay(110)}
                  className="mt-4 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-none tracking-[-0.055em]"
                >
                  Your CamSur stay.
                </h2>
              </div>
              <p
                data-reveal="up"
                style={revealDelay(220)}
                className="max-w-2xl text-base leading-8 text-[#56625b] lg:justify-self-end"
              >
                Stay at Villa Del Rey, a comfortable resort base for golf groups, families, and guests exploring Camarines Sur.
              </p>
            </div>

            {/* ISANG HILERA KADA TULUYAN, HINDI DALAWANG KARD SA GRID.
                Magkatabi sila dati sa `md:grid-cols-2`, kaya 608px lang ang
                bawat larawan — kalahati ng espasyo para sa bagay na siya
                namang paksa ng pahina.

                Buong lapad na ang bawat hilera at nagsasalitan ang panig.
                Ang `lg:order-2` lang ang gumagawa niyon, kaya nananatiling
                una sa DOM ang larawan sa dalawa at pareho ang pagkakabasa ng
                screen reader at ng tab order. Kasama nitong nagpapalit ang
                hati ng grid: laging sa larawan napupunta ang malapad na
                hanay, kung hindi ay nalalagas ito sa makitid na hanay.

                TATLONG ANTAS ANG LALIM: ang malaking larawan sa labas, ang
                nakapatong na kuha ng loob, at ang malaking bilang sa likod
                ng teksto. Isang larawan lang ito dati na may pamagat sa
                ibabaw — patag at walang sinasabi tungkol sa tuluyan. */}
            <div className="mt-12 space-y-20 lg:mt-20 lg:space-y-32">
              {ACCOMMODATIONS.map((stay, index) => {
                const imageOnRight = index % 2 === 1;
                return (
                  /* Ang data-reveal ay nasa balot, hindi sa loob: itinatakda
                     ng `.is-in` ang `transform: none`, at papatayin niyon
                     ang paglipat ng nakapatong na larawan. */
                  <div
                    key={stay.slug}
                    data-reveal="up"
                    style={revealDelay(index * 120)}
                    className={`${imageOnRight ? "lg:grid-cols-[1fr_2.2fr]" : "lg:grid-cols-[2.2fr_1fr]"} grid items-center gap-10 lg:gap-12`}
                  >
                    <div className={`${imageOnRight ? "lg:order-2" : ""} relative`}>
                      <Link
                        id={`option-${index + 1}`}
                        href={`/accommodations/${stay.slug}`}
                        className="group relative isolate block aspect-[5/4] overflow-hidden bg-[#1f3f2e] shadow-[0_18px_44px_rgba(20,50,35,0.14)]"
                      >
                        <Image
                          src={stay.image}
                          alt={`${stay.title} at CamSur Uptown`}
                          fill
                          sizes="(max-width: 1023px) calc(100vw - 3rem), 800px"
                          className="object-cover"
                        />
                      </Link>
                    </div>

                    <div className={`${imageOnRight ? "lg:order-1" : ""} relative`}>
                      {/* Bilang sa likod ng teksto. Ganito rin ang ginagawa ng
                          VillaDelReyStays sa "STAY OPTION 04", kaya iisa ang
                          wika ng dalawang pahina. */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-10 left-0 select-none font-display text-[clamp(4.5rem,7vw,7rem)] font-medium leading-none tracking-[-0.05em] text-[#1f3f2e]/[0.07]"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                        {stay.eyebrow}
                      </p>
                      <h3 className="relative mt-3 text-[clamp(1.85rem,2.8vw,2.75rem)] font-medium leading-[1.03] tracking-[-0.04em] text-[#14271d]">
                        {stay.title}
                      </h3>
                      <p className="relative mt-4 text-[17px] leading-8 text-[#3f4c45]">{stay.tagline}</p>
                      <p className="relative mt-3 text-[15px] leading-7 text-[#56625b]">{stay.description}</p>

                      {/* Ang tatlong `features` ng tuluyan, pamagat lang.
                          Nasa datos na sila at ipinapakita na ng sariling
                          pahina ng bawat tuluyan; dito ay sapat na ang
                          pangalan para may masilip bago pumindot. */}
                      <ul className="relative mt-7 border-t border-[#1f3f2e]/12">
                        {stay.features.map((feature) => (
                          <li
                            key={feature.title}
                            className="border-b border-[#1f3f2e]/12 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#3f4c45]"
                          >
                            {feature.title}
                          </li>
                        ))}
                      </ul>

                      {/* Kaparehong gintong pill ng mega menu at ng header. */}
                      <Link
                        href={`/accommodations/${stay.slug}`}
                        className="relative mt-8 inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition-colors hover:bg-[#f3dfa0] xl:text-[11px]"
                      >
                        Explore this stay
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            </div>
        </section>

        {/* Kasunod ng listahan ng tuluyan ang paanyaya na tumawag sa club.
            Kaparehong CTA ito ng "Plan a visit"
            sa Clubhouse, kaya iisa ang wika: gintong kicker, serif na pamagat,
            gawing berde ang unang pindutan at ang numero sa gilid. */}
        <section className={EDITORIAL_SECTION}>
          <Shell>
            <EditorialHeading
              kicker="Get in touch"
              title="Contact us."
              intro="Ready to plan a stay, or want to hold rooms for a golf group? Call the club and we will help you build the visit that fits."
            />

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/contact"
                data-reveal="up"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#265136] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#1f3f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#265136] xl:text-[11px]"
              >
                Contact us
              </Link>
              <a
                href={CLUB_PHONE.href}
                data-reveal="up"
                style={delay(90)}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#1f3f2e]/20 px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-[#14271d] transition-colors hover:border-[#265136] hover:text-[#265136] xl:text-[11px]"
              >
                {CLUB_PHONE.label}
              </a>
            </div>
          </Shell>
        </section>
        </>
        )}
        </div>
      </main>
      {/* Scroll-driven na galaw ng naka-pin na hero (zoom + pag-angat ng title)
          para sa packages at events — dito gumagamit ng mekanismong villa-del-rey
          (sticky + cover). Ang clubhouse ay may sariling sticky-sequence. */}
      {usesStickyReveal ? <HeroRevealMotion /> : null}
      <Footer />
    </>
  );
}
