import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, SECTION, SectionHeading } from "@/components/SectionKit";
import { HOLE_PROFILES } from "@/lib/course-holes";
import { COURSE_PAGES } from "@/lib/site-content";

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

const COUNT_WORDS: Record<number, string> = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
};

const ROUTING_STUDIES = {
  "course-01": {
    number: 1,
    src: "/golf/course-01-routing-vertical-v4.png",
    alt: "Top-to-bottom photorealistic aerial visualization of tree-lined Hole 1 with a white route line from the tee to the green",
    direction: "top to bottom",
    orientation: "portrait",
  },
  "course-02": {
    number: 2,
    src: "/golf/course-02-routing-realistic-v2.png",
    alt: "Left-to-right photorealistic aerial visualization of Hole 2 and portions of its neighboring fairways with a white route line from the tee to the green",
    direction: "left to right",
    orientation: "landscape",
  },
} as const;

export function generateStaticParams() {
  return COURSE_PAGES.map((course) => ({ concept: course.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ concept: string }> }): Promise<Metadata> {
  const { concept: slug } = await params;
  const course = COURSE_PAGES.find((item) => item.slug === slug);
  return course ? { title: `${course.title} | CamSur Uptown Golf Club`, description: course.description } : {};
}

export default async function ConceptPage({ params }: { params: Promise<{ concept: string }> }) {
  const { concept: slug } = await params;
  const index = COURSE_PAGES.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const concept = COURSE_PAGES[index];
  const previous = COURSE_PAGES[(index - 1 + COURSE_PAGES.length) % COURSE_PAGES.length];
  const next = COURSE_PAGES[(index + 1) % COURSE_PAGES.length];
  const coverageTitle = `${COUNT_WORDS[concept.holes.length] ?? concept.holes.length} ${concept.holes.length === 1 ? "hole" : "holes"}. One connected landscape.`;
  const scorecard = HOLE_PROFILES[concept.holes[0]];
  const routingStudy = ROUTING_STUDIES[slug as keyof typeof ROUTING_STUDIES];

  return (
    <>
      <main>
        <ScrollMotion />
        <section id="top" className="relative isolate min-h-[660px] overflow-hidden bg-[#071d13] text-white">
          <Image
            src={concept.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,17,11,0.88)_0%,rgba(3,17,11,0.58)_43%,rgba(3,17,11,0.12)_100%),linear-gradient(0deg,rgba(3,17,11,0.8)_0%,transparent_64%)]" />
          {/* Dapat eksaktong katumbas ng #aerial-study sa ibaba — kahit
              bahagyang pagkakaiba ay lumilitaw bilang tahi sa dugtungan. */}
          <FairwayDivider fill="#f7f5ee" />
          <div className="mx-auto flex min-h-[660px] max-w-7xl items-center justify-center px-6 py-24 lg:px-8">
            <div className="w-full text-center">
              <div className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-[#f1d98f] sm:text-3xl">
                <span>Course {String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="aerial-study" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f7f5ee] pb-14 pt-0 text-[#14271d] sm:pb-16 sm:pt-0">
          <Container>
            <div className="relative mx-auto mb-5 h-[150px] w-28 overflow-hidden sm:mb-7 sm:h-[185px] sm:w-36" aria-hidden="true">
              <Image
                src="/camsur-uptown-logo.png"
                alt=""
                width={1536}
                height={2048}
                sizes="(max-width: 639px) 190px, 225px"
                className="absolute left-1/2 top-0 h-auto w-[190px] max-w-none -translate-x-1/2 sm:w-[225px]"
              />
            </div>
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#98782f] sm:text-[11px]">
                Aerial routing study · {String(index + 1).padStart(2, "0")} / 18
              </p>
              <h1 className="mx-auto mt-4 max-w-4xl text-balance text-[clamp(2rem,4.2vw,4.5rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#14271d]">
                {concept.title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-sm font-medium leading-7 text-[#536058] sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                {concept.description}
              </p>
              <Link
                href="/#contact"
                className="mt-7 inline-flex h-11 min-w-[170px] items-center justify-center rounded-full bg-[#2f644b] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a] sm:h-12 sm:min-w-[190px] sm:text-[11px]"
              >
                Plan your round
              </Link>
            </div>

            <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 border-y border-[#173b2a]/10 bg-white px-6 py-9 text-[#14271d] sm:mt-16 sm:px-10 sm:py-11">
              <dl className="mx-auto grid max-w-6xl grid-cols-3 text-center">
                {[
                  { label: "Yards", value: scorecard.yards.toLocaleString() },
                  { label: "Par", value: String(scorecard.par) },
                  { label: "Opening year", value: "" },
                ].map(({ label, value }, statIndex) => (
                  <div
                    key={label}
                    className={`flex min-h-20 flex-col items-center justify-start px-3 sm:min-h-24 sm:px-8 ${statIndex ? "border-l border-[#173b2a]/15" : ""}`}
                  >
                    <dt className="font-navigation text-[10px] font-semibold uppercase tracking-[0.13em] text-[#4f5d55] sm:text-xs">
                      {label}
                    </dt>
                    {value ? (
                      <dd className="mt-4 font-display text-4xl font-medium leading-none tracking-[-0.04em] text-[#14271d] sm:text-5xl">
                        {value}
                      </dd>
                    ) : (
                      <dd className="sr-only">To be confirmed</dd>
                    )}
                  </div>
                ))}
              </dl>
            </div>

          </Container>
        </section>

        {routingStudy && (
          <section id={`hole-${routingStudy.number}-routing`} className="border-t border-[#173b2a]/10 bg-[#fbfaf7] py-16 text-[#14271d] sm:py-20 lg:py-24">
            <Container>
              <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.7fr)] lg:gap-16">
                <figure className={`mx-auto w-full overflow-hidden border border-[#173b2a]/12 bg-white shadow-[0_20px_55px_rgba(20,45,32,0.08)] ${routingStudy.orientation === "portrait" ? "max-w-[620px]" : "max-w-[760px]"}`}>
                  <div className={`relative w-full ${routingStudy.orientation === "portrait" ? "aspect-[2/3]" : "aspect-[3/2]"}`}>
                    <Image
                      src={routingStudy.src}
                      alt={routingStudy.alt}
                      fill
                      sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) 760px, 54vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="border-t border-[#173b2a]/10 px-5 py-3 font-navigation text-[9px] font-bold uppercase tracking-[0.18em] text-[#98782f] sm:px-6 sm:text-[10px]">
                    Tee to green · Follow the white route line from {routingStudy.direction}
                  </figcaption>
                </figure>

                <div className="lg:border-l lg:border-[#173b2a]/30 lg:pl-12">
                  <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#667169]">
                    Course
                  </p>
                  <h2 className="mt-2 font-display text-[clamp(4.5rem,9vw,8rem)] font-medium leading-[0.82] tracking-[-0.065em]">
                    No. {routingStudy.number}
                  </h2>
                  <p className="mt-7 text-xl font-semibold tracking-[-0.025em] text-[#284536]">{scorecard.name}</p>
                  <p className="mt-3 text-sm leading-7 text-[#667169] sm:text-base sm:leading-8">{scorecard.description}</p>

                  <dl className="mt-7 grid grid-cols-3 border-y border-[#173b2a]/12 py-5 text-center font-navigation">
                    <div>
                      <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#98782f]">Par</dt>
                      <dd className="mt-2 font-display text-3xl font-semibold">{scorecard.par}</dd>
                    </div>
                    <div className="border-l border-[#173b2a]/12">
                      <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#98782f]">Metres</dt>
                      <dd className="mt-2 font-display text-3xl font-semibold">{scorecard.blueMetres}</dd>
                    </div>
                    <div className="border-l border-[#173b2a]/12">
                      <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#98782f]">Yards</dt>
                      <dd className="mt-2 font-display text-3xl font-semibold">{scorecard.yards}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Container>
          </section>
        )}

        <section className={SECTION}>
          <Container>
            <SectionHeading eyebrow="Course coverage" title={coverageTitle} intro={concept.description} />
            <div className="mt-10 flex flex-wrap justify-center gap-2" aria-label="Hole included in this course view">
              {concept.holes.map((hole) => (
                <span key={hole} className="inline-flex h-9 items-center rounded-full border border-[#174630]/18 bg-[#f7f5ee] px-4 font-navigation text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.12em] text-[#174630]">
                  Hole {hole}
                </span>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-xl text-center">
              <p className="text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]">
                The aerial view shows the full footprint of this course zone, making its relative length, width,
                water exposure, and hole positions easy to read.
              </p>
              <Link href="/#contact" className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-[#2f644b] px-6 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a]">Plan your round →</Link>
            </div>
          </Container>
        </section>


        {slug === "course-06" && (
          <section className="relative isolate overflow-hidden border-t border-[#173b2a]/10 bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
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
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#071d13]/55 to-transparent" />
                      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white sm:p-6">
                        <span className="text-sm font-semibold tracking-[-0.02em]">{angle.label}</span>
                        <span className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#f1d98f]">
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

        <nav aria-label="Course navigation" className="grid bg-[#f3f0e7] sm:grid-cols-2">
          <Link href={`/golf/${previous.slug}`} className="group relative min-h-72 overflow-hidden border-b border-white/15 sm:border-b-0 sm:border-r">
            <Image src={previous.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#071d13]/65 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-10">
              <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">← Previous course</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{previous.title}</p>
            </div>
          </Link>
          <Link href={`/golf/${next.slug}`} className="group relative min-h-72 overflow-hidden">
            <Image src={next.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#071d13]/65 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col items-end justify-end p-8 text-right text-white sm:p-10">
              <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">Next course →</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{next.title}</p>
            </div>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
