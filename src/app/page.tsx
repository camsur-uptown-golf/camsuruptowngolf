import Image from "next/image";
import Footer from "@/components/Footer";
import ConceptCarousel from "@/components/ConceptCarousel";
import { Eyebrow } from "@/components/ImgPlaceholder";

const WISTIA_HERO_SRC =
  "https://fast.wistia.net/embed/iframe/xfqyn64zqs?autoPlay=true&muted=true&silentAutoPlay=true&endVideoBehavior=loop&playsinline=true&controlsVisibleOnLoad=false&playButton=false&smallPlayButton=false&playbar=false&volumeControl=false&fullscreenButton=false&settingsControl=false&qualityControl=false&playbackRateControl=false&playPauseNotifier=false&resumable=false&seo=false&doNotTrack=true&videoFoam=false";

function ScrollArrowIcon() {
  return (
    <svg viewBox="0 0 24 28" className="h-7 w-6" fill="none" aria-hidden="true">
      <path
        d="M12 3v21M5.5 17.5 12 24l6.5-6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate h-svh overflow-hidden bg-brand-deep text-white sm:h-[calc(100svh-92px)] sm:min-h-[580px] lg:min-h-[650px]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-4k.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover object-[58%_center] sm:object-center"
        />
        <div className="hero-image pointer-events-none absolute inset-0 overflow-hidden">
          <iframe
            src={WISTIA_HERO_SRC}
            title=""
            aria-hidden="true"
            tabIndex={-1}
            allow="autoplay; fullscreen"
            loading="eager"
            className="absolute left-1/2 top-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78vh)] -translate-x-1/2 -translate-y-1/2 border-0"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,18,12,0.58)_0%,rgba(3,18,12,0.16)_30%,transparent_62%,rgba(3,18,12,0.18)_100%)]" />
      </div>

      <a
        href="#course-stats"
        aria-label="Scroll to course highlights"
        className="absolute bottom-6 left-1/2 z-20 flex h-12 w-12 -translate-x-1/2 items-center justify-center text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)] transition hover:text-[#f1d98f] sm:bottom-7"
      >
        <ScrollArrowIcon />
      </a>
    </section>
  );
}

function CourseStats() {
  return (
    <section id="course-stats" className="border-y border-[#c9a54e]/18 bg-[#082218] text-white" aria-label="Course highlights">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 sm:grid-cols-4 lg:px-8">
        {[
          ["18", "Championship holes"],
          ["72", "Course par"],
          ["7,200", "Yards from the tips"],
          ["Isarog", "Mountain views"],
        ].map(([value, label], index) => (
          <div
            key={label}
            className={`py-5 sm:py-6 ${index % 2 ? "border-l border-white/10 pl-5 sm:pl-8" : ""} ${index > 1 ? "border-t border-white/10 sm:border-t-0" : ""} ${index === 2 ? "sm:border-l sm:pl-8" : ""}`}
          >
            <p className="text-xl font-semibold leading-none tracking-[-0.04em] text-[#f2d98d] sm:text-2xl">{value}</p>
            <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/52 sm:text-[10px]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Feature() {
  return (
    <section id="story" className="relative isolate flex min-h-[520px] scroll-mt-0 items-center overflow-hidden bg-white text-[#14271d]">
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
        <div className="relative h-[290px] w-[340px] overflow-hidden opacity-[0.075] sm:h-[350px] sm:w-[420px]">
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
        <Eyebrow className="mb-5 text-[#98782f]">Welcome to CamSur Uptown</Eyebrow>
        <h2 className="max-w-[1080px] text-[clamp(2.25rem,4.5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.055em] text-[#17251e]">
          Where championship golf meets the spirit of Bicol
        </h2>
        <p className="mt-7 max-w-4xl text-base font-medium leading-8 text-[#56625b] sm:text-lg sm:leading-9">
          Set beneath the enduring silhouette of Mt. Isarog, CamSur Uptown Golf Club
          brings together a thoughtfully designed course, warm Bicolano hospitality,
          and the kind of setting that makes every round worth remembering.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex h-12 min-w-[190px] items-center justify-center gap-3 rounded-full bg-[#174630] px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_14px_34px_rgba(20,68,44,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0f3825]"
        >
          Plan your round
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <CourseStats />
      <Feature />
      <ConceptCarousel />
      <Footer />
    </>
  );
}
