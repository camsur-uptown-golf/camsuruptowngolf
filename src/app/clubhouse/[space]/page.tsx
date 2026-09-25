import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION, EditorialHeading, Shell, delay } from "@/components/EditorialKit";
import { CLUBHOUSE_SPACES, roomCountWord } from "@/lib/clubhouse";
import { CLUB_PHONE } from "@/lib/site-content";

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
        <ScrollMotion />

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
            <h1
              data-reveal="up"
              className="max-w-3xl text-[clamp(2.25rem,4.5vw,4rem)] font-medium leading-[0.98] tracking-[-0.05em]"
            >
              {space.name}
            </h1>
          </div>
        </section>

        <div className="bg-[#ffffff]">
          <Breadcrumbs />
        </div>

        <section className={EDITORIAL_SECTION}>
          <Shell>
            <p
              data-reveal="up"
              className="mx-auto max-w-3xl text-base leading-8 text-[#14271d] sm:text-lg sm:leading-9"
            >
              {space.description}
            </p>

            <p data-reveal="up" style={delay(120)} className="mt-8 text-center">
              <Link
                href="/clubhouse"
                className="inline-flex items-center gap-2 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#98782f] transition-colors hover:text-[#265136] xl:text-[11px]"
              >
                <span aria-hidden="true">←</span> All {roomCountWord().toLowerCase()} rooms
              </Link>
            </p>
          </Shell>
        </section>

        {/* Wala pang dagdag na render ang ibang espasyo sa dokumento, kaya
            nawawala nang buo ang section na ito sa halip na mag-iwan ng
            blangkong ulo. */}
        {space.gallery.length > 0 ? (
          <section className={EDITORIAL_SECTION}>
            <Shell>
              <EditorialHeading kicker="In detail" title={`More of ${space.name.toLowerCase()}.`} />

              <div className="mt-12 space-y-10 sm:mt-14 sm:space-y-14">
                {space.gallery.map((shot, shotIndex) => (
                  <figure key={shot.src} data-reveal="up" style={delay(shotIndex * 90)}>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-[#1f3f2e]">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 1023px) calc(100vw - 3rem), 960px"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-4 text-sm leading-7 text-[#5d685f]">{shot.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </Shell>
          </section>
        ) : null}

        <section className={EDITORIAL_SECTION}>
          <Shell>
            <EditorialHeading
              kicker="Plan a visit"
              title="Come and see it."
              intro="Opening hours, dress code, and which rooms visitors can use are not settled yet — call the club and we will tell you what is."
            />

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/plan-your-visit"
                data-reveal="up"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#265136] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#1f3f2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#265136] xl:text-[11px]"
              >
                Plan your visit
              </Link>
              <a
                href={CLUB_PHONE.href}
                data-reveal="up"
                style={delay(90)}
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#1f3f2e]/20 px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.1em] text-[#14271d] transition-colors hover:border-[#265136] hover:text-[#265136] xl:text-[11px]"
              >
                {CLUB_PHONE.label}
              </a>
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
