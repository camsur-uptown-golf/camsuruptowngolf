import Link from "next/link";
import Image from "next/image";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, SECTION, SectionHeading, delay } from "@/components/SectionKit";
import { CLUB_PHONE, CONCEPTS } from "@/lib/site-content";

/**
 * The Golf page.
 *
 * TODO (para sa club): kumpirmahin bago i-publish —
 *  - ang final total site area at lokasyon ng apat na tee
 *  - ang bilang at par ng tatlong signature hole
 *  - pangalan ng course designer, kung ianunsyo na
 */

const AT_A_GLANCE = [
  ["18", "Holes"],
  ["72", "Par"],
  ["80+", "Estimated hectares"],
  ["Mt. Isarog", "Backdrop"],
] as const;

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

/* Ang bawat signature hole ay nakatali sa isang concept render, kaya may
   mapupuntahan ang bisita para makita ang aktwal na disenyo. */
const SIGNATURE_HOLES = [
  {
    number: "04",
    par: "Par 4",
    name: "The Lakeside",
    concept: "concept-04",
    image: "/golf/hole-04-lakeside.png",
    shot: "Wide drone view along the water, showing the fairway bending around the lake",
    description:
      "The water runs the full length of the left side. Play away from it and the green closes off; take on the carry and the approach opens up. The tee shot is the whole hole.",
  },
  {
    number: "08",
    par: "Par 3",
    name: "The Signature Green",
    concept: "concept-08",
    image: "/golf/hole-08-signature-green.png",
    shot: "Green-level view showing the contours and the bold bunkering around the putting surface",
    description:
      "A short hole where the green does the defending. Deep bunkering on both sides and a surface that falls away at the back leave very little room long.",
  },
  {
    number: "18",
    par: "Par 5",
    name: "Home",
    concept: "concept-09",
    image: "/golf/hole-18-home.png",
    shot: "View back up the closing hole toward the clubhouse, ideally in late afternoon light",
    description:
      "Reachable in two for the longer hitters, with the clubhouse in view for the entire second shot. Matches are won and lost on the decision made from the fairway.",
  },
] as const;

const TEES = [
  { name: "Championship", profile: "Tournament setup", note: "The full-course experience for tournament and scratch play" },
  { name: "Club", profile: "Everyday setup", note: "The balanced choice for low to mid handicaps" },
  { name: "Members", profile: "Member setup", note: "Comfortable carries with the same strategic choices" },
  { name: "Forward", profile: "Comfort setup", note: "Built to keep pace comfortable for every player" },
] as const;

function CourseGlance() {
  return (
    <section className="border-b border-[#173b2a]/10 bg-white font-navigation" aria-label="Course at a glance">
      <Container>
        <div className="grid grid-cols-2 py-6 sm:grid-cols-4 sm:py-7">
          {AT_A_GLANCE.map(([value, label], index) => (
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

function Overview() {
  return (
    <section id="the-course" className={SECTION}>
      <Container>
        <SectionHeading
          eyebrow="The course"
          title="Built around what the land already does."
          intro="The routing follows the natural fall of the site toward Mt. Isarog, so the holes sit inside the landscape rather than on top of it."
        />

        <div data-reveal="scale" className="relative mt-10 aspect-[16/9] overflow-hidden bg-[#173a29]">
          <Image
            src="/golf/course-overview.png"
            alt="Aerial concept view of the CamSur Uptown golf course beneath Mt. Isarog"
            fill
            sizes="(max-width: 1023px) calc(100vw - 3rem), 896px"
            className="object-cover"
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl space-y-5 text-sm leading-7 text-[#5d685f]">
          <p data-reveal="up">
            Camarines Sur gives the course two things most sites cannot: room to spread out, and a mountain on the
            horizon that never leaves your eye. The plan uses both. Holes are set wide enough that neighbouring
            fairways stay out of play, and the routing keeps Mt. Isarog in view from the majority of tees.
          </p>
          <p data-reveal="up" style={delay(90)}>
            Water is a real presence rather than decoration. Several holes are shaped around existing low ground,
            which drains the site during the wet months and doubles as the course’s main strategic feature for the
            rest of the year.
          </p>
          <p data-reveal="up" style={delay(180)}>
            The result is a course that reads clearly from the tee. You can see what it is asking of you, and you
            can choose how much of it to take on.
          </p>
        </div>
      </Container>
    </section>
  );
}

function DesignPrinciples() {
  return (
    <section id="design" className={SECTION}>
      <Container>
        <SectionHeading eyebrow="Design" title="Four ideas the course keeps returning to." />

        <div className="mt-10 border-y border-[#173b2a]/12">
          {PRINCIPLES.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="left"
              style={delay(index * 110)}
              className={`grid gap-1.5 py-5 sm:grid-cols-[44px_minmax(0,1fr)] sm:gap-7 ${index ? "border-t border-[#173b2a]/12" : ""}`}
            >
              <p className="text-[10px] font-bold tracking-[0.14em] text-[#98782f]">{String(index + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{title}</h3>
                <p className="mt-1.5 text-sm leading-7 text-[#667269]">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SignatureHoles() {
  return (
    <section id="signature-holes" className={SECTION}>
      <Container>
        <SectionHeading
          eyebrow="Signature holes"
          title="Three you will talk about afterwards."
          intro="Every course has a handful of holes that decide the round. These are the three the design is built to be remembered for."
        />

        <div className="mt-10 space-y-10">
          {SIGNATURE_HOLES.map((hole, index) => (
            <article key={hole.number} data-reveal="up" style={delay(index * 90)}>
              <div className="relative aspect-[16/9] overflow-hidden bg-[#173a29]">
                <Image
                  src={hole.image}
                  alt={`${hole.shot} at CamSur Uptown Golf Club`}
                  fill
                  sizes="(max-width: 1023px) calc(100vw - 3rem), 896px"
                  className="object-cover transition duration-700 hover:scale-[1.02]"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                  Hole {hole.number} · {hole.par}
                </p>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#174630]">{hole.name}</h3>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5d685f]">{hole.description}</p>
              <Link
                href={`/golf/${hole.concept}`}
                className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#174630] transition hover:text-[#0f3825]"
              >
                See the concept render
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TeeOptions() {
  return (
    <section id="tees" className={SECTION}>
      <Container>
        <SectionHeading
          eyebrow="Tees"
          title="Four ways to play the same course."
          intro="The strategy stays the same from every tee. Only the length of the carry changes, so a group of mixed handicaps can still play together."
        />

        <div className="mt-10 border-y border-[#173b2a]/12">
          {TEES.map((tee, index) => (
            <div
              key={tee.name}
              data-reveal="up"
              style={delay(index * 90)}
              className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 ${index ? "border-t border-[#173b2a]/12" : ""}`}
            >
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{tee.name}</h3>
                <p className="mt-1.5 text-sm leading-7 text-[#667269]">{tee.note}</p>
              </div>
              <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-[#98782f]">{tee.profile}</p>
            </div>
          ))}
        </div>

        <p data-reveal="up" className="mt-6 text-center text-xs leading-6 text-[#8a938c]">
          Final tee locations will be confirmed when the course routing is measured and approved.
        </p>
      </Container>
    </section>
  );
}

function ConceptGallery() {
  return (
    <section id="concepts" className={SECTION}>
      <Container>
        <SectionHeading
          eyebrow="Course concepts"
          title="Ten views of the plan."
          intro="These renders show the current design direction. Routing, architecture, and landscaping may still be refined as the project develops."
        />

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {CONCEPTS.map((concept, index) => (
            <Link
              key={concept.slug}
              href={`/golf/${concept.slug}`}
              data-reveal="up"
              style={delay((index % 2) * 80)}
              className="group flex items-center justify-between gap-4 border border-[#173b2a]/12 px-5 py-4 transition hover:border-[#174630]/35 hover:bg-[#173b2a]/[0.02]"
            >
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.14em] text-[#98782f]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 truncate text-sm font-semibold tracking-[-0.01em] text-[#14271d]">{concept.title}</h3>
              </div>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/20 text-[#174630] transition group-hover:border-[#174630] group-hover:bg-[#174630] group-hover:text-white"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </Container>
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
          <p data-reveal="up" style={delay(180)} className="mt-4 text-sm leading-7 text-white/60">
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
      <CourseGlance />
      <Overview />
      <DesignPrinciples />
      <SignatureHoles />
      <TeeOptions />
      <ConceptGallery />
      <GolfCta />
    </>
  );
}
