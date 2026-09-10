import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Kicker, Shell, Watermark, delay } from "@/components/EditorialKit";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * The Experiences page — ang mga hinahandog sa labas ng golf course.
 *
 * Nakapangkat ang sampung pasilidad sa apat, hindi iisang mahabang listahan:
 * kapag magkakasunod ang sampung magkakaparehong hilera ay wala nang ritmo
 * ang pagbaba ng pahina, at hindi rin agad makikita ng bisita kung alin ang
 * para sa kanya.
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - kumpletong listahan ng pasilidad at kung alin ang bukas sa bisita
 *  - oras ng bukas, bayad, at kung alin ang kailangang i-book nang maaga
 *  - hinihinging edad, waiver, o gamit sa Wakepark, ATV, at Bike Track
 */

/* May sariling `id` ang bawat pasilidad dahil isa-isa silang nakalista sa
   mega menu. Kapag may binago o idinagdag dito, sundan ang `links` ng
   "experiences" sa site-content.ts — doon nakaturo ang mga anchor. */
const GROUPS = [
  {
    id: "on-the-water",
    kicker: "On the water",
    title: "Two ways to spend a day on the lake.",
    intro: "The water is the centre of the resort side of the property, and it carries both the fastest and the slowest thing you can do here.",
    items: [
      {
        id: "wakepark",
        name: "Wakepark",
        image: "/experiences/wakepark.webp",
        href: "https://visitcamsur.com/facilities/wakepark",
        description:
          "A cable wake system over open water, with gear and instruction for first-timers as well as riders working on their own lines.",
      },
      {
        id: "lago-del-rey",
        name: "Lago Del Rey",
        image: "/experiences/lago-del-rey.webp",
        href: "https://visitcamsur.com/facilities/lagodelrey",
        description:
          "The resort lake at an easy pace — paddle time, open water, and the best light on the property late in the afternoon.",
      },
    ],
  },
  {
    id: "on-wheels",
    kicker: "On wheels",
    title: "Three tracks, three different speeds.",
    intro: "These sit away from the manicured parts of the property, so none of them are quiet — which is rather the point.",
    items: [
      {
        id: "atv",
        name: "ATV",
        image: "/experiences/atv.webp",
        href: "https://visitcamsur.com/facilities/atv",
        description:
          "Guided all-terrain rides across open ground and rougher trails beyond the landscaped areas.",
      },
      {
        id: "bike-track",
        name: "Bike Track",
        image: "/experiences/bike-track.webp",
        href: "https://visitcamsur.com/facilities/bike-track",
        description: "A dirt circuit with lines that suit a casual lap as comfortably as a faster run.",
      },
      {
        id: "skate-park",
        name: "Skate Park",
        image: "/experiences/skate-park.webp",
        href: "https://visitcamsur.com/facilities/skate-park",
        description: "Concrete bowls and ledges, open to skaters and BMX riders alike.",
      },
    ],
  },
  {
    id: "for-the-family",
    kicker: "For the family",
    title: "Room for the ones not playing golf.",
    intro: "These sit close to the main grounds, so a group can split up for an hour without anyone going far.",
    items: [
      {
        id: "kiddie-park",
        name: "Kiddie Park",
        image: "/experiences/kiddie-park.webp",
        href: "https://visitcamsur.com/facilities/kiddiepark",
        description: "A play area planned for younger guests, within sight of the surrounding grounds.",
      },
      {
        id: "playground-basketball",
        name: "Playground & Outdoor Basketball Court",
        image: "/experiences/playground-basketball.webp",
        href: "https://visitcamsur.com/facilities/playground",
        description:
          "An outdoor court and playground for pick-up games and afternoons that need no plan at all.",
      },
      {
        id: "pickle-ball",
        name: "Pickle Ball",
        image: "/experiences/pickleball.webp",
        description:
          "Courts for the game that takes about ten minutes to learn and considerably longer to stop playing. The CamSur Pickleball Club runs its own booking and schedule.",
        href: "https://pickleball.camsur.com/",
      },
    ],
  },
  {
    id: "unwinding",
    kicker: "Unwinding",
    title: "For the hours in between.",
    intro: "What a day here tends to need at the end of it, or when the weather decides otherwise.",
    items: [
      {
        id: "billiards",
        name: "Billiards",
        image: "/experiences/billiards.webp",
        href: "https://visitcamsur.com/facilities/billiards",
        description: "Indoor tables for the gap between activities, or for an afternoon the rain has rearranged.",
      },
      {
        id: "massage",
        name: "Massage",
        image: "/experiences/massage.webp",
        href: "https://visitcamsur.com/facilities/massage",
        description: "Treatment rooms for recovery after a round, a ride, or a long stretch on the water.",
      },
    ],
  },
] as const;

const GOOD_TO_KNOW = [
  [
    "Say what you want to do before you arrive",
    "Some of these run on a schedule and some need equipment set aside for you. Sending your dates and your group size ahead is the difference between doing everything you planned and doing most of it.",
  ],
  [
    "Ask about requirements when you book",
    "The water and the tracks each carry their own conditions on age, equipment, and supervision. The team will tell you which apply to your group rather than leaving you to find out on arrival.",
  ],
  [
    "Weather moves the schedule, not the day",
    "Wind and rain affect the lake and the tracks first. When something cannot run, the team will move it or swap it for whatever the day allows.",
  ],
] as const;

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

function Group({ group, index }: { group: (typeof GROUPS)[number]; index: number }) {
  return (
    <section id={group.id} className={EDITORIAL_SECTION_ALT}>
      {/* Isang watermark lang sa buong pahina, nasa unang pangkat — kapag
          inulit sa bawat section ay nagiging ingay na siya. */}
      {index === 0 ? <Watermark speed={0.12} /> : null}
      <Shell>
        <EditorialHeading kicker={group.kicker} title={group.title} intro={group.intro} />

        <div className="mt-10 space-y-6 sm:mt-12 sm:space-y-8">
          {group.items.map((item, itemIndex) => (
            /* Ang scroll-mt ang pumipigil sa nakadikit na header na tumakip
               sa hilera kapag dumating dito galing sa mega menu. */
            <div
              key={item.id}
              id={item.id}
              data-reveal="up"
              style={delay(itemIndex * 90)}
              className="group/card grid scroll-mt-28 overflow-hidden rounded-[1.5rem] border border-[#173b2a]/12 bg-[#f8f6ef] shadow-[0_18px_55px_rgba(20,39,29,0.06)] lg:grid-cols-2"
            >
              <div className={`relative min-h-64 overflow-hidden sm:min-h-80 lg:min-h-[22rem] ${itemIndex % 2 ? "lg:order-2" : ""}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 ease-out group-hover/card:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071d13]/30 via-transparent to-transparent" aria-hidden="true" />
              </div>
              <div className={`flex min-w-0 flex-col justify-center p-7 sm:p-10 lg:p-12 ${itemIndex % 2 ? "lg:order-1" : ""}`}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f] xl:text-[11px]">
                  {group.kicker} · {String(itemIndex + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#14271d] sm:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#667269] xl:text-base xl:leading-8">
                  {item.description}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex h-11 w-fit items-center gap-3 rounded-full bg-[#2f644b] px-6 text-[10px] font-bold uppercase tracking-[0.13em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a765a] hover:shadow-[0_12px_30px_rgba(23,59,42,0.16)] xl:text-[11px]"
                >
                  View facility
                  <span aria-hidden="true" className="text-[#e7d18d]">↗</span>
                </a>
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
          title="Before you turn up."
          intro="Three things that make the difference between a full day and a day spent waiting for something to be ready."
        />

        <div className="mt-10 border-t border-[#173b2a]/12">
          {GOOD_TO_KNOW.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 90)}
              className={`grid gap-4 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${
                index ? "border-t border-[#173b2a]/12" : ""
              }`}
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

function ExperiencesCta() {
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
            <Kicker>Plan your days</Kicker>
            <h2
              data-reveal="up"
              style={delay(90)}
              className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl"
            >
              Build the rest of the trip.
            </h2>
          </div>
          <div data-reveal="up" style={delay(180)}>
            <p className="text-sm leading-7 xl:text-base xl:leading-8 text-white/60">
              Tell the team which of these your group wants and on which days. They will put the schedule together
              around your tee times rather than against them.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
              >
                Plan your days
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

export default function ExperiencesDetails() {
  return (
    <>
      <ScrollMotion />
      {GROUPS.map((group, index) => (
        <Group key={group.id} group={group} index={index} />
      ))}
      <GoodToKnow />
      <ExperiencesCta />
    </>
  );
}
