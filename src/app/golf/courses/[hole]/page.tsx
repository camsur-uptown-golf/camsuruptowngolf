import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import RequestCallback from "@/components/RequestCallback";
import Scorecard from "@/components/Scorecard";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, SectionHeading, delay } from "@/components/SectionKit";
import { HOLE_PROFILES } from "@/lib/course-holes";
import { COURSE_PAGES } from "@/lib/site-content";

/** "No. 4 · Upper Green" — ginagamit sa metadata at sa prev/next na card. */
function holeLabel(course: (typeof COURSE_PAGES)[number]) {
  const hole = course.holes[0];
  return `No. ${hole} · ${HOLE_PROFILES[hole].name}`;
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
  return course ? { title: `${holeLabel(course)} | CamSur Uptown Golf Club`, description: course.description } : {};
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
          {/* Nakagitna na ang teksto, kaya hindi na bagay ang dating gradient
              na mabigat sa kaliwa — 0.88 doon, kaya halos hindi na makita ang
              aerial ng butas. Ngayon: madilim sa itaas (para mabasa ang nav),
              maliwanag sa gitna para makita ang larawan, may malambot na
              pool sa likod ng numero, at madilim sa ibaba papunta sa divider. */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_58%_46%_at_50%_46%,rgba(3,17,11,0.58)_0%,transparent_72%),linear-gradient(180deg,rgba(3,17,11,0.78)_0%,rgba(3,17,11,0.20)_32%,rgba(3,17,11,0.30)_62%,rgba(3,17,11,0.88)_100%)]" />
          {/* Dapat eksaktong katumbas ng #aerial-study sa ibaba — kahit
              bahagyang pagkakaiba ay lumilitaw bilang tahi sa dugtungan. */}
          <FairwayDivider fill="#f7f5ee" />
          <div className="mx-auto flex min-h-[660px] max-w-7xl items-center justify-center px-6 py-24 lg:px-8">
            <div className="w-full text-center">
              <h1
                data-reveal="up"
                className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em] text-white"
              >
                No. {index + 1}
              </h1>
              <span
                data-reveal="line"
                style={delay(140)}
                className="mx-auto mt-5 block h-px w-20 bg-[#f1d98f]/60"
                aria-hidden="true"
              />
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
              {/* Pareho ng SectionHeading ang sukat at tracking — 0.24em at
                  sm: ang dati, kaya bahagyang iba sa ibang eyebrow ng pahina. */}
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                Aerial routing study · {String(index + 1).padStart(2, "0")} / 18
              </p>
              {/* Ang pangalan ng butas, hindi ang dating iisang editorial na
                  headline na pareho sa lahat ng 18 pahina. */}
              {/* Tatlong antas ang dapat: 72px ang "No. 1" sa hero, 36px ang
                  mga section heading sa ibaba (galing sa SectionHeading). Sa
                  dating clamp ay umaabot ito ng 60px — halos kapantay ng h1 at
                  doble ng ibang h2, kaya walang malinaw na pagkakasunod. */}
              <h2 className="mx-auto mt-4 max-w-4xl text-balance text-[clamp(1.85rem,3.2vw,3rem)] font-medium leading-[1.02] tracking-[-0.045em] text-[#14271d]">
                {scorecard.name}
              </h2>
              <p className="mx-auto mt-6 max-w-3xl text-sm font-medium leading-7 text-[#536058] sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
                {concept.description}
              </p>
              {/* Tumuturo na sa form sa ibaba ng mismong pahina, hindi sa
                  ibang pahina — nandoon na ang hinahanap ng pipindot nito. */}
              <Link
                href="#request-call-back"
                className="mt-7 inline-flex h-11 min-w-[170px] items-center justify-center rounded-full bg-[#2f644b] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a] sm:h-12 sm:min-w-[190px] sm:text-[11px]"
              >
                Request a call back
              </Link>
            </div>

          </Container>

          {/* Nasa labas ng Container para natural na kasinglapad ng section.
              Dati itong `left-1/2 w-screen -translate-x-1/2`, pero kasama ng
              100vw ang gutter ng scrollbar: 1440px ito sa 1425px na espasyo,
              kaya may 8px na naputol sa bawat gilid (natatago lang ng
              overflow-hidden ng section). Walang vw dito, walang pagkaputol. */}
          {/* Walang sariling background: minamana nito ang cream ng section,
              kaya tiyak na magkatugma. Ang border-y na lang ang naghihiwalay. */}
          <div className="mt-14 border-y border-[#173b2a]/10 px-6 py-9 text-[#14271d] sm:mt-16 sm:px-10 sm:py-11">
            <dl className="mx-auto grid max-w-6xl grid-cols-3 text-center">
              {[
                { label: "Yards", value: scorecard.yards.toLocaleString() },
                { label: "Par", value: String(scorecard.par) },
                /* Walang laman hangga't hindi pa kumpirmado ng club. */
                { label: "Opening year", value: "" },
              ].map(({ label, value }, statIndex) => (
                <div
                  key={label}
                  data-reveal="up"
                  style={delay(statIndex * 90)}
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
                    /* Dating sr-only, kaya blangkong hanay ang nakikita at
                       mukhang sira. Nakasulat na kung bakit ito walang laman. */
                    <dd className="mt-5 font-navigation text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9aa39d]">
                      To be confirmed
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Kaparehong cream ng aerial-study sa itaas at ng call-back form sa
            ibaba. Dating `#edf0e8` — banayad na sage iyon, pero sapat ang
            pagkakaiba para magmukhang ibang banda sa gitna ng pahina. Ang
            border-t at ang mga naka-border na table ang naghihiwalay. */}
        <section className="relative isolate scroll-mt-24 overflow-hidden border-t border-[#173b2a]/10 bg-[#f7f5ee] py-14 sm:py-16">
          <Container>
            {/* Dating inuulit lang nito ang parehong description na nasa
                itaas, kasama ang "Hole 1" na chip na hindi na kailangan sa
                pahinang iisang butas lang naman. Buong scorecard na ngayon,
                at naka-highlight ang butas ng pahinang ito. */}
            <SectionHeading
              eyebrow="Scorecard"
              title="The full eighteen."
              intro="Every hole from each set of tees. This hole is highlighted across the card."
            />
          </Container>

          {/* Mas malapad kaysa sa Container: hindi magkasya ang plano at ang
              18-hole na card nang magkatabi sa karaniwang lapad. Sa max-w-6xl
              ay 566px lang ang natitira sa talahanayan — kulang para sa back
              nine na may 12 hanay, kaya nagka-scrollbar ang dalawang card. */}
          <div data-reveal="up" className="mx-auto mt-10 w-full max-w-7xl px-6 sm:px-10 lg:px-12">
            <Scorecard
              currentHole={concept.holes[0]}
              photoSrc={concept.image}
            />
          </div>
        </section>


        {slug === "no-6" && (
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
                        className="object-cover"
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

        <section id="request-call-back" className="scroll-mt-24 border-t border-[#173b2a]/10 bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Plan your round"
              title="Request a call back."
              intro="Tell us a bit more about the trip you have in mind and the club will call you back within 48 hours, at the time you choose."
            />
            <div className="mt-10">
              <RequestCallback context={`${holeLabel(concept)}`} />
            </div>
          </Container>
        </section>

        <nav aria-label="Course navigation" className="grid bg-[#f3f0e7] sm:grid-cols-2">
          <Link href={`/golf/courses/${previous.slug}`} className="group relative min-h-72 overflow-hidden border-b border-white/15 sm:border-b-0 sm:border-r">
            <Image src={previous.image} alt="" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#071d13]/65 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-10">
              {/* Dating `previous.title` — iisang editorial headline iyon para
                  sa lahat, kaya magkapareho ang teksto ng dalawang card. */}
              <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">← Previous hole</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{holeLabel(previous)}</p>
            </div>
          </Link>
          <Link href={`/golf/courses/${next.slug}`} className="group relative min-h-72 overflow-hidden">
            <Image src={next.image} alt="" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-[#071d13]/65 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col items-end justify-end p-8 text-right text-white sm:p-10">
              <p className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">Next hole →</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{holeLabel(next)}</p>
            </div>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
