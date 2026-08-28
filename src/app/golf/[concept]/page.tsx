import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { CONCEPTS } from "@/lib/site-content";

export const dynamicParams = false;

export function generateStaticParams() {
  return CONCEPTS.map((concept) => ({ concept: concept.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ concept: string }> }): Promise<Metadata> {
  const { concept: slug } = await params;
  const concept = CONCEPTS.find((item) => item.slug === slug);
  return concept ? { title: `${concept.title} | CamSur Uptown Golf Club`, description: concept.description } : {};
}

export default async function ConceptPage({ params }: { params: Promise<{ concept: string }> }) {
  const { concept: slug } = await params;
  const index = CONCEPTS.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const concept = CONCEPTS[index];
  const previous = CONCEPTS[(index - 1 + CONCEPTS.length) % CONCEPTS.length];
  const next = CONCEPTS[(index + 1) % CONCEPTS.length];

  return (
    <>
      <main>
        <section id="top" className="relative isolate min-h-[78svh] overflow-hidden bg-[#071d13] text-white">
          <Image src={concept.image} alt={`${concept.title} concept`} fill priority sizes="100vw" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,20,13,0.66)_0%,rgba(4,20,13,0.12)_48%,rgba(4,20,13,0.86)_100%)]" />
          <div className="mx-auto flex min-h-[78svh] max-w-7xl items-end px-6 pb-14 pt-64 lg:px-8 lg:pb-20">
            <div className="max-w-4xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e1c56e]">Course concept {String(index + 1).padStart(2, "0")} / 10</p>
              <h1 className="mt-4 text-[clamp(3.25rem,7vw,7rem)] font-medium leading-[0.9] tracking-[-0.065em]">{concept.title}</h1>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 text-[#14271d] sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">The vision</p>
              <h2 className="mt-4 text-4xl font-medium leading-none tracking-[-0.055em] sm:text-5xl">Concept {String(index + 1).padStart(2, "0")}</h2>
            </div>
            <div>
              <p className="text-xl leading-9 text-[#506058] sm:text-2xl sm:leading-10">{concept.description}</p>
              <p className="mt-6 text-base leading-8 text-[#6a756f]">This image is part of the initial visual direction for CamSur Uptown Golf Club. Course planning, architecture, landscaping, and guest experiences shown here remain conceptual and may evolve during development.</p>
              <Link href="/#contact" className="mt-8 inline-flex rounded-full bg-[#174630] px-7 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#0f3825]">Plan your round →</Link>
            </div>
          </div>
        </section>

        <nav aria-label="Concept navigation" className="grid bg-[#f3f0e7] sm:grid-cols-2">
          <Link href={`/golf/${previous.slug}`} className="group relative min-h-72 overflow-hidden border-b border-white/15 sm:border-b-0 sm:border-r">
            <Image src={previous.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#071d13]/65 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">← Previous concept</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{previous.title}</p>
            </div>
          </Link>
          <Link href={`/golf/${next.slug}`} className="group relative min-h-72 overflow-hidden">
            <Image src={next.image} alt="" fill sizes="50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
            <div className="absolute inset-0 bg-[#071d13]/65 transition group-hover:bg-[#071d13]/48" />
            <div className="absolute inset-0 flex flex-col items-end justify-end p-8 text-right text-white sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1c56e]">Next concept →</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">{next.title}</p>
            </div>
          </Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}
