import ScrollMotion from "@/components/ScrollMotion";
import ConceptCarousel from "@/components/ConceptCarousel";
import CourseRoutingMap from "@/components/CourseRoutingMap";
import { EditorialHeading, Shell } from "@/components/EditorialKit";
import { delay } from "@/components/SectionKit";
import CtaPanel from "@/components/CtaPanel";

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

/* MAS MALAPAD KAYSA SA IBANG PAHINA (`max-w-[1600px]`, makitid na gutter):
   hindi nagsasayang ng puwang sa kaliwa at kanan — kapareho ng /packages. */
const WIDE = "relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8";

/* COMPACT NA OVERVIEW. Dati ay isang makitid na nakasentrong hanay — malaking
   shield, pamagat, dalawang talata, at tatlong bilang, patong-patong — kaya
   halos isang buong screen ito at bakante ang magkabilang gilid. Ngayon ay
   dalawang hanay sa buong lapad: pamagat sa kaliwa, teksto at mga bilang sa
   kanan. Inalis ang shield: palamuti lang iyon, at nasa header at footer na. */
function Overview() {
  return (
    <section id="the-course" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f3ede1] pb-10 pt-4 sm:pb-12 sm:pt-6 lg:pb-14">
      <div className={`${WIDE} z-10 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16 xl:gap-24`}>
        <div>
          <p data-reveal="up" className="font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#7d6224] sm:text-sm">
            The landscape plan
          </p>
          <h2
            data-reveal="up"
            style={delay(90)}
            className="mt-3 max-w-3xl text-balance font-display text-[clamp(2.5rem,4.6vw,4.625rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]"
          >
            Eighteen broad holes. One revised footprint.
          </h2>
        </div>

        <div>
          <div className="max-w-2xl space-y-3 text-[12px] leading-6 text-[#3f4c45] lg:text-[15px] lg:leading-7">
            <p data-reveal="up" style={delay(180)}>
              Its 18 broad fairway corridors follow the centre parcel of the site, forming one continuous journey from
              the opening tee to the home green, with open views of Mt. Isarog.
            </p>
            <p data-reveal="up" style={delay(270)}>
              Seven water features shape the strategy while keeping the landscape open.
            </p>
          </div>

          <dl data-reveal="up" style={delay(360)} className="mt-6 grid max-w-2xl grid-cols-3 border-y border-[#03321b]/12 py-4 font-navigation">
            <div>
              <dt className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-[#17251e]">18</dt>
              <dd className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7d6224] xl:text-[11px]">Holes</dd>
            </div>
            <div className="border-l border-[#03321b]/12 pl-5">
              <dt className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-[#17251e]">54.23</dt>
              <dd className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7d6224] xl:text-[11px]">Hectares</dd>
            </div>
            <div className="border-l border-[#03321b]/12 pl-5">
              <dt className="font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-medium leading-none tracking-[-0.03em] text-[#17251e]">7</dt>
              <dd className="mt-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#7d6224] xl:text-[11px]">Water features</dd>
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


/* Pangwakas na CTA: ang shared na berdeng panel (CtaPanel), sa loob ng cream
   para hindi dumikit sa Footer. Pangunahin ang online na tee-time booking;
   nananatili ang Plan your visit para sa mga grupo at event na kailangang
   kausapin. */
function GolfCta() {
  return (
    <section className="relative isolate bg-[#f3ede1] py-12 text-[#03321b] sm:py-16">
      <div className={WIDE}>
        <CtaPanel
          reveal
          eyebrow="Tee times"
          title="Book your first round."
          text="Choose your date and tee time online and secure it with a downpayment — or tell the club what you have in mind and the team will arrange it for you."
          primary={{ label: "Reserve your round", href: "/golf/book" }}
          secondary={{ label: "Plan your visit", href: "/plan-your-visit" }}
        />
      </div>
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
