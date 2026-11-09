import Link from "next/link";
import Image from "next/image";
import ScrollMotion from "@/components/ScrollMotion";
import ConceptCarousel from "@/components/ConceptCarousel";
import CourseRoutingMap from "@/components/CourseRoutingMap";
import { EditorialHeading, Shell } from "@/components/EditorialKit";
import { Container, delay } from "@/components/SectionKit";

/**
 * The Golf page.
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - ang bilang at par ng tatlong signature hole
 *  - pangalan ng course designer, kung ianunsyo na
 */

/**
 * Sariling background ng Golf: `#f3ede1`, ang kulay ng `#the-course` sa
 * itaas, kaya iisa ang tono ng buong pahina.
 *
 * Lokal ito at hindi galing sa EditorialKit dahil `#f3ede1` ang gamit ng
 * `/visit`, `/events`, `/packages`, at `/accommodations` — kung sa
 * EDITORIAL_SECTION_ALT ito ilalagay ay madadamay silang apat.
 *
 * Kapag binago ito, sabayan ang `#the-course` sa ibaba at ang `dividerFill`
 * ng Golf sa app/[section]/page.tsx — dapat pareho silang tatlo, kung
 * hindi ay may lalabas na tahi sa ilalim ng hero.
 */
const GOLF_SECTION =
  "relative isolate scroll-mt-24 overflow-hidden bg-[#f3ede1] py-14 sm:py-16";

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
    <section id="the-course" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f3ede1] pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 sm:px-10 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <div data-reveal="up" className="relative mx-auto mb-8 h-48 w-60 overflow-hidden sm:mb-10">
            <Image
              src="/branding/camsur-uptown-golf-shield.png"
              alt="CamSur Uptown Golf shield"
              width={770}
              height={1076}
              sizes="140px"
              className="mx-auto h-full w-auto"
            />
          </div>
          <p data-reveal="up" className="font-navigation text-[11px] font-bold uppercase tracking-[0.26em] text-[#7d6224] sm:text-[11px]">
            The landscape plan
          </p>
          <h2
            data-reveal="up"
            style={delay(90)}
            className="mx-auto mt-5 max-w-3xl text-balance text-[clamp(2.5rem,5vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.055em] text-[#03321b]"
          >
            Eighteen broad holes. One revised footprint.
          </h2>

          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-sm leading-7 text-[#5d685f] sm:text-base sm:leading-8 xl:text-base xl:leading-8">
            <p data-reveal="up" style={delay(180)}>
              Its 18 broad fairway corridors follow the centre parcel of the site, forming one continuous journey from
              the opening tee to the home green, with open views of Mt. Isarog.
            </p>
            <p data-reveal="up" style={delay(270)}>
              Seven water features shape the strategy while keeping the landscape open.
            </p>
          </div>

          <dl
            data-reveal="up"
            style={delay(360)}
            className="mx-auto mt-8 grid max-w-3xl grid-cols-3 border-y border-[#03321b]/12 py-5 font-navigation"
          >
            <div>
              <dt className="font-display text-xl font-semibold text-[#2e5126]">18</dt>
              <dd className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7d6224] xl:text-[11px]">Holes</dd>
            </div>
            <div className="border-l border-[#03321b]/12 pl-5">
              <dt className="font-display text-xl font-semibold text-[#2e5126]">54.23</dt>
              <dd className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7d6224] xl:text-[11px]">Hectares</dd>
            </div>
            <div className="border-l border-[#03321b]/12 pl-5">
              <dt className="font-display text-xl font-semibold text-[#2e5126]">7</dt>
              <dd className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7d6224] xl:text-[11px]">Water features</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function DesignPrinciples() {
  return (
    <section id="design" className={GOLF_SECTION}>
    </section>
  );
}


function GolfCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-[#03321b]/10 bg-[#f3ede1] py-14 text-[#03321b] sm:py-16">
      <Container>
        <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
          <h2 data-reveal="up" style={delay(90)} className="text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl">
            Book your first round.
          </h2>
          <p data-reveal="up" style={delay(180)} className="mt-4 text-sm leading-7 text-[#5d685f] xl:text-base xl:leading-8">
            Choose your date and tee time online and secure it with a downpayment — or tell the club what you have in
            mind and the team will arrange it for you.
          </p>

          <div data-reveal="up" style={delay(270)} className="mt-7 flex flex-wrap justify-center gap-3">
            {/* Pangunahin: ang online na tee-time booking. Nananatili ang
                Plan your visit para sa mga grupo at event na kailangang kausapin. */}
            <Link
              href="/golf/book"
              className="inline-flex h-11 items-center rounded-full bg-[#e2c77a] px-6 text-[11px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-[#0a2619] transition hover:-translate-y-0.5 hover:bg-[#efd99b]"
            >
              Reserve your round
            </Link>
            <Link
              href="/plan-your-visit"
              className="inline-flex h-11 items-center rounded-full border border-[#2e5126]/30 px-6 text-[11px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-[#2e5126] transition hover:border-[#2e5126] hover:bg-[#2e5126] hover:text-white"
            >
              Plan your visit
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function GolfDetails() {
  return (
    <>
      {/* replay: umuulit ang reveal pababa't pataas — walang dead air. */}
      <ScrollMotion replay />
      <Overview />
      <CourseRoutingMap />
      <ConceptCarousel />
      {/* Wala na rito ang PackagesCarousel ("Plan your golf getaway"): dalawang
          magkasunod na CTA ang dulo ng pahina noon. Booking ang pangunahing
          aksyon sa /golf; nasa home at /plan-your-visit pa rin ang packages. */}
      <GolfCta />
    </>
  );
}
