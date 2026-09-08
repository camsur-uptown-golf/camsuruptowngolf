import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, SECTION, SectionHeading } from "@/components/SectionKit";
import { HOLE_PROFILES, metresToYards } from "@/lib/course-holes";
import { CONCEPTS } from "@/lib/site-content";

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

function formatHoleList(holes: readonly number[]) {
  if (holes.length === 1) return `Hole ${holes[0]}`;
  return `Holes ${holes.slice(0, -1).join(", ")}, and ${holes.at(-1)}`;
}

export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ concept: concept.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ concept: string }> }): Promise<Metadata> {
  const { concept: slug } = await params;
  const concept = CONCEPTS.find((item) => item.slug === slug);
  return concept ? { title: `${concept.title} | CamSur Uptown Golf Club`, description: concept.description } : {};
}

export default async function ConceptPage({ params }: { params: Promise<{ concept: string }> }) {
  const { concept: slug } = await params;
  const index = CONCEPTS.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const concept = CONCEPTS[index];
  const previous = CONCEPTS[(index - 1 + CONCEPTS.length) % CONCEPTS.length];
  const next = CONCEPTS[(index + 1) % CONCEPTS.length];
  const coverageTitle = `${COUNT_WORDS[concept.holes.length] ?? concept.holes.length} ${concept.holes.length === 1 ? "hole" : "holes"}. One connected landscape.`;
  const coverageLabel = formatHoleList(concept.holes);
  const holeProfiles = concept.holes.map((hole) => ({ hole, ...HOLE_PROFILES[hole] }));

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
          <div className="mx-auto flex min-h-[660px] max-w-7xl items-end px-6 pb-28 pt-64 sm:pb-36 lg:px-8 lg:pb-44">
            <div className="w-full">
              <div className="font-navigation text-[13px] font-bold uppercase tracking-[0.2em] text-[#f1d98f] sm:text-[15px]">
                <span>Course concept {String(index + 1).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </section>

        <section id="aerial-study" className="relative isolate scroll-mt-24 overflow-hidden bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
          <Container>
            <SectionHeading
              eyebrow={`Aerial routing study · ${String(index + 1).padStart(2, "0")} / 10`}
              title={concept.title}
              intro={concept.description}
            />

            <figure className="mt-10">
              <div className="relative aspect-[6/5] overflow-hidden rounded-[1.5rem] bg-[#173326] shadow-[0_30px_80px_rgba(18,39,29,0.16)] sm:rounded-[2rem]">
                <Image
                  src={concept.image}
                  alt={`${concept.title} top-down aerial concept showing ${coverageLabel}`}
                  fill
                  priority
                  sizes="(max-width: 1279px) 100vw, 1280px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#071d13]/10 via-transparent to-[#071d13]/28" />
                <div className="absolute inset-0" aria-label={`${coverageLabel} shown in this concept`}>
                  {concept.markers.map((marker) => (
                    <div
                      key={marker.hole}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{ left: marker.left, top: marker.top }}
                      aria-label={`Hole ${marker.hole} white flag`}
                    >
                      <span className="relative flex h-11 w-11 items-center justify-center drop-shadow-[0_4px_5px_rgba(0,0,0,0.5)] sm:h-14 sm:w-14">
                        <svg viewBox="0 0 42 52" aria-hidden="true" className="h-10 w-9 overflow-visible sm:h-12 sm:w-11">
                          <path d="M8 49V3" fill="none" stroke="white" strokeLinecap="round" strokeWidth="2.4" />
                          <path d="M10 4H38L32 12L38 20H10V4Z" fill="white" stroke="rgba(20,39,29,0.28)" strokeLinejoin="round" strokeWidth="0.8" />
                          <text
                            x="23.5"
                            y="14.8"
                            fill="#173326"
                            fontFamily="var(--font-montserrat)"
                            fontSize={marker.hole > 9 ? "7" : "9"}
                            fontWeight="700"
                            textAnchor="middle"
                          >
                            {marker.hole}
                          </text>
                          <ellipse cx="8" cy="49" rx="5" ry="1.8" fill="rgba(255,255,255,0.8)" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
                <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#071d13]/82 px-4 py-2 font-navigation text-[9px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:text-[10px]">
                  {coverageLabel}
                </figcaption>
              </div>
            </figure>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {holeProfiles.map((profile) => (
                <article key={profile.hole} className="border border-[#173326]/10 bg-white p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-navigation text-[8px] font-bold uppercase tracking-[0.18em] text-[#98782f]">Hole {profile.hole} · Par {profile.par}</p>
                      <h3 className="mt-1.5 text-xl font-semibold tracking-[-0.035em]">{profile.name}</h3>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xl font-semibold leading-none">{profile.blueMetres} m</p>
                      <p className="mt-1 text-[9px] text-[#748078]">{metresToYards(profile.blueMetres)} yd · blue</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#657169]">{profile.description}</p>
                  <div className="mt-4 flex items-center gap-2 border-t border-[#173326]/8 pt-3 font-navigation text-[8px] font-bold uppercase tracking-[0.12em] text-[#4d5d54]">
                    <span className="h-2 w-2 rounded-full bg-[#2c8054]" />
                    Forward tee {profile.forwardMetres} m · {metresToYards(profile.forwardMetres)} yd
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center text-[10px] leading-5 text-[#7b847f]">
              Distances shown are design-stage concept measurements and remain subject to final course surveying and approval.
            </p>
          </Container>
        </section>

        <section className={SECTION}>
          <Container>
            <SectionHeading eyebrow="Course coverage" title={coverageTitle} intro={concept.description} />
            <div className="mt-10 flex flex-wrap justify-center gap-2" aria-label="Holes included in this concept">
              {concept.holes.map((hole) => (
                <span key={hole} className="inline-flex h-9 items-center rounded-full border border-[#174630]/18 bg-[#f7f5ee] px-4 font-navigation text-[9px] font-bold uppercase tracking-[0.12em] text-[#174630]">
                  Hole {hole}
                </span>
              ))}
            </div>
            <div className="mx-auto mt-8 max-w-xl text-center">
              <p className="text-sm leading-7 text-[#5d685f]">
                The aerial view shows the full footprint of this course zone, making its relative length, width,
                water exposure, and hole positions easy to read.
              </p>
              <Link href="/#contact" className="mt-7 inline-flex h-11 items-center justify-center rounded-full bg-[#174630] px-6 text-[10px] font-bold uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[#0f3825]">Plan your round →</Link>
            </div>
          </Container>
        </section>


        {slug === "concept-04" && (
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
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#f1d98f]">
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

        <nav aria-label="Concept navigation" className="grid bg-[#f3f0e7] sm:grid-cols-2">
          <Link href={`/golf/${previous.slug}`} className="group relative min-h-72 overflow-hidden border-b border-white/15 sm:border-b-0 sm:border-r">
            <Image src={previous.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#071d13]/65 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">← Previous concept</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{previous.title}</p>
            </div>
          </Link>
          <Link href={`/golf/${next.slug}`} className="group relative min-h-72 overflow-hidden">
            <Image src={next.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#071d13]/65 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col items-end justify-end p-8 text-right text-white sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">Next concept →</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{next.title}</p>
            </div>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
