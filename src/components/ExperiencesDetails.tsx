import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import ExperiencesActivities from "@/components/ExperiencesActivities";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Shell, delay } from "@/components/EditorialKit";

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

function Group({ group }: { group: (typeof GROUPS)[number] }) {
  return (
    <>
      <section id={group.id} className={EDITORIAL_SECTION_ALT}>
        <Shell>
          <EditorialHeading kicker={group.kicker} title={group.title} intro={group.intro} size="lg" />
        </Shell>
      </section>

      <ExperiencesActivities kicker={group.kicker} items={group.items} />
    </>
  );
}

function GoodToKnow() {
  return (
    <section id="good-to-know" className={EDITORIAL_SECTION_ALT}>
      <Shell>
        <EditorialHeading
          kicker="Good to know"
          title="Before you turn up."
          intro="Three things that make the difference between a full day and a day spent waiting for something to be ready."
          size="lg"
        />

        <div className="mt-10 border-t border-[#1f3f2e]/12">
          {GOOD_TO_KNOW.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 90)}
              className={`grid gap-4 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${
                index ? "border-t border-[#1f3f2e]/12" : ""
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
    <section className="relative isolate overflow-hidden border-t border-[#1f3f2e]/10 bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
      <Shell>
        <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
          <div>
            <h2
              data-reveal="up"
              style={delay(90)}
              className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl"
            >
              Build the rest of the trip.
            </h2>
          </div>
          <div data-reveal="up" style={delay(180)}>
            <p className="text-sm leading-7 text-[#5d685f] xl:text-base xl:leading-8">
              Tell the team which of these your group wants and on which days. They will put the schedule together
              around your tee times rather than against them.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/plan-your-visit"
                className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
              >
                Plan your days
              </Link>
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
      {GROUPS.map((group) => (
        <Group key={group.id} group={group} />
      ))}
      <GoodToKnow />
      <ExperiencesCta />
    </>
  );
}
