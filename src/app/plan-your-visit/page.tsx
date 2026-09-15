import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import RequestCallback from "@/components/RequestCallback";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, SectionHeading } from "@/components/SectionKit";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * Ang pupuntahan ng bawat "Plan your visit", "Plan your round", at "Plan your
 * stay" sa buong site.
 *
 * Dati silang lahat tumuturo sa /#contact — ang footer, kung saan newsletter
 * at numero lang ang naroon. Walang paraan doon para talagang magpaplano ng
 * pagbisita, kaya patay na pangako ang bawat isa sa kanila.
 *
 * Maikli ang header nang sadya: pahina ito ng pagkilos, at ang form ang
 * dahilan kung bakit narito ang tao.
 */
export const metadata: Metadata = {
  title: "Plan your visit | CamSur Uptown Golf Club",
  description:
    "Tell the club when you would like to play or stay, and the team will call you back within 48 hours at the time you choose.",
};

export default function PlanYourVisitPage() {
  return (
    <>
      <main>
        <ScrollMotion />

        <section id="top" className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-[#14271d] px-6 pb-16 pt-40 text-white sm:min-h-[700px] sm:pb-20 lg:min-h-[760px] lg:px-12">
          <Image
            src="/plan-your-visit-hero-v1.png"
            alt="Guests arriving with golf bags at the clubhouse drop-off entrance"
            fill
            preload
            sizes="100vw"
            className="-z-20 object-cover object-[58%_center] sm:object-center"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#07170f]/90 via-[#07170f]/30 to-[#07170f]/35" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#07170f]/45 via-transparent to-transparent" aria-hidden="true" />

          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#f1d98f] xl:text-[11px]">
                Plan your visit
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Let us shape the day around you.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                Whether it is a round, a stay, a group trip, or an event, tell us what you have in mind and the club will
                call you back within 48 hours — at the time you choose.
              </p>
              <a
                href={CLUB_PHONE.href}
                className="mt-7 inline-flex h-11 items-center gap-2.5 rounded-full border border-white/55 bg-[#10271b]/30 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#e7d18d] hover:bg-[#10271b]/60 hover:text-[#f1d98f] sm:text-[11px]"
              >
                Or call {CLUB_PHONE.label}
              </a>
            </div>
          </div>
        </section>

        <section id="request-call-back" className="scroll-mt-24 bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Request a call back"
              title="Tell us about your visit."
              intro="A few details are enough. Nothing here is a commitment — the club simply calls you back to talk it through."
            />
            <div className="mt-10">
              <RequestCallback context="Plan your visit" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
