import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Kicker, Shell, Watermark, delay } from "@/components/EditorialKit";
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
    name: "Buddy Golf Trip",
    summary: "Two nights, two rounds, one memorable group escape",
    who: "Golf, meals, and good company",
    href: "/packages/buddy-trip",
    inclusions: [
      "A flexible three-day itinerary for your group",
      "Two rounds with caddies",
      "Daily breakfast and one group dinner",
      "Stay and transfers arranged around your dates",
    ],
  },
] as const;

const ADD_ONS = [
  ["Airport transfers", "Collection from Naga Airport or your hotel, arranged with 24 hours’ notice."],
  ["Additional rounds", "Extra rounds added to any package at the resident guest rate."],
  ["Club rental", "Full sets in right- and left-handed configurations, reserved with your tee time."],
  ["Private dining", "A separate room and a menu built for your group rather than the day’s service."],
  ["Extra nights", "Add nights on either side of a package at the package room rate."],
  ["Non-golfer itinerary", "For partners and family who would rather be anywhere but the fairway."],
] as const;

const GOOD_TO_KNOW = [
  [
    "Rates are quoted, not listed",
    "Every package is priced on the dates, the group, and the accommodation you choose. Send the details and the club comes back with a figure.",
  ],
  [
    "Book earlier for weekends",
    "Weekend mornings fill first because members and their guests have priority. Weekday packages can usually be arranged on shorter notice.",
  ],
  [
    "Packages can be rebuilt",
    "None of these are fixed. If the shape is close but the nights or rounds are wrong, say so and the club will adjust it.",
  ],
] as const;

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
      <Watermark speed={0.12} offsetY="16%" />
      <Shell>
        <EditorialHeading
          kicker="Golf packages"
          title="Two ways to put a trip together."
          intro="Each one is a starting point rather than a fixed product. Tell the club which is closest and it gets rebuilt around your dates."
        />

        <div className="mt-10 grid gap-x-10 gap-y-10 lg:grid-cols-2">
          {PACKAGES.map((pack, index) => (
            <article
              key={pack.slug}
              id={pack.slug}
              data-reveal="up"
              style={delay((index % 2) * 90)}
              className="scroll-mt-28 border-t border-[#173b2a]/12 pt-8"
            >
              <p className="font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#98782f]">
                {String(index + 1).padStart(2, "0")} · {pack.who}
              </p>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[#174630]">
                {pack.name}
              </h3>
              <p className="mt-2 text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]">{pack.summary}</p>

              <ul className="mt-6 space-y-3">
                {pack.inclusions.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-7 xl:text-base xl:leading-8 text-[#4b5a51] sm:text-base">
                    <span className="text-[#2f7a52]">
                      <CheckIcon />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.16em] text-[#98782f]">
                Rate on request
              </p>
              {"href" in pack && (
                <Link href={pack.href} className="mt-5 inline-flex h-11 items-center rounded-full bg-[#2f644b] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a]">
                  View itinerary →
                </Link>
              )}
            </article>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function AddOns() {
  return (
    <section
      id="add-ons"
      className={EDITORIAL_SECTION_ALT}
    >
      <div
        data-parallax="-0.1"
        className="pointer-events-none absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-[#c9a54e]/[0.09] blur-3xl"
        aria-hidden="true"
      />
      <Shell>
        <EditorialHeading
          kicker="Add to any package"
          title="The parts you bolt on."
          intro="These sit on top of whichever package you start from, and none of them require a different booking."
        />

        <div className="mt-10 grid gap-x-14 gap-y-2 sm:grid-cols-2">
          {ADD_ONS.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay((index % 2) * 90)}
              className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-[#173b2a]/12 py-7"
            >
              <p className="text-[10px] xl:text-[11px] font-bold tracking-[0.14em] text-[#98782f]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#174630]">{title}</h3>
                <p className="mt-1.5 max-w-sm text-sm leading-7 xl:text-base xl:leading-8 text-[#667269]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function GoodToKnow() {
  return (
    <section id="good-to-know" className={EDITORIAL_SECTION_ALT}>
      <Watermark speed={-0.09} offsetY="16%" />
      <Shell>
        <EditorialHeading
          kicker="Good to know"
          title="Before you enquire."
          intro="Three things worth knowing so the first email gets you a useful answer rather than a follow-up question."
        />

        <div className="mt-10 border-t border-[#173b2a]/12">
          {GOOD_TO_KNOW.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 90)}
              className={`grid gap-4 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${index ? "border-t border-[#173b2a]/12" : ""}`}
            >
              <p className="text-[10px] xl:text-[11px] font-bold tracking-[0.14em] text-[#98782f]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 xl:text-base xl:leading-8 text-[#667269]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function PackagesCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071d13] py-14 text-white sm:py-16">
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
                href="/#contact"
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
      <AddOns />
      <GoodToKnow />
      <PackagesCta />
    </>
  );
}
