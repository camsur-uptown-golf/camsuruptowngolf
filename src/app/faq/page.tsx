import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSearch from "@/components/FaqSearch";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
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
  title: "Frequently asked questions | CamSur Uptown Golf",
  description:
    "Rates, booking, caddies, dress code, accommodation, and transfers — the questions the club is asked most often, answered before you enquire.",
};

/** "Booking & rates" → "booking-rates": anchor ng bawat pangkat para sa topic nav. */
function topicId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function FaqPage() {
  return (
    <>
      <main>
        <ScrollMotion />

        <section
          id="top"
          className="relative isolate flex min-h-[260px] items-end overflow-hidden bg-[#03321b] px-6 pb-10 pt-32 text-white sm:min-h-[560px] sm:px-8 sm:pb-16 sm:pt-52 lg:px-12 lg:pt-56"
        >
          <HeroBackdrop src="/brand-2026/first-tee-dew.webp" alt="A golf ball teed up in the morning dew" imageClassName="object-[50%_62%]" />

          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-2xl">

              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Frequently asked questions.
              </h1>

            </div>
          </div>
        </section>

        <div className="bg-[#f3ede1]">
          <Breadcrumbs />
        </div>

        {/* Ang crest ay `fixed`: nakadikit sa itaas at walang parallax. Dati
            ay nakagitna ito sa section, kaya bumababa ito nang 75–113px
            tuwing may binubuksang tanong. */}
        <section className={EDITORIAL_SECTION_ALT}>
          <Watermark speed={0} fixed />
          <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
            <p data-reveal="up" className="max-w-2xl text-[17px] leading-[1.7] text-[#34423a] sm:text-lg">
              The questions the club hears most, grouped by topic.
            </p>

            <FaqSearch />

            {/* Sa cellphone: tatlong pindutan sa itaas para tumalon sa
                pangkat. Sa desktop, ang nakadikit na listahan sa kaliwa. */}
            <nav aria-label="FAQ topics" className="mt-2 flex flex-wrap gap-2 lg:hidden">
              {FAQ_GROUPS.map((group) => (
                <a
                  key={group.title}
                  href={`#${topicId(group.title)}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-[#2e5126]/25 bg-white/70 px-4 text-sm font-semibold text-[#03321b] transition-colors hover:border-[#2e5126] hover:bg-[#2e5126] hover:text-white"
                >
                  {group.title}
                </a>
              ))}
            </nav>

            <div className="mt-10 lg:mt-12 lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
              <aside className="hidden lg:block">
                <nav aria-label="FAQ topics" className="sticky top-32">
                  <p className="font-navigation text-[12px] font-bold uppercase tracking-[0.2em] text-[#7d6224]">Topics</p>
                  <ul className="mt-5 space-y-1 border-l border-[#03321b]/15">
                    {FAQ_GROUPS.map((group) => (
                      <li key={group.title}>
                        <a
                          href={`#${topicId(group.title)}`}
                          className="-ml-px block border-l-2 border-transparent py-2 pl-4 text-[15px] font-medium leading-snug text-[#34423a] transition-colors hover:border-[#2e5126] hover:text-[#03321b]"
                        >
                          {group.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>

              <div>
                {FAQ_GROUPS.map((group, groupIndex) => (
                  <div key={group.title} id={topicId(group.title)} data-faq-group className={`scroll-mt-28 ${groupIndex ? "mt-16" : ""}`}>
                    <h2 data-reveal="up" className="text-[30px] font-medium leading-none text-[#03321b] sm:text-[36px]">
                      {group.title}
                    </h2>

                    {/* Nasa balot ang guhit sa pagitan, hindi sa <details>:
                        rounded ang <details> kapag bukas, at kumukurba ang
                        border sa mga dulo kapag doon nakalagay. */}
                    <div className="mt-6 border-t border-[#03321b]/12">
                      {group.faqs.map((faq, index) => (
                        <div key={faq.question} data-faq-item className="border-b border-[#03321b]/12">
                          <details
                            data-reveal="up"
                            style={delay(index * 70)}
                            className="group -mx-4 rounded-2xl px-4 transition-colors duration-300 open:bg-white open:shadow-[0_12px_32px_-20px_rgba(20,39,29,0.45)] sm:-mx-6 sm:px-6"
                          >
                            {/* Dalawang browser, dalawang default na tatsulok:
                                kailangan ng `list-none` at ng webkit na marker
                                para mawala silang dalawa. */}
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-5 text-[19px] font-medium leading-snug tracking-[-0.015em] text-[#03321b] transition-colors hover:text-[#2e5126] group-open:text-[#2e5126] sm:gap-8 sm:py-6 sm:text-[21px] [&::-webkit-details-marker]:hidden">
                              {faq.question}
                              <span
                                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2e5126]/30 text-[#2e5126] transition duration-300 group-open:rotate-45 group-open:border-[#2e5126] group-open:bg-[#2e5126] group-open:text-white"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                              </span>
                            </summary>
                            <p className="max-w-[62ch] pb-6 text-base leading-[1.75] text-[#34423a] sm:pb-7 sm:pr-14 sm:text-[17px]">
                              {faq.answer}
                            </p>
                          </details>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden border-t border-[#03321b]/10 bg-[#03321b] py-14 text-white sm:py-16">
          <div
            data-parallax="0.14"
            className="pointer-events-none absolute -right-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#c5a35c]/[0.07] blur-3xl"
            aria-hidden="true"
          />
          <Shell>
            <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
              <p data-reveal="up" className="text-[11px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#e2c77a]">
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
                    className="inline-flex h-12 items-center rounded-full bg-[#e2c77a] px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-[#03321b] transition hover:-translate-y-0.5 hover:bg-[#efd99b]"
                  >
                    Request a call back
                  </Link>
                  <a
                    href={CLUB_PHONE.href}
                    className="inline-flex h-12 items-center rounded-full border border-white/25 px-7 text-[11px] xl:text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:border-[#e2c77a] hover:text-[#efd99b]"
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
