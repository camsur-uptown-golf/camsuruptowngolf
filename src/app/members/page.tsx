import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import HeroBackdrop from "@/components/HeroBackdrop";
import MemberAuth from "@/components/MemberAuth";
import MemberLogout from "@/components/MemberLogout";
import MembershipPlans from "@/components/MembershipPlans";
import Tr from "@/components/Tr";
import { Container } from "@/components/SectionKit";
import { currentMember } from "@/lib/member-session";
import { CLUB_EMAIL, CLUB_PHONE } from "@/lib/site-content";
import { findPlan, formatPeso } from "@/lib/membership-plans";

/**
 * Ang pupuntahan ng "Member's Login" sa side bar.
 *
 * Dalawang anyo, ayon sa session cookie (binabasa sa server, kaya walang
 * kislap ng maling anyo):
 *   - Hindi naka-login → landing page: larawan ng members' lounge, ang mga
 *     benepisyo ng miyembro, at ang Login / Sign up card (`MemberAuth`).
 *   - Naka-login → pahina ng miyembro: pagbati, detalye ng account, mga
 *     susunod na hakbang, at Log out.
 *
 * Dynamic ang pahinang ito dahil sa `cookies()` — tama iyon, iba ang laman
 * nito sa bawat bisita.
 */
export const metadata: Metadata = {
  title: "Member's login | CamSur Uptown Golf",
  description: "Log in or create your CamSur Uptown Golf member account to book faster and receive member-only news and offers.",
};

const BENEFITS = [
  { title: "Priority tee times", text: "Request preferred times before they open to the public." },
  { title: "Members’ lounge", text: "A quiet room above the course, reserved for members and their guests." },
  { title: "Member rates", text: "Preferred rates on rounds, stays, and clubhouse dining." },
  { title: "Club news first", text: "Tournaments, events, and openings, before anyone else hears." },
] as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "Asia/Manila" });
}

function PlansHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f] xl:text-[11px]">{eyebrow}</p>
      <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1] tracking-[-0.045em] text-[#14271d]">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-[#5d685f] sm:text-base sm:leading-8">{intro}</p>
    </div>
  );
}

export default async function MembersPage() {
  const member = await currentMember();
  const plan = findPlan(member?.plan);

  if (member) {
    return (
      <>
        <main>
          <section id="top" className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-[#1f3f2e] px-6 pb-14 pt-40 text-white sm:min-h-[560px] sm:pb-16 sm:pt-44 lg:px-8">
            <HeroBackdrop src="/clubhouse/concept/members-lounge.jpg" alt="Members’ lounge concept overlooking the tropical golf course" />
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b] xl:text-[11px]">
                Member&apos;s area
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                <Tr t="Welcome, {0}." v={[member.firstName]} />
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                You are logged in to your CamSur Uptown Golf account.
              </p>
            </div>
          </section>

          <div className="bg-[#f7f5ee]">
            <Breadcrumbs />
          </div>

          <section className="bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
            <Container>
              <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
                <div className="border border-[#1f3f2e]/12 bg-white p-7 sm:p-8">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]">Your account</p>
                  <dl className="mt-5 space-y-4 text-sm">
                    {[
                      ["Name", `${member.firstName} ${member.lastName}`],
                      ["Email", member.email],
                      ["Mobile number", member.mobile ?? "—"],
                      ["Member since", formatDate(member.createdAt)],
                      ["Plan", plan ? `${plan.name} · ${formatPeso(plan.pricePerMonth)}/mo` : "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex flex-col gap-1 border-b border-[#1f3f2e]/10 pb-4 last:border-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
                        <dt className="text-[#667269]">{label}</dt>
                        <dd translate="no" className="font-semibold break-words sm:text-right">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7">
                    <MemberLogout />
                  </div>
                </div>

                <div className="border border-[#1f3f2e]/12 bg-white p-7 sm:p-8">
                  <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]">What&apos;s next</p>
                  <h2 className="mt-3 text-2xl font-medium tracking-[-0.035em]">Plan your first visit as a member.</h2>
                  <p className="mt-3 text-sm leading-7 text-[#5d685f]">
                    Online tee-time booking for members is on its way. Until then, tell the club when you would like to
                    play and the team will arrange it for you.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/plan-your-visit"
                      className="inline-flex h-11 items-center rounded-full bg-[#e7d18d] px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:bg-[#f3dfa0] xl:text-[11px]"
                    >
                      Plan your visit
                    </Link>
                    <Link
                      href="/clubhouse/members-lounge"
                      className="inline-flex h-11 items-center rounded-full border border-[#265136]/30 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#265136] transition hover:border-[#265136] hover:bg-[#265136] hover:text-white xl:text-[11px]"
                    >
                      Members’ lounge
                    </Link>
                  </div>
                  <p className="mt-6 text-sm leading-7 text-[#5d685f]">
                    <Tr
                      t="Questions about your membership? Call {0} or email {1}."
                      v={[
                        <a key="phone" href={CLUB_PHONE.href} className="font-semibold text-[#265136] underline underline-offset-4">
                          {CLUB_PHONE.label}
                        </a>,
                        <a key="email" href={CLUB_EMAIL.href} className="font-semibold break-words text-[#265136] underline underline-offset-4">
                          {CLUB_EMAIL.label}
                        </a>,
                      ]}
                    />
                  </p>
                </div>
              </div>
            </Container>
          </section>

          <section id="plans" className="scroll-mt-24 border-t border-[#1f3f2e]/10 bg-[#f7f5ee] pb-20 pt-16 text-[#14271d]">
            {/* Mas malapad kaysa sa Container — tatlong card na may mahabang listahan. */}
            <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
              <PlansHeading
                eyebrow="Membership plans"
                title={plan ? "Your membership." : "Choose your membership."}
                intro="Three monthly plans. Pick the one that fits how often you play — you can switch or cancel at any time."
              />
              <div className="mt-14">
                <MembershipPlans signedIn currentPlan={member.plan} />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main>
        {/* `lg:pt-64`: nakapatong ang fixed na header (208px ang taas ng marka)
            sa itaas ng pahina at sinasalo nito ang mga click. Sa ilalim nito
            dapat magsimula ang card, kung hindi ay hindi mapindot ang mga tab. */}
        {/* `min-h-svh`: sa Log in ay mas maikli ang card kaysa sa tanaw, kaya
            sumisilip sa ibaba ang cream na section ng mga plan — parang puting
            guhit. Laging puno na ng hero ang buong screen. */}
        <section id="top" className="relative isolate min-h-svh overflow-hidden bg-[#14271d] px-6 pb-16 pt-36 text-white sm:pt-44 lg:px-12 lg:pb-24 lg:pt-64">
          {/* NAKAPIRMING TAAS ANG LARAWAN, hindi `inset-0`. Mas mahaba ang card
              ng Sign up kaysa sa Log in, kaya humahaba at umiikli ang section
              sa paglipat ng tab — at kung sinusundan ng larawan ang section,
              lumalaki at lumiliit ito. Dito ay iisa ang sukat nito palagi;
              mas marami o mas kaunti lang ang nakikita sa ibaba. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[max(2000px,100svh)] lg:h-[max(1500px,100svh)]" aria-hidden="true">
            <Image
              src="/clubhouse/concept/members-lounge.jpg"
              alt=""
              fill
              preload
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
          {/* Mas madilim sa kaliwa (para mabasa ang teksto), maliwanag sa kanan. */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#07170f]/78 via-[#07170f]/45 to-[#07170f]/10" aria-hidden="true" />

          <div className="mx-auto grid w-full max-w-7xl items-start gap-12 lg:grid-cols-[1fr_minmax(0,460px)] lg:gap-16">
            <div className="max-w-xl lg:pt-10">
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b] xl:text-[11px]">
                Member&apos;s login
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
                Your club, a step ahead.
              </h1>
              <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base sm:leading-8">
                Log in to your member account, or create one in a minute. Members book first, play at member rates, and
                hear about the club before anyone else.
              </p>
              <ul className="mt-9 grid gap-5 sm:grid-cols-2">
                {BENEFITS.map((benefit) => (
                  <li key={benefit.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#e7d18d]/45 text-[#e7d18d]">
                      <CheckIcon />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{benefit.title}</span>
                      <span className="mt-1 block text-[13px] leading-6 text-white/65">{benefit.text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="member-access" className="scroll-mt-28">
              <MemberAuth />
              {/* Dati ay hiwalay na section ito sa ilalim, kasama ng breadcrumb.
                  Inalis ang section; dito na lang sa ilalim ng card ang tulong. */}
              <p className="mt-4 rounded-xl bg-black/35 px-4 py-3 text-center text-[13px] leading-6 text-white/85 backdrop-blur-sm">
                <Tr
                  t="Need help with your account? Call {0} or email {1}."
                  v={[
                    <a key="phone" href={CLUB_PHONE.href} className="font-semibold text-[#f3dda0] underline underline-offset-4 hover:text-white">
                      {CLUB_PHONE.label}
                    </a>,
                    <a key="email" href={CLUB_EMAIL.href} className="font-semibold break-words text-[#f3dda0] underline underline-offset-4 hover:text-white">
                      {CLUB_EMAIL.label}
                    </a>,
                  ]}
                />
              </p>
            </div>
          </div>
        </section>

        <section id="plans" className="scroll-mt-24 bg-[#f7f5ee] pb-20 pt-16 text-[#14271d]">
          {/* Mas malapad kaysa sa Container — tatlong card na may mahabang listahan. */}
          <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
            <PlansHeading
              eyebrow="Membership plans"
              title="Three ways to belong."
              intro="Every plan is monthly. Create your account above, then choose the plan that fits how often you play."
            />
            <div className="mt-14">
              <MembershipPlans signedIn={false} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
