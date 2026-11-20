import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import ClubhouseGallery from "@/components/ClubhouseGallery";
import HeroWords from "@/components/HeroWords";
import { CLUBHOUSE_SPACES } from "@/lib/clubhouse";
import CtaPanel from "@/components/CtaPanel";

/**
 * Ang sariling pahina ng bawat espasyo sa clubhouse.
 *
 * Ang `id` sa CLUBHOUSE_SPACES ang slug dito, kaya hindi kailangang
 * panatilihin ang pangalawang listahan. Ang laman ay ang mismong render
 * ng espasyong iyon sa concept ng VM·STUDIO at wala nang iba.
 *
 * Magkatabi ito ng `/clubhouse/architecture`, na static na segment —
 * nauuna ang static sa dynamic sa Next, kaya hindi ito nag-aagawan.
 * Kaya nga hindi kasama ang "architecture" sa `generateStaticParams`.
 *
 * Iisang gilid ang buong pahina (`CONTAINER` — kapareho ng Breadcrumbs,
 * Footer, at /clubhouse).
 */
const CONTAINER = "mx-auto w-full max-w-7xl px-6 lg:px-8";
const EYEBROW = "font-navigation text-xs font-semibold uppercase tracking-[0.24em] sm:text-sm";
export const dynamicParams = false;

export function generateStaticParams() {
  return CLUBHOUSE_SPACES.map((space) => ({ space: space.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ space: string }> }): Promise<Metadata> {
  const { space: slug } = await params;
  const space = CLUBHOUSE_SPACES.find((item) => item.id === slug);
  if (!space) return {};
  return {
    title: `${space.name} | CamSur Uptown Golf`,
    description: space.description,
  };
}

export default async function ClubhouseSpacePage({ params }: { params: Promise<{ space: string }> }) {
  const { space: slug } = await params;
  const index = CLUBHOUSE_SPACES.findIndex((item) => item.id === slug);
  if (index === -1) notFound();

  const space = CLUBHOUSE_SPACES[index];
  const previous = CLUBHOUSE_SPACES[(index - 1 + CLUBHOUSE_SPACES.length) % CLUBHOUSE_SPACES.length];
  const next = CLUBHOUSE_SPACES[(index + 1) % CLUBHOUSE_SPACES.length];

  return (
    <>
      <main>
        {/* One-time reveals: once visible, content stays visible and never
            reverses when the user scrolls back up. */}
        <ScrollMotion />

        {/* HERO. Walang madilim na patong sa buong larawan: maikling lilim sa
            itaas (para mabasa ang menu at logo) at sa ibaba (sa likod ng
            pamagat) lang. Ang gitna ng render ay walang patong. */}
        <section id="top" className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-[#071d13] text-white sm:min-h-[680px]">
          <Image src={space.image} alt={space.imageAlt} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(180deg,rgba(7,23,15,0.62)_0%,rgba(7,23,15,0.36)_50%,transparent_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.3)_45%,rgba(7,23,15,0.7)_100%)]"
            aria-hidden="true"
          />
          <div className={`${CONTAINER} pb-12 pt-56 [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_14px_rgba(0,0,0,0.55)] sm:pb-16`}>
            <p className={`${EYEBROW} text-[#f0d98f]`}>{space.floor}</p>
            {/* Word-by-word na pagpasok sa pag-load (HeroWords). */}
            <h1 className="mt-3 max-w-4xl font-display text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em]">
              <HeroWords text={space.name} />
            </h1>
          </div>
        </section>

        <div className="bg-[#f3ede1]">
          <Breadcrumbs />
        </div>

        {/* Paglalarawan + mga tampok. Kapag walang features ang espasyo
            (locker rooms, showers), mag-isa ang paglalarawan. */}
        <section className="relative isolate bg-[#f3ede1] pb-10 pt-6 text-[#03321b] sm:pb-14 sm:pt-8">
          <div className={`${CONTAINER} grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-20`}>
            <div>
              <p data-reveal="up" className={`${EYEBROW} text-[#7d6224]`}>
                The space
              </p>
              <p
                data-reveal="up"
                className="mt-3 max-w-2xl text-[13px] font-normal leading-6 text-[#3f4c45]"
              >
                {space.description}
              </p>
            </div>
            {space.features.length > 0 ? (
              <div data-reveal="up" className="lg:pt-1">
                <p className={`${EYEBROW} text-[#7d6224]`}>What’s here</p>
                <ul className="mt-4 border-t border-[#03321b]/12">
                  {space.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 border-b border-[#03321b]/12 py-3 text-[15px] text-[#3f4c45]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#b8963f]" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>

        {/* Wala pang dagdag na render ang ibang espasyo sa dokumento, kaya
            nawawala nang buo ang section na ito. Walang ulo ang gallery
            ("Gallery / More of …") — tuloy agad ang mga larawan. */}
        {space.gallery.length > 0 ? <ClubhouseGallery label={space.name} shots={space.gallery} /> : null}

        {/* Pangwakas na CTA: berdeng panel sa loob ng cream — kapareho ng
            dulo ng /clubhouse. */}
        <section className="relative isolate bg-[#f3ede1] py-16 sm:py-20 lg:py-24">
          <div className={CONTAINER}>
            <CtaPanel
              reveal
              eyebrow="Visit the club"
              title="Come and see it."
              text="Plan your visit and the team will send opening hours, dress code, and visitor access before your day."
              primary={{ label: "Plan your visit", href: "/plan-your-visit" }}
            />
          </div>
        </section>

        {/* Pabalik-balik sa mga kuwarto, gaya ng sa mga butas ng golf. Lilim sa
            ibaba lang ng bawat larawan, hindi sa buong tile. */}
        <nav aria-label="Other rooms" className="grid sm:grid-cols-2">
          {[
            { space: previous, label: "Previous" },
            { space: next, label: "Next" },
          ].map(({ space: other, label }) => (
            <Link
              key={label}
              href={`/clubhouse/${other.id}`}
              className="group relative isolate block aspect-[16/10] overflow-hidden bg-[#071d13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#e2c77a] sm:aspect-[16/9]"
            >
              <Image
                src={other.image}
                alt=""
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className="-z-20 object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <span
                className="absolute inset-x-0 bottom-0 -z-10 h-3/5 bg-[linear-gradient(180deg,transparent_0%,rgba(7,23,15,0.3)_45%,rgba(7,23,15,0.7)_100%)]"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 block p-6 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.85),0_2px_14px_rgba(0,0,0,0.55)] sm:p-8 lg:p-10">
                <span className={`${EYEBROW} block text-[#f0d98f]`}>{label}</span>
                <span className="mt-2 block font-display text-[clamp(1.75rem,3vw,3rem)] font-medium leading-[1] tracking-[-0.04em]">
                  {other.name}
                </span>
              </span>
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
