import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Shell, Watermark, delay } from "@/components/EditorialKit";
import { ARRIVAL_NOTES, CLUB_ADDRESS, CLUB_PHONE, TRAVEL_ROUTES } from "@/lib/site-content";

/**
 * Paano makakarating sa club.
 *
 * SARILING PAHINA ITO. Nasa loob ito ng footer noon bilang buong listahan,
 * na ang ibig sabihin ay nasa ilalim ito ng bawat pahina ng site; isang
 * pindutan na lang doon ngayon ang daan papunta rito.
 *
 * ANG ORAS ANG PINAKAMALAKING BAGAY SA BAWAT HILERA. Iyon ang unang
 * hinahanap ng titingin — hindi ang pangalan ng lugar, na alam na niya.
 *
 * WALA PANG PIN SA MAPA DITO, at sinadya iyon. Walang ibinigay na
 * kumpirmadong coordinate o Google Maps listing ang club, at ang isang
 * hinulaang pin ay mas masama kaysa walang pin — isang taong nasa
 * kalsada na ang susunod doon.
 *
 * TODO (para sa club): ibigay ang totoong link ng mapa at ang kumpletong
 * address (barangay, bayan, ZIP), at ilagay sila rito at sa CLUB_ADDRESS.
 */
export const metadata: Metadata = {
  title: "How to get here | CamSur Uptown Golf Club",
  description:
    "Driving times from Naga Airport, Naga City, and Legazpi, with parking and transfer arrangements for guests of CamSur Uptown Golf Club.",
};

type TravelIconName = (typeof TRAVEL_ROUTES)[number]["icon"] | (typeof ARRIVAL_NOTES)[number]["icon"];

function TravelIcon({ name }: { name: TravelIconName }) {
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#b49343]/30 bg-[#fbf8ef] text-[#265136]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
        {name === "plane" ? (
          <path
            d="m3.5 13 7.1-2.1V5.6c0-1 .6-2.6 1.4-2.6s1.4 1.6 1.4 2.6v5.3l7.1 2.1v1.5l-7.1-.9-.5 5 2.2 1.2V21L12 20l-3.1 1v-1.2l2.2-1.2-.5-5-7.1.9V13Z"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinejoin="round"
          />
        ) : name === "pin" ? (
          <>
            <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
          </>
        ) : name === "car" ? (
          <>
            <path d="m5 10 1.5-4h11l1.5 4M4 10h16v7H4v-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M7 17v2M17 17v2M7 13h.01M17 13h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </>
        ) : name === "parking" ? (
          <>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 17V7h3a3 3 0 0 1 0 6h-3M10 13h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </>
        ) : (
          <>
            <path d="M5 5h14v11H5V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M8 16v2M16 16v2M8 9h8M8 13h.01M16 13h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </>
        )}
      </svg>
    </span>
  );
}

export default function GettingHerePage() {
  return (
    <>
      <main>
        <ScrollMotion />

        <section
          id="top"
          className="relative isolate overflow-hidden bg-[#14271d] px-6 pb-14 pt-48 text-white sm:px-8 sm:pb-16 sm:pt-52 lg:px-12 lg:pt-56"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,rgba(201,165,78,0.10),transparent_34%)]"
            aria-hidden="true"
          />

          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">

              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Closer than you think.
              </h1>

            </div>
          </div>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        <section id="routes" className={EDITORIAL_SECTION_ALT}>
          <Watermark speed={0.12} offsetY="12%" />
          <Shell>
            <EditorialHeading
              kicker="Three ways in"
              title="How long it takes."
              intro="Times are for an ordinary drive in daylight. Allow a little more on a weekend morning, when the road into Naga is busiest."
            />

            <div className="mt-10 border-t border-[#1f3f2e]/12">
              {TRAVEL_ROUTES.map((route, index) => (
                <div
                  key={route.from}
                  data-reveal="up"
                  style={delay(index * 90)}
                  className={`grid items-baseline gap-x-8 gap-y-4 py-8 sm:grid-cols-[auto_minmax(0,1fr)_auto] ${
                    index ? "border-t border-[#1f3f2e]/12" : ""
                  }`}
                >
                  <div className="self-center">
                    <TravelIcon name={route.icon} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">{route.from}</h3>
                    <p className="mt-1.5 text-sm leading-7 xl:text-base xl:leading-8 text-[#667269]">{route.note}</p>
                  </div>
                  {/* Ang oras ang pinakamalaking bagay sa hilera — iyon ang
                      unang hinahanap ng bumibisita. */}
                  <p className="flex items-baseline gap-2 text-[clamp(2.6rem,4vw,3.75rem)] font-normal leading-none tracking-[-0.04em] text-[#265136] sm:justify-self-end">
                    {route.time}
                    <span className="font-navigation text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.16em] text-[#98782f]">
                      {route.unit}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-14">
              {ARRIVAL_NOTES.map((note, index) => (
                <div key={note.title} data-reveal="up" style={delay(index * 110)} className="flex gap-5">
                  <TravelIcon name={note.icon} />
                  <div>
                    <h3 className="font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#98782f]">
                      {note.title}
                    </h3>
                    <p className="mt-2.5 max-w-sm text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]">
                      {note.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        <section className="relative isolate overflow-hidden border-t border-[#1f3f2e]/10 bg-[#1f3f2e] py-14 text-white sm:py-16">
          <div
            data-parallax="0.14"
            className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#c9a54e]/[0.07] blur-3xl"
            aria-hidden="true"
          />
          <Shell>
            <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
              <p data-reveal="up" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#d8b65b]">
                The club
              </p>
              <h2
                data-reveal="up"
                style={delay(90)}
                className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl"
              >
                Where to point the driver.
              </h2>
              <div data-reveal="up" style={delay(180)}>
                <address className="mt-5 not-italic text-sm leading-8 text-white/70 xl:text-base">
                  {CLUB_ADDRESS.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <p className="mt-5 text-sm leading-7 xl:text-base xl:leading-8 text-white/60">
                  Driving yourself and unsure at the turn, or landing and want to be met? Call the club and they will
                  talk you in or send a transfer.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <a
                    href={CLUB_PHONE.href}
                    className="inline-flex h-12 items-center rounded-full bg-[#e7d18d] px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
                  >
                    Call {CLUB_PHONE.label}
                  </a>
                  <Link
                    href="/plan-your-visit"
                    className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-[#e7d18d] hover:text-[#f1d98f]"
                  >
                    Arrange a transfer
                  </Link>
                </div>
              </div>
            </div>
          </Shell>
        </section>
      </main>
      <Footer />
    </>
  );
}
