import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import BackToHeroButton from "@/components/BackToHeroButton";
import EventsOccasions from "@/components/EventsOccasions";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Shell, delay } from "@/components/EditorialKit";

/**
 * The Events page, sa parehong editorial na wika ng Visit: malalapad na
 * hanay, malalaking serif na pamagat na nakaangkla sa kaliwa, at hairline
 * na ritmo. Server component ito — data attributes ang nagdadala ng
 * animation, kaya walang kailangang client state.
 */

const OCCASIONS = [
  {
    title: "Golf Tournaments",
    kicker: "Play together",
    description:
      "From friendly invitationals to full-field club events, the day is shaped around the course, the clubhouse, and an awards finish that does not feel rushed.",
    image: "/events/golf-tournaments-full-logo-2026-clean-4k-v3.png",
    imageAlt: "CamSur Uptown Golf Club ball and driver on the first tee at sunset",
    inclusions: ["Tournament-day coordination", "Food and beverage options", "Awards-ready clubhouse spaces"],
  },
  {
    title: "Corporate Events",
    kicker: "Connect beyond the office",
    description:
      "Bring teams and partners together in a course-side setting that moves naturally from focused sessions to the kind of conversation that only happens away from a meeting room.",
    image: "/clubhouse/welcome-hall.jpg",
    imageAlt: "Light-filled clubhouse lounge overlooking the golf course",
    inclusions: ["Flexible gathering spaces", "Group dining possibilities", "Golf and leisure itineraries"],
  },
  {
    title: "Private Celebrations",
    kicker: "Make it personal",
    description:
      "Birthdays, anniversaries, reunions, and milestones, held in a setting built for unhurried time rather than a fixed running order.",
    image: "/clubhouse/concept/rooftop-bar.jpg",
    imageAlt: "The clubhouse rooftop sky bar and gardens overlooking the course",
    inclusions: ["Intimate table settings", "Sunset gathering options", "Personalized menus and flow"],
  },
] as const;

const PLANNING_STEPS = [
  [
    "Tell us the date and the group",
    "Send the date you have in mind and roughly how many people. The team confirms what the course and clubhouse can hold that day.",
  ],
  [
    "Walk the setting",
    "Come and see the spaces in person. Deciding where the day starts and where it ends is much easier standing in the room.",
  ],
  [
    "Shape the day",
    "Golf, dining, and timings are built around your group rather than assembled from a fixed package.",
  ],
  [
    "Hand it over",
    "Once the plan is agreed, the club runs the day, so you can be a guest at your own event.",
  ],
] as const;

/**
 * Ang bilang bilang salita, para sa pamagat.
 *
 * Galing sa `OCCASIONS` at hindi naka-sulat: "Four ways to gather well."
 * ang nakalagay dati samantalang tatlo lang ang nasa listahan.
 */
function occasionCountWord() {
  const words = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];
  return words[OCCASIONS.length] ?? String(OCCASIONS.length);
}

function Occasions() {
  return (
    /* HINDI EDITORIAL_SECTION_ALT: may `overflow-hidden` iyon, at sinisira
       niyon ang `position: sticky` ng mga scrollytelling na larawan. Kaparehong
       dahilan kung bakit sariling walang-overflow na section ang ClubhouseRooms
       sa `/clubhouse`. Pinananatili pa rin ang cream na background. */
    <section id="occasions" className="relative isolate scroll-mt-24 bg-[#f7f5ee] pt-8 sm:pt-10">
      {/* Nakasentrong ulo — contained pa rin sa 1100px na hanay. */}
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        <EditorialHeading
          size="lg"
          kicker=""
          title={`${occasionCountWord()} ways to gather well.`}
          intro="Each of these can be tailored around your group, your schedule, and the occasion. Nothing here is a fixed package."
        />
      </div>

      {/* Ang teksto ay NASA LOOB na ng larawan — buong clubhouse na transition
          (sticky top-0 h-screen, caption na kusang umuusbong sa kaliwang ibaba).
          Tingnan ang EventsOccasions; kaparehong tales ng bilang ng
          ClubhouseRooms. */}
      <div className="mt-8 sm:mt-10">
        <EventsOccasions occasions={OCCASIONS} />
      </div>
    </section>
  );
}
function HowPlanningWorks() {
  return (
    <section
      id="planning"
      className={EDITORIAL_SECTION_ALT}
    >
      <div
        data-parallax="-0.1"
        className="pointer-events-none absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-[#c9a54e]/[0.09] blur-3xl"
        aria-hidden="true"
      />
      <Shell>
        <EditorialHeading
          kicker="How it works"
          title="Four steps, no guesswork."
          intro="The club handles the running order so the day belongs to your group rather than to a schedule someone else wrote."
        />

        <div className="mt-10 border-t border-[#1f3f2e]/12">
          {PLANNING_STEPS.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 90)}
              className={`grid gap-4 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${index ? "border-t border-[#1f3f2e]/12" : ""}`}
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

function EventsCta() {
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
              Tell us the occasion.
            </h2>
          </div>
          <div data-reveal="up" style={delay(180)}>
            <p className="text-sm leading-7 text-[#5d685f] xl:text-base xl:leading-8">
              Send your date, your group size, and the kind of day you have in mind. The club team will come back with
              what the course and clubhouse can do around it.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/plan-your-visit"
                className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
              >
                Inquire about events
              </Link>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

export default function EventsDetails() {
  return (
    <>
      <ScrollMotion />
      <Occasions />
      <EventsCta />
      <BackToHeroButton />
    </>
  );
}
