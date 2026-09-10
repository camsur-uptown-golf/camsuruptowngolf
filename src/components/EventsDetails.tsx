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
    image: "/golf/hole-18-home.png",
    imageAlt: "The finishing hole and clubhouse beneath Mt. Isarog",
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
    title: "Weddings",
    kicker: "A day with a view",
    description:
      "An intimate celebration framed by tropical gardens, open fairways, and the silhouette of Mt. Isarog behind everything you photograph.",
    image: "/fairway-villas/evening-dining.png",
    imageAlt: "An intimate evening dinner beside the fairways",
    inclusions: ["Indoor and outdoor settings", "Private pre-event spaces", "Curated dining experiences"],
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

function Occasions() {
  return (
    <section id="occasions" className={EDITORIAL_SECTION_ALT}>
      <Shell>
        <EditorialHeading
          kicker="Events at CamSur"
          title="Four ways to gather well."
          intro="Each of these can be tailored around your group, your schedule, and the occasion. Nothing here is a fixed package."
        />

        <div className="mt-10 space-y-12 sm:space-y-14">
          {OCCASIONS.map((occasion, index) => (
            <article
              key={occasion.title}
              className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              {/* Salitan ang panig ng larawan, kaya may ritmo ang pahina sa
                  halip na apat na magkakaparehong hilera. */}
              <div
                data-reveal={index % 2 === 0 ? "left" : "right"}
                className={`relative aspect-[4/3] w-full overflow-hidden bg-[#173a29] ${index % 2 === 0 ? "" : "lg:order-2"}`}
              >
                <Image
                  src={occasion.image}
                  alt={occasion.imageAlt}
                  fill
                  sizes="(max-width: 1023px) calc(100vw - 3rem), 560px"
                  className="object-cover"
                />
              </div>

              <div className={index % 2 === 0 ? "" : "lg:order-1"}>
                <p
                  data-reveal="up"
                  className="font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.24em] text-[#98782f]"
                >
                  {String(index + 1).padStart(2, "0")} · {occasion.kicker}
                </p>
                <h3
                  data-reveal="up"
                  style={delay(90)}
                  className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[#174630]"
                >
                  {occasion.title}
                </h3>
                <p
                  data-reveal="up"
                  style={delay(180)}
                  className="mt-3 max-w-lg text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]"
                >
                  {occasion.description}
                </p>
                <ul data-reveal="up" style={delay(270)} className="mt-7 space-y-3 border-t border-[#173b2a]/12 pt-6">
                  {occasion.inclusions.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-7 xl:text-base xl:leading-8 text-[#4b5a51] sm:text-base">
                      <span className="text-[#2f7a52]">
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
      </Shell>
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

        <div className="mt-10 border-t border-[#173b2a]/12">
          {PLANNING_STEPS.map(([title, description], index) => (
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

function EventsCta() {
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
                href="/#contact"
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
      <HowPlanningWorks />
      <EventsCta />
    </>
  );
}
