import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import RequestCallback from "@/components/RequestCallback";
import ScrollMotion from "@/components/ScrollMotion";
import { Container, SectionHeading } from "@/components/SectionKit";
import { CLUB_ADDRESS, CLUB_EMAIL, CLUB_PHONE } from "@/lib/site-content";

/**
 * Ang pupuntahan ng "Contact Us" sa header at sa footer.
 *
 * Magkaiba ito sa /plan-your-visit nang sadya. Doon ay may balak nang
 * bumisita ang tao at ang form ang buong laman. Dito ay tanong ang dala —
 * kaya numero, email, at lokasyon ang unang nakikita, at ang form ang nasa
 * ibaba para sa mas mahabang mensahe.
 *
 * Iisang form lang ang ginagamit ng dalawa. Hindi pa sulit ang hiwalay na
 * talahanayan para sa pangkalahatang tanong — sapat ang "Something else" sa
 * interest at ang malayang teksto sa dulo. Ang `context` ang nagsasabi sa
 * admin kung saan galing ang bawat isa.
 */
export const metadata: Metadata = {
  title: "Contact us | CamSur Uptown Golf Club",
  description:
    "Reach CamSur Uptown Golf Club by phone or email, or send a message and the team will come back to you within 48 hours.",
};

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path
        d="M6.5 3.5 9 4l1 3-1.8 1.4a12 12 0 0 0 5.4 5.4L15 12l3 1 .5 2.5A2 2 0 0 1 16.4 18 13 13 0 0 1 6 7.6 2 2 0 0 1 6.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m3.5 6.5 8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" aria-hidden="true">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function DetailCard({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="border border-[#173b2a]/12 bg-white p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b49343]/30 bg-[#fbf8ef] text-[#174630]">
        {icon}
      </span>
      <p className="mt-4 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]">{label}</p>
      <div className="mt-2 text-sm leading-7 text-[#14271d]">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <main>
        <ScrollMotion />

        <section id="top" className="bg-[#1c3b2d] px-6 pb-14 pt-40 text-white sm:pb-16 sm:pt-44 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#d8b65b] xl:text-[11px]">
              Contact us
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
              We are glad to hear from you.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
              Call the club, send an email, or leave a message below. Someone from the team comes back to every enquiry
              within 48 hours.
            </p>
          </div>
        </section>

        <div className="bg-[#f7f5ee]">
          <Breadcrumbs />
        </div>

        <section className="bg-[#f7f5ee] py-14 text-[#14271d] sm:py-16">
          <Container>
            <div className="grid gap-5 sm:grid-cols-3">
              <DetailCard icon={<PhoneIcon />} label="By phone">
                <a href={CLUB_PHONE.href} className="font-semibold transition-colors hover:text-[#2f644b]">
                  {CLUB_PHONE.label}
                </a>
                <p className="mt-1 text-[#667269]">Mondays to Sundays</p>
              </DetailCard>

              <DetailCard icon={<MailIcon />} label="By email">
                <a href={CLUB_EMAIL.href} className="font-semibold break-words transition-colors hover:text-[#2f644b]">
                  {CLUB_EMAIL.label}
                </a>
                <p className="mt-1 text-[#667269]">Replies within 48 hours</p>
              </DetailCard>

              <DetailCard icon={<PinIcon />} label="Where we are">
                {CLUB_ADDRESS.lines.map((line, index) => (
                  <p key={line} className={index === 0 ? "font-semibold" : "text-[#667269]"}>
                    {line}
                  </p>
                ))}
              </DetailCard>
            </div>

            {/* Iba ang layunin ng dalawang pahina, kaya bukas ang daan papunta
                doon para sa may balak nang bumisita. */}
            <p className="mt-8 text-center text-sm leading-7 text-[#5d685f]">
              Planning a round, a stay, or an event?{" "}
              <Link href="/plan-your-visit" className="font-semibold text-[#2f644b] underline underline-offset-4 hover:text-[#3a765a]">
                Plan your visit
              </Link>{" "}
              has everything the club needs to prepare for you.
            </p>
          </Container>
        </section>

        <section id="message" className="scroll-mt-24 border-t border-[#173b2a]/10 bg-white py-14 text-[#14271d] sm:py-16">
          <Container>
            <SectionHeading
              eyebrow="Send a message"
              title="Tell us what you need."
              intro="Leave your question and how best to reach you. There is a free-text box at the end for anything that does not fit the fields above it."
            />
            <div className="mt-10">
              <RequestCallback context="Contact page" />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
