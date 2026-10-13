import Image from "next/image";
import Link from "next/link";
import FairwayDivider from "@/components/FairwayDivider";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import BackToHeroButton from "@/components/BackToHeroButton";
import HeroWords from "@/components/HeroWords";
import { Kicker, delay } from "@/components/EditorialKit";

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
  "inline-flex h-12 items-center justify-center rounded-full bg-[#e7d18d] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0] xl:text-[11px]";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-[#e7d18d]" fill="none" aria-hidden="true">
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
      <main className="bg-[#f7f5ee] text-[#14271d]">
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
          <FairwayDivider fill="#f7f5ee" />
          <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-44 text-center sm:pb-36 lg:px-8">
            <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#e7d18d] xl:text-[11px]">
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
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/60 px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#e7d18d] hover:text-[#f1d98f] xl:text-[11px]"
              >
                View itinerary
              </a>
            </div>
          </div>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        {/* AT A GLANCE */}
        <section aria-label="Package at a glance" className="bg-[#f7f5ee] pt-8 sm:pt-10">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <dl
              data-reveal="up"
              className="grid grid-cols-2 border-y border-[#1f3f2e]/15 lg:grid-cols-4"
            >
              {facts.map(([label, value], index) => (
                <div
                  key={label}
                  className={`px-2 py-6 sm:px-6 ${index % 2 === 1 ? "border-l border-[#1f3f2e]/15" : ""} ${
                    index > 0 ? "lg:border-l lg:border-[#1f3f2e]/15" : ""
                  } ${index > 1 ? "border-t border-[#1f3f2e]/15 lg:border-t-0" : ""}`}
                >
                  <dt className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">{label}</dt>
                  <dd className="mt-2 text-lg font-medium leading-snug tracking-[-0.02em] text-[#14271d] sm:text-xl">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* OVERVIEW + INCLUSIONS */}
        <section className="bg-[#f7f5ee] py-16 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 lg:px-8">
            <div className="lg:pt-4">
              <Kicker>Overview</Kicker>
              <h2
                data-reveal="up"
                style={delay(90)}
                className="mt-3 max-w-xl text-[clamp(2rem,3.4vw,3rem)] font-medium leading-[1.04] tracking-[-0.045em]"
              >
                {overviewTitle}
              </h2>
              <p data-reveal="up" style={delay(180)} className="mt-6 max-w-xl text-base leading-8 text-[#46554c]">
                {description}
              </p>
              <p data-reveal="up" style={delay(240)} className="mt-4 max-w-xl text-sm leading-7 text-[#5d685f]">
                Every itinerary can be adjusted. Tee times, meals, room types and transfers are arranged around your dates
                and your party.
              </p>
            </div>

            <aside
              data-reveal="up"
              style={delay(120)}
              className="rounded-[28px] bg-[#1f3f2e] p-8 text-white shadow-[0_28px_60px_rgba(8,27,18,0.18)] sm:p-10"
            >
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#e7d18d] xl:text-[11px]">
                What’s included
              </p>
              <ul className="mt-6 space-y-4">
                {inclusions.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-7 text-white/90">
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
        <section id="itinerary" className="scroll-mt-24 bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <Kicker>Itinerary</Kicker>
              <h2 data-reveal="up" style={delay(90)} className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl">
                Day by day
              </h2>
              <p data-reveal="up" style={delay(180)} className="mt-4 text-sm leading-7 text-[#5d685f] xl:text-base xl:leading-8">
                A suggested plan for your stay. Use it as a starting point, and we will adjust it to suit you.
              </p>
            </div>

            <div className="mt-12 sm:mt-14">
              {days.map((day, index) => (
                <article
                  key={day.label}
                  data-reveal="up"
                  style={delay(index * 80)}
                  className="grid gap-6 border-t border-[#1f3f2e]/15 py-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12 sm:py-12"
                >
                  <div>
                    <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">
                      Day
                    </p>
                    <p className="mt-1 text-6xl font-medium leading-none tracking-[-0.05em] text-[#1f3f2e] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 font-navigation text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46554c]">
                      {day.label}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-medium leading-snug tracking-[-0.03em] sm:text-2xl">{day.title}</h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#5d685f]">{day.intro}</p>
                    <ol className="mt-7 border-l border-[#c9a54e]/45">
                      {day.moments.map(([time, copy]) => (
                        <li key={time} className="relative pb-6 pl-6 last:pb-0">
                          <span className="absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full border border-[#c9a54e] bg-white" aria-hidden="true" />
                          <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#265136]">{time}</p>
                          <p className="mt-1 text-[15px] leading-7 text-[#46554c]">{copy}</p>
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
        {/* Cream (kapareho ng Overview) — hindi green (kapareho ng footer sa
            ilalim) at hindi puti (kapareho ng itinerary sa itaas). */}
        <section className="bg-[#f7f5ee] px-6 py-16 text-center text-[#14271d] sm:py-20">
          <h2 data-reveal="up" className="mx-auto max-w-2xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">
            Choose your dates. We’ll arrange the rest.
          </h2>
          <p data-reveal="up" style={delay(90)} className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-[#5d685f]">
            Send us your preferred dates and group size, and our team will reply with availability and a tailored quote.
          </p>
          <div data-reveal="up" style={delay(180)} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/plan-your-visit" className={GOLD_BUTTON}>
              Request a quote
            </Link>
            <Link
              href="/packages"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#1f3f2e]/25 px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:border-[#265136] hover:text-[#265136] xl:text-[11px]"
            >
              Compare packages
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <BackToHeroButton />
    </>
  );
}
