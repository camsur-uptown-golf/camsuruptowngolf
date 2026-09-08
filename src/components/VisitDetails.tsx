import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Kicker, Shell, Watermark, delay } from "@/components/EditorialKit";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * Visitor information for the Visit page.
 *
 * Ang mga animation ay deklarado bilang data attributes (data-reveal,
 * data-parallax) at pinapatakbo ng <ScrollMotion />, kaya nananatiling
 * server component ang buong section na ito.
 *
 * TODO (para sa club): kumpirmahin ang mga sumusunod bago i-publish —
 *  - tee times, pace of play, at travel times sa ibaba
 *  - green fees (nakalagay muna ang "On request")
 *  - dress code at etiquette rules
 */

const ROUTES = [
  {
    icon: "plane",
    time: 25,
    unit: "min",
    from: "Naga Airport (Pili)",
    note: "Daily flights from Manila, roughly one hour each way. Taxis and club transfers wait at arrivals.",
  },
  {
    icon: "pin",
    time: 20,
    unit: "min",
    from: "Naga City center",
    note: "Follow the road toward Mt. Isarog and watch for the club gate on your right.",
  },
  {
    icon: "car",
    time: 2,
    unit: "hrs",
    from: "Legazpi City",
    note: "Via the Maharlika Highway. A straightforward drive, best made in daylight.",
  },
] as const;

const ARRIVAL_NOTES = [
  ["parking", "Parking", "Free on-site parking beside the clubhouse for guests and visitors."],
  ["shuttle", "Transfers", "Airport and hotel transfers can be arranged with 24 hours’ notice."],
] as const;

const FEES = [
  { item: "18 holes", detail: "Full round, weekday or weekend rate", price: "On request" },
  { item: "Caddie", detail: "Required for every round, one caddie per bag", price: "On request" },
  { item: "Golf cart", detail: "Optional, two seats per cart", price: "On request" },
  { item: "Club rental", detail: "Full set, right- or left-handed", price: "On request" },
] as const;

const DRESS_WELCOME = [
  "Collared golf shirts, including mock necks",
  "Tailored shorts, trousers, skorts, and golf skirts",
  "Soft-spike or spikeless golf shoes",
] as const;

const DRESS_NOT_PERMITTED = [
  "Denim, cargo shorts, and athletic shorts",
  "Sleeveless shirts for men, and swimwear",
  "Metal spikes anywhere on the course",
] as const;

const ETIQUETTE = [
  ["Keep pace", "Play ready golf and stay with the group ahead of you, not just ahead of the group behind."],
  ["Repair the course", "Fix your pitch marks on the green and rake the bunker before you leave it."],
  ["Mind the greens", "Keep carts and trolleys on the paths within thirty meters of any green."],
] as const;

const FACILITIES = [
  ["Driving range", "Covered and open bays, with range balls available from the pro shop."],
  ["Practice greens", "Separate putting and short-game areas beside the first tee."],
  ["Caddies & carts", "Arranged with your tee time, so there is nothing to sort out on arrival."],
  ["Locker rooms", "Showers and secure lockers for guests playing the course."],
] as const;

const FAQS = [
  {
    question: "Do I need to book a tee time in advance?",
    answer:
      "Yes. Book at least three days ahead for weekends and public holidays. Weekday rounds can usually be arranged on shorter notice, and the club will confirm your time by phone or email.",
  },
  {
    question: "Can I play if I am not a member?",
    answer:
      "Yes. Visitors are welcome throughout the week. Members and their guests have priority on weekend mornings, so visitor tee times on those days are limited.",
  },
  {
    question: "Is there a handicap requirement?",
    answer:
      "No handicap certificate is needed to play. We only ask that first-time and higher-handicap players keep pace with the group in front of them.",
  },
  {
    question: "What happens if play is suspended for weather?",
    answer:
      "If lightning or heavy rain stops play, the siren sounds and all players return to the clubhouse. The club will rebook your round or settle the unplayed holes with you.",
  },
] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1.5 h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1.5 h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

type TravelIconName = "plane" | "pin" | "car" | "parking" | "shuttle";

/** Compact travel pictograms drawn in the same fine-line style as the page. */
function TravelIcon({ name }: { name: TravelIconName }) {
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b49343]/30 bg-[#fbf8ef] text-[#174630]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
        {name === "plane" ? (
          <path d="m3.5 13 7.1-2.1V5.6c0-1 .6-2.6 1.4-2.6s1.4 1.6 1.4 2.6v5.3l7.1 2.1v1.5l-7.1-.9-.5 5 2.2 1.2V21L12 20l-3.1 1v-1.2l2.2-1.2-.5-5-7.1.9V13Z" stroke="currentColor" strokeWidth="1.45" strokeLinejoin="round" />
        ) : name === "pin" ? (
          <>
            <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          </>
        ) : name === "car" ? (
          <>
            <path d="m5 10 1.5-4h11l1.5 4M4 10h16v7H4v-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7 17v2M17 17v2M7 13h.01M17 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : name === "parking" ? (
          <>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 17V7h3a3 3 0 0 1 0 6h-3M10 13h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <path d="M5 5h14v11H5V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 16v2M16 16v2M8 9h8M8 13h.01M16 13h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
      </svg>
    </span>
  );
}

function GettingHere() {
  return (
    <section id="getting-here" className={EDITORIAL_SECTION_ALT}>
      <Watermark speed={0.12} />
      <Shell>
        <EditorialHeading
          kicker="Getting here"
          title="Closer than you think."
          intro="The club sits on the Naga side of Mt. Isarog, within a short drive of the airport, the city, and most hotels in the area."
        />

        <div className="mt-10 border-t border-[#173b2a]/12">
          {ROUTES.map((route, index) => (
            <div
              key={route.from}
              data-reveal="up"
              style={delay(index * 90)}
              className={`grid items-baseline gap-x-8 gap-y-4 py-8 sm:grid-cols-[auto_minmax(0,1fr)_auto] ${index ? "border-t border-[#173b2a]/12" : ""}`}
            >
              <div className="self-center">
                <TravelIcon name={route.icon} />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{route.from}</h3>
                <p className="mt-1.5 text-sm leading-7 text-[#667269]">{route.note}</p>
              </div>
              {/* Ang oras ang pinakamalaking bagay sa hilera — iyon ang
                  unang hinahanap ng bumibisita. */}
              <p className="flex items-baseline gap-2 text-[clamp(2.6rem,4vw,3.75rem)] font-normal leading-none tracking-[-0.04em] text-[#174630] sm:justify-self-end">
                {route.time}
                <span className="font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#98782f]">
                  {route.unit}
                </span>
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-14">
          {ARRIVAL_NOTES.map(([icon, title, description], index) => (
            <div key={title} data-reveal="up" style={delay(index * 110)} className="flex gap-5">
              <TravelIcon name={icon} />
              <div>
                <h3 className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">{title}</h3>
                <p className="mt-2.5 max-w-sm text-sm leading-7 text-[#5d685f]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function GreenFees() {
  return (
    <section
      id="green-fees"
      className={EDITORIAL_SECTION_ALT}
    >
      <div
        data-parallax="-0.1"
        className="pointer-events-none absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-[#c9a54e]/[0.09] blur-3xl"
        aria-hidden="true"
      />
      <Shell>
        <EditorialHeading
          kicker="Green fees"
          title="What a round costs."
          intro="Rates are confirmed when you reserve your tee time. Member rates, group bookings, and stay-and-play packages are quoted separately."
        />

        {/* Puting kard sa ibabaw ng cream na section — anino ang nagbibigay
            ng gilid, dahil masyadong magkalapit ang dalawang kulay para
            umasa sa kaibahan lang nila. */}
        <div className="mt-10 bg-white px-7 py-8 text-[#14271d] shadow-[0_16px_44px_rgba(20,45,32,0.08)] sm:px-12 sm:py-12">
          <p data-reveal="up" className="font-navigation text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">
            Rate card
          </p>
          <dl className="mt-8">
            {FEES.map((fee, index) => (
              <div
                key={fee.item}
                data-reveal="up"
                style={delay(60 + index * 70)}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-[#173b2a]/12 py-6 first:border-t-0 first:pt-0"
              >
                <div className="min-w-0">
                  <dt className="text-xl font-medium tracking-[-0.02em] text-[#174630] sm:text-2xl">{fee.item}</dt>
                  <p className="mt-2 max-w-md text-sm leading-7 text-[#667269]">{fee.detail}</p>
                </div>
                <dd className="shrink-0 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#98782f]">
                  {fee.price}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal="up" className="mt-10">
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center rounded-full bg-[#174630] px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#0f3825]"
          >
            Request current rates
          </Link>
        </div>
      </Shell>
    </section>
  );
}

function ClubGuidelines() {
  return (
    <section id="club-guidelines" className={EDITORIAL_SECTION_ALT}>
      <Shell>
        <EditorialHeading
          kicker="Club guidelines"
          title="Dress the part, play the part."
          intro="Two short lists. One covers what to wear on the course, the other covers how the club expects a round to be played."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div data-reveal="left">
            <h3 className="text-base font-semibold tracking-[-0.02em] text-[#174630]">What to wear</h3>

            <p className="mt-8 font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">
              Welcome on course
            </p>
            <ul className="mt-4 space-y-3">
              {DRESS_WELCOME.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-8 text-[#4b5a51] sm:text-base">
                  <span className="text-[#2f7a52]">
                    <CheckIcon />
                  </span>
                  {rule}
                </li>
              ))}
            </ul>

            <p className="mt-8 font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">
              Not permitted
            </p>
            <ul className="mt-4 space-y-3">
              {DRESS_NOT_PERMITTED.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm leading-8 text-[#4b5a51] sm:text-base">
                  <span className="text-[#a8492f]">
                    <CrossIcon />
                  </span>
                  {rule}
                </li>
              ))}
            </ul>

            <p className="mt-8 border-t border-[#173b2a]/12 pt-6 text-sm leading-7 text-[#667269]">
              Smart casual applies throughout the clubhouse, and caps come off in the dining room.
            </p>
          </div>

          <div data-reveal="right" style={delay(120)}>
            <h3 className="text-base font-semibold tracking-[-0.02em] text-[#174630]">On-course etiquette</h3>
            <div className="mt-8 border-t border-[#173b2a]/12">
              {ETIQUETTE.map(([title, description], index) => (
                <div key={title} className={`grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-6 ${index ? "border-t border-[#173b2a]/12" : ""}`}>
                  <p className="text-[10px] font-bold tracking-[0.14em] text-[#98782f]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h4 className="text-base font-semibold tracking-[-0.01em] text-[#14271d] sm:text-lg">{title}</h4>
                    <p className="mt-2 text-sm leading-7 text-[#5d685f] sm:leading-8">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

function GuestInformation() {
  return (
    <section id="guest-information" className={EDITORIAL_SECTION_ALT}>
      <Shell>
        <EditorialHeading
          kicker="Guest information"
          title="Practice and services."
          intro="Arrive about forty minutes before your tee time to check in, warm up, and meet your caddie without rushing."
        />

        <div className="mt-10 grid gap-x-14 gap-y-2 sm:grid-cols-2">
          {FACILITIES.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 100)}
              className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 border-t border-[#173e2b]/12 py-7"
            >
              <p className="text-[10px] font-bold tracking-[0.14em] text-[#98782f]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#174630]">{title}</h3>
                <p className="mt-1.5 max-w-sm text-sm leading-7 text-[#667269]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function Faqs() {
  return (
    <section id="faqs" className={EDITORIAL_SECTION_ALT}>
      <Shell>
        <EditorialHeading kicker="Before you book" title="Common questions." />

        <div className="mt-14">
          {FAQS.map((faq, index) => (
            <details
              key={faq.question}
              data-reveal="up"
              style={delay(index * 70)}
              className="group border-b border-[#173b2a]/15 first:border-t first:border-[#173b2a]/15"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 text-lg font-medium tracking-[-0.015em] text-[#14271d] transition-colors hover:text-[#174630] sm:text-xl [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/20 text-[#174630] transition duration-300 group-open:rotate-45 group-open:border-[#174630] group-open:bg-[#174630] group-open:text-white"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="max-w-2xl pb-8 pr-14 text-sm leading-8 text-[#5d685f] sm:text-base">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function VisitCta() {
  return (
    <section className="relative isolate overflow-hidden bg-[#071d13] py-14 text-white sm:py-16">
      <div
        data-parallax="0.14"
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#c9a54e]/[0.07] blur-3xl"
        aria-hidden="true"
      />
      <Shell>
        <div className="mx-auto max-w-xl text-center">
          <div>
            <Kicker>Plan your visit</Kicker>
            <h2
              data-reveal="up"
              style={delay(90)}
              className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl"
            >
              Reserve your tee time.
            </h2>
          </div>
          <div data-reveal="up" style={delay(180)}>
            <p className="text-sm leading-7 text-white/60">
              Tell us when you would like to play and how many are in your group. The club team will confirm your time,
              your caddies, and anything else you need.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
              >
                Plan your visit
              </Link>
              <a
                href={CLUB_PHONE.href}
                className="inline-flex h-11 items-center gap-2.5 rounded-full border border-white/22 px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-white/85 transition hover:border-[#e7d18d]/60 hover:text-[#f1d98f]"
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

export default function VisitDetails() {
  return (
    <>
      <ScrollMotion />
      <GettingHere />
      <GreenFees />
      <ClubGuidelines />
      <GuestInformation />
      <Faqs />
      <VisitCta />
    </>
  );
}
