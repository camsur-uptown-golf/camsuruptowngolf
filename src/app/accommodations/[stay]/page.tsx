import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClubhouseVision from "@/components/ClubhouseVision";
import FairwayVillasVision from "@/components/FairwayVillasVision";
import Footer from "@/components/Footer";
import { ACCOMMODATIONS } from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return ACCOMMODATIONS.map((stay) => ({ stay: stay.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ stay: string }> }): Promise<Metadata> {
  const { stay: slug } = await params;
  const stay = ACCOMMODATIONS.find((item) => item.slug === slug);
  return stay
    ? {
        title: `${stay.title} | CamSur Uptown Golf Club`,
        description: stay.description,
      }
    : {};
}

export default async function AccommodationPage({ params }: { params: Promise<{ stay: string }> }) {
  const { stay: slug } = await params;
  const index = ACCOMMODATIONS.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const stay = ACCOMMODATIONS[index];
  const previous = ACCOMMODATIONS[(index - 1 + ACCOMMODATIONS.length) % ACCOMMODATIONS.length];
  const next = ACCOMMODATIONS[(index + 1) % ACCOMMODATIONS.length];

  return (
    <>
      <main>
        <section id="top" className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-[#071d13] text-white">
          <Image
            src={stay.image}
            alt={`${stay.title} accommodation concept at CamSur Uptown`}
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,20,13,0.48)_0%,rgba(4,20,13,0.08)_40%,rgba(4,20,13,0.88)_100%)]" />
          <div className="mx-auto w-full max-w-7xl px-6 pb-14 pt-64 lg:px-8 lg:pb-20">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e1c56e]">{stay.eyebrow}</p>
            <h1 className="mt-4 max-w-5xl text-[clamp(3.4rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.065em]">{stay.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">{stay.description}</p>
          </div>
        </section>

        <section className="bg-white py-20 text-[#14271d] sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">The experience</p>
              <h2 className="mt-4 text-[clamp(2.6rem,4.5vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.06em]">{stay.tagline}</h2>
            </div>
            <div className="lg:pt-8">
              <p className="text-xl leading-9 text-[#506058] sm:text-2xl sm:leading-10">{stay.overview}</p>
              <p className="mt-6 text-sm leading-7 text-[#6a756f] sm:text-base sm:leading-8">
                This accommodation is part of the current CamSur Uptown development concept. Final design, amenities, and availability may change as planning continues.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/#contact" className="inline-flex h-12 items-center rounded-full bg-[#174630] px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#0f3825]">
                  Inquire about your stay
                </Link>
                <Link href="/accommodations" className="inline-flex h-12 items-center rounded-full border border-[#174630]/25 px-7 text-[11px] font-bold uppercase tracking-[0.12em] text-[#174630] transition hover:border-[#174630]">
                  View all stays
                </Link>
              </div>
            </div>
          </div>
        </section>

        {stay.slug === "fairway-villas" ? <FairwayVillasVision /> : null}
        {stay.slug === "clubhouse-lodge" ? <ClubhouseVision /> : null}

        <section className="bg-[#f3f0e7] py-20 text-[#14271d] sm:py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">What to expect</p>
              <h2 className="mt-4 text-[clamp(2.5rem,4.5vw,4.75rem)] font-medium leading-[0.96] tracking-[-0.055em]">Designed for a comfortable CamSur stay.</h2>
            </div>

            <div className="mt-12 grid border-y border-[#173b2a]/15 md:grid-cols-3 lg:mt-16">
              {stay.features.map((feature, featureIndex) => (
                <article key={feature.title} className={`py-8 md:px-8 ${featureIndex ? "border-t border-[#173b2a]/15 md:border-l md:border-t-0" : "md:pl-0"}`}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">{String(featureIndex + 1).padStart(2, "0")}</p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-[#174630]">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#5d685f] sm:text-base">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <nav aria-label="Accommodation navigation" className="grid bg-[#071d13] sm:grid-cols-2">
          <Link href={`/accommodations/${previous.slug}`} className="group relative min-h-80 overflow-hidden border-b border-white/15 sm:border-b-0 sm:border-r">
            <Image src={previous.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#071d13]/62 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">← Previous stay</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{previous.title}</p>
            </div>
          </Link>
          <Link href={`/accommodations/${next.slug}`} className="group relative min-h-80 overflow-hidden">
            <Image src={next.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#071d13]/62 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col items-end justify-end p-8 text-right text-white sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">Next stay →</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{next.title}</p>
            </div>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
