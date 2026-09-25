import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, Kicker, Shell, delay } from "@/components/EditorialKit";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * The Packages page, sa parehong editorial na wika ng Visit at Events.
 *
 * Ang balangkas ng mga package ay sumusunod sa karaniwang ginagawa ng mga
 * resort-golf club — stay-and-play, unlimited golf, buddies trip, corporate
 * day, at twilight — at iniangkop sa mga akomodasyong meron na dito.
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - lahat ng presyo (nakalagay muna ang "On request"; walang inimbentong halaga)
 *  - bilang ng gabi at round sa bawat package
 *  - pinakamaliit na bilang ng tao sa Group at Corporate
 *  - kung anong panahon ang tinuturing na peak season
 */

/* Ang slug ang anchor target ng mega menu sa header. Kapag may idinagdag o
   pinalitan dito, sundan ang links ng "packages" sa site-content.ts. */
const PACKAGES = [
  {
    slug: "stay-and-play",
    href: "/packages/stay-and-play",
    image: "/stay-and-play-hero-option-2.png",
    name: "Stay & Play",
    summary: "One night, one round",
    who: "The simplest way to see the course",
    inclusions: [
      "One night in the accommodation of your choice",
      "One round with a caddie",
      "Breakfast the following morning",
      "Range balls on arrival",
    ],
  },
  {
    slug: "buddy-trip",
    href: "/packages/buddy-trip",
    image: "/buddy-golf-trip-hero-v4.png",
    name: "Buddy Golf Trip",
    summary: "Two nights, two rounds, one memorable group escape",
    who: "Golf, meals, and good company",
    inclusions: [
      "A flexible three-day itinerary for your group",
      "Two rounds with caddies",
      "Daily breakfast and one group dinner",
      "Stay and transfers arranged around your dates",
    ],
  },
] as const;

/* NASA /faq NA ANG DATING "Before you enquire". Tatlong tanong tungkol sa
   buong club ang mga iyon — presyo, abiso, at kung nababago ang package —
   at hindi lang sa mga package. Nasa FAQ_GROUPS sila ngayon sa
   site-content.ts, at may pindutan ang footer papunta roon. */

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="m4.5 10.5 3.2 3.1 7.8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThePackages() {
  return (
    <section id="packages" className={EDITORIAL_SECTION_ALT}>
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid gap-8 border-b border-[#1f3f2e]/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p data-reveal="up" className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f] xl:text-[11px]">
              Choose your trip
            </p>
            <h2
              data-reveal="up"
              style={delay(110)}
              className="mt-4 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-none tracking-[-0.055em] text-[#14271d]"
            >
              Two ways to put a trip together.
            </h2>
          </div>
          <p
            data-reveal="up"
            style={delay(220)}
            className="max-w-2xl text-base leading-8 text-[#56625b] lg:justify-self-end"
          >
            Choose the format that fits your stay, then open its itinerary for the full day-by-day plan.
          </p>
        </div>

        <div className="mt-12 space-y-20 lg:mt-20 lg:space-y-32">
          {PACKAGES.map((pack, index) => {
            const imageOnRight = index % 2 === 1;
            return (
              <article
                key={pack.slug}
                id={pack.slug}
                data-reveal="up"
                style={delay(index * 120)}
                className={`${imageOnRight ? "lg:grid-cols-[1fr_3fr]" : "lg:grid-cols-[3fr_1fr]"} grid scroll-mt-28 items-center gap-10 lg:gap-12`}
              >
                <Link
                  href={pack.href}
                  className={`${imageOnRight ? "lg:order-2" : ""} group relative isolate block aspect-[3/2] overflow-hidden bg-[#1f3f2e] shadow-[0_22px_54px_rgba(20,50,35,0.16)]`}
                >
                  <Image
                    src={pack.image}
                    alt={`${pack.name} at CamSur Uptown Golf Club`}
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 3rem), 800px"
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />
                </Link>

                <div className={`${imageOnRight ? "lg:order-1" : ""} relative`}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-10 left-0 select-none font-display text-[clamp(4.5rem,7vw,7rem)] font-medium leading-none tracking-[-0.05em] text-[#1f3f2e]/[0.07]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                    {pack.who}
                  </p>
                  <h3 className="relative mt-3 text-[clamp(1.85rem,2.8vw,2.75rem)] font-medium leading-[1.03] tracking-[-0.04em] text-[#14271d]">
                    {pack.name}
                  </h3>
                  <p className="relative mt-4 text-[17px] leading-8 text-[#3f4c45]">{pack.summary}</p>

                  <ul className="relative mt-7 border-t border-[#1f3f2e]/12">
                    {pack.inclusions.map((item) => (
                      <li key={item} className="flex gap-3 border-b border-[#1f3f2e]/12 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.06em] text-[#3f4c45]">
                        <span className="text-[#265136]">
                          <CheckIcon />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="relative mt-6 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] xl:text-[11px]">
                    Rate on request
                  </p>
                  <Link
                    href={pack.href}
                    className="relative mt-5 inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition-colors hover:bg-[#f3dfa0] xl:text-[11px]"
                  >
                    View itinerary →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PackagesCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-[#1f3f2e]/10 bg-[#1f3f2e] py-14 text-white sm:py-16">
      <div
        data-parallax="0.14"
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#c9a54e]/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <Shell>
        <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
          <div>
            <Kicker>Build your package</Kicker>
            <h2
              data-reveal="up"
              style={delay(90)}
              className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl"
            >
              Send us your dates.
            </h2>
          </div>
          <div data-reveal="up" style={delay(180)}>
            <p className="text-sm leading-7 xl:text-base xl:leading-8 text-white/60">
              Tell the club your dates, how many are playing, and which package is closest to what you want. You will
              get back a quote built around those three things.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/plan-your-visit"
                className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
              >
                Request a quote
              </Link>
              <a
                href={CLUB_PHONE.href}
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/22 px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-white/85 transition hover:border-[#e7d18d]/60 hover:text-[#f1d98f]"
              >
                <PhoneIcon />
                {CLUB_PHONE.label}
              </a>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

export default function PackagesDetails() {
  return (
    <>
      <ScrollMotion />
      <ThePackages />
      <PackagesCta />
    </>
  );
}
