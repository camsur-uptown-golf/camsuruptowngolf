import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Kicker, Shell, delay } from "@/components/EditorialKit";
import { CLUB_PHONE } from "@/lib/site-content";

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
    image: "/clubhouse/rooftop-garden.jpg",
    imageAlt: "Friends celebrating over dinner on the clubhouse rooftop",
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
    <section id="occasions" className={EDITORIAL_SECTION_ALT}>
      {/* Mas malapad kaysa sa `Shell`: ang larawan ang pangunahing laman
          dito, at dating 560px lang ito sa dalawang haligi. Buong lapad na
          ngayon at nasa 1100px, kaya hindi na kailangan ng lightbox. */}
      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        <EditorialHeading
          kicker="Events at CamSur"
          title={`${occasionCountWord()} ways to gather well.`}
          intro="Each of these can be tailored around your group, your schedule, and the occasion. Nothing here is a fixed package."
        />

        <div className="mt-12 space-y-16 sm:mt-14 sm:space-y-24">
          {OCCASIONS.map((occasion, index) => (
            <article key={occasion.title} className="scroll-mt-28">
              <div data-reveal="up" className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-[#1f3f2e] sm:aspect-[16/9]">
                <Image
                  src={occasion.image}
                  alt={occasion.imageAlt}
                  fill
                  sizes="(max-width: 1151px) calc(100vw - 3rem), 1104px"
                  className="object-cover"
                />
              </div>

              <div className="mt-7 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
                <div>
                  <p
                    data-reveal="up"
                    className="font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#98782f]"
                  >
                    {String(index + 1).padStart(2, "0")} · {occasion.kicker}
                  </p>
                  <h3
                    data-reveal="up"
                    style={delay(90)}
                    className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-[#265136] sm:text-3xl"
                  >
                    {occasion.title}
                  </h3>
                  <p
                    data-reveal="up"
                    style={delay(180)}
                    className="mt-4 max-w-xl text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]"
                  >
                    {occasion.description}
                  </p>
                </div>

                <ul data-reveal="up" style={delay(270)} className="space-y-3 self-start border-t border-[#1f3f2e]/12 pt-6 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                  {occasion.inclusions.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 xl:text-base xl:leading-8 text-[#4b5a51] sm:text-base">
                      <span className="text-[#265136]">
                        <CheckIcon />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
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
    <section className="relative isolate overflow-hidden border-t border-[#1f3f2e]/10 bg-[#1f3f2e] py-14 text-white sm:py-16">
      <div
        data-parallax="0.14"
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#c9a54e]/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <Shell>
        <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
          <div>
            <Kicker>Plan an event</Kicker>
            <h2
              data-reveal="up"
              style={delay(90)}
              className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl"
            >
              Tell us the occasion.
            </h2>
          </div>
          <div data-reveal="up" style={delay(180)}>
            <p className="text-sm leading-7 xl:text-base xl:leading-8 text-white/60">
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

export default function EventsDetails() {
  return (
    <>
      <ScrollMotion />
      <Occasions />
      <EventsCta />
    </>
  );
}
