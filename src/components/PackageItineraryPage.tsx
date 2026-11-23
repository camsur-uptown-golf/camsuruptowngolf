import Image from "next/image";
import Link from "next/link";
import FairwayDivider from "@/components/FairwayDivider";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import BackToHeroButton from "@/components/BackToHeroButton";
import HeroWords from "@/components/HeroWords";
import { delay } from "@/components/EditorialKit";
import CtaPanel from "@/components/CtaPanel";

export type PackageDay = {
  label: string;
  title: string;
  intro: string;
  moments: readonly (readonly [string, string])[];
};

type Props = {
  /* Pareho nang gumagamit nito ang dalawang package. Dati ay "stay-and-play"
     lang ang tinatanggap, at kinopya ng buddy-trip ang buong markup nito. */
  active: "stay-and-play" | "buddy-trip";
  title: string;
  /** Isang pangungusap sa ilalim ng pamagat sa hero. */
  tagline: string;
  /** Pamagat ng overview section. */
  overviewTitle: string;
  description: string;
  image: string;
  /** "At a glance" — tagal, golf, tutuluyan, at para kanino. */
  facts: readonly (readonly [string, string])[];
  days: readonly PackageDay[];
  inclusions: readonly string[];
};

const GOLD_BUTTON =
  "inline-flex h-12 items-center justify-center rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] transition hover:-translate-y-0.5 hover:bg-[#efd99b] xl:text-[11px]";

/* Kapareho ng /packages: `max-w-[1600px]` at makitid na puwang sa kaliwa at
   kanan, kaya iisa ang lapad ng listahan ng package at ng itinerary nito. */
const CONTAINER = "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8";
const EYEBROW = "font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#7d6224] sm:text-sm";
const SECTION_TITLE = "mt-3 font-display text-[clamp(2.5rem,4.6vw,4.625rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-[#e2c77a]" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeOpacity="0.45" />
      <path d="m6.2 10.3 2.5 2.4 5.1-5.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PackageItineraryPage({
  title,
  tagline,
  overviewTitle,
  description,
  image,
  facts,
  days,
  inclusions,
}: Props) {
  return (
    <>
      <main className="bg-[#f3ede1] text-[#03321b]">
        {/* replay: umuulit ang reveal pababa't pataas — walang dead air. */}
        <ScrollMotion replay />

        {/* HERO */}
        <section className="relative isolate flex min-h-[660px] items-center overflow-hidden bg-[#102a1e] text-white">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
            style={{ objectPosition: "right center" }}
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,19,13,0.66)_0%,rgba(5,19,13,0.28)_45%,rgba(5,19,13,0.8)_100%)]" />
          <FairwayDivider fill="#f3ede1" />
          <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-44 text-center sm:pb-36 lg:px-8">
            <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.24em] text-[#e2c77a] xl:text-[11px]">
              Golf package
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              <HeroWords text={title} />
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/85 [text-shadow:0_2px_14px_rgba(0,0,0,0.35)] sm:text-lg">
              {tagline}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/plan-your-visit" className={GOLD_BUTTON}>
                Request a quote
              </Link>
              <a
                href="#itinerary"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/60 px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#e2c77a] hover:text-[#efd99b] xl:text-[11px]"
              >
                View itinerary
              </a>
            </div>
          </div>
        </section>

        <div className="bg-[#f3ede1]">
          <Breadcrumbs />
        </div>

        {/* AT A GLANCE */}
        <section aria-label="Package at a glance" className="bg-[#f3ede1] pt-6 sm:pt-8">
          <div className={CONTAINER}>
            <dl data-reveal="up" className="grid grid-cols-2 overflow-hidden rounded-2xl border border-[#03321b]/12 bg-white lg:grid-cols-4">
              {facts.map(([label, value], index) => (
                <div
                  key={label}
                  className={`p-5 sm:p-7 lg:p-8 ${index % 2 === 1 ? "border-l border-[#03321b]/12" : ""} ${
                    index > 0 ? "lg:border-l lg:border-[#03321b]/12" : ""
                  } ${index > 1 ? "border-t border-[#03321b]/12 lg:border-t-0" : ""}`}
                >
                  <dt className="font-navigation text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7d6224] sm:text-xs">{label}</dt>
                  <dd className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[#17251e]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* OVERVIEW + INCLUSIONS */}
        <section className="bg-[#f3ede1] py-16 sm:py-20 lg:py-24">
          <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-16 xl:gap-24`}>
            <div>
              <p data-reveal="up" className={EYEBROW}>
                Overview
              </p>
              <h2 data-reveal="up" style={delay(90)} className={`${SECTION_TITLE} max-w-3xl text-balance`}>
                {overviewTitle}
              </h2>
              <p data-reveal="up" style={delay(180)} className="mt-7 max-w-2xl text-[17px] leading-8 text-[#3f4c45]">
                {description}
              </p>
              <p data-reveal="up" style={delay(240)} className="mt-4 max-w-2xl text-[15px] leading-7 text-[#5d685f]">
                Every itinerary can be adjusted. Tee times, meals, room types and transfers are arranged around your dates
                and your party.
              </p>
            </div>

            <aside
              data-reveal="up"
              style={delay(120)}
              className="rounded-3xl bg-[#03321b] p-8 text-white shadow-[0_28px_60px_rgba(8,27,18,0.18)] sm:p-10 lg:p-12"
            >
              <p className="font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#e2c77a] sm:text-sm">
                What’s included
              </p>
              <ul className="mt-6 space-y-4">
                {inclusions.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-white/90">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-sm leading-6 text-white/70">
                  Rates on request, based on your dates, room type and group size.
                </p>
                <Link href="/plan-your-visit" className={`${GOLD_BUTTON} mt-5 w-full`}>
                  Request a quote
                </Link>
              </div>
            </aside>
          </div>
        </section>

        {/* ITINERARY */}
        <section id="itinerary" className="scroll-mt-24 bg-white py-16 sm:py-20 lg:py-24">
          <div className={CONTAINER}>
            <div className="grid gap-5 border-b border-[#03321b]/15 pb-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-12">
              <div>
                <p data-reveal="up" className={EYEBROW}>
                  Itinerary
                </p>
                <h2 data-reveal="up" style={delay(90)} className={SECTION_TITLE}>
                  Day by day
                </h2>
              </div>
              <p data-reveal="up" style={delay(180)} className="max-w-xl text-base leading-8 text-[#3f4c45] lg:justify-self-end lg:pb-2">
                A suggested plan for your stay. Use it as a starting point, and we will adjust it to suit you.
              </p>
            </div>

            <div>
              {days.map((day, index) => (
                <article
                  key={day.label}
                  data-reveal="up"
                  style={delay(index * 80)}
                  className={`${index > 0 ? "border-t border-[#03321b]/15" : ""} grid gap-6 py-10 sm:py-14 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,1fr)] lg:gap-16`}
                >
                  <div className="flex items-end gap-5 lg:block">
                    <p className="font-display text-[clamp(4.5rem,8vw,8rem)] font-medium leading-[0.8] tracking-[-0.05em] text-[#17251e] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className={`${EYEBROW} pb-1 lg:mt-5 lg:pb-0`}>
                      <span className="sr-only">Day {index + 1}: </span>
                      {day.label}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-display text-[clamp(2rem,3.2vw,3rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#17251e]">
                      {day.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-[17px] leading-8 text-[#3f4c45]">{day.intro}</p>
                    {/* Magkakatabi ang mga sandali ng araw (umaga → tanghali →
                        gabi) imbes na isang mahabang patayong linya: sa malapad
                        na hanay ay sobrang haba ng bawat linya ng teksto. */}
                    <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {day.moments.map(([time, copy]) => (
                        <li key={time} className="rounded-2xl bg-[#f3ede1] p-6">
                          <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.18em] text-[#2e5126] sm:text-xs">{time}</p>
                          <p className="mt-2.5 text-[15px] leading-7 text-[#46554c]">{copy}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        {/* Berdeng panel sa loob ng cream, hindi buong banda — madilim-berde
            rin ang Footer na kasunod. Kapareho ng dulo ng /packages. */}
        <section className="py-4 sm:py-6 lg:py-8 bg-[#f3ede1] text-[#03321b] ">
          <div className="relative w-full px-4 sm:px-6 lg:px-8">
            <CtaPanel
              reveal
              eyebrow="Request a quote"
              title="Choose your dates. We’ll arrange the rest."
              text="Send us your preferred dates and group size, and our team will reply with availability and a tailored quote."
              primary={{ label: "Request a quote", href: "/plan-your-visit" }}
              secondary={{ label: "Compare packages", href: "/packages" }}
            />
          </div>
        </section>
      </main>
      <Footer />
      <BackToHeroButton />
    </>
  );
}
