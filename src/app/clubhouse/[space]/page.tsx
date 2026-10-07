import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import ClubhouseGallery from "@/components/ClubhouseGallery";
import HeroWords from "@/components/HeroWords";
import { EDITORIAL_SECTION_ALT, EditorialHeading, Shell } from "@/components/EditorialKit";
import { CLUBHOUSE_SPACES } from "@/lib/clubhouse";

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
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return CLUBHOUSE_SPACES.map((space) => ({ space: space.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ space: string }> }): Promise<Metadata> {
  const { space: slug } = await params;
  const space = CLUBHOUSE_SPACES.find((item) => item.id === slug);
  if (!space) return {};
  return {
    title: `${space.name} | CamSur Uptown Golf Club`,
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
        {/* replay: umuulit ang reveal pababa't pataas — walang dead air. */}
        <ScrollMotion replay />

        <section id="top" className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-[#071d13] text-white sm:min-h-[640px]">
          <Image
            src={space.image}
            alt={space.imageAlt}
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,22,15,0.5)_0%,rgba(5,22,15,0.12)_42%,rgba(5,22,15,0.86)_100%)]"
            aria-hidden="true"
          />
          <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-56 sm:px-10 sm:pb-20 lg:px-12 xl:max-w-5xl">
            {/* Word-by-word na pagpasok sa pag-load (HeroWords). Inalis ang
                `data-reveal="up"`: iisa na lang ang entrance, ang word-by-word. */}
            <h1 className="max-w-3xl text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[0.98] tracking-[-0.05em]">
              <HeroWords text={space.name} />
            </h1>
          </div>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        <section className="relative isolate bg-[#f7f5ee] pt-10 pb-6 sm:pt-12 sm:pb-8">
          <Shell>
            <p
              data-reveal="up"
              className="mx-auto max-w-3xl text-center text-base leading-8 text-[#14271d] sm:text-lg sm:leading-9"
            >
              {space.description}
            </p>
          </Shell>
        </section>

        {/* Wala pang dagdag na render ang ibang espasyo sa dokumento, kaya
            nawawala nang buo ang section na ito sa halip na mag-iwan ng
            blangkong ulo.

            Scrollytelling ang mga kuha — kapareho ng mga kuwarto sa
            `/clubhouse`. Ang ulo ay nasa walang-overflow na section (sinisira
            ng overflow-hidden ang sticky), at sariling seksyon na ang mga
            larawan sa ClubhouseGallery. */}
        {space.gallery.length > 0 ? (
          <>
            <section className="relative isolate scroll-mt-24 bg-[#f7f5ee] pt-4 pb-10 sm:pt-6 sm:pb-14">
              <Shell>
                <EditorialHeading size="lg" kicker="" title={`More of ${space.name.toLowerCase()}.`} />
              </Shell>
            </section>

            <ClubhouseGallery label={space.name} shots={space.gallery} />
          </>
        ) : null}

        <section className={EDITORIAL_SECTION_ALT}>
          <Shell>
            <EditorialHeading
              size="lg"
              kicker=""
              title="Come and see it."
              intro="Opening hours, dress code, and visitor access are still being finalized. Plan your visit and we’ll help you prepare."
            />

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/plan-your-visit"
                data-reveal="up"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#e7d18d] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] xl:text-[11px]"
              >
                Plan your visit
              </Link>
            </div>
          </Shell>
        </section>

        {/* Pabalik-balik sa anim na kuwarto, gaya ng sa mga butas ng golf. */}
        <nav aria-label="Other rooms" className="grid border-t border-[#1f3f2e]/10 sm:grid-cols-2">
          {[
            { space: previous, label: "Previous" },
            { space: next, label: "Next" },
          ].map(({ space: other, label }) => (
            <Link
              key={label}
              href={`/clubhouse/${other.id}`}
              className="group relative min-h-64 overflow-hidden border-b border-white/15 sm:border-b-0 sm:[&:first-child]:border-r"
            >
              <Image
                src={other.image}
                alt=""
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className="-z-20 object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <span
                className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,20,13,0.42)_0%,rgba(4,20,13,0.82)_100%)]"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 p-8 text-white sm:p-10">
                <span className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#e7d18d] xl:text-[11px]">
                  {label}
                </span>
                <span className="mt-3 block text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{other.name}</span>
              </span>
            </Link>
          ))}
        </nav>
      </main>
      <Footer />
    </>
  );
}
