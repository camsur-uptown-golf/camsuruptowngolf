import Image from "next/image";
import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, SECTION, SectionHeading, delay } from "@/components/SectionKit";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * Visitor information for the Visit page.
 *
 * Ang mga animation ay deklarado bilang data attributes (data-reveal,
 * data-parallax, data-count) at pinapatakbo ng <ScrollMotion />, kaya
 * nananatiling server component ang buong section na ito.
 *
 * TODO (para sa club): kumpirmahin ang mga sumusunod bago i-publish —
 *  - tee times, pace of play, at travel times sa ibaba
 *  - green fees (nakalagay muna ang "On request")
 *  - dress code at etiquette rules
 */

const TEE_SHEET = [
  ["6:00 AM", "First tee time"],
  ["3:30 PM", "Last tee time"],
  ["4h 30m", "Pace of play"],
  ["Required", "Caddie per round"],
] as const;

const ROUTES = [
  {
    time: 25,
    unit: "min",
    from: "Naga Airport (Pili)",
    note: "Daily flights from Manila, roughly one hour each way. Taxis and club transfers wait at arrivals.",
  },
  {
    time: 20,
    unit: "min",
    from: "Naga City center",
    note: "Follow the road toward Mt. Isarog and watch for the club gate on your right.",
  },
  {
    time: 2,
    unit: "hrs",
    from: "Legazpi City",
    note: "Via the Maharlika Highway. A straightforward drive, best made in daylight.",
  },
] as const;

const ARRIVAL_NOTES = [
  ["Parking", "Free on-site parking beside the clubhouse for guests and visitors."],
  ["Transfers", "Airport and hotel transfers can be arranged with 24 hours’ notice."],
] as const;

const FEES = [
  { item: "18 holes", detail: "Full round, weekday or weekend rate", price: "On request" },
  { item: "9 holes", detail: "Afternoon tee times, subject to availability", price: "On request" },
  { item: "Caddie", detail: "Required for every round, one caddie per bag", price: "On request" },
  { item: "Golf cart", detail: "Optional, two seats per cart", price: "On request" },
  { item: "Club rental", detail: "Full set, right- or left-handed", price: "On request" },
  { item: "Practice balls", detail: "Per bucket at the driving range", price: "On request" },
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
  ["Play quietly", "Phones stay on silent, and slower groups let the players behind them through."],
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
    question: "Are caddies required?",
    answer:
      "Yes. Every round is played with a caddie, one for each bag. Your caddie is assigned when you check in at the starter’s desk.",
  },
  {
    question: "Is there a handicap requirement?",
    answer:
      "No handicap certificate is needed to play. We only ask that first-time and higher-handicap players keep pace with the group in front of them.",
  },
  {
    question: "Can I rent clubs and shoes?",
    answer:
      "Yes. Full rental sets in both right- and left-handed configurations are available at the pro shop. Reserve them together with your tee time.",
  },
  {
    question: "What happens if play is suspended for weather?",
    answer:
      "If lightning or heavy rain stops play, the siren sounds and all players return to the clubhouse. The club will rebook your round or settle the unplayed holes with you.",
  },
] as const;

/** Faint club crest that drifts against the scroll. */
function Watermark({ speed }: { speed: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
      <div data-parallax={speed} className="relative w-[360px] opacity-[0.045] sm:w-[440px]">
        <Image src="/camsur-uptown-logo.png" alt="" width={720} height={958} className="h-auto w-full grayscale" />
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-1 h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
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

function TeeSheet() {
  return (
    <section className="border-b border-[#173b2a]/10 bg-white font-navigation" aria-label="Tee sheet essentials">
      <Container>
        <div className="grid grid-cols-2 py-6 sm:grid-cols-4 sm:py-7">
          {TEE_SHEET.map(([value, label], index) => (
            <div
              key={label}
              data-reveal="up"
              style={delay(index * 90)}
              className={`px-1 py-2.5 text-center sm:py-1 ${index % 2 ? "border-l border-[#173b2a]/10" : ""} ${index > 1 ? "border-t border-[#173b2a]/10 sm:border-t-0" : ""} ${index > 0 ? "sm:border-l sm:border-[#173b2a]/10" : ""}`}
            >
              <p className="text-base font-semibold leading-none tracking-[-0.02em] text-[#174630]">{value}</p>
              <p className="mt-2 text-[9px] font-bold uppercase leading-tight tracking-[0.16em] text-[#98782f]">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function GettingHere() {
  return (
    <section id="getting-here" className={SECTION}>
      <Watermark speed={0.12} />
      <Container>
        <SectionHeading
          eyebrow="Getting here"
          title="Closer than you think."
          intro="The club sits on the Naga side of Mt. Isarog, within a short drive of the airport, the city, and most hotels in the area."
        />

        <div className="mt-10 border-y border-[#173b2a]/12">
          {ROUTES.map((route, index) => (
            <div
              key={route.from}
              data-reveal="left"
              style={delay(index * 130)}
              className={`grid gap-1.5 py-5 sm:grid-cols-[86px_minmax(0,1fr)] sm:gap-7 ${index ? "border-t border-[#173b2a]/12" : ""}`}
            >
              <p className="flex items-baseline gap-1.5 text-xl font-semibold leading-none tracking-[-0.03em] text-[#174630]">
                <span data-count={route.time}>{route.time}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#98782f]">{route.unit}</span>
              </p>
              <div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{route.from}</h3>
                <p className="mt-1.5 text-sm leading-7 text-[#667269]">{route.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-8">
          {ARRIVAL_NOTES.map(([title, description], index) => (
            <div key={title} data-reveal="up" style={delay(index * 120)}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#5d685f]">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function GreenFees() {
  return (
    <section
      id="green-fees"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-[#173b2a]/10 bg-[#f7f5ee] py-14 sm:py-16"
    >
      <div
        data-parallax="-0.1"
        className="pointer-events-none absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-[#c9a54e]/[0.09] blur-3xl"
        aria-hidden="true"
      />
      <Container>
        <SectionHeading
          eyebrow="Green fees"
          title="What a round costs."
          intro="Rates are confirmed when you reserve your tee time. Member rates, group bookings, and stay-and-play packages are quoted separately."
        />

        <div className="mt-10 bg-[#0d2419] p-6 text-white sm:p-8">
          <p data-reveal="up" className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d8b65b]">
            Rate card
          </p>
          <dl className="mt-5">
            {FEES.map((fee, index) => (
              <div
                key={fee.item}
                data-reveal="up"
                style={delay(80 + index * 70)}
                className="flex items-baseline justify-between gap-5 border-t border-white/10 py-4 first:border-t-0 first:pt-0"
              >
                <div className="min-w-0">
                  <dt className="text-base font-semibold tracking-[-0.02em]">{fee.item}</dt>
                  <p className="mt-1 text-[13px] leading-6 text-white/50">{fee.detail}</p>
                </div>
                <dd className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-[#e7d18d]">{fee.price}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal="up" className="mt-8 text-center">
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#174630] px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#0f3825]"
          >
            Request current rates
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ClubGuidelines() {
  return (
    <section id="club-guidelines" className={SECTION}>
      <Container>
        <SectionHeading eyebrow="Club guidelines" title="Dress the part, play the part." />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div data-reveal="left" className="border border-[#173b2a]/12 bg-white p-6">
            <h3 className="text-base font-semibold tracking-[-0.02em] text-[#174630]">What to wear</h3>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">Welcome on course</p>
            <ul className="mt-3 space-y-2">
              {DRESS_WELCOME.map((rule) => (
                <li key={rule} className="flex gap-2.5 text-sm leading-7 text-[#4b5a51]">
                  <span className="text-[#2f7a52]">
                    <CheckIcon />
                  </span>
                  {rule}
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">Not permitted</p>
            <ul className="mt-3 space-y-2">
              {DRESS_NOT_PERMITTED.map((rule) => (
                <li key={rule} className="flex gap-2.5 text-sm leading-7 text-[#4b5a51]">
                  <span className="text-[#a8492f]">
                    <CrossIcon />
                  </span>
                  {rule}
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-[#173b2a]/12 pt-5 text-sm leading-7 text-[#667269]">
              Smart casual applies throughout the clubhouse, and caps come off in the dining room.
            </p>
          </div>

          <div data-reveal="right" style={delay(120)} className="border border-[#173b2a]/12 bg-white p-6">
            <h3 className="text-base font-semibold tracking-[-0.02em] text-[#174630]">On-course etiquette</h3>
            <div className="mt-6">
              {ETIQUETTE.map(([title, description], index) => (
                <div key={title} className={`flex gap-4 py-4 ${index ? "border-t border-[#173b2a]/12" : "pt-0"}`}>
                  <p className="w-5 shrink-0 text-[10px] font-bold tracking-[0.12em] text-[#98782f]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h4 className="text-sm font-semibold tracking-[-0.01em] text-[#14271d]">{title}</h4>
                    <p className="mt-1.5 text-sm leading-7 text-[#5d685f]">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function GuestInformation() {
  return (
    <section id="guest-information" className={SECTION}>
      <Watermark speed={-0.09} />
      <Container>
        <SectionHeading
          eyebrow="Guest information"
          title="Practice and services."
          intro="Arrive about forty minutes before your tee time to check in, warm up, and meet your caddie without rushing."
        />

        <div className="mt-10 grid border-y border-[#173e2b]/12 sm:grid-cols-2">
          {FACILITIES.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 100)}
              className={`py-5 sm:px-6 ${index ? "border-t border-[#173e2b]/12" : ""} ${index % 2 ? "sm:border-l sm:border-[#173e2b]/12" : "sm:pl-0"} ${index === 1 ? "sm:border-t-0" : ""}`}
            >
              <h3 className="text-base font-semibold tracking-[-0.02em] text-[#174630]">{title}</h3>
              <p className="mt-1.5 text-sm leading-7 text-[#667269]">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Faqs() {
  return (
    <section id="faqs" className={SECTION}>
      <Container>
        <SectionHeading eyebrow="Before you book" title="Common questions." />

        <div className="mt-10">
          {FAQS.map((faq, index) => (
            <details
              key={faq.question}
              data-reveal="up"
              style={delay(index * 70)}
              className="group border-b border-[#173b2a]/15 first:border-t first:border-[#173b2a]/15"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm font-semibold tracking-[-0.01em] text-[#14271d] transition-colors hover:text-[#174630] [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/20 text-[#174630] transition duration-300 group-open:rotate-45 group-open:border-[#174630] group-open:bg-[#174630] group-open:text-white"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-5 pr-12 text-sm leading-7 text-[#5d685f]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function VisitCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-[#173b2a]/10 bg-[#071d13] py-14 text-white sm:py-16">
      <div
        data-parallax="0.14"
        className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-80 w-80 rounded-full bg-[#c9a54e]/[0.06] blur-3xl"
        aria-hidden="true"
      />
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p data-reveal="up" style={delay(0)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b]">
            Plan your visit
          </p>
          <h2 data-reveal="up" style={delay(90)} className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
            Reserve your tee time.
          </h2>
          <p data-reveal="up" style={delay(180)} className="mt-4 text-sm leading-7 text-white/60">
            Tell us when you would like to play and how many are in your group. The club team will confirm your time, your caddies, and anything else you need.
          </p>

          <div data-reveal="up" style={delay(270)} className="mt-7 flex flex-wrap justify-center gap-3">
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
      </Container>
    </section>
  );
}

export default function VisitDetails() {
  return (
    <>
      <ScrollMotion />
      <TeeSheet />
      <GettingHere />
      <GreenFees />
      <ClubGuidelines />
      <GuestInformation />
      <Faqs />
      <VisitCta />
    </>
  );
}
