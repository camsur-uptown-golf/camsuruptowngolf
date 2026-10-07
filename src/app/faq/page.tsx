import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import ScrollMotion from "@/components/ScrollMotion";
import { EDITORIAL_SECTION_ALT, Shell, Watermark, delay } from "@/components/EditorialKit";
import { CLUB_PHONE, FAQ_GROUPS } from "@/lib/site-content";

/**
 * Ang FAQ ng club.
 *
 * SARILING PAHINA ITO, HINDI BAHAGI NG IBA. Dalawang bersyon ang nauna
 * rito at pareho silang mali: isang listahan sa ilalim ng /packages
 * ("Before you enquire"), na mga tanong tungkol sa buong club at hindi sa
 * mga package lang; at isang buong accordion sa loob ng footer, na
 * idinagdag sa ilalim ng bawat pahina ng site. Dito na sila pareho, at
 * isang pindutan na lang sa footer ang daan papunta rito.
 *
 * NAKAPANGKAT ANG MGA TANONG at hindi isang mahabang hanay: labing-isa
 * ang bilang nila, at sa isang tumpok ay walang makikitang balangkas ang
 * naghahanap ng isang bagay lang.
 *
 * `<details>` ang accordion at hindi JavaScript, kaya server component
 * pa rin ang buong pahina at bumubukas pa rin ito kahit hindi tumakbo
 * ang JS. Kasama rin ito sa paghahanap sa loob ng pahina (Ctrl+F) sa mga
 * browser na sumusuporta sa hidden=until-found.
 */
export const metadata: Metadata = {
  title: "Frequently asked questions | CamSur Uptown Golf Club",
  description:
    "Rates, booking, caddies, dress code, accommodation, and transfers — the questions the club is asked most often, answered before you enquire.",
};

export default function FaqPage() {
  return (
    <>
      <main>
        <ScrollMotion />

        <section
          id="top"
          className="relative isolate overflow-hidden bg-[#14271d] px-6 pb-14 pt-48 text-white sm:px-8 sm:pb-16 sm:pt-52 lg:px-12 lg:pt-56"
        >
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_20%,rgba(201,165,78,0.10),transparent_34%)]"
            aria-hidden="true"
          />

          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">

              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Frequently asked questions.
              </h1>

            </div>
          </div>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        <section className={EDITORIAL_SECTION_ALT}>
          <Watermark speed={0.1} offsetY="10%" />
          <Shell>
            {FAQ_GROUPS.map((group, groupIndex) => (
              /* Ang unang pangkat ay walang puwang sa itaas — kasunod ito
                 kaagad ng breadcrumb at ng padding ng section. */
              <div key={group.title} className={groupIndex ? "mt-16" : ""}>
                <h2
                  data-reveal="up"
                  className="font-navigation text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.22em] text-[#98782f]"
                >
                  {group.title}
                </h2>

                <div className="mt-6">
                  {group.faqs.map((faq, index) => (
                    <details
                      key={faq.question}
                      data-reveal="up"
                      style={delay(index * 70)}
                      className="group border-b border-[#1f3f2e]/15 first:border-t first:border-[#1f3f2e]/15"
                    >
                      {/* Dalawang browser, dalawang default na tatsulok:
                          kailangan ng `list-none` at ng webkit na marker
                          para mawala silang dalawa. */}
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-lg font-medium tracking-[-0.015em] text-[#14271d] transition-colors hover:text-[#265136] sm:text-xl [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#265136]/25 text-[#265136] transition duration-300 group-open:rotate-45 group-open:border-[#265136] group-open:bg-[#265136] group-open:text-white"
                          aria-hidden="true"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </span>
                      </summary>
                      <p className="max-w-2xl pb-7 pr-14 text-sm leading-8 text-[#5d685f] sm:text-base">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </Shell>
        </section>

        <section className="relative isolate overflow-hidden border-t border-[#1f3f2e]/10 bg-[#1f3f2e] py-14 text-white sm:py-16">
          <div
            data-parallax="0.14"
            className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#c9a54e]/[0.07] blur-3xl"
            aria-hidden="true"
          />
          <Shell>
            <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
              <p data-reveal="up" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#d8b65b]">
                Still deciding
              </p>
              <h2
                data-reveal="up"
                style={delay(90)}
                className="mt-3 text-2xl font-medium tracking-[-0.035em] sm:text-3xl xl:text-4xl"
              >
                Ask the club directly.
              </h2>
              <div data-reveal="up" style={delay(180)}>
                <p className="mt-4 text-sm leading-7 xl:text-base xl:leading-8 text-white/60">
                  Tell the team your dates and how many are playing, and they will come back with the answer and a
                  quote built around those two things.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/plan-your-visit"
                    className="inline-flex h-12 items-center rounded-full bg-[#e7d18d] px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0]"
                  >
                    Request a call back
                  </Link>
                  <a
                    href={CLUB_PHONE.href}
                    className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-[#e7d18d] hover:text-[#f1d98f]"
                  >
                    {CLUB_PHONE.label}
                  </a>
                </div>
              </div>
            </div>
          </Shell>
        </section>
      </main>
      <Footer />
    </>
  );
}
