import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
import TeeTimeBooking from "@/components/TeeTimeBooking";
import { simulatePayments } from "@/lib/booking-server";
import { currentMember } from "@/lib/member-session";
import { todayInManila } from "@/lib/weather";

/**
 * Ang tee-time booking — ang "Reserve a tee time" mula sa /golf.
 *
 * Dynamic: kailangan ang "ngayon" sa Maynila (para sa min ng petsa) at ang
 * naka-login na miyembro (para mapunan agad ang contact).
 */
export const metadata: Metadata = {
  title: "Reserve a tee time | CamSur Uptown Golf",
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
      <main>
        <section id="top" className="relative isolate flex min-h-[380px] items-end overflow-hidden bg-[#1f3f2e] px-6 pb-14 pt-40 text-white sm:min-h-[560px] sm:pb-16 sm:pt-44 lg:px-8">
          <HeroBackdrop src="/hero-images/tee-time-v3-logo.webp" alt="Golf ball printed with the CamSur Uptown Golf logo beside a driver on the morning fairway" imageClassName="object-[60%_center] sm:object-center" />
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b] xl:text-[11px]">Golf</p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              Reserve a tee time.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              Pick your day and time on the course, add what you need, and secure it with a downpayment. The rest is
              settled at the club.
            </p>
          </div>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        <section className="bg-[#f7f5ee] pb-20 pt-6 text-[#14271d]">
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
            <TeeTimeBooking
              today={todayInManila()}
              testMode={simulatePayments()}
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
