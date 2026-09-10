import Image from "next/image";
import Link from "next/link";
import FairwayDivider from "@/components/FairwayDivider";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { CLUB_PHONE } from "@/lib/site-content";

export type PackageDay = {
  label: string;
  title: string;
  intro: string;
  moments: readonly (readonly [string, string])[];
};

type Props = {
  active: "stay-and-play";
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  days: readonly PackageDay[];
  inclusions: readonly string[];
};

const PACKAGE_LINKS = [
  ["stay-and-play", "Stay & Play"],
  ["buddy-trip", "Your Buddy Golf Trip"],
] as const;

export default function PackageItineraryPage({ active, eyebrow, title, description, image, days, inclusions }: Props) {
  return (
    <>
      <main className="bg-[#f7f5ee] text-[#14271d]">
        <ScrollMotion />
        <section className="relative isolate flex min-h-[660px] items-center overflow-hidden bg-[#102a1e] text-white">
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,19,13,0.64)_0%,rgba(5,19,13,0.18)_42%,rgba(5,19,13,0.76)_100%)]" />
          <FairwayDivider fill="#f7f5ee" />
          <div className="mx-auto w-full max-w-7xl px-6 pb-28 pt-44 text-center sm:pb-36 lg:px-8">
            <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.26em] text-[#f1d98f] sm:text-[11px]">{eyebrow}</p>
            <h1 className="mx-auto mt-5 max-w-3xl text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">{title}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78">{description}</p>
          </div>
        </section>

        <section className="overflow-hidden bg-[#f7f5ee] py-14 sm:py-18 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 lg:px-8">
            <aside className="border-[#173b2a]/55 md:border-r md:pr-10">
              <h2 className="text-2xl font-semibold tracking-[-0.025em]">Itineraries</h2>
              <div className="mt-7 h-px w-36 bg-[#173b2a]/70" />
              <nav className="mt-7 space-y-4 font-navigation text-[10px] font-bold uppercase leading-[1.35] tracking-[0.08em] text-[#455249]">
                {PACKAGE_LINKS.map(([slug, label]) => (
                  <Link key={slug} href={`/packages/${slug}`} className={`block transition hover:text-[#2f644b] ${active === slug ? "text-[#2f644b]" : ""}`}>
                    {active === slug ? "— " : ""}{label}
                  </Link>
                ))}
              </nav>
            </aside>

            <div className="min-w-0 md:pt-12">
              <div className="max-w-4xl border-b border-[#173b2a]/18 pb-10">
                <p className="text-sm font-medium leading-7 text-[#46554c]">{description}</p>
                <p className="mt-5 text-sm leading-7 text-[#59665e]">Use this itinerary as a starting point. The club can adjust tee times, meals, accommodation, transfers, and pace around your dates and availability.</p>
                <Link href="/packages" className="mt-7 inline-flex h-10 items-center rounded-full bg-[#2f644b] px-6 font-navigation text-[9px] font-bold uppercase tracking-[0.13em] text-white transition hover:-translate-y-0.5 hover:bg-[#3a765a]">Compare packages</Link>
              </div>
              <div className="max-w-4xl">
                {days.map((day, index) => (
                  <details key={day.label} className="group border-b border-[#173b2a]/25">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 marker:hidden">
                      <span className="font-navigation text-xl font-semibold uppercase tracking-[-0.02em] text-[#24342b] sm:text-2xl">Day {index + 1}</span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#173b2a]/55 transition group-open:rotate-180"><span className="h-2.5 w-2.5 -translate-y-0.5 rotate-45 border-b border-r" /></span>
                    </summary>
                    <div className="pb-8 sm:pr-14">
                      <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.2em] text-[#98782f]">{day.label}</p>
                      <h3 className="mt-3 text-xl font-semibold leading-snug tracking-[-0.025em] sm:text-2xl">{day.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#5d685f]">{day.intro}</p>
                      <div className="mt-6 space-y-4">{day.moments.map(([label, copy]) => <div key={label} className="grid gap-1 sm:grid-cols-[70px_1fr] sm:gap-4"><p className="font-navigation text-[9px] font-bold uppercase tracking-[0.15em] text-[#2f644b]">{label}</p><p className="text-sm leading-7 text-[#59665e]">{copy}</p></div>)}</div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f5ee] py-16 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2 lg:px-8"><div><p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#98782f]">Package starting point</p><h2 className="mt-4 text-[clamp(2rem,3.4vw,3.25rem)] font-medium leading-none tracking-[-0.05em]">What is included.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#5d685f]">Final inclusions and rates depend on dates, availability, accommodation, and number of golfers.</p></div><ul className="divide-y divide-[#173b2a]/10 border-y border-[#173b2a]/10">{inclusions.map((item) => <li key={item} className="flex gap-3 py-4 text-sm leading-7 text-[#46554c]"><span className="text-[#98782f]">✓</span>{item}</li>)}</ul></div></section>
        <section className="bg-[#173b2a] px-6 py-16 text-center text-white"><p className="font-navigation text-[10px] font-bold uppercase tracking-[0.24em] text-[#f1d98f]">Plan your stay</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-[-0.045em] sm:text-4xl">Choose the dates. We’ll shape the trip.</h2><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/#contact" className="inline-flex h-12 items-center rounded-full bg-[#e7d18d] px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]">Request a quote</Link><a href={CLUB_PHONE.href} className="inline-flex h-12 items-center rounded-full border border-white/30 px-7 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] transition hover:border-[#e7d18d] hover:text-[#f1d98f]">Call {CLUB_PHONE.label}</a></div></section>
      </main>
      <Footer />
    </>
  );
}
