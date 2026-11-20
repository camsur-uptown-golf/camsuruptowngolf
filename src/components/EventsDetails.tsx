import ScrollMotion from "@/components/ScrollMotion";
import BackToHeroButton from "@/components/BackToHeroButton";
import EventsOccasions from "@/components/EventsOccasions";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Shell, delay } from "@/components/EditorialKit";
import CtaPanel from "@/components/CtaPanel";

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
    image: "/events/golf-tournaments-full-logo-2027.png",
    imageAlt: "CamSur Uptown Golf ball and driver on the first tee at sunset",
    inclusions: ["Tournament-day coordination", "Food and beverage options", "Awards-ready clubhouse spaces"],
  },
  {
    title: "Corporate Events",
    kicker: "Connect beyond the office",
    description:
      "Bring teams and partners together in a course-side setting that moves naturally from focused sessions to the kind of conversation that only happens away from a meeting room.",
    image: "/events/corporate-events-4k.webp",
    imageAlt: "Members’ Lounge concept: two guests greeting each other before a meeting",
    inclusions: ["Flexible gathering spaces", "Group dining possibilities", "Golf and leisure itineraries"],
  },
  {
    title: "Private Celebrations",
    kicker: "Make it personal",
    description:
      "Birthdays, anniversaries, reunions, and milestones, held in a setting built for unhurried time rather than a fixed running order.",
    image: "/events/private-celebrations-4k.webp",
    imageAlt: "Sky bar concept: a couple celebrating at the rooftop bar at dusk",
    inclusions: ["Intimate table settings", "Sunset gathering options", "Personalised menus and flow"],
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

/* Iisang gilid ng pahina: kapareho ng Breadcrumbs, Footer, at /clubhouse. */
const CONTAINER = "relative mx-auto w-full max-w-7xl px-6 lg:px-8";
const EYEBROW = "font-navigation text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm";
const SECTION_TITLE = "mt-3 font-display text-[clamp(2.5rem,4.6vw,4.625rem)] font-medium leading-[0.98] tracking-[-0.045em]";

function Occasions() {
  return (
    /* Normal-flow na mga panel ang mga occasion. Walang sticky stage o
       scroll-scrub; minsan lang pumapasok ang caption at nananatiling visible. */
    <section id="occasions" className="relative isolate scroll-mt-24 bg-[#f3ede1] pt-4 sm:pt-6">
      <div className={`${CONTAINER} grid gap-5 pb-10 sm:pb-14 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-12`}>
        <div>
          <p data-reveal="up" className={`${EYEBROW} text-[#7d6224]`}>
            Events
          </p>
          <h2 data-reveal="up" style={delay(90)} className={`${SECTION_TITLE} text-[#17251e]`}>
            {`${occasionCountWord()} ways to gather well.`}
          </h2>
        </div>
        <p data-reveal="up" style={delay(180)} className="max-w-xl text-base leading-8 text-[#3f4c45] lg:justify-self-end lg:pb-2">
          Each of these can be tailored around your group, your schedule, and the occasion. Nothing here is a fixed
          package.
        </p>
      </div>

      <EventsOccasions occasions={OCCASIONS} />
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
        className="pointer-events-none absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-[#c5a35c]/[0.09] blur-3xl"
        aria-hidden="true"
      />
      <Shell>
        <EditorialHeading
          kicker="How it works"
          title="Four steps, no guesswork."
          intro="The club handles the running order so the day belongs to your group rather than to a schedule someone else wrote."
        />

        <div className="mt-10 border-t border-[#03321b]/12">
          {PLANNING_STEPS.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 90)}
              className={`grid gap-4 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${index ? "border-t border-[#03321b]/12" : ""}`}
            >
              <p className="text-[11px] xl:text-[11px] font-bold tracking-[0.14em] text-[#7d6224]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#03321b]">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 xl:text-base xl:leading-8 text-[#667269]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

/* Pangwakas na CTA: berdeng panel sa loob ng cream, hindi buong banda —
   madilim-berde rin ang Footer na kasunod. Kapareho ng dulo ng /clubhouse. */
function EventsCta() {
  return (
    <section className="relative isolate bg-[#f3ede1] py-16 text-[#03321b] sm:py-20 lg:py-24">
      {/* Mas malapad kaysa sa ibang bahagi ng pahina (`max-w-[1600px]`),
          kapareho ng panel sa /packages. */}
      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <CtaPanel
          reveal
          eyebrow="Plan an event"
          title="Tell us the occasion."
          text="Send your date, your group size, and the kind of day you have in mind. The club team will come back with what the course and clubhouse can do around it."
          primary={{ label: "Enquire about events", href: "/plan-your-visit" }}
        />
      </div>
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
