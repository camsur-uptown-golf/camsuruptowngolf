import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import BackToHeroButton from "@/components/BackToHeroButton";
import ExperiencesActivities from "@/components/ExperiencesActivities";
import { EditorialHeading, Shell, delay } from "@/components/EditorialKit";

/**
 * The Experiences page — ang mga hinahandog sa labas ng golf course.
 *
 * Isang tuloy-tuloy na listahan ang sampung pasilidad, nasa eksaktong
 * pagkakasunod na hiniling ng club. Dating nakapangkat sa apat na tema
 * (Unwinding, On the water, On wheels, For the family); inalis ang mga
 * pangkat dahil ang ninanais na pagkakasunod ay tumatawid sa mga tema, kaya
 * hindi na magkatugma ang dalawa.
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - kumpletong listahan ng pasilidad at kung alin ang bukas sa bisita
 *  - oras ng bukas, bayad, at kung alin ang kailangang i-book nang maaga
 *  - hinihinging edad, waiver, o gamit sa Wakeboarding, ATV, at Bike Track
 */

/* Iisang hanay, inaayos nang pataas-pababa ayon sa ibinigay na pagkakasunod.
   May sariling `id` ang bawat hilera bilang in-page anchor. Hiwalay na nakaturo
   sa external na facility pages ang mega menu sa site-content.ts, kaya hindi
   konektado ang order dito at ang order doon. */
const ACTIVITIES = [
  {
    id: "wakepark",
    name: "Wakeboarding",
    image: "/experiences/wakepark-riders.webp",
    href: "https://visitcamsur.com/facilities/wakepark",
    description:
      "A cable wake system over open water, with gear and instruction for first-timers as well as riders working on their own lines.",
  },
  {
    id: "pickle-ball",
    name: "Pickle Ball",
    image: "/experiences/pickleball-indoor.webp",
    href: "https://pickleball.camsur.com/",
    description:
      "Courts for the game that takes about ten minutes to learn and considerably longer to stop playing. Covered, well-lit courts keep play going through midday heat and afternoon rain, with room for doubles, drills, and friendly rivalries. The CamSur Pickleball Club runs its own booking and schedule.",
  },
  {
    id: "playground-basketball",
    name: "Outdoor/Indoor Basketball Court",
    image: "/experiences/basketball-arena.webp",
    href: "https://visitcamsur.com/facilities/playground",
    description:
      "Outdoor and indoor courts for pick-up games and afternoons that need no plan at all. Shoot around between rounds, gather the group for a full-court run, or catch a local league night when the stands fill up and the whole arena gets loud.",
  },
  {
    id: "massage",
    name: "Massage",
    image: "/experiences/massage-spa.webp",
    href: "https://visitcamsur.com/facilities/massage",
    description:
      "Treatment rooms for recovery after a round, a ride, or a long stretch on the water. Unhurried sessions to ease tired legs and shoulders, with the quiet of the resort just beyond the door.",
  },
  {
    id: "atv",
    name: "ATV",
    image: "/experiences/atv-ride.webp",
    href: "https://visitcamsur.com/facilities/atv",
    description:
      "Guided all-terrain rides that begin on open ground and work out to the rougher trails past the landscaped areas — climbs, descents, and enough loose dirt to put the quiet corners of the property well behind you.",
  },
  {
    id: "lago-del-rey",
    name: "Lago Del Rey",
    image: "/experiences/lago-del-rey-paddle.webp",
    href: "https://visitcamsur.com/facilities/lagodelrey",
    description:
      "The resort lake at an easy pace — paddle time, open water, and the best light on the property late in the afternoon.",
  },
  {
    id: "bike-track",
    name: "Pump Track",
    image: "/experiences/pump-track-night.webp",
    href: "https://visitcamsur.com/facilities/bike-track",
    description: "A dirt circuit with lines that suit a casual lap as comfortably as a faster run.",
  },
  {
    id: "skate-park",
    name: "Skate Park",
    image: "/experiences/skate-park-sunset.webp",
    href: "https://visitcamsur.com/facilities/skate-park",
    description: "Concrete bowls and ledges, open to skaters and BMX riders alike.",
  },
  {
    id: "kiddie-park",
    name: "Kiddie Park",
    image: "/experiences/kiddie-park-playground.webp",
    href: "https://visitcamsur.com/facilities/kiddiepark",
    description: "A play area planned for younger guests, within sight of the surrounding grounds.",
  },
  {
    id: "billiards",
    name: "Billiards",
    image: "/experiences/billiards-lounge.webp",
    href: "https://visitcamsur.com/facilities/billiards",
    description:
      "Indoor tables for the gap between activities, or for an afternoon the rain has rearranged. An open-air lounge with garden views, cues on the wall, and space for the whole group to rack up, settle a friendly bet, and unwind after the day's round.",
  },
] as const;

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

      {/* Katulad ng EDITORIAL_SECTION_ALT pero pinaliit ang TOP padding lang
          (pt-4 sm:pt-6 kapalit ng py-14 sm:py-16) para mabawasan ang gap sa
          pagitan ng breadcrumb at ng heading. Lokal lang ito sa Experiences —
          hindi hinahawakan ang shared na constant para di maapektuhan ang
          ibang pahina. Pareho pa rin ang bottom padding. */}
      <section className="relative isolate scroll-mt-24 overflow-hidden bg-[#f7f5ee] pb-14 pt-4 sm:pb-16 sm:pt-6">
        <Shell>
          <EditorialHeading
            title="Come find your adventure."
            intro="Take on wakeboarding, pickle ball, basketball, and ATV trails, or unwind with a massage and the resort's quieter corners — there's something here for everyone."
            size="lg"
          />
        </Shell>
      </section>

      {/* Normal-flow full-screen panels: walang sticky stage o scroll-scrub.
          Minsan lang pumapasok ang caption at nananatiling visible. */}
      <ExperiencesActivities kicker="Experience" items={ACTIVITIES} />

      <ExperiencesCta />
      <BackToHeroButton />
    </>
  );
}
