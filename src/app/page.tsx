import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import ConceptCarousel from "@/components/ConceptCarousel";
// import HomeClubhouseOverview from "@/components/HomeClubhouseOverview"; // temporarily hidden
import PackagesCarousel from "@/components/PackagesCarousel";
import HeroVideo from "@/components/HeroVideo";
import ScrollMotion from "@/components/ScrollMotion";
import { T } from "@/components/T";
import { TEASER_POSTER } from "@/lib/site-content";

/** `count` drives the count-up; leave it null for values that are not numbers.
    Ang `labelKey` ang i18n key ng label — isinasalin sa piniling wika via <T>. */
const COURSE_FACTS = [
  { value: "18", count: 18, labelKey: "facts.holes", Icon: null },
  { value: "72", count: 72, labelKey: "facts.par", Icon: null },
  { value: "54.23", count: null, labelKey: "facts.hectares", Icon: null },
  { value: "", count: null, labelKey: "facts.architect", Icon: ImgDesignerMark },
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

function ImgDesignerMark() {
  return (
    <span
      className="block h-5 w-9 shrink-0 bg-[#f3dda0]"
      style={{
        WebkitMaskImage: "url('/branding/mc-gold.png')",
        WebkitMaskPosition: "left center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskImage: "url('/branding/mc-gold.png')",
        maskPosition: "left center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
      }}
      aria-hidden="true"
    />
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
      <CourseSnapshot />
    </section>
  );
}

function CourseSnapshot() {
  return (
    <section
      id="course-snapshot"
      className="absolute inset-x-0 bottom-4 z-20 px-4 font-navigation text-white sm:bottom-6 sm:px-6 lg:bottom-7 lg:px-8"
      aria-label="Course snapshot"
    >
      <div className="mx-auto grid w-full max-w-[50rem] grid-cols-2 sm:grid-cols-4 lg:w-[54%] lg:min-w-[40rem]">
        {COURSE_FACTS.map(({ value, count, labelKey, Icon }, index) => (
          <div
            key={labelKey}
            data-reveal="up"
            style={delay(index * 90)}
            className="relative flex min-h-14 flex-col items-center justify-center px-3 py-2 text-center sm:min-h-[4.75rem] sm:px-4"
          >
            <div className="flex min-h-7 items-center justify-center sm:min-h-8">
              {Icon ? <Icon /> : null}
              {/* IISANG SUKAT ANG APAT. Nakadikit dati ang laki sa `count`:
                  maliit (`text-xs`) kapag `null`, malaki kapag may bilang.
                  May silbi iyon noong "Mt. Isarog" ang ikaapat — mahabang
                  salita na hindi kasya sa 20px. Ngayong marka na ang ikaapat,
                  ang 54.23 na lang ang tinatamaan niyon: numero rin ito gaya
                  ng 18 at 72, pero 14px habang 20px ang dalawa.

                  Para sa count-up na lang ang `count`, hindi na para sa
                  laki — dalawang magkaibang bagay ang pinagsasama niyon. */}
              {value ? (
                <p className="font-navigation text-2xl font-semibold leading-none tabular-nums tracking-[-0.02em] text-[#f3dda0] sm:text-xl">
                  {count === null ? value : <span data-count={count}>{value}</span>}
                </p>
              ) : null}
            </div>
            <p className="mt-1 text-[8px] font-medium uppercase leading-tight tracking-[0.12em] text-white/60 sm:text-[10px] xl:text-[11px]"><T k={labelKey} /></p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section id="story" className="relative isolate flex min-h-[400px] items-center overflow-hidden bg-[#f7f5ee] text-[#14271d]">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        {/* Safe to parallax: a floating watermark has no container edge to expose. */}
        <div data-parallax="0.1" className="relative h-[290px] w-[340px] overflow-hidden opacity-[0.1] sm:h-[350px] sm:w-[420px]">
          <Image
            src="/camsur-uptown-logo.png"
            alt=""
            width={720}
            height={958}
            className="absolute left-1/2 top-0 h-auto w-[340px] max-w-none -translate-x-1/2 grayscale sm:w-[420px]"
          />
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col items-center px-6 py-10 text-center sm:py-12 lg:px-10">
        <p
          data-reveal="up"
          className="mb-5 font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#98782f] sm:text-xs"
        >
          Est. 2026
        </p>
        <h1
          data-reveal="up"
          style={{ ...delay(110), fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
          className="max-w-[1120px] text-[#17251e]"
        >
          <span className="block text-[clamp(2.5rem,4.2vw,4.5rem)] font-medium leading-[0.94] tracking-[-0.055em]">
            CamSur Uptown Golf Club
          </span>
          <span className="mx-auto mt-3 block max-w-[1040px] text-[clamp(1.15rem,1.9vw,2rem)] font-normal leading-[1.12] tracking-[-0.025em] text-[#26362e] sm:mt-4">
            <T k="home.designedBy" />{" "}
            <a
              href="https://www.img.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#8a681f] underline-offset-4 transition-colors hover:text-[#265136] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#265136]"
            >
              IMG
            </a>{" "}
            — <T k="home.imgTagline" />
          </span>
        </h1>

        {/* Hindi inuulit ang headline: inilalarawan nito ang karakter ng
            laro at ang balanse ng accessibility at strategy. */}

        <Link
          href="/golf"
          data-reveal="up"
          style={delay(330)}
          className="mt-5 inline-flex h-12 min-w-[190px] items-center justify-center gap-3 rounded-full bg-[#265136] px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_14px_34px_rgba(20,68,44,0.14)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1f3f2e] xl:text-[12px]"
        >
          <T k="action.planRound" /> <ArrowIcon />
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
        <Introduction />
        {/* Ang balot na ito ang sumasagip sa mga siwang sa pagitan ng mga
            section sa loob, kaya kasama siya kapag pinalitan ang kulay. */}
        <div className="bg-[#f7f5ee]">
          <ConceptCarousel />
          {/* <HomeClubhouseOverview /> */}
          <PackagesCarousel />
        </div>
      </main>
      <Footer />
    </>
  );
}
