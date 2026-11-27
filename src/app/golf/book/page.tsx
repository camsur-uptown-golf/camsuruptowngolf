import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
import TeeTimeBooking from "@/components/TeeTimeBooking";
import { simulatePayments } from "@/lib/booking-server";
import { paymentMethods } from "@/lib/payments";
import { currentMember } from "@/lib/member-session";
import { todayInManila } from "@/lib/weather";
import { TEE_TIME_HERO } from "@/lib/tee-time-hero";

/**
 * Ang tee-time booking — ang "Reserve your round" mula sa /golf.
 *
 * Dynamic: kailangan ang "ngayon" sa Maynila (para sa min ng petsa) at ang
 * naka-login na miyembro (para mapunan agad ang contact).
 */
export const metadata: Metadata = {
  title: "Reserve your round | CamSur Uptown Golf",
  description: "Choose your date, round, and tee time at CamSur Uptown Golf, add a caddie or a night at Villa Del Rey, and secure it with a downpayment.",
};

export const dynamic = "force-dynamic";

export default async function BookTeeTimePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const member = await currentMember();
  const query = await searchParams;
  const one = (key: string) => (typeof query[key] === "string" ? (query[key] as string) : undefined);
  const roundParam = one("round");
  const initial = {
    date: /^\d{4}-\d{2}-\d{2}$/.test(one("date") ?? "") ? one("date") : undefined,
    round: roundParam === "front" || roundParam === "back" || roundParam === "full" ? roundParam : undefined,
    players: Number(one("players")) || undefined,
  } as const;
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        {/* Extend the photograph below the copy before it fades into cream.
            Matching bottom padding keeps the title at its existing height. */}
        <section id="top" className="relative isolate flex min-h-[400px] items-end overflow-hidden bg-[#03321b] px-6 pb-28 pt-32 text-white sm:min-h-[640px] sm:pb-52 sm:pt-36 lg:min-h-[800px] lg:px-8 lg:pb-84">
          <HeroBackdrop {...TEE_TIME_HERO} alt="Golf ball printed with the CamSur Uptown Golf logo beside a driver on the morning fairway" />
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#e2c77a] sm:text-sm">Golf</p>
            <h1 className="mt-3 font-display text-[clamp(2.75rem,5.2vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              Reserve your round.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-7">
              Pick your day and time on the course, add what you need, and secure it with a downpayment. The rest is
              settled at the club.
            </p>
          </div>
        </section>

        <div className="bg-[#f3ede1]">
          <Breadcrumbs />
        </div>

        {/* Malapad (`max-w-[1600px]`, makitid na gutter) — kapareho ng /golf at
            /plan-your-visit — para hindi masayang ang puwang sa kaliwa at kanan. */}
        <section className="bg-[#f3ede1] pb-16 pt-4 text-[#03321b] sm:pb-20">
          <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
            <TeeTimeBooking
              today={todayInManila()}
              testMode={simulatePayments()}
              methods={paymentMethods()}
              initial={initial}
              prefill={member ? { name: `${member.firstName} ${member.lastName}`.trim(), email: member.email, phone: member.mobile ?? "" } : null}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
