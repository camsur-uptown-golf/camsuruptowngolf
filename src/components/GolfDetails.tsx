import Link from "next/link";
import ScrollMotion from "@/components/ScrollMotion";
import InteractiveCourseMap from "@/components/InteractiveCourseMap";
import { EditorialHeading, Shell } from "@/components/EditorialKit";
import { Container, delay } from "@/components/SectionKit";
import { CLUB_PHONE, CONCEPTS } from "@/lib/site-content";

/**
 * The Golf page.
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - ang bilang at par ng tatlong signature hole
 *  - pangalan ng course designer, kung ianunsyo na
 */

/**
 * Sariling background ng Golf: `#f6f5f5`, ang kulay ng `#the-course` sa
 * itaas, kaya iisa ang tono ng buong pahina.
 *
 * Lokal ito at hindi galing sa EditorialKit dahil `#f7f5ee` ang gamit ng
 * `/visit`, `/events`, `/packages`, at `/accommodations` — kung sa
 * EDITORIAL_SECTION_ALT ito ilalagay ay madadamay silang apat.
 *
 * Kapag binago ito, sabayan ang `#the-course` sa ibaba at ang `dividerFill`
 * ng Golf sa app/[section]/page.tsx — dapat pareho silang tatlo, kung
 * hindi ay may lalabas na tahi sa ilalim ng hero.
 */
const GOLF_SECTION =
  "relative isolate scroll-mt-24 overflow-hidden bg-[#f6f5f5] py-14 sm:py-16";

const PRINCIPLES = [
  [
    "Wide off the tee",
    "Generous landing areas keep the course playable for higher handicaps. The angles, not the width, are what separate a good drive from a safe one.",
  ],
  [
    "Decisions before distance",
    "Length alone will not score here. On most holes the best line into the green is the one that asks for the most from the tee shot.",
  ],
  [
    "Greens you can run a ball into",
    "Open front approaches let you play along the ground when the wind gets up, instead of forcing a high shot every time.",
  ],
  [
    "Hazards you can see",
    "Bunkers and water are visible from the tee on almost every hole, so each choice is an informed one rather than a guess.",
  ],
] as const;

const TEES = [
  { name: "Championship", profile: "Tournament setup", note: "The full-course experience for tournament and scratch play" },
  { name: "Club", profile: "Everyday setup", note: "The balanced choice for low to mid handicaps" },
  { name: "Members", profile: "Member setup", note: "Comfortable carries with the same strategic choices" },
  { name: "Forward", profile: "Comfort setup", note: "Built to keep pace comfortable for every player" },
] as const;

function Overview() {
  return (
    <section id="the-course" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f6f5f5] pb-14 pt-3 sm:pb-16 sm:pt-4 lg:pb-20 lg:pt-5">
      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] items-start gap-10 px-6 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12 lg:px-12 xl:gap-16">
        <div className="max-w-xl lg:pl-4 lg:pt-24 xl:pt-28">
          <p data-reveal="up" className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">
            The landscape plan
          </p>
          <h2
            data-reveal="up"
            style={delay(90)}
            className="mt-4 text-3xl font-medium leading-[0.98] tracking-[-0.05em] text-[#14271d] sm:text-4xl lg:text-5xl"
          >
            Fourteen broad holes. One revised footprint.
          </h2>

          <div className="mt-6 space-y-4 text-sm leading-7 text-[#5d685f] sm:text-base sm:leading-8">
            <p data-reveal="up" style={delay(180)}>
              The course follows the centre parcel shown in the latest planning revision. Its 14 broad fairway corridors
              stay within the documented boundary and form one continuous journey from the opening tee to the home green.
            </p>
            <p data-reveal="up" style={delay(270)}>
              One main lake and one compact pond carry the water strategy without overpowering the land.
            </p>
          </div>

          <dl
            data-reveal="up"
            style={delay(360)}
            className="mt-7 grid grid-cols-3 border-y border-[#173b2a]/12 py-5 font-navigation"
          >
            <div>
              <dt className="text-lg font-semibold text-[#174630]">14</dt>
              <dd className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98782f]">Holes</dd>
            </div>
            <div className="border-l border-[#173b2a]/12 pl-5">
              <dt className="text-lg font-semibold text-[#174630]">54.23</dt>
              <dd className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98782f]">Hectares</dd>
            </div>
            <div className="border-l border-[#173b2a]/12 pl-5">
              <dt className="text-lg font-semibold text-[#174630]">2</dt>
              <dd className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98782f]">Water features</dd>
            </div>
          </dl>
        </div>

        <InteractiveCourseMap />
      </div>
    </section>
  );
}

function DesignPrinciples() {
  return (
    <section id="design" className={GOLF_SECTION}>
      <Shell>
        <EditorialHeading
          kicker="Design"
          title="Four ideas the course keeps returning to."
          intro="None of these are unusual on their own. Holding all four across the whole course is the harder part."
        />

        <div className="mt-10 border-t border-[#173b2a]/12">
          {PRINCIPLES.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 90)}
              className={`grid gap-4 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${index ? "border-t border-[#173b2a]/12" : ""}`}
            >
              <p className="text-[10px] font-bold tracking-[0.14em] text-[#98782f]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-[#667269]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function TeeOptions() {
  return (
    <section id="tees" className={GOLF_SECTION}>
      <Shell>
        <EditorialHeading
          kicker="Tees"
          title="Four ways to play the same course."
          intro="The strategy stays the same from every tee. Only the length of the carry changes, so a group of mixed handicaps can still play together."
        />

        <div className="mt-10 border-t border-[#173b2a]/12">
          {TEES.map((tee, index) => (
            <div
              key={tee.name}
              data-reveal="up"
              style={delay(index * 90)}
              className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-5 ${index ? "border-t border-[#173b2a]/12" : ""}`}
            >
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{tee.name}</h3>
                <p className="mt-1.5 text-sm leading-7 text-[#667269]">{tee.note}</p>
              </div>
              <p className="shrink-0 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#98782f]">
                {tee.profile}
              </p>
            </div>
          ))}
        </div>

        <p data-reveal="up" className="mt-8 text-sm leading-7 text-[#8a938c]">
          Final tee locations will be confirmed when the course routing is measured and approved.
        </p>
      </Shell>
    </section>
  );
}

function ConceptGallery() {
  return (
    <section id="concepts" className={GOLF_SECTION}>
      <Shell>
        <EditorialHeading
          kicker="Course concepts"
          title="Ten views of the plan."
          intro="These aerial concepts translate the landscape plan into realistic course views. Routing, architecture, and landscaping may still be refined as the project develops."
        />

        <div className="mt-10 grid gap-x-14 gap-y-2 sm:grid-cols-2">
          {CONCEPTS.map((concept, index) => (
            <Link
              key={concept.slug}
              href={`/golf/${concept.slug}`}
              data-reveal="up"
              style={delay((index % 2) * 80)}
              className="group grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-4 border-t border-[#173b2a]/12 py-6 transition hover:bg-[#173b2a]/[0.02]"
            >
              <p className="text-[10px] font-bold tracking-[0.14em] text-[#98782f]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="min-w-0 truncate text-lg font-medium tracking-[-0.02em] text-[#14271d] sm:text-xl">
                {concept.title}
              </h3>
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/20 text-[#174630] transition group-hover:border-[#174630] group-hover:bg-[#174630] group-hover:text-white"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Shell>
    </section>
  );
}

function GolfCta() {
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
            Play the course
          </p>
          <h2 data-reveal="up" style={delay(90)} className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl">
            Book your first round.
          </h2>
          <p data-reveal="up" style={delay(180)} className="mt-4 text-sm leading-7 text-[#5d685f]">
            Tell the club when you would like to play and how many are in your group, and the team will take care of
            the tee time, the caddies, and anything else you need.
          </p>

          <div data-reveal="up" style={delay(270)} className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/visit"
              className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
            >
              Visitor information
            </Link>
            <a
              href={CLUB_PHONE.href}
              className="inline-flex h-11 items-center rounded-full border border-white/22 px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-white/85 transition hover:border-[#e7d18d]/60 hover:text-[#f1d98f]"
            >
              {CLUB_PHONE.label}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function GolfDetails() {
  return (
    <>
      <ScrollMotion />
      <Overview />
      <DesignPrinciples />
      <TeeOptions />
      <ConceptGallery />
      <GolfCta />
    </>
  );
}
