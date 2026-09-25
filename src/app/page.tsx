import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ConceptCarousel from "@/components/ConceptCarousel";
import PackagesCarousel from "@/components/PackagesCarousel";
import OffCourseSection from "@/components/OffCourseSection";
import HeroVideo from "@/components/HeroVideo";
import ScrollMotion from "@/components/ScrollMotion";
import { Eyebrow } from "@/components/ImgPlaceholder";
import { TEASER_POSTER } from "@/lib/site-content";

/** `count` drives the count-up; leave it null for values that are not numbers. */
const COURSE_FACTS = [
  { value: "18", count: 18, label: "Championship holes", Icon: FlagIcon },
  { value: "72", count: 72, label: "Course par", Icon: ScorecardIcon },
  { value: "54.23", count: null, label: "Hectares", Icon: AreaIcon },
  { value: "", count: null, label: "Golf course designer", Icon: ImgDesignerMark },
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

function ImgDesignerMark() {
  return (
    <Image
      src="/branding/mc-gold.png"
      alt=""
      width={32}
      height={18}
      className="h-5 w-9 shrink-0 object-contain object-left"
      aria-hidden="true"
    />
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
    <section id="course-snapshot" className="relative z-20 border-y border-[#d1af58]/22 bg-[#1f3f2e] font-navigation text-white lg:-mt-[68px] lg:h-[68px]" aria-label="Course snapshot">
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
              {/* IISANG SUKAT ANG APAT. Nakadikit dati ang laki sa `count`:
                  maliit (`text-xs`) kapag `null`, malaki kapag may bilang.
                  May silbi iyon noong "Mt. Isarog" ang ikaapat — mahabang
                  salita na hindi kasya sa 20px. Ngayong marka na ang ikaapat,
                  ang 54.23 na lang ang tinatamaan niyon: numero rin ito gaya
                  ng 18 at 72, pero 14px habang 20px ang dalawa.

                  Para sa count-up na lang ang `count`, hindi na para sa
                  laki — dalawang magkaibang bagay ang pinagsasama niyon. */}
              {value ? (
                <p className="text-lg font-semibold leading-none tracking-[-0.02em] text-[#f2d98d] sm:text-xl">
                  {count === null ? value : <span data-count={count}>{value}</span>}
                </p>
              ) : null}
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
    <section id="story" className="relative isolate flex min-h-[480px] items-center overflow-hidden bg-[#f7f5ee] text-[#14271d]">
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
      <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-14 text-center sm:py-16 lg:px-10 lg:py-18">
        <div data-reveal="up">
        </div>
        <h1
          data-reveal="up"
          style={delay(110)}
          className="max-w-[1120px] font-display text-[#17251e]"
        >
          <span className="block text-[clamp(2.5rem,4.2vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.055em]">
            CAMSUR UPTOWN GOLF CLUB
          </span>
          <span className="mx-auto mt-3 block max-w-[1040px] text-[clamp(1.35rem,2.5vw,2.65rem)] font-normal leading-[1.08] tracking-[-0.035em] text-[#26362e] sm:mt-4">
            DESIGNED BY <span className="text-[#98782f]">IMG</span> — THE GLOBAL LEADER IN GOLF COURSE DESIGN
          </span>
        </h1>

        {/* Hindi inuulit ang headline: inilalarawan nito ang karakter ng
            laro at ang balanse ng accessibility at strategy. */}

        <Link
          href="/golf"
          data-reveal="up"
          style={delay(330)}
          className="mt-7 inline-flex h-12 min-w-[190px] items-center justify-center gap-3 rounded-full bg-[#265136] px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_14px_34px_rgba(20,68,44,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1f3f2e] xl:text-[12px]"
        >
          Plan your round <ArrowIcon />
        </Link>
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
          <PackagesCarousel />
        </div>
      </main>
      <Footer />
    </>
  );
}
