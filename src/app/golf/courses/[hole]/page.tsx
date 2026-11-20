import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import QuickQuestion from "@/components/QuickQuestion";
import Scorecard from "@/components/Scorecard";
import ScrollMotion from "@/components/ScrollMotion";
import HoleFlyover from "@/components/HoleFlyover";
import GolfDivider from "@/components/GolfDivider";
import HoleNavVideo from "@/components/HoleNavVideo";
import { Container, SectionHeading, delay } from "@/components/SectionKit";
import { HOLE_PROFILES } from "@/lib/course-holes";
import { COURSE_PAGES } from "@/lib/site-content";

/** "Hole No. 4 · Upper Green" — sa metadata at sa prev/next na card. */
function holeLabel(course: (typeof COURSE_PAGES)[number]) {
  const hole = course.holes[0];
  return `Hole No. ${hole} · ${HOLE_PROFILES[hole].name}`;
}

export const dynamicParams = false;

const CONCEPT_04_ANGLES = [
  {
    src: "/course-concepts/concept-04-alt-01.png",
    alt: "Lakeside golf course viewed by drone from across the water",
    label: "Across the lake",
  },
  {
    src: "/course-concepts/concept-04-alt-02.png",
    alt: "Lakeside golf course viewed from the tee beside the water",
    label: "From the tee",
  },
  {
    src: "/course-concepts/concept-04-alt-03.png",
    alt: "Elevated side view of the lakeside golf course and winding fairways",
    label: "Above the fairway",
  },
  {
    src: "/course-concepts/concept-04-alt-04.png",
    alt: "Golf green and sculpted bunker beside the lake and city skyline",
    label: "Beside the green",
  },
] as const;

export function generateStaticParams() {
  return COURSE_PAGES.map((course) => ({ hole: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ hole: string }> }): Promise<Metadata> {
  const { hole: slug } = await params;
  const course = COURSE_PAGES.find((item) => item.slug === slug);
  /* Dating pare-pareho ang pamagat ng lahat ng 18 pahina dahil iisang
     editorial headline ang `course.title`. Bawat butas ay sarili na niya. */
  return course ? { title: `${holeLabel(course)} | CamSur Uptown Golf`, description: course.description } : {};
}

export default async function HolePage({ params }: { params: Promise<{ hole: string }> }) {
  const { hole: slug } = await params;
  const index = COURSE_PAGES.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const concept = COURSE_PAGES[index];
  const previous = COURSE_PAGES[(index - 1 + COURSE_PAGES.length) % COURSE_PAGES.length];
  const next = COURSE_PAGES[(index + 1) % COURSE_PAGES.length];
  const scorecard = HOLE_PROFILES[concept.holes[0]];

  return (
    <>
      <main>
        {/* replay: umuulit ang reveal pababa't pataas — walang dead air. */}
        <ScrollMotion replay />
        {/* 620px (dating 660px): wala nang title sa hero, larawan na lang —
            kita ang lapag, at kaunting langit sa itaas. */}
        <section id="top" className="relative isolate min-h-[460px] overflow-hidden bg-[#071d13] text-white sm:min-h-[620px]">
          <Image
            src={concept.image}
            alt=""
            fill
            quality={90}
            priority
            sizes="100vw"
            /* Nakatutok sa pinakaibaba ng larawan: lapag ang nakikita —
               fairway, green at tubig — halos walang langit. */
            className="-z-20 object-cover object-bottom"
          />
          {/* Walang madilim na overlay (gradient/shadow) sa ibabaw ng larawan:
              buo at maliwanag ang aerial ng butas sa lahat ng 18 pahina. */}
          {/* Dapat eksaktong katumbas ng #aerial-study sa ibaba — kahit
              bahagyang pagkakaiba ay lumilitaw bilang tahi sa dugtungan. */}
          <FairwayDivider fill="#f3ede1" low />
          {/* Walang title sa hero — larawan lang. Ang "HOLE / No. N / pangalan"
              sa ibaba ang h1 ng pahina. Nananatili ang taas ng hero. */}
          <div className="min-h-[460px] sm:min-h-[620px]" aria-hidden="true" />
        </section>

        {/* Iisang row sa desktop: nasa kaliwa ang pangalan, paliwanag at stats
            ng butas; nasa kanan ang flyover. Malapad (`max-w-[1920px]`, makitid
            na gutter) — kapareho ng /golf/book — kaya maliit lang ang gap sa
            kaliwa't kanan. Sa cellphone, magkasunod: teksto muna, saka ang video. */}
        <section id="aerial-study" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f3ede1] text-[#03321b]">
          {/* Nasa iisang container ang breadcrumb at ang row, kaya magkapantay
              sila sa kaliwa at walang hiwalay na banda ng puwang sa pagitan. */}
          <div className="mx-auto w-full max-w-[1920px] px-4 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
            {/* Sa parehong 1280px na column ng video at scorecard, kaya
                magkapantay ang kaliwang gilid nila. */}
            <div className="mx-auto w-full max-w-7xl">
              <Breadcrumbs inline />
            </div>
            {/* Kaparehong anyo ng info sa ilalim ng carousel ng homepage:
                kaliwa (nakahanay sa kanan) ang eyebrow at pangalan, guhit sa
                eksaktong gitna, kanan ang paliwanag. Sa cellphone, nakagitna
                at magkasunod. */}
            <div className="mx-auto mt-6 grid max-w-7xl gap-5 text-center lg:mt-8 lg:grid-cols-2 lg:gap-0 lg:text-left">
              <div className="lg:flex lg:flex-col lg:items-end lg:justify-center lg:border-r lg:border-[#03321b]/35 lg:pr-20 lg:text-right">
                {/* Visual hierarchy, tatlong antas:
                    1. "No. N" — pinakamalaki, pinakamadilim: ang unang nakikita.
                    2. Pangalan ng butas — katamtaman, mas malambot na kulay.
                    3. "HOLE" — maliit na gintong label na may maluwag na tracking
                       (#d1af58, kapareho ng "Scorecard" na eyebrow sa ibaba);
                       nagpapakilala lang, hindi nakikipagkumpitensya. */}
                <div className="flex flex-col items-center text-center">
                  <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.36em] text-[#d1af58] [margin-right:-0.36em] lg:text-[12px]">
                    Hole
                  </p>
                  <h1 className="mt-2 font-display font-medium">
                    <span className="block text-[clamp(2.75rem,3.8vw,4rem)] leading-[0.85] tracking-[-0.05em] text-[#03321b] lining-nums">
                      No. {index + 1}
                    </span>
                    <span className="mt-3 block whitespace-nowrap text-[clamp(19px,1.35vw,23px)] leading-tight tracking-[-0.01em] text-[#536058]">
                      {scorecard.name}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="lg:flex lg:items-center lg:pl-20">
                {/* 368px: dumudulo ang unang linya sa "the club", at hanggang apat na
                    linya lang ang bawat paliwanag (16px). Kaparehong laki ng
                    header ng scorecard sa ibaba. */}
                <p className="mx-auto max-w-[23rem] text-sm font-normal leading-7 text-[#536058] sm:text-base lg:mx-0">
                  {concept.description}
                </p>
              </div>
            </div>

            {/* Flyover sa ilalim ng pangalan at paliwanag — malapad, may gap sa
                kaliwa't kanan (max-w-7xl). */}
            <div className="mx-auto mt-10 w-full max-w-7xl lg:mt-12">
              <HoleFlyover hole={concept.holes[0]} name={scorecard.name} flyover={concept.flyover} />
            </div>
          </div>
        </section>

        {/* Golf divider sa pagitan ng flyover at ng scorecard. Walang sariling
            padding: ang pb ng #aerial-study at ang pt ng scorecard (parehong
            14/16) ang nagbibigay ng pantay na espasyo sa itaas at ibaba. */}
        <div className="bg-[#f3ede1]">
          <GolfDivider maxWidth="max-w-7xl" />
        </div>

        {/* Kaparehong cream ng aerial-study sa itaas at ng call-back form sa
            ibaba. Dating `#edf0e8` — banayad na sage iyon, pero sapat ang
            pagkakaiba para magmukhang ibang banda sa gitna ng pahina.

            Walang `border-t`: ang GolfDivider sa itaas na ang hangganan. */}
        <section className="relative isolate scroll-mt-24 overflow-hidden bg-[#f3ede1] py-14 sm:py-16">
          <Container>
            {/* Dating inuulit lang nito ang parehong description na nasa
                itaas, kasama ang "Hole 1" na chip na hindi na kailangan sa
                pahinang iisang butas lang naman. Buong scorecard na ngayon,
                at naka-highlight ang butas ng pahinang ito. */}
            <SectionHeading
              size="lg"
              eyebrow="Scorecard"
              title="The full eighteen."
              intro="All tee colours are shown, with confirmed yardages displayed for the Black tees only. This hole is highlighted across the card."
            />
          </Container>

          {/* Kapantay ng flyover sa itaas: parehong gutter (px-4 / lg:px-8) at
              parehong 1280px na column (max-w-7xl) — kaya magkahanay ang
              kaliwang gilid ng plano at ang kanang gilid ng talahanayan sa
              mga gilid ng video. */}
          <div data-reveal="up" className="mt-10 w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">
              <Scorecard
                currentHole={concept.holes[0]}
                photoSrc={concept.routingImage}
                photoOrientation={concept.routingOrientation}
                photoWidth={concept.routingWidth}
                photoHeight={concept.routingHeight}
              />
            </div>
          </div>
        </section>


        {slug === "no-6" && (
          <section className="relative isolate overflow-hidden border-t border-[#03321b]/10 bg-[#f3ede1] py-14 text-[#03321b] sm:py-16">
            <Container>
              <SectionHeading eyebrow="Lakeside course views" title="See the lakeside course from every angle." />

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {CONCEPT_04_ANGLES.map((angle, angleIndex) => (
                  <figure key={angle.src} className="group">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#d9ded8] sm:rounded-[2rem]">
                      <Image
                        src={angle.src}
                        alt={angle.alt}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 3rem), (max-width: 1279px) calc(50vw - 2.5rem), 608px"
                        className="object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071d13]/55 to-transparent" />
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white sm:p-6">
                        <span className="text-sm font-semibold tracking-[-0.02em]">{angle.label}</span>
                        <span className="text-[11px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#efd99b]">
                          {String(angleIndex + 1).padStart(2, "0")} / 04
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Nakaraan / susunod na butas — dalawang card sa parehong 1280px na
            column ng video at scorecard (parehong gutter), may 16px na pagitan,
            bilugang kanto (12px) gaya ng video. Flyover ng butas ang laman
            (HoleNavVideo); madilim lang sa ibaba para mabasa ang teksto. */}
        {/* Buong lapad ng screen, walang gap sa kaliwa't kanan; 2px na cream na
            guhit lang sa pagitan ng dalawang card. 16:9 ang card (aspect-video),
            kaya buo ang flyover — walang putol sa itaas o gilid. */}
        <nav aria-label="Course navigation" className="bg-[#f3ede1] pb-14 sm:pb-16">
          <div className="grid gap-[2px] sm:grid-cols-2">
            <Link
              href={`/golf/courses/${previous.slug}`}
              className="group relative isolate block aspect-video overflow-hidden bg-[#071d13]"
            >
              <Image
                src={previous.image}
                alt=""
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className="-z-20 object-cover"
              />
              <HoleNavVideo src={previous.flyover.clear} poster={previous.image} />
              {/* Madilim lang sa ibaba (sa likod ng teksto) — kita ang larawan. */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071d13]/85 via-[#071d13]/25 to-transparent" />
              {/* Kapantay ng kaliwang gilid ng scorecard/plano sa itaas (parehong
                  1280px na column at gutter). */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:py-10 sm:pl-[max(1.5rem,calc((100vw-80rem)/2))] sm:pr-10 lg:pl-[max(2rem,calc((100vw-80rem)/2))]">
                <span className="flex items-center gap-2 font-navigation text-[11px] font-bold uppercase tracking-[0.36em] text-[#e1c56e] lg:text-[12px]">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:-translate-x-1" fill="none" aria-hidden="true"><path d="m15 5-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Previous hole
                  
                </span>
                {/* Tatlong hanay: label → "No. N" (malaki) → pangalan (mas maliit). */}
                <span className="mt-2 font-display text-[clamp(2.75rem,3.8vw,4rem)] font-medium leading-[0.85] tracking-[-0.05em] lining-nums">
                  No. {previous.holes[0]}
                </span>
                <span className="mt-3 font-display text-[clamp(19px,1.35vw,23px)] font-medium leading-tight tracking-[-0.01em] text-white/85">
                  {HOLE_PROFILES[previous.holes[0]].name}
                </span>
              </div>
            </Link>
            <Link
              href={`/golf/courses/${next.slug}`}
              className="group relative isolate block aspect-video overflow-hidden bg-[#071d13]"
            >
              <Image
                src={next.image}
                alt=""
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className="-z-20 object-cover"
              />
              <HoleNavVideo src={next.flyover.clear} poster={next.image} />
              {/* Madilim lang sa ibaba (sa likod ng teksto) — kita ang larawan. */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071d13]/85 via-[#071d13]/25 to-transparent" />
              {/* Kapantay ng kanang gilid ng talahanayan sa itaas. */}
              <div className="absolute inset-0 flex flex-col items-end justify-end p-6 text-right text-white sm:py-10 sm:pl-10 sm:pr-[max(1.5rem,calc((100vw-80rem)/2))] lg:pr-[max(2rem,calc((100vw-80rem)/2))]">
                <span className="flex items-center gap-2 font-navigation text-[11px] font-bold uppercase tracking-[0.36em] text-[#e1c56e] lg:text-[12px]">
                  
                  Next hole
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition group-hover:translate-x-1" fill="none" aria-hidden="true"><path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                {/* Tatlong hanay: label → "No. N" (malaki) → pangalan (mas maliit). */}
                <span className="mt-2 font-display text-[clamp(2.75rem,3.8vw,4rem)] font-medium leading-[0.85] tracking-[-0.05em] lining-nums">
                  No. {next.holes[0]}
                </span>
                <span className="mt-3 font-display text-[clamp(19px,1.35vw,23px)] font-medium leading-tight tracking-[-0.01em] text-white/85">
                  {HOLE_PROFILES[next.holes[0]].name}
                </span>
              </div>
            </Link>
          </div>
        </nav>

        <section id="request-call-back" className="scroll-mt-24 bg-[#f3ede1] py-14 text-[#03321b] sm:py-16">
          <Container>
            {/* Tanong lang ang dala ng bisita rito, kaya maikling form (QuickQuestion)
                — hindi ang buong RequestCallback ng /plan-your-visit. */}
            <SectionHeading
              size="lg"
              eyebrow="Plan your round"
              title="Have a question about the course?"
              intro="Ask the club anything about the course and you will get an answer within 48 hours."
            />
            <div className="mt-10">
              <QuickQuestion context={holeLabel(concept)} />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
