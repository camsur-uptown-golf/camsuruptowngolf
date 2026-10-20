import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
import ReservationActions from "@/components/ReservationActions";
import Tr from "@/components/Tr";
import { ADDONS, COURSE, VILLA_NIGHTS, formatTime, toMinutes, toTime } from "@/lib/golf-booking";
import { simulatePayments } from "@/lib/booking-server";
import { formatPeso } from "@/lib/membership-plans";
import { getReservation } from "@/lib/reservations-db";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * Ang pahina ng isang reservation, sa pamamagitan ng code nito (CU-XXXXXXXXXX).
 * Dito bumabalik ang guest mula sa PayMongo, at ito ang link na itatago niya.
 *
 * Mahirap hulaan ang code (10 random na titik), kaya ito na rin ang "susi"
 * para makita ang reservation. Hindi ito ini-index ng search engine.
 */
export const metadata: Metadata = {
  title: "Your tee time | CamSur Uptown Golf",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS = {
  confirmed: { label: "Confirmed", tone: "bg-[#265136] text-[#f3dda0]", title: "You’re on the tee sheet." },
  held: { label: "Awaiting downpayment", tone: "bg-[#e7d18d] text-[#14271d]", title: "Almost there — complete your downpayment." },
  expired: { label: "Expired", tone: "bg-[#1f3f2e]/10 text-[#5d685f]", title: "This hold has expired." },
  cancelled: { label: "Cancelled", tone: "bg-[#1f3f2e]/10 text-[#5d685f]", title: "This booking was cancelled." },
} as const;

export default async function ReservationPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const reservation = getReservation(code);
  if (!reservation) notFound();

  const state = STATUS[reservation.status];
  const villa = VILLA_NIGHTS.find((v) => v.slug === reservation.villaSlug);
  /* Kaparehong salita ng Step 2 sa booking form. */
  const roundLabel =
    reservation.holes === 18 ? "Full course · Holes 1–18" : reservation.tee === 1 ? "Front nine · Holes 1–9" : "Back nine · Holes 10–18";
  const finish = toTime(toMinutes(reservation.time) + COURSE.durationMinutes[reservation.holes]);
  const day = new Date(`${reservation.date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const rows: [string, string][] = [
    ["Date", day],
    ["Tee time", `${formatTime(reservation.time)} · Hole ${reservation.tee} start`],
    ["Round", `${roundLabel} · finishes around ${formatTime(finish)}`],
    ["Players", reservation.playerNames.join(", ")],
    ...ADDONS.filter((addon) => (reservation.addons[addon.id] ?? 0) > 0).map(
      (addon) => [addon.name, `× ${reservation.addons[addon.id]}`] as [string, string],
    ),
    ...(villa ? ([["Villa Del Rey", `${villa.name} · night of ${day}`]] as [string, string][]) : []),
  ];

  return (
    <>
      <main className="bg-[#f7f5ee] text-[#14271d]">
        <section id="top" className="relative isolate min-h-[380px] overflow-hidden bg-[#1f3f2e] px-6 pb-14 pt-64 text-center text-white sm:min-h-[560px] sm:pb-16 sm:pt-72 lg:px-8">
          <HeroBackdrop src="/hero-images/tee-time-v3-logo.webp" alt="Golf ball printed with the CamSur Uptown Golf logo and driver ready for a morning tee time" imageClassName="object-[60%_center] sm:object-center" />
          <span className={`inline-flex rounded-full px-3 py-1 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] ${state.tone}`}>
            {state.label}
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-[1] tracking-[-0.05em]">
            {state.title}
          </h1>
          <p className="mt-4 text-sm text-white/70">
            <Tr t="Booking reference {0}" v={[<span key="c" translate="no" className="font-semibold text-[#f3dda0]">{reservation.code}</span>]} />
          </p>
        </section>

        <section className="px-6 py-14 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="border border-[#1f3f2e]/12 bg-white p-7 sm:p-8">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]">Your booking</p>
              <dl className="mt-5 space-y-4 text-sm">
                {rows.map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-1 border-b border-[#1f3f2e]/10 pb-4 last:border-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
                    <dt className="text-[#667269]">{label}</dt>
                    <dd translate="no" className="font-semibold sm:text-right">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-[#1f3f2e]/12 bg-white p-7 sm:p-8">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]">Payment</p>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <dt>Total</dt>
                  <dd translate="no" className="font-semibold tabular-nums">{formatPeso(reservation.amountTotal)}</dd>
                </div>
                <div className="flex justify-between gap-3 text-[#265136]">
                  <dt>{reservation.status === "confirmed" ? "Downpayment paid" : "Downpayment due"}</dt>
                  <dd translate="no" className="font-semibold tabular-nums">{formatPeso(reservation.amountDeposit)}</dd>
                </div>
                <div className="flex justify-between gap-3 text-[#667269]">
                  <dt>Balance at the club</dt>
                  <dd translate="no" className="tabular-nums">{formatPeso(reservation.amountTotal - reservation.amountDeposit)}</dd>
                </div>
              </dl>

              {reservation.status === "held" ? (
                <>
                  <p className="mt-6 text-xs leading-5 text-[#667269]">
                    <Tr
                      t="Your tee time is held until {0}. If the downpayment is not completed by then, the time is released."
                      v={[
                        <span key="t" translate="no" className="font-semibold">
                          {new Date(reservation.holdExpiresAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Manila" })}
                        </span>,
                      ]}
                    />
                  </p>
                  <ReservationActions code={reservation.code} simulate={simulatePayments()} />
                </>
              ) : reservation.status === "confirmed" ? (
                <p className="mt-6 text-sm leading-6 text-[#5d685f]">
                  A receipt has been sent to your email. Please arrive 30 minutes before your tee time and show this
                  booking reference at the clubhouse.
                </p>
              ) : (
                <Link
                  href="/golf/book"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#265136] px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dda0] transition hover:bg-[#1f3f2e]"
                >
                  Book a new tee time
                </Link>
              )}
              <p className="mt-6 border-t border-[#1f3f2e]/10 pt-4 text-xs leading-5 text-[#8a938c]">
                <Tr t="Need to change your booking? Call the club on {0}." v={[CLUB_PHONE.label]} />
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
