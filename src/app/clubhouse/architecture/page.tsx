import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION, EditorialHeading, Shell, delay } from "@/components/EditorialKit";
import {
  CLUBHOUSE_APPROACH,
  CLUBHOUSE_AREAS,
  CLUBHOUSE_BRIEF,
  CLUBHOUSE_CLIENT_BRIEF,
  CLUBHOUSE_CONCEPT_NOTE,
  CLUBHOUSE_DESIGNER,
  CLUBHOUSE_GROSS_TOTAL,
  CLUBHOUSE_MATERIALS,
  CLUBHOUSE_MOOD,
  CLUBHOUSE_PALETTE,
} from "@/lib/clubhouse";

export const metadata: Metadata = {
  title: "Clubhouse Architecture | CamSur Uptown Golf Club",
  description:
    "The architectural concept behind the CamSur Uptown clubhouse by VM·STUDIO — the brief, the approach, the material palette and the area schedule.",
};

/**
 * Ang kuwento ng disenyo ng clubhouse.
 *
 * Hiwalay ito sa `/clubhouse` sa sadyang dahilan: ang nandoon ay kung ano
 * ang nasa loob ng gusali — iyon ang hinahanap ng bisita. Ang nandito ay
 * materyal ng arkitekto: brief, palette, at area schedule sa metro
 * kuwadrado. Kapansin-pansin iyon sa gitna ng isang pahinang pambisita,
 * pero may sariling halaga bilang sariling pahina.
 *
 * Ang pinagmulan ng bawat numero ay nasa `lib/clubhouse.ts`.
 */
export default function ClubhouseArchitecturePage() {
  return (
    <>
      <main>
        <ScrollMotion />

        <section className="relative isolate overflow-hidden bg-[#071d13] pb-16 pt-44 text-white sm:pb-20 sm:pt-52">
          <Shell>
            <p data-reveal="up" className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#e1c56e] xl:text-[11px]">
              Architectural concept
            </p>
            <h1
              data-reveal="up"
              style={delay(110)}
              className="mt-5 max-w-3xl text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[0.98] tracking-[-0.05em]"
            >
              A landscape that became a building.
            </h1>
            <p data-reveal="up" style={delay(200)} className="mt-6 max-w-2xl text-sm leading-7 text-white/65 xl:text-base xl:leading-8">
              {CLUBHOUSE_BRIEF}
            </p>
            <Link
              href="/clubhouse"
              data-reveal="up"
              style={delay(280)}
              className="mt-8 inline-flex items-center gap-2 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#e1c56e] transition-colors hover:text-white xl:text-[11px]"
            >
              <span aria-hidden="true">←</span> Back to the clubhouse
            </Link>
          </Shell>
        </section>

        <div className="bg-[#ffffff]">
          <Breadcrumbs />
        </div>

        <section className={EDITORIAL_SECTION}>
          <Shell>
            <EditorialHeading kicker="The approach" title="What the club asked for." />

            <blockquote
              data-reveal="up"
              style={delay(120)}
              className="mx-auto mt-8 max-w-3xl border-l-2 border-[#98782f]/40 pl-6 text-base leading-8 text-[#14271d] sm:mt-10 sm:text-lg sm:leading-9"
            >
              {CLUBHOUSE_CLIENT_BRIEF}
            </blockquote>

            <div className="mt-12 grid gap-8 sm:mt-14 sm:grid-cols-3 sm:gap-10">
              {CLUBHOUSE_APPROACH.map((item, index) => (
                <div key={item.label} data-reveal="up" style={delay(index * 110)}>
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] xl:text-[11px]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[#5d685f]">{item.text}</p>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        <section className={EDITORIAL_SECTION}>
          <Shell>
            {/* Ang kicker ay ang pangalan mismo ng mood board sa zoning deck. */}
            <EditorialHeading
              kicker={CLUBHOUSE_MOOD}
              title="Four materials, warm and quiet."
              intro="A single tactile family runs from structure to detail — stone, timber and bronze, softened by plaster, wool and glass."
            />

            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[#1f3f2e]/10 bg-[#1f3f2e]/10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
              {CLUBHOUSE_MATERIALS.map((material, index) => (
                <div key={material.name} data-reveal="up" style={delay(index * 80)} className="bg-white p-6 sm:p-7">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#98782f] xl:text-[11px]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-lg font-medium tracking-[-0.035em] text-[#14271d]">{material.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#5d685f]">{material.note}</p>
                </div>
              ))}
            </div>

            {/* Pito ang buong palette, apat ang may sariling paliwanag sa
                dokumento. Nakalista ang tatlong natira para buo ang listahan. */}
            <p
              data-reveal="up"
              style={delay(360)}
              className="mt-6 text-center font-navigation text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5d685f] xl:text-[11px]"
            >
              Full palette · {CLUBHOUSE_PALETTE.join(" · ")}
            </p>
          </Shell>
        </section>

        <section className={EDITORIAL_SECTION}>
          <Shell>
            <EditorialHeading
              kicker="Area schedule"
              title="Every space, in square metres."
              intro="Gross internal areas by zone, across the three floors of the concept."
            />

            <div className="mt-12 grid gap-6 sm:mt-14 lg:grid-cols-3">
              {CLUBHOUSE_AREAS.map((floor, index) => (
                <div
                  key={floor.floor}
                  data-reveal="up"
                  style={delay(index * 100)}
                  className="rounded-2xl border border-[#1f3f2e]/10 bg-white p-6 sm:p-7"
                >
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#98782f] xl:text-[11px]">
                    {floor.floor}
                  </p>
                  <dl className="mt-5">
                    {floor.rows.map(([room, area]) => (
                      <div
                        key={room}
                        className="flex items-baseline justify-between gap-4 border-b border-[#1f3f2e]/8 py-2.5 text-sm"
                      >
                        <dt className="text-[#56625b]">{room}</dt>
                        <dd className="shrink-0 font-navigation text-[12px] font-semibold tabular-nums text-[#14271d]">
                          {area} m²
                        </dd>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between gap-4 pt-4">
                      <dt className="font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] xl:text-[11px]">
                        Subtotal
                      </dt>
                      <dd className="font-display text-xl font-medium tabular-nums tracking-[-0.03em] text-[#14271d]">
                        {floor.subtotal.toLocaleString()} m²
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            <div
              data-reveal="up"
              style={delay(320)}
              className="mt-6 flex items-baseline justify-between gap-4 rounded-2xl bg-[#1f3f2e] px-6 py-6 text-white sm:px-8"
            >
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#d8b65b] xl:text-[11px]">
                Gross total
              </p>
              <p className="font-display text-3xl font-medium tabular-nums tracking-[-0.04em] sm:text-4xl">
                {CLUBHOUSE_GROSS_TOTAL.toLocaleString()} m²
              </p>
            </div>
          </Shell>
        </section>

        <section className={EDITORIAL_SECTION}>
          <Shell>
            <div className="rounded-2xl border border-[#1f3f2e]/10 bg-white p-8 text-center sm:p-12">
              <p
                data-reveal="up"
                className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]"
              >
                Architecture, interiors and landscape by
              </p>
              <p
                data-reveal="up"
                style={delay(90)}
                className="mt-4 font-display text-3xl font-medium tracking-[-0.04em] text-[#14271d] sm:text-4xl"
              >
                {CLUBHOUSE_DESIGNER.name}
              </p>
              <p data-reveal="up" style={delay(160)} className="mt-4 text-sm leading-7 text-[#5d685f]">
                {CLUBHOUSE_DESIGNER.practice}. {CLUBHOUSE_DESIGNER.based}.
              </p>
              <a
                data-reveal="up"
                style={delay(200)}
                href={CLUBHOUSE_DESIGNER.websiteHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#98782f] transition-colors hover:text-[#265136] xl:text-[11px]"
              >
                {CLUBHOUSE_DESIGNER.website} <span aria-hidden="true">↗</span>
              </a>
              <p
                data-reveal="up"
                style={delay(260)}
                className="mx-auto mt-6 max-w-lg border-t border-[#1f3f2e]/10 pt-6 text-xs leading-6 text-[#7a847d]"
              >
                {CLUBHOUSE_CONCEPT_NOTE}
              </p>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/clubhouse"
                data-reveal="up"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#265136] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#1f3f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#265136] xl:text-[11px]"
              >
                See what is inside
              </Link>
            </div>
          </Shell>
        </section>
      </main>
      <Footer />
    </>
  );
}
