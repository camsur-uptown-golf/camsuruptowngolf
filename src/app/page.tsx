import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ConceptCarousel from "@/components/ConceptCarousel";
import HeroVideo from "@/components/HeroVideo";
import ScrollMotion from "@/components/ScrollMotion";
import { Eyebrow } from "@/components/ImgPlaceholder";
import { TEASER_POSTER } from "@/lib/site-content";

/** `count` drives the count-up; leave it null for values that are not numbers. */
const COURSE_FACTS = [
  { value: "18", count: 18, label: "Championship holes", Icon: FlagIcon },
  { value: "72", count: 72, label: "Course par", Icon: ScorecardIcon },
  { value: "54.23", count: null, label: "Hectares", Icon: AreaIcon },
  { value: "Mt. Isarog", count: null, label: "Signature backdrop", Icon: MountainIcon },
] as const;

/** Stagger helper — reads back out in CSS as `transition-delay`. */
const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Course-snapshot icons. Pare-parehong 24x24 stroke-only para pantay ang
   bigat nila sa isang linya sa tabi ng bawat numero. */
function StatIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-[#c9a54e]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function FlagIcon() {
  return (
    <StatIcon>
      <path d="M7 20V4" />
      <path d="M7 5l8 2.7L7 10.4" />
      <path d="M3.5 20h7.5" />
    </StatIcon>
  );
}

function ScorecardIcon() {
  return (
    <StatIcon>
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
      <path d="M8 9.5h8M8 13.5h8M8 17.5h4" />
    </StatIcon>
  );
}

function AreaIcon() {
  return (
    <StatIcon>
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <path d="M8 4v3M4 8h3M16 20v-3M20 16h-3" />
    </StatIcon>
  );
}

function MountainIcon() {
  return (
    <StatIcon>
      <path d="M2.5 19.5 9 10l4.2 5.4L16 12l5.5 7.5z" />
    </StatIcon>
  );
}

function ScrollArrowIcon() {
  return (
    <svg viewBox="0 0 24 14" className="h-2.5 w-4" fill="none" aria-hidden="true">
      <path d="M3 2.5 12 11l9-8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate h-svh min-h-[680px] overflow-hidden bg-[#061a11] text-white">
      <div className="absolute inset-0" aria-hidden="true">
        {/* Only the media drifts; the gradients below stay put so the fade into
            the course snapshot strip does not move with it. */}
        <div
          data-parallax="-0.04"
          className="parallax-media absolute inset-0"
          style={{ "--parallax-scale": "1.15" } as CSSProperties}
        >
          <Image
            src={TEASER_POSTER}
            alt=""
            fill
            preload
            sizes="100vw"
            className="hero-image object-cover object-center"
          />
          <HeroVideo />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,16,10,0.68)_0%,rgba(2,16,10,0.24)_48%,rgba(2,16,10,0.08)_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,14,9,0.42)_0%,transparent_30%,transparent_58%,rgba(2,16,10,0.72)_100%)]" />
      </div>
    </section>
  );
}

// Ang -mt at ang h ay laging magkatugma: iyon ang nagpapapatong sa banda sa
// ibabang gilid ng hero nang hindi nagbabago ang taas ng hero.
function CourseSnapshot() {
  return (
    <section id="course-snapshot" className="relative z-20 border-y border-[#d1af58]/22 bg-[#1c3b2d] font-navigation text-white lg:-mt-[68px] lg:h-[68px]" aria-label="Course snapshot">
      {/* The band sits on the hero, so a gold hairline reads as its edge. */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a54e]/55 to-transparent" aria-hidden="true" />
      {/* No reveal on the scroll cue: it already carries a translate, and a
          reveal would reset that transform when it lands. */}
      <a href="#course-snapshot" aria-label="Discover the course" className="group absolute left-1/2 top-0 z-30 flex -translate-x-1/2 -translate-y-full flex-col items-center text-[#d1af58]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d1af58]/80 bg-black/[0.04] backdrop-blur-[1px] transition-colors group-hover:border-[#f1d98f] group-hover:bg-[#d1af58]/10 group-hover:text-[#f1d98f]">
          <span className="flex items-center justify-center">
            <ScrollArrowIcon />
          </span>
        </span>
        <span className="mt-2 h-3 w-px bg-[#d1af58]/80 transition-colors group-hover:bg-[#f1d98f] sm:h-4" aria-hidden="true" />
      </a>
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 sm:grid-cols-4 lg:h-full lg:px-8">
        {COURSE_FACTS.map(({ value, count, label, Icon }, index) => (
          <div
            key={label}
            data-reveal="up"
            style={delay(index * 90)}
            className={`relative py-3 sm:px-5 sm:py-3.5 lg:flex lg:flex-col lg:justify-center lg:py-0 ${index % 2 ? "border-l border-[#c9a54e]/15 pl-5" : "pr-5"} ${index > 1 ? "border-t border-[#c9a54e]/15 sm:border-t-0" : ""} ${index > 0 ? "sm:border-l sm:border-[#c9a54e]/15" : "sm:pl-0"}`}
          >
            <div className="flex items-center gap-2">
              <Icon />
              <p
                className={`${count === null ? "text-xs sm:text-sm" : "text-lg sm:text-xl"} font-semibold leading-none tracking-[-0.02em] text-[#f2d98d]`}
              >
                {count === null ? value : <span data-count={count}>{value}</span>}
              </p>
            </div>
            <p className="mt-1.5 text-[8px] font-medium uppercase leading-tight tracking-[0.14em] text-white/55 sm:text-[9px] xl:text-[10px]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section id="story" className="relative isolate flex min-h-[520px] items-center overflow-hidden bg-[#f7f5ee] text-[#14271d]">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        {/* Safe to parallax: a floating watermark has no container edge to expose. */}
        <div data-parallax="0.1" className="relative h-[290px] w-[340px] overflow-hidden opacity-[0.075] sm:h-[350px] sm:w-[420px]">
          <Image
            src="/camsur-uptown-logo.png"
            alt=""
            width={720}
            height={958}
            className="absolute left-1/2 top-0 h-auto w-[340px] max-w-none -translate-x-1/2 grayscale sm:w-[420px]"
          />
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-16 text-center sm:py-20 lg:px-10 lg:py-20">
        <div data-reveal="up">
          <Eyebrow className="mb-5 text-[#98782f]">A New Golf Destination in Bicol</Eyebrow>
        </div>
        <h1
          data-reveal="up"
          style={delay(110)}
          className="max-w-[1080px] font-display text-[clamp(2.25rem,4.5vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.055em] text-[#17251e]"
        >
          Championship golf in the heart of Bicol.
        </h1>
        <p
          data-reveal="up"
          style={delay(220)}
          className="mt-7 max-w-4xl text-base font-medium leading-8 text-[#56625b] sm:text-lg sm:leading-9"
        >
          Set beneath the silhouette of Mt. Isarog, CamSur Uptown Golf Club brings together a carefully planned championship course, wide open views, and the warmth that Bicol is known for.
        </p>
        <Link
          href="/#contact"
          data-reveal="up"
          style={delay(330)}
          className="mt-8 inline-flex h-12 min-w-[190px] items-center justify-center gap-3 rounded-full bg-[#2f644b] px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_14px_34px_rgba(20,68,44,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3a765a]"
        >
          Plan your round <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}

function StayFeature() {
  const stayHighlights = [
    ["Private outdoor spaces", "A terrace of your own for quiet mornings and unhurried evenings."],
    ["Close to the course", "A short walk to the fairways, in a setting that still feels private."],
    ["Warm local hospitality", "Attentive service and a genuine Bicolano welcome for the length of your stay."],
  ] as const;

  return (
    <section id="stays" className="bg-[#f7f5ee] pb-16 pt-6 text-[#14271d] sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div data-reveal="up">
              <Eyebrow className="mb-5 text-[#98782f]">Stay at CamSur</Eyebrow>
            </div>
            <h2
              data-reveal="up"
              style={delay(110)}
              className="max-w-2xl text-[clamp(2.7rem,5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.06em]"
            >
              Stay close to the course.
            </h2>
          </div>
          <p
            data-reveal="up"
            style={delay(220)}
            className="max-w-2xl text-base leading-8 text-[#5d685f] sm:text-lg sm:leading-9 lg:justify-self-end"
          >
            Private villas beside the course, planned for easy mornings, quick access to the fairways, and a fuller stay at CamSur Uptown.
          </p>
        </div>

        <div className="relative mt-10 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:mt-12">
          <div data-reveal="scale" className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[2.15/1]">
            <Image
              src="/camsur-stay-villas-isarog.png"
              alt="Private tropical guest villas beside the CamSur Uptown golf course with Mt. Isarog in the distance"
              fill
              sizes="(max-width: 1279px) calc(100vw - 3rem), 1280px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,18,11,0.2),transparent_55%),linear-gradient(0deg,rgba(2,18,11,0.32),transparent_42%)]" />
          </div>

          <div
            data-reveal="up"
            style={delay(160)}
            className="bg-[#f5f1e8] p-7 text-[#14271d] sm:p-9 lg:absolute lg:bottom-0 lg:left-0 lg:w-[46%] lg:p-10 xl:w-[42%]"
          >
            <Eyebrow className="mb-4 text-[#98782f]">Private villas</Eyebrow>
            <h3 className="font-serif text-[clamp(2rem,3vw,3.35rem)] font-medium leading-[0.98] tracking-[-0.05em]">Private villas designed around your stay.</h3>
            <p className="mt-5 max-w-lg text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f] sm:text-base">
              Wake to quiet garden paths and fairway views, then reach the first tee without rushing your morning.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/accommodations" className="inline-flex h-12 items-center gap-4 rounded-full bg-[#2f644b] px-7 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#3a765a]">
                Explore stays <ArrowIcon />
              </Link>
              <Link href="/#contact" className="inline-flex h-12 items-center rounded-full border border-[#174630]/25 px-7 text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.12em] text-[#174630] transition hover:border-[#174630]">
                Plan your stay
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid border-y border-[#173e2b]/12 sm:grid-cols-3">
          {stayHighlights.map(([title, description], index) => (
            <div
              key={title}
              data-reveal="up"
              style={delay(index * 110)}
              className={`py-6 sm:px-7 ${index ? "border-t border-[#173e2b]/12 sm:border-l sm:border-t-0" : ""}`}
            >
              <h3 className="text-lg font-medium tracking-[-0.025em] text-[#174630]">{title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#667269]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <ScrollMotion />
      <main>
        <Hero />
        <CourseSnapshot />
        <Introduction />
        {/* Ang balot na ito ang sumasagip sa mga siwang sa pagitan ng mga
            section sa loob, kaya kasama siya kapag pinalitan ang kulay. */}
        <div className="bg-[#f7f5ee]">
          <ConceptCarousel />
          <StayFeature />
        </div>
      </main>
      <Footer />
    </>
  );
}
